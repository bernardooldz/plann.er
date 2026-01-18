import { MapPin, Calendar, Settings2, Trash2, LogOut } from "lucide-react";
import { Button, Divider } from "../../../design-system";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/trips.service";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
  is_owner: boolean;
}

interface DestinationAndDateHeaderProps {
  openUpdateTripModal: () => void;
  openDeleteTripModal: () => void;
  openLeaveTripModal: () => void;
}

export function TripHeader({openUpdateTripModal, openDeleteTripModal, openLeaveTripModal} : DestinationAndDateHeaderProps) {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tripId) return;
    
    api.get(`/trips/${tripId}`)
      .then((response) => {
        setTrip(response.data.trip);
      })
      .catch((error) => {
        console.error('Erro ao carregar viagem:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tripId]);

  if (loading) {
    return (
      <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-center">
        <span className="text-zinc-400">Carregando...</span>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-center">
        <span className="text-zinc-400">Viagem não encontrada</span>
      </div>
    );
  }

  const displayedDate = format(new Date(trip.starts_at), "d' de 'LLL", { locale: ptBR })
    .concat(" até ")
    .concat(format(new Date(trip.ends_at), "d' de 'LLL", { locale: ptBR }));

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-sm text-zinc-100">{displayedDate}</span>
        </div>

        <Divider orientation="vertical" />

        <div className="flex items-center gap-2">
          {trip.is_owner ? (
            <>
              <Button 
                variant="secondary" 
                onClick={openUpdateTripModal}
                className="text-zinc-200 hover:text-zinc-100"
              >
                Alterar local/data
                <Settings2 className="size-5" />
              </Button>
              
              <Button 
                variant="secondary" 
                onClick={openDeleteTripModal}
                className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
              >
                <Trash2 className="size-5" />
              </Button>
            </>
          ) : (
            <Button 
              variant="secondary" 
              onClick={openLeaveTripModal}
              className="text-orange-400 hover:text-orange-300 hover:bg-orange-900/20"
            >
              Sair da viagem
              <LogOut className="size-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
