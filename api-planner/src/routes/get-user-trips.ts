import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { authMiddleware } from '../lib/auth-middleware'

export async function getUserTrips(app: FastifyInstance) {
  app.get('/user/trips', {
    preHandler: [authMiddleware]
  }, async (request) => {
    const userId = request.user!.id

    const [ownedTrips, participatingTrips] = await Promise.all([
      // Viagens criadas pelo usuário
      prisma.trip.findMany({
        where: { owner_id: userId },
        select: {
          id: true,
          destination: true,
          starts_at: true,
          ends_at: true,
          is_confirmed: true,
          created_at: true,
          _count: {
            select: { participants: true }
          }
        },
        orderBy: { created_at: 'desc' }
      }),

      // Viagens onde o usuário é participante (mas não dono)
      prisma.trip.findMany({
        where: {
          participants: {
            some: {
              user_id: userId,
              is_owner: false
            }
          }
        },
        select: {
          id: true,
          destination: true,
          starts_at: true,
          ends_at: true,
          is_confirmed: true,
          created_at: true,
          owner: {
            select: { name: true, email: true }
          },
          _count: {
            select: { participants: true }
          }
        },
        orderBy: { created_at: 'desc' }
      })
    ])

    return {
      ownedTrips,
      participatingTrips
    }
  })
}