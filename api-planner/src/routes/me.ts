import { FastifyInstance } from 'fastify'
import { authMiddleware } from '../lib/auth-middleware'

export async function me(app: FastifyInstance) {
  app.get('/auth/me', {
    preHandler: [authMiddleware]
  }, async (request) => {
    return { user: request.user }
  })
}