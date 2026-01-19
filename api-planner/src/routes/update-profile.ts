import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { hashPassword, comparePassword } from '../lib/auth'
import { authMiddleware } from '../lib/auth-middleware'
import { ClientError } from '../errors/client-error'

export async function updateProfile(app: FastifyInstance) {
  app.put('/auth/profile', {
    preHandler: [authMiddleware]
  }, async (request) => {
    const updateProfileSchema = z.object({
      name: z.string().min(1).optional(),
      email: z.string().email().optional(),
      currentPassword: z.string().optional(),
      newPassword: z.string().min(6).optional()
    })

    const { name, email, currentPassword, newPassword } = updateProfileSchema.parse(request.body)
    const userId = request.user!.id

    // Se está alterando senha, validar senha atual
    if (newPassword && currentPassword) {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      })

      if (!user) {
        throw new ClientError('Usuário não encontrado')
      }

      const isPasswordValid = await comparePassword(currentPassword, user.password)
      if (!isPasswordValid) {
        throw new ClientError('Senha atual incorreta')
      }
    }

    // Preparar dados para atualização
    const updateData: any = {}
    
    if (name) updateData.name = name
    if (email) updateData.email = email
    if (newPassword) updateData.password = await hashPassword(newPassword)

    // Atualizar usuário
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true
      }
    })

    return { user: updatedUser }
  })
}