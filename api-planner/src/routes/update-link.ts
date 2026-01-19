import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";
import { authMiddleware } from "../lib/auth-middleware";
import { tripParticipantMiddleware } from "../lib/trip-participant-middleware";

export async function updateLink(app: FastifyInstance) {
  app.put("/trips/:tripId/links/:linkId", {
    preHandler: [authMiddleware, tripParticipantMiddleware]
  }, async (request) => {
    const paramsSchema = z.object({
      tripId: z.string().uuid(),
      linkId: z.string().uuid(),
    });
    const bodySchema = z.object({
      title: z.string().min(4),
      url: z.string().url(),
    });

    const { tripId, linkId } = paramsSchema.parse(request.params);
    const { title, url } = bodySchema.parse(request.body);
    const userId = request.user.id;

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      throw new ClientError("Trip not found.");
    }

    const link = await prisma.link.findUnique({
      where: { id: linkId },
    });

    if (!link || link.trip_id !== tripId) {
      throw new ClientError("Link not found.");
    }

    // Check permissions: temporarily allow all users until migration
    // if (link.created_by !== userId && trip.owner_id !== userId) {
    //   throw new ClientError("You don't have permission to edit this link.");
    // }

    const updatedLink = await prisma.link.update({
      where: { id: linkId },
      data: {
        title,
        url,
      },
    });

    return { link: updatedLink };
  });
}