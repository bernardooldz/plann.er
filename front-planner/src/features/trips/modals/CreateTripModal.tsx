import { Calendar, MapPin } from "lucide-react";
import { Button, Input, Modal, useToast } from "../../../design-system";
import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../shared/utils/api";

interface CreateTripModalProps {
  closeCreateTripModal: () => void;
}

export function CreateTripModal({ closeCreateTripModal }: CreateTripModalProps) {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData(event.currentTarget);
    const destination = data.get("destination")?.toString();
    const starts_at = data.get("starts_at")?.toString();
    const ends_at = data.get("ends_at")?.toString();

    if (!destination || !starts_at || !ends_at) {
      addToast({
        type: 'error',
        title: 'Campos obrigatórios',
        message: 'Preencha todos os campos para criar a viagem.'
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/trips", {
        destination,
        starts_at,
        ends_at,
        emails_to_invite: [],
      });

      addToast({
        type: 'success',
        title: 'Viagem criada!',
        message: 'Sua viagem foi criada com sucesso.'
      });

      navigate(`/trips/${response.data.tripId}`);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao criar viagem',
        message: 'Não foi possível criar a viagem. Tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      isOpen={true}
      onClose={closeCreateTripModal}
      title="Criar nova viagem"
      description="Defina o destino e as datas da sua viagem."
    >
      <form onSubmit={createTrip} className="space-y-3">
        <Input
          icon={<MapPin className="size-5" />}
          name="destination"
          placeholder="Para onde você vai?"
          required
        />

        <Input
          icon={<Calendar className="size-5" />}
          type="date"
          name="starts_at"
          placeholder="Data de início"
          required
        />

        <Input
          icon={<Calendar className="size-5" />}
          type="date"
          name="ends_at"
          placeholder="Data de término"
          required
        />

        <Button type="submit" variant="primary" size="full" disabled={isLoading}>
          {isLoading ? 'Criando...' : 'Criar viagem'}
        </Button>
      </form>
    </Modal>
  );
}