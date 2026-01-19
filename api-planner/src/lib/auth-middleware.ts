import { FastifyRequest, FastifyReply } from 'fastify'
import { verifyToken } from '../lib/auth'
import { prisma } from '../lib/prisma'

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      id: string
      name: string
      email: string
    }
  }
}

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization
    
    if (!authHeader) {
      return reply.status(401).send({ error: 'Token não fornecido' })
    }

    const token = authHeader.replace('Bearer ', '')
    const { userId } = verifyToken(token)

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true }
    })

    if (!user) {
      return reply.status(401).send({ error: 'Usuário não encontrado' })
    }

    request.user = user
  } catch (error) {
    return reply.status(401).send({ error: 'Token inválido' })
  }
}