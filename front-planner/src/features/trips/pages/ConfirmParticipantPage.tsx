import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import { api } from '../../../shared/utils/api'
import logoImg from '../../../assets/logo.svg'
import bgImg from '../../../assets/bg.png'
import { MapPin, Calendar, CheckCircle, AlertCircle } from 'lucide-react'

export function ConfirmParticipantPage() {
  const { tripId } = useParams<{ tripId: string }>()
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [tripData, setTripData] = useState<any>(null)

  useEffect(() => {
    async function loadTripData() {
      if (!tripId) {
        setStatus('error')
        setMessage('Link de convite inválido')
        return
      }

      try {
        const response = await api.get(`/trips/${tripId}/public`)
        setTripData(response.data.trip)
        setStatus('success')
      } catch (error: any) {
        setStatus('error')
        if (error.response?.status === 404) {
          setMessage('Viagem não encontrada')
        } else {
          setMessage('Erro ao carregar informações da viagem')
        }
      }
    }

    if (!authLoading) {
      loadTripData()
    }
  }, [tripId, authLoading])

  async function handleJoinTrip() {
    if (!user) {
      navigate('/login');
      return
    }

    try {
      setStatus('loading')
      await api.post(`/trips/${tripId}/join`)
      setMessage('Você foi adicionado à viagem com sucesso!')
      setTimeout(() => {
        navigate(`/trips/${tripId}`)
      }, 2000)
    } catch (error: any) {
      setStatus('error')
      if (error.response?.data?.message?.includes('already a participant')) {
        setMessage('Você já participa desta viagem!')
        setTimeout(() => {
          navigate(`/trips/${tripId}`)
        }, 2000)
      } else {
        setMessage('Erro ao participar da viagem. Tente novamente.')
      }
    }
  }

  if (authLoading) {
    return (
      <div 
        className="h-screen flex items-center justify-center bg-zinc-950 bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-300"></div>
      </div>
    )
  }

  return (
    <div 
      className="h-screen flex items-center justify-center bg-zinc-950 bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src={logoImg} alt="plann.er" />
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-zinc-100">
              Convite para Viagem
            </h1>
            <p className="text-zinc-400">
              Você foi convidado para participar de uma aventura incrível!
            </p>
          </div>
        </div>

        <div className="bg-zinc-900 p-8 rounded-xl shadow-shape space-y-6">
          {status === 'loading' && (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-300 mx-auto"></div>
              <p className="text-zinc-100">Carregando informações da viagem...</p>
            </div>
          )}

          {status === 'success' && tripData && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-lime-300">
                  <MapPin className="h-5 w-5" />
                  <h2 className="text-2xl font-semibold text-zinc-100">
                    {tripData.destination}
                  </h2>
                </div>
                <div className="flex items-center justify-center gap-4 text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(tripData.starts_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <span>até</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(tripData.ends_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>
              
              {user ? (
                <div className="space-y-4">
                  <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-center gap-2 text-lime-300">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Logado como:</span>
                    </div>
                    <p className="text-lg font-medium text-zinc-100">
                      {user.name}
                    </p>
                    <p className="text-zinc-400 text-sm">
                      {user.email}
                    </p>
                  </div>
                  
                  <p className="text-zinc-300">
                    Deseja participar desta viagem?
                  </p>
                  <button 
                    onClick={handleJoinTrip}
                    className="bg-lime-300 text-lime-950 rounded-lg px-6 py-3 font-medium hover:bg-lime-400 transition-colors w-full"
                  >
                    Sim, quero participar!
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-center gap-2 text-amber-400">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Login necessário</span>
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      Para participar desta viagem, você precisa fazer login ou criar uma conta.
                      Após o login, acesse este link novamente para confirmar sua participação.
                    </p>
                  </div>
                  
                  <button 
                    onClick={handleJoinTrip}
                    className="bg-lime-300 text-lime-950 rounded-lg px-6 py-3 font-medium hover:bg-lime-400 transition-colors w-full"
                  >
                    Fazer login / Criar conta
                  </button>
                </div>
              )}
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-red-400">Ops! Algo deu errado</h3>
                <p className="text-zinc-300">{message}</p>
              </div>
              <button 
                onClick={() => navigate('/dashboard')}
                className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium hover:bg-lime-400 transition-colors"
              >
                Ir para Dashboard
              </button>
            </div>
          )}
        </div>
        
        <p className="text-zinc-500 text-sm">
          Plann.er - Planeje suas viagens de forma colaborativa
        </p>
      </div>
    </div>
  )
}