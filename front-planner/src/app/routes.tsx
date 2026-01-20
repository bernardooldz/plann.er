import { createBrowserRouter, Navigate } from 'react-router-dom'
import { CreateTripPage } from '../features/trips/pages/CreateTripPage'
import { TripDetailsPage } from '../features/trips/pages/TripDetailsPage'
import { ConfirmParticipantPage } from '../features/trips/pages/ConfirmParticipantPage'
import { LoginPage, RegisterPage, DashboardPage } from '../features/auth'
import { useAuth } from '../features/auth'
import { LandingPage } from '../pages/landing'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <div className="h-screen flex items-center justify-center text-zinc-400">Carregando...</div>
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <div className="h-screen flex items-center justify-center text-zinc-400">Carregando...</div>
  }
  
  return user ? <Navigate to="/dashboard" /> : <>{children}</>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/home',
    element: <LandingPage />
  },
  {
    path: '/login',
    element: <PublicRoute><LoginPage /></PublicRoute>
  },
  {
    path: '/register',
    element: <PublicRoute><RegisterPage /></PublicRoute>
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><DashboardPage /></ProtectedRoute>
  },
  {
    path: '/create-trip',
    element: <ProtectedRoute><CreateTripPage /></ProtectedRoute>
  },
  {
    path: '/trips/:tripId',
    element: <ProtectedRoute><TripDetailsPage /></ProtectedRoute>
  },
  {
    path: '/trips/:tripId/join',
    element: <ConfirmParticipantPage />
  }
])