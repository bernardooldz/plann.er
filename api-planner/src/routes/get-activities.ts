import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";
import { ClientError } from "../errors/client-error";
import { authMiddleware } from "../lib/auth-middleware";
import { tripParticipantMiddleware } from "../lib/trip-participant-middleware";

export async function getActivities(app: FastifyInstance) {
  app.get("/trips/:tripId/activities", {
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
        activities: {
          orderBy: {
            occurs_at: "asc",
          },
        },
      },
    });

    if (!trip) {
      throw new ClientError("Trip not found.");
    }

    const differenceInDaysBetweenTripStartAndEnd = dayjs(trip.ends_at).diff(
      trip.starts_at,
      "days"
    );

    const activities = Array.from({
      length: differenceInDaysBetweenTripStartAndEnd + 1,
    }).map((_, index) => {
      const date = dayjs(trip.starts_at).add(index, "days");

      return {
        date: date.toDate(),
        activities: trip.activities.filter((activity) => {
          return dayjs(activity.occurs_at).isSame(date, "day");
        }).map(activity => ({
          ...activity,
          can_edit: true // Temporariamente todos podem editar até migração
        })),
      };
    });

    return { activities };
  });
}
