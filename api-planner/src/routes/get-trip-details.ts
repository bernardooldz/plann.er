import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";
import { authMiddleware } from "../lib/auth-middleware";
import { tripParticipantMiddleware } from "../lib/trip-participant-middleware";

export async function getTripDetails(app: FastifyInstance) {
  app.get("/trips/:tripId", {
    preHandler: [authMiddleware, tripParticipantMiddleware]
  }, async (request) => {
    const getTripParamsSchema = z.object({
      tripId: z.string().uuid(),
    });

    const { tripId } = getTripParamsSchema.parse(request.params);
    const userId = request.user.id;

    const trip = await prisma.trip.findUnique({
      select: {
        id: true,
        destination: true,
        starts_at: true,
        ends_at: true,
        is_confirmed: true,
        owner_id: true,
      },
      where: { id: tripId },
    });

    if (!trip) {
      throw new ClientError("Trip not found.");
    }

    return { 
      trip: {
        ...trip,
        is_owner: trip.owner_id === userId
      }
    };
  });
}
