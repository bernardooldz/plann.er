import { api } from './trips.service'

export interface Participant {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
  trip_id: string
}

export const participantsService = {
  async confirmParticipant(participantId: string) {
    const response = await api.patch(`/participants/${participantId}/confirm`)
    return response.data
  },

  async getParticipant(participantId: string) {
    const response = await api.get(`/participants/${participantId}`)
    return response.data.participant as Participant
  },

  async updateParticipant(participantId: string, name: string) {
    const response = await api.put(`/participants/${participantId}`, { name })
    return response.data.participant as Participant
  }
}