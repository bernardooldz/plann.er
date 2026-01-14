import { X, AtSign, Plus } from "lucide-react";
import type { FormEvent } from "react";
import { Button, Input, Divider, Modal } from "../../../design-system";

interface InviteGuestsModalProps {
  closeGuestsModal: () => void;
  emailsToInvite: string[];
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
  removeEmailFromInvites: (email: string) => void;
}

export function InviteGuestsModal({
  addNewEmailToInvite,
  closeGuestsModal,
  emailsToInvite,
  removeEmailFromInvites,
}: InviteGuestsModalProps) {
  return (
    <Modal
      isOpen={true}
      onClose={closeGuestsModal}
      title="Selecionar candidatos"
      description="Os candidatos irão receber um email para confirmar a participação na viagem."
    >
      <div className="flex flex-wrap gap-2">
        {emailsToInvite.map((email) => {
          return (
            <div
              key={email}
              className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-8"
            >
              <span className="text-zinc-300">{email}</span>
              <button
                type="button"
                onClick={() => removeEmailFromInvites(email)}
              >
                <X className="size-4 text-zinc-400" />
              </button>
            </div>
          );
        })}
      </div>

      <Divider />

      <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
        <Input
          icon={<AtSign className="size-5" />}
          type="email"
          name="email"
          placeholder="Digite o email do convidado"
          containerClassName="border-0 p-0 h-auto"
        />

        <Button type="submit">
          Convidar
          <Plus className="size-5 text-lime-950" />
        </Button>
      </form>
    </Modal>
  );
}