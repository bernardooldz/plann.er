import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";

export async function getParticipants(app: FastifyInstance) {
  app.get("/trips/:tripId/participants", async (request) => {
    const getTripParamsSchema = z.object({
      tripId: z.string().uuid(),
    });

    const { tripId } = getTripParamsSchema.parse(request.params);

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            email: true,
            is_confirmed: true,
          },
        },
      },
    });

    if (!trip) {
      throw new ClientError("Trip not found.");
    }

    return { participants: trip.participants };
  });
}
