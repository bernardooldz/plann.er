import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";
import { env } from "../env";

export async function confirmParticipants(app: FastifyInstance) {
  app.get("/participants/:participantId/confirm", async (request, reply) => {
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

    // Redireciona para o frontend que vai lidar com a confirmação
    return reply.redirect(
      `${env.WEB_BASE_URL}/participants/${participantId}/confirm`
    );
  });
}
