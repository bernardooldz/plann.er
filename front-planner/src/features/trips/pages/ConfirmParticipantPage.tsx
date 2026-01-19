import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { api } from "../../../shared/utils/api";

export function ConfirmParticipantPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");
  const [tripData, setTripData] = useState<any>(null);

  useEffect(() => {
    async function loadTripData() {
      if (!tripId) {
        setStatus("error");
        setMessage("Link de convite inválido");
        return;
      }

      try {
        const response = await api.get(`/trips/${tripId}/public`);
        setTripData(response.data.trip);
        setStatus("success");
      } catch (error: any) {
        setStatus("error");
        if (error.response?.status === 404) {
          setMessage("Viagem não encontrada");
        } else {
          setMessage("Erro ao carregar informações da viagem");
        }
      }
    }

    if (!authLoading) {
      loadTripData();
    }
  }, [tripId, authLoading]);

  async function handleJoinTrip() {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setStatus("loading");
      await api.post(`/trips/${tripId}/join`);
      setMessage("Você foi adicionado à viagem com sucesso!");
      setTimeout(() => {
        navigate(`/trips/${tripId}`);
      }, 2000);
    } catch (error: any) {
      setStatus("error");
      if (error.response?.data?.message?.includes("already a participant")) {
        setMessage("Você já participa desta viagem!");
        setTimeout(() => {
          navigate(`/trips/${tripId}`);
        }, 2000);
      } else {
        setMessage("Erro ao participar da viagem. Tente novamente.");
      }
    }
  }

  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[url('/src/assets/bg.png')] bg-no-repeat bg-center bg-size-[900px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-300"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[url('/src/assets/bg.png')] bg-no-repeat bg-center bg-size-[900px]">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/src/assets/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convite para Viagem</p>
        </div>

        {status === "loading" && (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-300 mx-auto"></div>
            <p className="text-zinc-100">Processando...</p>
          </div>
        )}

        {status === "success" && tripData && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-zinc-100">
                Você foi convidado para a viagem:
              </h2>
              <p className="text-lime-300 text-xl font-medium">
                {tripData.destination}
              </p>
              <p className="text-zinc-400">
                {new Date(tripData.starts_at).toLocaleDateString("pt-BR")} até{" "}
                {new Date(tripData.ends_at).toLocaleDateString("pt-BR")}
              </p>
            </div>

            {user ? (
              <div className="space-y-4">
                <p className="text-zinc-300">
                  Olá, {user.name}! Deseja participar desta viagem?
                </p>
                <button
                  onClick={handleJoinTrip}
                  className="bg-lime-300 text-lime-950 rounded-lg px-6 py-3 font-medium hover:bg-lime-400 transition-colors"
                >
                  Sim, quero participar!
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-zinc-300">
                  Para participar desta viagem, você precisa fazer login ou
                  criar uma conta e depois acessar este link novamente.
                </p>
                <button
                  onClick={handleJoinTrip}
                  className="bg-lime-300 text-lime-950 rounded-lg px-6 py-3 font-medium hover:bg-lime-400 transition-colors"
                >
                  Fazer login / Criar conta
                </button>
              </div>
            )}
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-5 h-5 text-red-950"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <p className="text-red-400 font-medium">{message}</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium hover:bg-lime-400 transition-colors"
            >
              Ir para Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
