import { createBrowserRouter } from 'react-router-dom'
import { CreateTripPage } from '../features/trips/pages/CreateTripPage'
import { TripDetailsPage } from '../features/trips/pages/TripDetailsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateTripPage />
  },
  {
    path: '/trips/:tripId',
    element: <TripDetailsPage />
  }
])