import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";
import { ClientError } from "../errors/client-error";
import { authMiddleware } from "../lib/auth-middleware";
import { tripParticipantMiddleware } from "../lib/trip-participant-middleware";

export async function updateActivity(app: FastifyInstance) {
  app.put("/trips/:tripId/activities/:activityId", {
    preHandler: [authMiddleware, tripParticipantMiddleware]
  }, async (request) => {
    const paramsSchema = z.object({
      tripId: z.string().uuid(),
      activityId: z.string().uuid(),
    });
    const bodySchema = z.object({
      title: z.string().min(4),
      occurs_at: z.coerce.date(),
    });

    const { tripId, activityId } = paramsSchema.parse(request.params);
    const { title, occurs_at } = bodySchema.parse(request.body);
    const userId = request.user.id;

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      throw new ClientError("Trip not found.");
    }

    const activity = await prisma.activity.findUnique({
      where: { id: activityId },
    });

    if (!activity || activity.trip_id !== tripId) {
      throw new ClientError("Activity not found.");
    }

    // Check permissions: temporarily allow all users until migration
    // if (activity.created_by !== userId && trip.owner_id !== userId) {
    //   throw new ClientError("You don't have permission to edit this activity.");
    // }

    if (dayjs(occurs_at).isBefore(trip.starts_at)) {
      throw new ClientError("Invalid activity date.");
    }

    if (dayjs(occurs_at).isAfter(trip.ends_at)) {
      throw new ClientError("Invalid activity date.");
    }

    const updatedActivity = await prisma.activity.update({
      where: { id: activityId },
      data: {
        title,
        occurs_at,
      },
    });

    return { activity: updatedActivity };
  });
}