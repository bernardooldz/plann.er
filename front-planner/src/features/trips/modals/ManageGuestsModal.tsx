import { X, AtSign, Plus, Loader2 } from "lucide-react";
import { type FormEvent, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal, Notification, useToast } from "../../../design-system";
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

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response: { data: { participants: Participant[] } }) => {
        setParticipants(response.data.participants);
        setEmailsToInvite(response.data.participants.map((p: Participant) => p.email));
      })
      .catch((error: Error) => {
        console.error('Error loading participants:', error);
      });
  }, [tripId]);

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
                  className={participant?.is_confirmed ? "opacity-50 cursor-not-allowed" : ""}
                  disabled={participant?.is_confirmed}
                >
                  <X className="size-4 text-zinc-400" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="w-full h-px bg-zinc-800"></div>

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
