import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";
import { ClientError } from "../errors/client-error";

export async function updateTrip(app: FastifyInstance) {
  app.put("/trips/:tripId", async (request) => {
    const getTripParamsSchema = z.object({
      tripId: z.string().uuid(),
    });
    const createTripSchema = z.object({
      destination: z.string().min(4),
      starts_at: z.coerce.date(),
      ends_at: z.coerce.date(),
    });

    const { tripId } = getTripParamsSchema.parse(request.params);
    const { destination, starts_at, ends_at } = createTripSchema.parse(
      request.body
    );

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      throw new ClientError("Trip not found.");
    }

    if (dayjs(starts_at).isBefore(new Date())) {
      throw new ClientError("Invalid trip start date.");
    }

    if (dayjs(ends_at).isBefore(starts_at)) {
      throw new ClientError("Invalid trip end date.");
    }

    await prisma.trip.update({
      where: { id: tripId },
      data: {
        destination,
        starts_at,
        ends_at,
      },
    });

    return { tripId: trip.id };
  });
}
