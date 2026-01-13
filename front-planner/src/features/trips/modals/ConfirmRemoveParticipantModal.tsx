import { X, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "../../../design-system/components/ui/button";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

interface ConfirmRemoveParticipantModalProps {
  participant: Participant;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ConfirmRemoveParticipantModal({
  participant,
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmRemoveParticipantModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-96 rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-red-400" />
              <h2 className="font-semibold text-lg">Remover participante</h2>
            </div>
            <button onClick={onCancel}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Tem certeza que deseja remover este participante da viagem?
          </p>
        </div>

        <div className="p-3 bg-zinc-800 rounded-lg">
          <div className="space-y-1">
            <span className="block font-medium text-zinc-100">
              {participant.name || "Participante"}
            </span>
            <span className="block text-sm text-zinc-400">
              {participant.email}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" size="full" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </Button>
          <Button size="full" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Removendo...
              </>
            ) : (
              "Remover"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
