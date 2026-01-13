import { X, User, Mail } from "lucide-react";
import type { FormEvent } from "react";
import { Button } from "../../../design-system/components/ui/button";

interface ConfrimTripModalProps {
  closeConfirmModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
}

export function ConfrimTripModal({
  closeConfirmModal,
  createTrip,
  setOwnerName,
  setOwnerEmail,
}: ConfrimTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-160 rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">
              Confirmar criação de viagem
            </h2>
            <button>
              <X className="size-5 text-zinc-400" onClick={closeConfirmModal} />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{" "}
            <strong className="text-zinc-100 fontsemibold">
              Rio de Janeiro - RJ, Brasil
            </strong>{" "}
            nas datas de{" "}
            <strong className="text-zinc-100 fontsemibold">
              16 a 27 de Agosto de 2024
            </strong>{" "}
            preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="px-4 flex items-center flex-1 h-14 bg-zinc-950 border border-zinc-800 rounded-lg gap-2">
            <User className="size-5 text-zinc-400" />
            <input
              type="text"
              name="name"
              placeholder="Seu nome completo"
              className="bg-transparent text-md placeholder-zinc-400 outline-none flex-1"
              onChange={(event) => setOwnerName(event.target.value)}
            />
          </div>

          <div className="px-4 flex items-center flex-1 h-14 bg-zinc-950 border border-zinc-800 rounded-lg gap-2">
            <Mail className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Seu email pessoal"
              className="bg-transparent text-md placeholder-zinc-400 outline-none flex-1"
              onChange={(event) => setOwnerEmail(event.target.value)}
            />
          </div>

          <Button type="submit" size="full">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  );
}
