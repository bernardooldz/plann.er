import { useState } from 'react'
import { type Trip } from '../types'

export const useTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading] = useState(false)

  // Hook implementation will be completed later
  return { trips, loading, setTrips }
}