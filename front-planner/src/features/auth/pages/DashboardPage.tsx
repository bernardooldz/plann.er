import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Plus,
  LogOut,
  User,
  Edit,
} from "lucide-react";
import { Button } from "../../../design-system";
import { useAuth } from '../hooks/useAuth';
import { api } from "../../../shared/utils/api";
import { dayjs } from "../../../shared/lib/dayjs";
import { EditProfileModal } from "../modals/EditProfileModal";
import { CreateTripModal } from "../../trips/modals/CreateTripModal";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
  _count: { participants: number };
  owner?: { name: string; email: string };
}

interface UserTrips {
  ownedTrips: Trip[];
  participatingTrips: Trip[];
}

export function DashboardPage() {
  const [trips, setTrips] = useState<UserTrips>({
    ownedTrips: [],
    participatingTrips: [],
  });
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateTripModalOpen, setIsCreateTripModalOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    api
      .get("/user/trips")
      .then((response) => setTrips(response.data))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (date: string) => {
    return dayjs(date).format("DD [de] MMM");
  };

  const allTrips = [...trips.ownedTrips, ...trips.participatingTrips];

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-950">
        <div className="text-zinc-400">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/src/assets/logo-icon.png"
            alt="plann.er"
            className="size-6"
          />
          <span className="text-zinc-100 font-semibold">
            Dashboard - {user?.name}
          </span>
        </div>

        <Button variant="secondary" onClick={logout}>
          <LogOut className="size-5" />
          Sair
        </Button>
      </div>

      <main className="flex gap-16 px-6">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Minhas viagens</h2>
            <button 
              onClick={() => setIsCreateTripModalOpen(true)}
              className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
            >
                <Plus className="size-5 text-lime-950" />
                Nova viagem
              </button>
          </div>

          <div className="space-y-6">
            {allTrips.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-zinc-400 mb-4">
                  Você ainda não tem nenhuma viagem
                </p>
              </div>
            ) : (
              allTrips.map((trip) => {
                const isOwner = trips.ownedTrips.some((t) => t.id === trip.id);
                return (
                  <Link key={trip.id} to={`/trips/${trip.id}`}>
                    <div className="bg-zinc-900 p-4 rounded-xl hover:bg-zinc-800 transition-colors shadow-shape mb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="size-5 text-zinc-400" />
                          <span className="text-zinc-100 font-medium">
                            {trip.destination}
                          </span>
                          {!isOwner && (
                            <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded">
                              Participante
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-5">
                          <div className="flex items-center gap-2">
                            <Calendar className="size-5 text-zinc-400" />
                            <span className="text-sm text-zinc-100">
                              {formatDate(trip.starts_at)} -{" "}
                              {formatDate(trip.ends_at)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="size-5 text-zinc-400" />
                            <span className="text-sm text-zinc-100">
                              {trip._count.participants}
                            </span>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-lg text-xs font-medium ${
                              trip.is_confirmed
                                ? "bg-lime-300/10 text-lime-300"
                                : "bg-yellow-300/10 text-yellow-300"
                            }`}
                          >
                            {trip.is_confirmed ? "Confirmada" : "Pendente"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        <div className="w-80 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Meus dados</h2>
            <div className="bg-zinc-900 p-4 rounded-xl shadow-shape space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-lime-300/10 rounded-full flex items-center justify-center">
                  <User className="size-6 text-lime-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-100">{user?.name}</h3>
                  <p className="text-sm text-zinc-400">{user?.email}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Membro desde:</span>
                  <span className="text-zinc-100">
                    {dayjs().format("MMMM")} de {dayjs().format("YYYY")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Viagens criadas:</span>
                  <span className="text-zinc-100">
                    {trips.ownedTrips.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Participando:</span>
                  <span className="text-zinc-100">
                    {trips.participatingTrips.length + trips.ownedTrips.length}
                  </span>
                </div>
              </div>

              <Button
                variant="secondary"
                size="full"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Edit className="size-4" />
                Editar dados
              </Button>
            </div>
          </div>
        </div>
      </main>

      {isEditModalOpen && (
        <EditProfileModal closeModal={() => setIsEditModalOpen(false)} />
      )}

      {isCreateTripModalOpen && (
        <CreateTripModal closeCreateTripModal={() => setIsCreateTripModalOpen(false)} />
      )}
    </div>
  );
}
