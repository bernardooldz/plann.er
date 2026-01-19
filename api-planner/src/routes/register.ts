import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { hashPassword, generateToken } from '../lib/auth'
import { ClientError } from '../errors/client-error'

export async function register(app: FastifyInstance) {
  app.post('/auth/register', async (request) => {
    const registerSchema = z.object({
      name: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(6),
      confirmPassword: z.string().min(6)
    })

    const { name, email, password, confirmPassword } = registerSchema.parse(request.body)

    if (password !== confirmPassword) {
      throw new ClientError('Senhas não coincidem')
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      throw new ClientError('Email já está em uso')
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true
      }
    })

    const token = generateToken(user.id)

    return { user, token }
  })
}