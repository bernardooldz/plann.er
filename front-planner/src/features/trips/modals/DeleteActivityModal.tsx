import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal, useToast } from "../../../design-system";
import { api } from "../services/trips.service";

interface Activity {
  id: string;
  title: string;
  occurs_at: string;
}

interface DeleteActivityModalProps {
  activity: Activity;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteActivityModal({
  activity,
  onConfirm,
  onCancel,
}: DeleteActivityModalProps) {
  const { tripId } = useParams();
  const { addToast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDeleteActivity() {
    if (!tripId) return;

    setIsDeleting(true);
    try {
      await api.delete(`/trips/${tripId}/activities/${activity.id}`);
      
      addToast({
        type: 'success',
        title: 'Atividade excluída!',
        message: 'A atividade foi excluída com sucesso.'
      });
      
      onConfirm();
    } catch (error) {
      console.error('Erro ao excluir atividade:', error);
      addToast({
        type: 'error',
        title: 'Erro ao excluir',
        message: 'Não foi possível excluir a atividade. Tente novamente.'
      });
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title="Excluir atividade"
      description="Esta ação não pode ser desfeita."
    >
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Trash2 className="size-5 text-red-400" />
          <div>
            <p className="text-red-100 font-medium">
              Tem certeza que deseja excluir "{activity.title}"?
            </p>
            <p className="text-red-300 text-sm mt-1">
              Esta atividade será removida permanentemente.
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
          onClick={handleDeleteActivity}
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