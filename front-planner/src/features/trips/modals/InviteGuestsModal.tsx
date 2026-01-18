import { X, AtSign, Plus, Link2, Copy } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { Button, Input, Divider } from "../../../design-system";

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
  const [linkCopied, setLinkCopied] = useState(false);
  const inviteLink = `${window.location.origin}/join-trip/abc123`;

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar link:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-160 rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <button onClick={closeGuestsModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Os convidados irão receber um email para confirmar a participação na viagem.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="py-1.5 px-2.5 rounded-md bg-lime-300/10 border border-lime-300/20 flex items-center gap-2">
            <span className="text-lime-300 text-sm">Você (organizador)</span>
          </div>
          {emailsToInvite.map((email) => (
            <div
              key={email}
              className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
            >
              <span className="text-zinc-300">{email}</span>
              <button
                type="button"
                onClick={() => removeEmailFromInvites(email)}
              >
                <X className="size-4 text-zinc-400" />
              </button>
            </div>
          ))}
        </div>

        <Divider />

        <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between gap-2">
          <Input
            icon={<AtSign className="size-5" />}
            type="email"
            name="email"
            placeholder="Digite o email do convidado"
            containerClassName="border-0 p-0 h-auto flex-1"
          />
          <Button type="submit" className="ml-auto">
            Convidar
            <Plus className="size-5 text-lime-950" />
          </Button>
        </form>

        <Divider />

        <div className="bg-zinc-800/50 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link2 className="size-4 text-zinc-400" />
              <span className="text-md text-zinc-300">Compartilhar link da viagem</span>
            </div>
            <Button 
              variant="secondary" 
              onClick={copyInviteLink}
              size="default"
            >
              <Copy className="size-4" />
              {linkCopied ? 'Copiado!' : 'Copiar'}
            </Button>
          </div>
          <p className="text-sm text-zinc-500 ">
            Qualquer pessoa com este link pode se juntar à viagem
          </p>
        </div>
      </div>
    </div>
  );
}