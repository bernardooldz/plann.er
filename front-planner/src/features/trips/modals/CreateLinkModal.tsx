import { Link2, Tag } from "lucide-react";
import { type FormEvent } from "react";
import { Button, Input, Modal, useToast } from "../../../design-system";
import { api } from "../services/trips.service";
import { useParams } from "react-router-dom";
import { useState } from "react";

interface CreateLinkModalProps {
  closeCreateLinkModal: () => void;
}

export function CreateLinkModal({ closeCreateLinkModal }: CreateLinkModalProps) {
  const { tripId } = useParams();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData(event.currentTarget);
    const title = data.get("title")?.toString();
    const url = data.get("url")?.toString();

    try {
      await api.post(`/trips/${tripId}/links`, {
        title,
        url,
      });

      addToast({
        type: 'success',
        title: 'Link cadastrado!',
        message: 'O link foi adicionado com sucesso.'
      });

      closeCreateLinkModal();
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao cadastrar link',
        message: 'Não foi possível adicionar o link. Tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      isOpen={true}
      onClose={closeCreateLinkModal}
      title="Cadastrar link"
      description="Todos convidados podem visualizar os links importantes."
    >
      <form onSubmit={createLink} className="space-y-3">
        <Input
          icon={<Tag className="size-5" />}
          name="title"
          placeholder="Título do link"
        />

        <Input
          icon={<Link2 className="size-5" />}
          type="url"
          name="url"
          placeholder="URL"
        />

        <Button type="submit" variant="primary" size="full" disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar link'}
        </Button>
      </form>
    </Modal>
  );
}
