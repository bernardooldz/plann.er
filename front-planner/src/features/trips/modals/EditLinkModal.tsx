import { Link2, Tag } from "lucide-react";
import { type FormEvent } from "react";
import { Button, Input, Modal, useToast } from "../../../design-system";
import { api } from "../services/trips.service";
import { useParams } from "react-router-dom";
import { useState } from "react";

interface Link {
  id: string;
  title: string;
  url: string;
}

interface EditLinkModalProps {
  link: Link;
  closeEditLinkModal: () => void;
}

export function EditLinkModal({ link, closeEditLinkModal }: EditLinkModalProps) {
  const { tripId } = useParams();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function updateLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData(event.currentTarget);
    const title = data.get("title")?.toString();
    const url = data.get("url")?.toString();

    try {
      await api.put(`/trips/${tripId}/links/${link.id}`, {
        title,
        url,
      });

      addToast({
        type: 'success',
        title: 'Link atualizado!',
        message: 'O link foi atualizado com sucesso.'
      });

      closeEditLinkModal();
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao atualizar link',
        message: 'Não foi possível atualizar o link. Tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      isOpen={true}
      onClose={closeEditLinkModal}
      title="Editar link"
      description="Atualize as informações do link."
    >
      <form onSubmit={updateLink} className="space-y-3">
        <Input
          icon={<Tag className="size-5" />}
          name="title"
          placeholder="Título do link"
          defaultValue={link.title}
        />

        <Input
          icon={<Link2 className="size-5" />}
          type="url"
          name="url"
          placeholder="URL"
          defaultValue={link.url}
        />

        <Button type="submit" variant="primary" size="full" disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar alterações'}
        </Button>
      </form>
    </Modal>
  );
}