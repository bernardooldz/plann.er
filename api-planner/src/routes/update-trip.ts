import { FastifyInstance } from "fastify";
import { z } from "zod";
import nodemailer from "nodemailer";
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";
import { ClientError } from "../errors/client-error";
import { env } from "../env";
import { getEmailClient } from "../lib/mail";
import { authMiddleware } from "../lib/auth-middleware";
import { tripOwnerMiddleware } from "../lib/trip-owner-middleware";

export async function updateTrip(app: FastifyInstance) {
  app.put("/trips/:tripId", {
    preHandler: [authMiddleware, tripOwnerMiddleware]
  }, async (request) => {
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
      include: {
        participants: true,
      },
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

    const updatedTrip = await prisma.trip.update({
      where: { id: tripId },
      data: {
        destination,
        starts_at,
        ends_at,
      },
    });

    const formattedStartDate = dayjs(starts_at).format("LL");
    const formattedEndDate = dayjs(ends_at).format("LL");

    const tripDetailsLink = `${env.WEB_BASE_URL}/trips/${trip.id}`;

    const mail = await getEmailClient();

    const emailPromises = trip.participants.map(async (participant) => {
      const message = await mail.sendMail({
        from: {
          name: "Equipe plann.er",
          address: "oi@plann.er",
        },
        to: {
          name: participant.name || participant.email,
          address: participant.email,
        },
        subject: `Viagem atualizada: ${destination}`,
        html: `
          <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
            <p>Olá!</p>
            <p>A viagem para <strong>${destination}</strong> foi atualizada.</p>
            <p><strong>Novas datas:</strong> ${formattedStartDate} até ${formattedEndDate}</p>
            <p></p>
            <p>Para ver todos os detalhes da viagem, clique no link abaixo:</p>
            <p></p>
            <p>
              <a href="${tripDetailsLink}">Ver detalhes da viagem</a>
            </p>
            <p></p>
            <p>Equipe plann.er</p>
          </div>
        `.trim(),
      });
      
      console.log(nodemailer.getTestMessageUrl(message));
      return message;
    });

    await Promise.all(emailPromises);

    return { 
      tripId: trip.id,
      trip: {
        id: updatedTrip.id,
        destination: updatedTrip.destination,
        starts_at: updatedTrip.starts_at,
        ends_at: updatedTrip.ends_at,
        is_confirmed: updatedTrip.is_confirmed
      }
    };
  });
}
