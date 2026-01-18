import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../../design-system";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/trips.service";
import { ParticipantName } from "./EditableParticipantName";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

interface GuestsProps {
  openManageGuestsModal: () => void;
}

export function GuestsList({ openManageGuestsModal }: GuestsProps) {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tripId) return;
    
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => {
        setParticipants(response.data.participants || []);
      })
      .catch((error) => {
        console.error('Erro ao carregar participantes:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tripId]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Convidados</h2>
      </div>
      
      {loading ? (
        <div className="text-zinc-400">Carregando convidados...</div>
      ) : (
        <div className="space-y-5">
          {participants.length === 0 ? (
            <p className="text-sm text-zinc-500">
              Nenhum convidado ainda.
            </p>
          ) : (
            participants.map((participant, index) => {
              return (
                <div
                  key={participant.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <ParticipantName
                      currentName={participant.name}
                      index={index}
                    />
                    <span className="block text-sm text-zinc-400 truncate">
                      {participant.email}
                    </span>
                  </div>
                  {participant.is_confirmed ? (
                    <CheckCircle2 className="size-5 text-lime-300 shrink-0" />
                  ) : (
                    <CircleDashed className="size-5 text-zinc-400 shrink-0" />
                  )}
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
    </div>
  );
}
