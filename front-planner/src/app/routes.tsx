import { createBrowserRouter } from 'react-router-dom'
import { CreateTripPage } from '../features/trips/pages/CreateTripPage'
import { TripDetailsPage } from '../features/trips/pages/TripDetailsPage'
import { ConfirmParticipantPage } from '../features/trips/pages/ConfirmParticipantPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateTripPage />
  },
  {
    path: '/trips/:tripId',
    element: <TripDetailsPage />
  },
  {
    path: '/participants/:participantId/confirm',
    element: <ConfirmParticipantPage />
  }
])