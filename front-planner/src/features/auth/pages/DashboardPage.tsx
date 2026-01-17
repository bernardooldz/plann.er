import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Users, Plus, LogOut } from 'lucide-react'
import { Button } from '../../../design-system'
import { useAuth } from '../../../shared/contexts/auth-context'
import { api } from '../../../shared/utils/api'
import { dayjs } from '../../../shared/lib/dayjs'

interface Trip {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
  _count: { participants: number }
  owner?: { name: string; email: string }
}

interface UserTrips {
  ownedTrips: Trip[]
  participatingTrips: Trip[]
}

export function DashboardPage() {
  const [trips, setTrips] = useState<UserTrips>({ ownedTrips: [], participatingTrips: [] })
  const [loading, setLoading] = useState(true)
  const { user, logout } = useAuth()

  useEffect(() => {
    api.get('/user/trips')
      .then(response => setTrips(response.data))
      .finally(() => setLoading(false))
  }, [])

  const formatDate = (date: string) => {
    return dayjs(date).format('DD [de] MMM')
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-950">
        <div className="text-zinc-400">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/src/assets/logo-icon.png" alt="plann.er" className="size-6" />
          <span className="text-zinc-100 font-semibold">Olá, {user?.name}!</span>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/create-trip">
            <Button>
              <Plus className="size-5" />
              Nova viagem
            </Button>
          </Link>
          <Button variant="secondary" onClick={logout}>
            <LogOut className="size-5" />
            Sair
          </Button>
        </div>
      </div>

      <main className="flex gap-16 px-6">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Minhas viagens</h2>
          </div>

          <div className="space-y-6">
            {trips.ownedTrips.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-zinc-400 mb-4">Você ainda não criou nenhuma viagem</p>
                <Link to="/create-trip">
                  <Button>
                    <Plus className="size-5" />
                    Criar primeira viagem
                  </Button>
                </Link>
              </div>
            ) : (
              trips.ownedTrips.map(trip => (
                <Link key={trip.id} to={`/trips/${trip.id}`}>
                  <div className="bg-zinc-900 p-4 rounded-xl hover:bg-zinc-800 transition-colors shadow-shape">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="size-5 text-zinc-400" />
                        <span className="text-zinc-100 font-medium">{trip.destination}</span>
                      </div>
                      <div className="flex items-center gap-5">
                        <div className="flex items-center gap-2">
                          <Calendar className="size-5 text-zinc-400" />
                          <span className="text-sm text-zinc-100">
                            {formatDate(trip.starts_at)} - {formatDate(trip.ends_at)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="size-5 text-zinc-400" />
                          <span className="text-sm text-zinc-100">{trip._count.participants}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          trip.is_confirmed 
                            ? 'bg-lime-300/10 text-lime-300' 
                            : 'bg-yellow-300/10 text-yellow-300'
                        }`}>
                          {trip.is_confirmed ? 'Confirmada' : 'Pendente'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="w-80 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Participando</h2>
            <div className="space-y-3">
              {trips.participatingTrips.length === 0 ? (
                <p className="text-zinc-400 text-sm">Você não está participando de nenhuma viagem</p>
              ) : (
                trips.participatingTrips.map(trip => (
                  <Link key={trip.id} to={`/trips/${trip.id}`}>
                    <div className="bg-zinc-900 p-3 rounded-xl hover:bg-zinc-800 transition-colors shadow-shape">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="size-4 text-zinc-400" />
                          <span className="text-zinc-100 font-medium text-sm">{trip.destination}</span>
                        </div>
                        <p className="text-zinc-400 text-xs">
                          Organizada por {trip.owner?.name}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Calendar className="size-4 text-zinc-400" />
                            <span className="text-xs text-zinc-400">
                              {formatDate(trip.starts_at)}
                            </span>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs ${
                            trip.is_confirmed 
                              ? 'bg-lime-300/10 text-lime-300' 
                              : 'bg-yellow-300/10 text-yellow-300'
                          }`}>
                            {trip.is_confirmed ? 'Confirmada' : 'Pendente'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}