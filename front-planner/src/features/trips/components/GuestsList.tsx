import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../../design-system";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/trips.service";
import { EditableParticipantName } from "./EditableParticipantName";

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

  function updateParticipantName(participantId: string, newName: string) {
    setParticipants((prev) =>
      prev.map((p) => (p.id === participantId ? { ...p, name: newName } : p)),
    );
  }

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response: { data: { participants: Participant[] } }) =>
        setParticipants(response.data.participants),
      );
  }, [tripId]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Convidados</h2>
        <h2 className="text-sm text-gray-400">
          Clique duas vezes sobre o nome do participante para modificá-lo.
        </h2>
      </div>
      <div className="space-y-5">
        {participants.map((participant, index) => {
          return (
            <div
              key={participant.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <EditableParticipantName
                  participantId={participant.id}
                  currentName={participant.name}
                  index={index}
                  onNameUpdate={(newName) =>
                    updateParticipantName(participant.id, newName)
                  }
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
        })}
      </div>

      <Button variant="secondary" size="full" onClick={openManageGuestsModal}>
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  );
}
