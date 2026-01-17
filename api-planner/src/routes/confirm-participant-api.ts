import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";

export async function confirmParticipantApi(app: FastifyInstance) {
  app.patch("/participants/:participantId/confirm", async (request, reply) => {
    const getTripParamsSchema = z.object({
      participantId: z.string().uuid(),
    });

    const { participantId } = getTripParamsSchema.parse(request.params);

    const participant = await prisma.participant.findUnique({
      where: {
        id: participantId,
      },
    });

    if (!participant) {
      throw new ClientError("Participant not found");
    }

    if (participant.is_confirmed) {
      return reply.status(200).send({
        message: "Participant already confirmed",
        participant
      });
    }

    const updatedParticipant = await prisma.participant.update({
      where: { id: participantId },
      data: { is_confirmed: true },
    });

    return reply.status(200).send({
      message: "Participant confirmed successfully",
      participant: updatedParticipant
    });
  });
}