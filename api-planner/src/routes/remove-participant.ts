import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";
import nodemailer from "nodemailer";
import { getEmailClient } from "../lib/mail";
import { ClientError } from "../errors/client-error";
import { authMiddleware } from "../lib/auth-middleware";
import { tripOwnerMiddleware } from "../lib/trip-owner-middleware";

export async function removeParticipant(app: FastifyInstance) {
  app.delete("/trips/:tripId/participants/:participantId", {
    preHandler: [authMiddleware, tripOwnerMiddleware]
  }, async (request) => {
    const getParamsSchema = z.object({
      tripId: z.string().uuid(),
      participantId: z.string().uuid(),
    });

    const { tripId, participantId } = getParamsSchema.parse(request.params);

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      throw new ClientError("Trip not found.");
    }

    const participant = await prisma.participant.findUnique({
      where: { id: participantId },
    });

    if (!participant) {
      throw new ClientError("Participant not found.");
    }

    if (participant.trip_id !== tripId) {
      throw new ClientError("Participant does not belong to this trip.");
    }

    if (participant.is_confirmed) {
      throw new ClientError("Cannot remove confirmed participants.");
    }

    await prisma.participant.delete({
      where: { id: participantId },
    });

    const formattedStartDate = dayjs(trip.starts_at).format("LL");
    const formattedEndDate = dayjs(trip.ends_at).format("LL");

    const mail = await getEmailClient();

    const message = await mail.sendMail({
      from: {
        name: "Equipe plann.er",
        address: "oi@plann.er",
      },
      to: participant.email,
      subject: `Você foi removido da viagem para ${trip.destination}`,
      html: `
                <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
                  <p>Informamos que você foi removido da viagem para <strong>${trip.destination}</strong> que estava programada para as datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>
                  <p></p>
                  <p>Se você tem dúvidas sobre esta remoção, entre em contato com o organizador da viagem.</p>
                  <p></p>
                  <p>Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>
                </div>
              `.trim(),
    });

    console.log(nodemailer.getTestMessageUrl(message));

    return { message: "Participant removed successfully" };
  });
}
