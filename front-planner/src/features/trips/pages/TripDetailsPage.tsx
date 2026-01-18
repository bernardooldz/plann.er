import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CreateActivityModal } from "../modals/CreateActivityModal";
import { ImportantLinks } from "../components/ImportantLinks";
import { ActivitiesList } from "../components/ActivitiesList";
import { UpdateTripModal } from "../modals/UpdateTripModal";
import { CreateLinkModal } from "../modals/CreateLinkModal";
import { ManageGuestsModal } from "../modals/ManageGuestsModal";
import { DeleteTripModal } from "../modals/DeleteTripModal";
import { LeaveTripModal } from "../modals/LeaveTripModal";
import { GuestsList } from "../components/GuestsList";
import { TripHeader } from "../components/TripHeader";
import { Divider } from "../../../design-system";
import { api } from "../services/trips.service";

export function TripDetailsPage() {
  const { tripId } = useParams();
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);
  const [isUpdateTripModalOpen, setIsUpdateTripModalOpen] = useState(false);
  const [isManageGuestsModalOpen, setIsManageGuestsModalOpen] = useState(false);
  const [isDeleteTripModalOpen, setIsDeleteTripModalOpen] = useState(false);
  const [isLeaveTripModalOpen, setIsLeaveTripModalOpen] = useState(false);
  const [guestsKey, setGuestsKey] = useState(0);
  const [activitiesKey, setActivitiesKey] = useState(0);
  const [linksKey, setLinksKey] = useState(0);
  const [tripExists, setTripExists] = useState<boolean | null>(null);
  const [tripDestination, setTripDestination] = useState("");

  // Verificar se a viagem existe
  useEffect(() => {
    if (!tripId) return;
    
    api.get(`/trips/${tripId}`)
      .then((response) => {
        setTripExists(true);
        setTripDestination(response.data.trip.destination);
      })
      .catch((error) => {
        console.error('Erro ao verificar viagem:', error);
        setTripExists(false);
      });
  }, [tripId]);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
    setActivitiesKey(prev => prev + 1); // Refresh activities list
  }

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true);
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false);
    setLinksKey(prev => prev + 1); // Refresh links list
  }

  function openUpdateTripModal() {
    setIsUpdateTripModalOpen(true);
  }

  function closeUpdateTripModal() {
    setIsUpdateTripModalOpen(false);
  }

  function openManageGuestsModal() {
    setIsManageGuestsModalOpen(true);
  }

  function closeManageGuestsModal() {
    setIsManageGuestsModalOpen(false);
  }

  function openDeleteTripModal() {
    setIsDeleteTripModalOpen(true);
  }

  function closeDeleteTripModal() {
    setIsDeleteTripModalOpen(false);
  }

  function openLeaveTripModal() {
    setIsLeaveTripModalOpen(true);
  }

  function closeLeaveTripModal() {
    setIsLeaveTripModalOpen(false);
  }

  function handleGuestsUpdated() {
    setGuestsKey((prev) => prev + 1);
  }

  if (tripExists === null) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="text-zinc-400">Carregando viagem...</span>
      </div>
    );
  }

  if (tripExists === false) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-zinc-100 mb-2">Viagem não encontrada</h1>
          <p className="text-zinc-400">A viagem que você está procurando não existe ou você não tem permissão para acessá-la.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <TripHeader 
        openUpdateTripModal={openUpdateTripModal} 
        openDeleteTripModal={openDeleteTripModal}
        openLeaveTripModal={openLeaveTripModal}
      />

      <main className="flex gap-16 px-6">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <button
              onClick={openCreateActivityModal}
              className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
            >
              <Plus className="size-5 text-lime-950" />
              Cadastrar atividade
            </button>
          </div>

          <ActivitiesList key={activitiesKey} />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks key={linksKey} openCreateLinkModal={openCreateLinkModal} />

          <Divider />

          <GuestsList
            key={guestsKey}
            openManageGuestsModal={openManageGuestsModal}
          />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}

      {isCreateLinkModalOpen && (
        <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />
      )}

      {isUpdateTripModalOpen && (
        <UpdateTripModal closeUpdateTripModal={closeUpdateTripModal} />
      )}

      {isManageGuestsModalOpen && (
        <ManageGuestsModal
          closeManageGuestsModal={closeManageGuestsModal}
          onGuestsUpdated={handleGuestsUpdated}
        />
      )}

      {isDeleteTripModalOpen && (
        <DeleteTripModal
          closeDeleteTripModal={closeDeleteTripModal}
          tripDestination={tripDestination}
        />
      )}

      {isLeaveTripModalOpen && (
        <LeaveTripModal
          closeLeaveTripModal={closeLeaveTripModal}
          tripDestination={tripDestination}
        />
      )}
    </div>
  );
}
