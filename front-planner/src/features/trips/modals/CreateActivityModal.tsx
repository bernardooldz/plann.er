import { Calendar, Tag } from "lucide-react";
import { Button, Input, Modal, useToast } from "../../../design-system";
import type { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/trips.service";
import { useState } from "react";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData(event.currentTarget);
    const title = data.get("title")?.toString();
    const occurs_at = data.get("occurs_at")?.toString();

    try {
      await api.post(`/trips/${tripId}/activities`, {
        title,
        occurs_at,
      });

      addToast({
        type: 'success',
        title: 'Atividade criada!',
        message: 'A atividade foi cadastrada com sucesso.'
      });

      window.document.location.reload();
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao criar atividade',
        message: 'Não foi possível cadastrar a atividade. Tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      isOpen={true}
      onClose={closeCreateActivityModal}
      title="Cadastrar atividade"
      description="Todos convidados podem visualizar as atividades."
    >
      <form onSubmit={createActivity} className="space-y-3">
        <Input
          icon={<Tag className="size-5" />}
          name="title"
          placeholder="Qual a atividade?"
        />

        <Input
          icon={<Calendar className="size-5" />}
          type="datetime-local"
          name="occurs_at"
          placeholder="Data e horário da atividade"
        />

        <Button type="submit" variant="primary" size="full" disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar atividade'}
        </Button>
      </form>
    </Modal>
  );
}