import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "../modals/CreateActivityModal";
import { ImportantLinks } from "../components/ImportantLinks";
import { ActivitiesList } from "../components/ActivitiesList";
import { UpdateTripModal } from "../modals/UpdateTripModal";
import { CreateLinkModal } from "../modals/CreateLinkModal";
import { ManageGuestsModal } from "../modals/ManageGuestsModal";
import { GuestsList } from "../components/GuestsList";
import { TripHeader } from "../components/TripHeader";
import { Divider } from "../../../design-system";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);
  const [isUpdateTripModalOpen, setIsUpdateTripModalOpen] = useState(false);
  const [isManageGuestsModalOpen, setIsManageGuestsModalOpen] = useState(false);
  const [guestsKey, setGuestsKey] = useState(0);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true);
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false);
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

  function handleGuestsUpdated() {
    setGuestsKey((prev) => prev + 1);
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <TripHeader openUpdateTripModal={openUpdateTripModal} />

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

          <ActivitiesList />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks openCreateLinkModal={openCreateLinkModal} />

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
    </div>
  );
}
