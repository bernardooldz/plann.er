import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";

export async function updateParticipant(app: FastifyInstance) {
  app.put("/participants/:participantId", async (request) => {
    const getParticipantParamsSchema = z.object({
      participantId: z.string().uuid(),
    });

    const updateParticipantBodySchema = z.object({
      name: z.string().min(1).optional(),
    });

    const { participantId } = getParticipantParamsSchema.parse(request.params);
    const { name } = updateParticipantBodySchema.parse(request.body);

    const participant = await prisma.participant.findUnique({
      where: { id: participantId },
    });

    if (!participant) {
      throw new ClientError("Participant not found");
    }

    const updatedParticipant = await prisma.participant.update({
      where: { id: participantId },
      data: { name },
    });

    return { participant: updatedParticipant };
  });
}