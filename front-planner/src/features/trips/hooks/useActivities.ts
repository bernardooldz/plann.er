import { useState } from 'react'
import { type Activity } from '../types'

export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading] = useState(false)

  // Hook implementation will be completed later
  return { activities, loading, setActivities }
}