import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";

export async function getTripPublic(app: FastifyInstance) {
  app.get("/trips/:tripId/public", async (request) => {
    const getTripParamsSchema = z.object({
      tripId: z.string().uuid(),
    });

    const { tripId } = getTripParamsSchema.parse(request.params);

    const trip = await prisma.trip.findUnique({
      select: {
        id: true,
        destination: true,
        starts_at: true,
        ends_at: true,
      },
      where: { id: tripId },
    });

    if (!trip) {
      throw new ClientError("Trip not found.");
    }

    return { trip };
  });
}