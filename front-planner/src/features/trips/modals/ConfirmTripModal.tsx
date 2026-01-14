import { User, Mail } from "lucide-react";
import type { FormEvent } from "react";
import { Button, Input, Modal } from "../../../design-system";

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
    <Modal
      isOpen={true}
      onClose={closeConfirmModal}
      title="Confirmar criação de viagem"
      description="Para concluir a criação da viagem preencha seus dados abaixo:"
    >
      <form onSubmit={createTrip} className="space-y-3">
        <Input
          icon={<User className="size-5" />}
          type="text"
          name="name"
          placeholder="Seu nome completo"
          onChange={(event) => setOwnerName(event.target.value)}
        />

        <Input
          icon={<Mail className="size-5" />}
          type="email"
          name="email"
          placeholder="Seu email pessoal"
          onChange={(event) => setOwnerEmail(event.target.value)}
        />

        <Button type="submit" size="full">
          Confirmar criação da viagem
        </Button>
      </form>
    </Modal>
  );
}
