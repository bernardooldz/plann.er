import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal, useToast } from "../../../design-system";
import { api } from "../services/trips.service";

interface Link {
  id: string;
  title: string;
  url: string;
}

interface DeleteLinkModalProps {
  link: Link;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteLinkModal({
  link,
  onConfirm,
  onCancel,
}: DeleteLinkModalProps) {
  const { tripId } = useParams();
  const { addToast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDeleteLink() {
    if (!tripId) return;

    setIsDeleting(true);
    try {
      await api.delete(`/trips/${tripId}/links/${link.id}`);
      
      addToast({
        type: 'success',
        title: 'Link excluído!',
        message: 'O link foi excluído com sucesso.'
      });
      
      onConfirm();
    } catch (error) {
      console.error('Erro ao excluir link:', error);
      addToast({
        type: 'error',
        title: 'Erro ao excluir',
        message: 'Não foi possível excluir o link. Tente novamente.'
      });
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title="Excluir link"
      description="Esta ação não pode ser desfeita."
    >
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Trash2 className="size-5 text-red-400" />
          <div>
            <p className="text-red-100 font-medium">
              Tem certeza que deseja excluir "{link.title}"?
            </p>
            <p className="text-red-300 text-sm mt-1">
              Este link será removido permanentemente.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button 
          variant="secondary" 
          onClick={onCancel}
          disabled={isDeleting}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleDeleteLink}
          disabled={isDeleting}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white"
        >
          {isDeleting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Excluindo...
            </>
          ) : (
            <>
              <Trash2 className="size-4" />
              Excluir
            </>
          )}
        </Button>
      </div>
    </Modal>
  );
}