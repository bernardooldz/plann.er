import { useState } from 'react'
import { type Trip } from '../types'

export const useTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading] = useState(false)

  return { trips, loading, setTrips }
}