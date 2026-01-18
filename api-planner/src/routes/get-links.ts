import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";
import { authMiddleware } from "../lib/auth-middleware";
import { tripParticipantMiddleware } from "../lib/trip-participant-middleware";

export async function getLinks(app: FastifyInstance) {
  app.get("/trips/:tripId/links", {
    preHandler: [authMiddleware, tripParticipantMiddleware]
  }, async (request) => {
    const getTripParamsSchema = z.object({
      tripId: z.string().uuid(),
    });

    const { tripId } = getTripParamsSchema.parse(request.params);
    const userId = request.user.id;

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        links: true,
      },
    });

    if (!trip) {
      throw new ClientError("Trip not found.");
    }

    const linksWithPermissions = trip.links.map(link => ({
      ...link,
      can_edit: true // Temporariamente todos podem editar até migração
    }));

    return { links: linksWithPermissions };
  });
}
