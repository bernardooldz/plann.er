import { Calendar, MapPin, X } from "lucide-react";
import { Button } from "../../../design-system/components/ui/button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/trips.service";
import { DayPicker, type DateRange } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import "../styles/date-picker.css";

interface UpdateTripModalProps {
  closeUpdateTripModal: () => void;
}

export function UpdateTripModal({ closeUpdateTripModal }: UpdateTripModalProps) {
  const { tripId } = useParams();
  const [destination, setDestination] = useState("");
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  useEffect(() => {
    api.get(`/trips/${tripId}`)
      .then((response: { data: { trip: { destination: string; starts_at: string; ends_at: string } } }) => {
      const tripData = response.data.trip;
      setDestination(tripData.destination);
      setEventStartAndEndDates({
        from: new Date(tripData.starts_at),
        to: new Date(tripData.ends_at)
      });
    });
  }, [tripId]);

  async function updateTrip() {
    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return;
    }

    await api.put(`/trips/${tripId}`, {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
    });

    window.document.location.reload();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-160 rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Atualizar viagem - Alterar local/data</h2>
            <button>
              <X
                className="size-5 text-zinc-400"
                onClick={closeUpdateTripModal}
              />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Modifique o local e/ou a data da viagem. Todos os participantes serão informados sobre essas atualizações.
          </p>
        </div>

        <div className="space-y-3">
          <div className="px-4 flex items-center flex-1 h-14 bg-zinc-950 border border-zinc-800 rounded-lg gap-2">
            <MapPin className="size-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Para onde você vai?"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              className="bg-transparent text-md placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <button
            onClick={() => setIsDatePickerOpen(true)}
            className="px-4 flex items-center w-full h-14 bg-zinc-950 border border-zinc-800 rounded-lg gap-2 text-left"
          >
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-md text-zinc-400 flex-1">
              {eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
                ? format(eventStartAndEndDates.from, "d' de 'LLL")
                    .concat(" até ")
                    .concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
                : "Quando?"}
            </span>
          </button>

          <Button onClick={updateTrip} variant="primary" size="full">
            Salvar atualizações
          </Button>
        </div>

        {isDatePickerOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg">Selecione a data</h2>
                  <button onClick={() => setIsDatePickerOpen(false)}>
                    <X className="size-5 text-zinc-400" />
                  </button>
                </div>
              </div>

              <DayPicker
                mode="range"
                selected={eventStartAndEndDates}
                onSelect={setEventStartAndEndDates}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
