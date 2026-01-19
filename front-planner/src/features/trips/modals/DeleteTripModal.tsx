import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal, useToast } from "../../../design-system";
import { api } from "../services/trips.service";

interface DeleteTripModalProps {
  closeDeleteTripModal: () => void;
  tripDestination: string;
}

export function DeleteTripModal({
  closeDeleteTripModal,
  tripDestination,
}: DeleteTripModalProps) {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDeleteTrip() {
    if (!tripId) return;

    setIsDeleting(true);
    try {
      await api.delete(`/trips/${tripId}`);
      
      addToast({
        type: 'success',
        title: 'Viagem excluída!',
        message: 'A viagem foi excluída com sucesso.'
      });
      
      navigate('/dashboard');
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao excluir',
        message: 'Não foi possível excluir a viagem. Tente novamente.'
      });
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Modal
      isOpen={true}
      onClose={closeDeleteTripModal}
      title="Excluir viagem"
      description="Esta ação não pode ser desfeita. Todos os dados da viagem serão perdidos permanentemente."
    >
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Trash2 className="size-5 text-red-400" />
          <div>
            <p className="text-red-100 font-medium">
              Tem certeza que deseja excluir a viagem para {tripDestination}?
            </p>
            <p className="text-red-300 text-sm mt-1">
              Todos os participantes, atividades e links serão removidos.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button 
          variant="secondary" 
          onClick={closeDeleteTripModal}
          disabled={isDeleting}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleDeleteTrip}
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
              Excluir viagem
            </>
          )}
        </Button>
      </div>
    </Modal>
  );
}