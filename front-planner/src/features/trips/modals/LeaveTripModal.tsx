import { LogOut, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal, useToast } from "../../../design-system";
import { api } from "../services/trips.service";

interface LeaveTripModalProps {
  closeLeaveTripModal: () => void;
  tripDestination: string;
}

export function LeaveTripModal({
  closeLeaveTripModal,
  tripDestination,
}: LeaveTripModalProps) {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isLeaving, setIsLeaving] = useState(false);

  async function handleLeaveTrip() {
    if (!tripId) return;

    setIsLeaving(true);
    try {
      await api.delete(`/trips/${tripId}/leave`);
      
      addToast({
        type: 'success',
        title: 'Você saiu da viagem!',
        message: 'Você foi removido da viagem com sucesso.'
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao sair da viagem:', error);
      addToast({
        type: 'error',
        title: 'Erro ao sair',
        message: 'Não foi possível sair da viagem. Tente novamente.'
      });
    } finally {
      setIsLeaving(false);
    }
  }

  return (
    <Modal
      isOpen={true}
      onClose={closeLeaveTripModal}
      title="Sair da viagem"
      description="Você será removido da viagem e não receberá mais notificações sobre ela."
    >
      <div className="bg-orange-900/20 border border-orange-800 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <LogOut className="size-5 text-orange-400" />
          <div>
            <p className="text-orange-100 font-medium">
              Tem certeza que deseja sair da viagem para {tripDestination}?
            </p>
            <p className="text-orange-300 text-sm mt-1">
              Você pode ser convidado novamente pelo organizador.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button 
          variant="secondary" 
          onClick={closeLeaveTripModal}
          disabled={isLeaving}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleLeaveTrip}
          disabled={isLeaving}
          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
        >
          {isLeaving ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saindo...
            </>
          ) : (
            <>
              <LogOut className="size-4" />
              Sair da viagem
            </>
          )}
        </Button>
      </div>
    </Modal>
  );
}