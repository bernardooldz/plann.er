import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";

export async function createLink(app: FastifyInstance) {
  app.post("/trips/:tripId/links", async (request) => {
    const getTripParamsSchema = z.object({
      tripId: z.string().uuid(),
    });
    const createTripSchema = z.object({
      title: z.string().min(4),
      url: z.string().url(),
    });

    const { tripId } = getTripParamsSchema.parse(request.params);
    const { title, url } = createTripSchema.parse(request.body);

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      throw new ClientError("Trip not found.");
    }
    
    const link = await prisma.link.create({
      data: {
        title,
        url,
        trip_id: tripId,
      },
    });

    return { linkId: link.id };
  });
}
