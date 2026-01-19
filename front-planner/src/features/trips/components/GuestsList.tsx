import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../../design-system";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/trips.service";
import { ConfirmParticipationModal } from "../modals/ConfirmParticipationModal";
import { useAuth } from "../../auth/hooks/useAuth";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
  user_id?: string;
}

interface GuestsProps {
  openManageGuestsModal: () => void;
}

export function GuestsList({ openManageGuestsModal }: GuestsProps) {
  const { tripId } = useParams();
  const { user } = useAuth();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmingParticipant, setConfirmingParticipant] =
    useState<Participant | null>(null);

  useEffect(() => {
    if (!tripId) return;

    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => {
        setParticipants(response.data.participants || []);
      })
      .catch((error) => {
        console.error("Erro ao carregar participantes:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tripId]);

  function handleParticipantClick(participant: Participant) {
    // Permitir apenas que o usuário confirme/desconfirme sua própria participação.
    if (participant.user_id === user?.id) {
      setConfirmingParticipant(participant);
    }
  }

  function handleConfirmationComplete() {
    setConfirmingParticipant(null);
    // Reload participants
    if (!tripId) return;

    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => {
        setParticipants(response.data.participants || []);
      })
      .catch((error) => {
        console.error("Erro ao carregar participantes:", error);
      });
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-zinc-100">Convidados</h2>
        <p className="text-sm text-zinc-400 -mt-2 leading-relaxed">
          Clique no ícone ao lado do seu nome para confirmar ou cancelar sua
          participação.
        </p>
      </div>

      {loading ? (
        <div className="text-zinc-400">Carregando convidados...</div>
      ) : (
        <div className="space-y-5">
          {participants.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-zinc-400">
                Nenhum convidado foi adicionado ainda.
              </p>
            </div>
          ) : (
            participants.map((participant) => {
              return (
                <div
                  key={participant.id}
                  className="flex items-center justify-between gap-4 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800"
                >
                  <div className="space-y-1 flex-1">
                    <span className="block font-medium text-zinc-100">
                      {participant.name || participant.email}
                    </span>
                    {participant.name && (
                      <span className="block text-sm text-zinc-400 truncate">
                        {participant.email}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {participant.is_confirmed && (
                      <span className="text-xs font-medium text-lime-400 bg-lime-400/10 px-2 py-1 rounded-full">
                        Confirmado
                      </span>
                    )}
                    <button
                      onClick={() => handleParticipantClick(participant)}
                      className={`shrink-0 ${participant.user_id === user?.id ? "cursor-pointer hover:scale-110 hover:opacity-80" : "cursor-default opacity-50"} transition-all duration-200`}
                      disabled={participant.user_id !== user?.id}
                      title={
                        participant.user_id === user?.id
                          ? participant.is_confirmed
                            ? "Clique para cancelar participação"
                            : "Clique para confirmar participação"
                          : "Apenas você pode alterar sua participação"
                      }
                    >
                      {participant.is_confirmed ? (
                        <CheckCircle2 className="size-6 text-lime-400" />
                      ) : (
                        <CircleDashed className="size-6 text-zinc-400" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      <Button variant="secondary" size="full" onClick={openManageGuestsModal}>
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>

      {confirmingParticipant && (
        <ConfirmParticipationModal
          isConfirmed={confirmingParticipant.is_confirmed}
          participantId={confirmingParticipant.id}
          onConfirm={handleConfirmationComplete}
          onCancel={() => setConfirmingParticipant(null)}
        />
      )}
    </div>
  );
}
