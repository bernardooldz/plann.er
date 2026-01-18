import { X, AtSign, Plus, Loader2, Link2, Copy } from "lucide-react";
import { type FormEvent, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal, Notification, useToast, Divider } from "../../../design-system";
import { api } from "../services/trips.service";
import { ConfirmRemoveParticipantModal } from "./ConfirmRemoveParticipantModal";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

interface ManageGuestsModalProps {
  closeManageGuestsModal: () => void;
  onGuestsUpdated: () => void;
}

export function ManageGuestsModal({
  closeManageGuestsModal,
  onGuestsUpdated,
}: ManageGuestsModalProps) {
  const { tripId } = useParams();
  const { addToast } = useToast();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [participantToRemove, setParticipantToRemove] = useState<Participant | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const inviteLink = `${window.location.origin}/participants/${tripId}/confirm`;

  useEffect(() => {
    if (!tripId) return;
    
    Promise.all([
      api.get(`/trips/${tripId}/participants`),
      api.get(`/trips/${tripId}`)
    ])
      .then(([participantsResponse, tripResponse]) => {
        setParticipants(participantsResponse.data.participants);
        setEmailsToInvite(participantsResponse.data.participants.map((p: Participant) => p.email));
        setIsOwner(tripResponse.data.trip.is_owner);
      })
      .catch((error: Error) => {
        console.error('Error loading data:', error);
      });
  }, [tripId]);

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
      addToast({
        type: 'success',
        title: 'Link copiado!',
        message: 'O link de convite foi copiado para a área de transferência.'
      });
    } catch (err) {
      console.error('Erro ao copiar link:', err);
      addToast({
        type: 'error',
        title: 'Erro ao copiar',
        message: 'Não foi possível copiar o link. Tente novamente.'
      });
    }
  };

  async function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) return;
    if (emailsToInvite.includes(email)) return;

    setEmailsToInvite([...emailsToInvite, email]);
    setHasChanges(true);
    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string) {
    setEmailsToInvite(emailsToInvite.filter((email) => email !== emailToRemove));
    const currentEmails = participants.map(p => p.email);
    const remainingEmails = emailsToInvite.filter((email) => email !== emailToRemove);
    setHasChanges(remainingEmails.some(email => !currentEmails.includes(email)));
  }

  function handleRemoveClick(participant: Participant) {
    if (!isOwner) {
      addToast({
        type: 'error',
        title: 'Não permitido',
        message: 'Apenas o organizador da viagem pode remover participantes.'
      });
      return;
    }
    
    if (participant.is_confirmed) {
      addToast({
        type: 'error',
        title: 'Não permitido',
        message: 'Não é possível remover participantes que já confirmaram presença.'
      });
      return;
    }
    setParticipantToRemove(participant);
  }

  async function confirmRemoveParticipant() {
    if (!participantToRemove) return;

    setIsRemoving(true);
    try {
      await api.delete(`/trips/${tripId}/participants/${participantToRemove.id}`);
      
      const updatedParticipants = participants.filter(p => p.id !== participantToRemove.id);
      setParticipants(updatedParticipants);
      setEmailsToInvite(updatedParticipants.map(p => p.email));
      
      addToast({
        type: 'success',
        title: 'Participante removido!',
        message: 'O participante foi removido da viagem.'
      });
      
      setParticipantToRemove(null);
      onGuestsUpdated();
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao remover',
        message: 'Não foi possível remover o participante. Tente novamente.'
      });
    } finally {
      setIsRemoving(false);
    }
  }

  async function saveGuestChanges() {
    setIsLoading(true);
    try {
      const currentEmails = participants.map(p => p.email);
      const emailsToAdd = emailsToInvite.filter(email => !currentEmails.includes(email));

      for (const email of emailsToAdd) {
        await api.post(`/trips/${tripId}/invites`, {
          email: email,
        });
      }

      addToast({
        type: 'success',
        title: 'Convites enviados!',
        message: 'Os novos convidados receberão um email de convite.'
      });

      onGuestsUpdated();
      closeManageGuestsModal();
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao salvar',
        message: 'Não foi possível salvar as alterações. Tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Modal
        isOpen={true}
        onClose={closeManageGuestsModal}
        title="Gerenciar convidados"
        description="Adicione novos convidados ou remova participantes não confirmados da viagem."
      >
        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map((email) => {
            const participant = participants.find(p => p.email === email);
            const isExisting = !!participant;
            
            return (
              <div
                key={email}
                className={`py-1.5 px-2.5 rounded-md flex items-center gap-2 ${
                  isExisting ? "bg-zinc-700" : "bg-zinc-800"
                }`}
              >
                <span className="text-zinc-300">{email}</span>
                <button
                  type="button"
                  onClick={() => 
                    isExisting && participant 
                      ? handleRemoveClick(participant)
                      : removeEmailFromInvites(email)
                  }
                  className={participant?.is_confirmed || (isExisting && !isOwner) ? "opacity-50 cursor-not-allowed" : ""}
                  disabled={participant?.is_confirmed || (isExisting && !isOwner)}
                >
                  <X className="size-4 text-zinc-400" />
                </button>
              </div>
            );
          })}
        </div>

        <Divider />

        <form
          onSubmit={addNewEmailToInvite}
          className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
        >
          <div className="px-2 flex items-center flex-1 gap-2">
            <AtSign className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Digite o email do convidado"
              className="bg-transparent text-md placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <Button type="submit">
            Convidar
            <Plus className="size-5 text-lime-950" />
          </Button>
        </form>

        <Divider />

        <div className="bg-zinc-800/50 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link2 className="size-4 text-zinc-400" />
              <span className="text-md text-zinc-300">Compartilhar link da viagem</span>
            </div>
            <Button 
              variant="secondary" 
              onClick={copyInviteLink}
              size="default"
            >
              <Copy className="size-4" />
              {linkCopied ? 'Copiado!' : 'Copiar'}
            </Button>
          </div>
          <p className="text-sm text-zinc-500">
            Qualquer pessoa com este link pode se juntar à viagem
          </p>
        </div>

        {hasChanges && (
          <Notification variant="success">
            Há alterações pendentes. Clique em "Salvar alterações" para aplicar.
          </Notification>
        )}

        <Button onClick={saveGuestChanges} size="full" disabled={isLoading || !hasChanges}>
          {isLoading ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Salvando...
            </>
          ) : (
            "Salvar alterações"
          )}
        </Button>
      </Modal>
      
      {participantToRemove && (
        <ConfirmRemoveParticipantModal
          participant={participantToRemove}
          onConfirm={confirmRemoveParticipant}
          onCancel={() => setParticipantToRemove(null)}
          isLoading={isRemoving}
        />
      )}
    </>
  );
}
