import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";
import { authMiddleware } from "../lib/auth-middleware";
import { tripParticipantMiddleware } from "../lib/trip-participant-middleware";

export async function deleteActivity(app: FastifyInstance) {
  app.delete("/trips/:tripId/activities/:activityId", {
    preHandler: [authMiddleware, tripParticipantMiddleware]
  }, async (request) => {
    const paramsSchema = z.object({
      tripId: z.string().uuid(),
      activityId: z.string().uuid(),
    });

    const { tripId, activityId } = paramsSchema.parse(request.params);
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
    //   throw new ClientError("You don't have permission to delete this activity.");
    // }

    await prisma.activity.delete({
      where: { id: activityId },
    });

    return { message: "Activity deleted successfully." };
  });
}