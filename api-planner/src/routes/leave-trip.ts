import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";
import { authMiddleware } from "../lib/auth-middleware";
import { tripParticipantMiddleware } from "../lib/trip-participant-middleware";

export async function leaveTrip(app: FastifyInstance) {
  app.delete("/trips/:tripId/leave", {
    preHandler: [authMiddleware, tripParticipantMiddleware]
  }, async (request) => {
    const leaveTripParamsSchema = z.object({
      tripId: z.string().uuid(),
    });

    const { tripId } = leaveTripParamsSchema.parse(request.params);
    const userId = request.user.id;

    // Check if user is the trip owner
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      select: { owner_id: true }
    });

    if (!trip) {
      throw new ClientError("Trip not found.");
    }

    if (trip.owner_id === userId) {
      throw new ClientError("Trip owner cannot leave the trip. Delete the trip instead.");
    }

    // Find and remove the participant
    const participant = await prisma.participant.findFirst({
      where: {
        trip_id: tripId,
        email: request.user.email
      }
    });

    if (!participant) {
      throw new ClientError("You are not a participant of this trip.");
    }

    await prisma.participant.delete({
      where: { id: participant.id }
    });

    return { message: "Successfully left the trip." };
  });
}