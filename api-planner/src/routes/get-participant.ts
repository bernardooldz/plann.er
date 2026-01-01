import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";

export async function getParticipant(app: FastifyInstance) {
  app.get("/participants/:participantId", async (request) => {
    const getTripParamsSchema = z.object({
      participantId: z.string().uuid(),
    });

    const { participantId } = getTripParamsSchema.parse(request.params);

    const participant = await prisma.participant.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        is_confirmed: true,
      },
      where: { id: participantId },
    });

    if (!participant) {
      throw new ClientError("Trip not found.");
    }

    return { participant };
  });
}
