import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";
import { ClientError } from "../errors/client-error";
import { authMiddleware } from "../lib/auth-middleware";
import { tripParticipantMiddleware } from "../lib/trip-participant-middleware";

export async function createActivity(app: FastifyInstance) {
  app.post("/trips/:tripId/activities", {
    preHandler: [authMiddleware, tripParticipantMiddleware]
  }, async (request) => {
    const getTripParamsSchema = z.object({
      tripId: z.string().uuid(),
    });
    const createTripSchema = z.object({
      title: z.string().min(4),
      occurs_at: z.coerce.date(),
    });

    const { tripId } = getTripParamsSchema.parse(request.params);
    const { title, occurs_at } = createTripSchema.parse(request.body);

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      throw new ClientError("Trip not found.");
    }

    if (dayjs(occurs_at).isBefore(trip.starts_at)) {
      throw new ClientError("Invalid activity date.");
    }

    if (dayjs(occurs_at).isAfter(trip.ends_at)) {
      throw new ClientError("Invalid activity date.");
    }

    const activity = await prisma.activity.create({
      data: {
        title,
        occurs_at,
        trip_id: tripId,
      },
    });

    return { activityId: activity.id };
  });
}
