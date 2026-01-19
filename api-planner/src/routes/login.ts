import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { comparePassword, generateToken } from '../lib/auth'
import { ClientError } from '../errors/client-error'

export async function login(app: FastifyInstance) {
  app.post('/auth/login', async (request) => {
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string().min(1)
    })

    const { email, password } = loginSchema.parse(request.body)

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      throw new ClientError('Email ou senha inválidos')
    }

    const isPasswordValid = await comparePassword(password, user.password)

    if (!isPasswordValid) {
      throw new ClientError('Email ou senha inválidos')
    }

    const token = generateToken(user.id)

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at
      },
      token
    }
  })
}