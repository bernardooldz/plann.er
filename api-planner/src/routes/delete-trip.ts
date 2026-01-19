import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";
import { authMiddleware } from "../lib/auth-middleware";
import { tripParticipantMiddleware } from "../lib/trip-participant-middleware";

export async function deleteTrip(app: FastifyInstance) {
  app.delete("/trips/:tripId", {
    preHandler: [authMiddleware, tripParticipantMiddleware]
  }, async (request) => {
    const deleteTripParamsSchema = z.object({
      tripId: z.string().uuid(),
    });

    const { tripId } = deleteTripParamsSchema.parse(request.params);
    const userId = request.user.id;

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      throw new ClientError("Trip not found.");
    }

    // Check if user is the trip owner
    if (trip.owner_id !== userId) {
      throw new ClientError("Only the trip owner can delete the trip.");
    }

    // Delete related records first
    await prisma.invitation.deleteMany({
      where: { trip_id: tripId }
    });
    
    await prisma.activity.deleteMany({
      where: { trip_id: tripId }
    });
    
    await prisma.link.deleteMany({
      where: { trip_id: tripId }
    });
    
    await prisma.participant.deleteMany({
      where: { trip_id: tripId }
    });

    await prisma.trip.delete({
      where: { id: tripId },
    });

    return { message: "Trip deleted successfully." };
  });
}