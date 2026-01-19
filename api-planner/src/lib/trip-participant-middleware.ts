import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { prisma } from './prisma'
import { ClientError } from '../errors/client-error'

export async function tripParticipantMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const tripParamsSchema = z.object({
    tripId: z.string().uuid()
  })

  const { tripId } = tripParamsSchema.parse(request.params)

  const participant = await prisma.participant.findFirst({
    where: { 
      trip_id: tripId,
      user_id: request.user?.id
    }
  })

  if (!participant) {
    throw new ClientError('Acesso negado: você não é participante desta viagem')
  }
}