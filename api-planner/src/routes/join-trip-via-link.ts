import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";
import { authMiddleware } from "../lib/auth-middleware";

export async function joinTripViaLink(app: FastifyInstance) {
  app.post("/trips/:tripId/join", {
    preHandler: [authMiddleware]
  }, async (request) => {
    const paramsSchema = z.object({
      tripId: z.string().uuid(),
    });

    const { tripId } = paramsSchema.parse(request.params);
    const userId = request.user.id;
    const userEmail = request.user.email;

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      throw new ClientError("Trip not found.");
    }

    // Check if user is already a participant
    const existingParticipant = await prisma.participant.findFirst({
      where: {
        trip_id: tripId,
        user_id: userId,
      },
    });

    if (existingParticipant) {
      return { message: "You are already a participant of this trip.", participant: existingParticipant };
    }

    // Add user as participant
    const participant = await prisma.participant.create({
      data: {
        trip_id: tripId,
        user_id: userId,
        name: request.user.name,
        email: userEmail,
        is_confirmed: false,
      },
    });

    return { message: "Successfully joined the trip.", participant };
  });
}