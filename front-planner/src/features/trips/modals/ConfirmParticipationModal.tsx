import { CheckCircle2, CircleDashed, Loader2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal, useToast } from "../../../design-system";
import { api } from "../services/trips.service";

interface ConfirmParticipationModalProps {
  isConfirmed: boolean;
  participantId: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmParticipationModal({
  isConfirmed,
  participantId,
  onConfirm,
  onCancel,
}: ConfirmParticipationModalProps) {
  const { tripId } = useParams();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function handleConfirmation() {
    if (!tripId) return;

    setIsLoading(true);
    try {
      if (isConfirmed) {
        // Desconfirmar participação
        await api.patch(`/participants/${participantId}/unconfirm-self`);
        addToast({
          type: 'success',
          title: 'Participação cancelada',
          message: 'Sua participação foi cancelada.'
        });
      } else {
        // Confirmar participação
        await api.patch(`/participants/${participantId}/confirm-self`);
        addToast({
          type: 'success',
          title: 'Participação confirmada!',
          message: 'Sua participação foi confirmada com sucesso.'
        });
      }
      
      onConfirm();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro',
        message: 'Não foi possível alterar sua participação. Tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title={isConfirmed ? "Cancelar participação" : "Confirmar participação"}
      description={isConfirmed ? "Você deseja cancelar sua participação nesta viagem?" : "Você deseja confirmar sua participação nesta viagem?"}
    >
      <div className={`${isConfirmed ? 'bg-orange-900/20 border-orange-800' : 'bg-lime-900/20 border-lime-800'} border rounded-lg p-4`}>
        <div className="flex items-center gap-3">
          {isConfirmed ? (
            <CircleDashed className="size-5 text-orange-400" />
          ) : (
            <CheckCircle2 className="size-5 text-lime-400" />
          )}
          <div>
            <p className={`${isConfirmed ? 'text-orange-100' : 'text-lime-100'} font-medium`}>
              {isConfirmed 
                ? "Tem certeza que deseja cancelar sua participação?" 
                : "Tem certeza que deseja confirmar sua participação?"
              }
            </p>
            <p className={`${isConfirmed ? 'text-orange-300' : 'text-lime-300'} text-sm mt-1`}>
              {isConfirmed 
                ? "Você pode confirmar novamente a qualquer momento." 
                : "Você poderá cancelar a qualquer momento."
              }
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button 
          variant="secondary" 
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleConfirmation}
          disabled={isLoading}
          className={`flex-1 ${isConfirmed ? 'bg-orange-600 hover:bg-orange-700' : 'bg-lime-600 hover:bg-lime-700'} text-white`}
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {isConfirmed ? 'Cancelando...' : 'Confirmando...'}
            </>
          ) : (
            <>
              {isConfirmed ? (
                <>
                  <CircleDashed className="size-4" />
                  Cancelar participação
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-4" />
                  Confirmar participação
                </>
              )}
            </>
          )}
        </Button>
      </div>
    </Modal>
  );
}