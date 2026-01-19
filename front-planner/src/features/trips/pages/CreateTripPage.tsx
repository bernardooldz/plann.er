import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "../modals/InviteGuestsModal";
import { DestinationAndDateStep } from "../components/DestinationAndDateStep";
import { InviteGuestsStep } from "../components/InviteGuestsStep";
import type { DateRange } from "react-day-picker";
import { api } from "../../../shared/utils/api";
import { useAuth } from "../../auth";

export function CreateTripPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [destination, setDestination] = useState("");
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [errors, setErrors] = useState({ destination: "", dates: "", general: "" });
  const [loading, setLoading] = useState(false);

  function validateForm() {
    const newErrors = { destination: "", dates: "", general: "" };
    
    if (!destination.trim()) {
      newErrors.destination = "Destino é obrigatório";
    } else if (destination.trim().length < 4) {
      newErrors.destination = "Destino deve ter pelo menos 4 caracteres";
    }
    
    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      newErrors.dates = "Datas de início e fim são obrigatórias";
    }
    
    setErrors(newErrors);
    return !newErrors.destination && !newErrors.dates;
  }

  function openGuestsInput() {
    if (!validateForm()) return;
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email || emailsToInvite.includes(email)) return;

    setEmailsToInvite([...emailsToInvite, email]);
    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string) {
    setEmailsToInvite(emailsToInvite.filter(email => email !== emailToRemove));
  }

  async function createTrip() {
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({ destination: "", dates: "", general: "" });

    try {
      const response = await api.post("/trips", {
        destination: destination.trim(),
        starts_at: eventStartAndEndDates!.from,
        ends_at: eventStartAndEndDates!.to,
        emails_to_invite: emailsToInvite,
      });

      navigate(`/trips/${response.data.tripId}`);
    } catch (err: any) {
      setErrors({ destination: "", dates: "", general: err.response?.data?.message || "Erro ao criar viagem" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[url('/src/assets/bg.png')] bg-no-repeat bg-center bg-size-[900px]">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/src/assets/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Crie sua nova viagem e convide seus amigos!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
            errors={errors}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              openGuestsModal={openGuestsModal}
              createTrip={createTrip}
              loading={loading}
            />
          )}
        </div>

        {errors.general && (
          <p className="text-red-400 text-sm">{errors.general}</p>
        )}

        <div className="flex items-center justify-center gap-2 text-sm text-zinc-500">
          <span>Organizador:</span>
          <span className="text-zinc-300">{user?.name}</span>
          <span>•</span>
          <span className="text-zinc-300">{user?.email}</span>
        </div>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal
          emailsToInvite={emailsToInvite}
          addNewEmailToInvite={addNewEmailToInvite}
          removeEmailFromInvites={removeEmailFromInvites}
          closeGuestsModal={closeGuestsModal}
        />
      )}
    </div>
  );
}
