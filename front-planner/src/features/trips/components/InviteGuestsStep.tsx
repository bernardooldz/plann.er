import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../design-system";

interface InviteGuestsStepProps {
  openGuestsModal: () => void;
  createTrip: () => void;
  emailsToInvite: string[];
  loading: boolean;
}

export function InviteGuestsStep({
  openGuestsModal,
  createTrip,
  emailsToInvite,
  loading,
}: InviteGuestsStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <button
        type="button"
        onClick={openGuestsModal}
        className="flex items-center gap-2 flex-1"
      >
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className="text-md text-zinc-100 flex-1 text-left">
            {emailsToInvite.length} pessoa(s) convidada(s)
          </span>
        ) : (
          <span className="text-md text-zinc-400 flex-1 text-left">
            Quem estará na viagem?
          </span>
        )}
      </button>

      <Button onClick={createTrip} disabled={loading}>
        {loading ? 'Criando...' : 'Confirmar viagem'}
        <ArrowRight className="size-5 text-lime-950" />
      </Button>
    </div>
  );
}
