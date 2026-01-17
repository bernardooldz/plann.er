import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { prisma } from './prisma'
import { ClientError } from '../errors/client-error'

export async function tripOwnerMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const tripParamsSchema = z.object({
    tripId: z.string().uuid()
  })

  const { tripId } = tripParamsSchema.parse(request.params)

  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    select: { owner_id: true }
  })

  if (!trip) {
    throw new ClientError('Viagem não encontrada')
  }

  if (trip.owner_id !== request.user?.id) {
    throw new ClientError('Acesso negado: você não é o dono desta viagem')
  }
}