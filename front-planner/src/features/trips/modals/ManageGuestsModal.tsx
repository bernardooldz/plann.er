import { X, Link2, Copy } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal, useToast, Divider } from "../../../design-system";
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
  const [participantToRemove, setParticipantToRemove] =
    useState<Participant | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const inviteLink = `${window.location.origin}/trips/${tripId}/join`;

  useEffect(() => {
    if (!tripId) return;

    Promise.all([
      api.get(`/trips/${tripId}/participants`),
      api.get(`/trips/${tripId}`),
    ])
      .then(([participantsResponse, tripResponse]) => {
        setParticipants(participantsResponse.data.participants);
        setIsOwner(tripResponse.data.trip.is_owner);
      })
      .catch((error: Error) => {
        console.error("Error loading data:", error);
      });
  }, [tripId]);

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
      addToast({
        type: "success",
        title: "Link copiado!",
        message: "O link de convite foi copiado para a área de transferência.",
      });
    } catch (err) {
      console.error("Erro ao copiar link:", err);
      addToast({
        type: "error",
        title: "Erro ao copiar",
        message: "Não foi possível copiar o link. Tente novamente.",
      });
    }
  };

  function handleRemoveClick(participant: Participant) {
    if (!isOwner) {
      addToast({
        type: "error",
        title: "Não permitido",
        message: "Apenas o organizador da viagem pode remover participantes.",
      });
      return;
    }

    if (participant.is_confirmed) {
      addToast({
        type: "error",
        title: "Não permitido",
        message:
          "Não é possível remover participantes que já confirmaram presença.",
      });
      return;
    }
    setParticipantToRemove(participant);
  }

  async function confirmRemoveParticipant() {
    if (!participantToRemove) return;

    setIsRemoving(true);
    try {
      await api.delete(
        `/trips/${tripId}/participants/${participantToRemove.id}`,
      );

      const updatedParticipants = participants.filter(
        (p) => p.id !== participantToRemove.id,
      );
      setParticipants(updatedParticipants);

      addToast({
        type: "success",
        title: "Participante removido!",
        message: "O participante foi removido da viagem.",
      });

      setParticipantToRemove(null);
      onGuestsUpdated();
    } catch {
      addToast({
        type: "error",
        title: "Erro ao remover",
        message: "Não foi possível remover o participante. Tente novamente.",
      });
    } finally {
      setIsRemoving(false);
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
          {participants.map((participant) => {
            return (
              <div
                key={participant.id}
                className="py-1.5 px-2.5 rounded-md bg-zinc-700 flex items-center gap-2"
              >
                <span className="text-zinc-300">
                  {participant.name || participant.email}
                </span>
                {isOwner && (
                  <button
                    type="button"
                    onClick={() => handleRemoveClick(participant)}
                    className={
                      participant.is_confirmed
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }
                    disabled={participant.is_confirmed}
                  >
                    <X className="size-4 text-zinc-400" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <Divider />

        <div className="bg-zinc-800/50 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link2 className="size-4 text-zinc-400" />
              <span className="text-md text-zinc-300">
                Compartilhar link da viagem
              </span>
            </div>
            <Button variant="secondary" onClick={copyInviteLink} size="default">
              <Copy className="size-4" />
              {linkCopied ? "Copiado!" : "Copiar"}
            </Button>
          </div>
          <p className="text-sm text-zinc-500">
            Qualquer pessoa com este link pode se juntar à viagem
          </p>
        </div>

        <Button onClick={() => closeManageGuestsModal()} size="full">
          Fechar
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
