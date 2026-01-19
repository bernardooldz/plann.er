import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";
import { authMiddleware } from "../lib/auth-middleware";

export async function unconfirmParticipantSelf(app: FastifyInstance) {
  app.patch("/participants/:participantId/unconfirm-self", {
    preHandler: [authMiddleware]
  }, async (request) => {
    const paramsSchema = z.object({
      participantId: z.string().uuid(),
    });

    const { participantId } = paramsSchema.parse(request.params);
    const userId = request.user.id;

    const participant = await prisma.participant.findUnique({
      where: { id: participantId },
    });

    if (!participant) {
      throw new ClientError("Participant not found.");
    }

    // Check if user owns this participant record
    if (participant.user_id !== userId) {
      throw new ClientError("You can only unconfirm your own participation.");
    }

    const updatedParticipant = await prisma.participant.update({
      where: { id: participantId },
      data: { is_confirmed: false },
    });

    return { participant: updatedParticipant };
  });
}