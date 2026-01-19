import { Calendar, Tag } from "lucide-react";
import { Button, Input, Modal, useToast } from "../../../design-system";
import type { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/trips.service";
import { useState } from "react";
import { format } from "date-fns";

interface Activity {
  id: string;
  title: string;
  occurs_at: string;
}

interface EditActivityModalProps {
  activity: Activity;
  closeEditActivityModal: () => void;
}

export function EditActivityModal({
  activity,
  closeEditActivityModal,
}: EditActivityModalProps) {
  const { tripId } = useParams();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Format date for datetime-local input
  const formattedDate = format(new Date(activity.occurs_at), "yyyy-MM-dd'T'HH:mm");

  async function updateActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData(event.currentTarget);
    const title = data.get("title")?.toString();
    const occurs_at = data.get("occurs_at")?.toString();

    try {
      await api.put(`/trips/${tripId}/activities/${activity.id}`, {
        title,
        occurs_at,
      });

      addToast({
        type: 'success',
        title: 'Atividade atualizada!',
        message: 'A atividade foi atualizada com sucesso.'
      });

      closeEditActivityModal();
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao atualizar atividade',
        message: 'Não foi possível atualizar a atividade. Tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      isOpen={true}
      onClose={closeEditActivityModal}
      title="Editar atividade"
      description="Atualize as informações da atividade."
    >
      <form onSubmit={updateActivity} className="space-y-3">
        <Input
          icon={<Tag className="size-5" />}
          name="title"
          placeholder="Qual a atividade?"
          defaultValue={activity.title}
        />

        <Input
          icon={<Calendar className="size-5" />}
          type="datetime-local"
          name="occurs_at"
          placeholder="Data e horário da atividade"
          defaultValue={formattedDate}
        />

        <Button type="submit" variant="primary" size="full" disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar alterações'}
        </Button>
      </form>
    </Modal>
  );
}