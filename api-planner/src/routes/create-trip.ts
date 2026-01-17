import { FastifyInstance } from "fastify";
import { z } from "zod";
import nodemailer from "nodemailer";
import { prisma } from "../lib/prisma";
import { getEmailClient } from "../lib/mail";
import { dayjs } from "../lib/dayjs";
import { ClientError } from "../errors/client-error";
import { env } from "../env";
import { authMiddleware } from "../lib/auth-middleware";

export async function createTrip(app: FastifyInstance) {
  app.post("/trips", {
    preHandler: [authMiddleware]
  }, async (request) => {
    const createTripSchema = z.object({
      destination: z.string().min(4),
      starts_at: z.coerce.date(),
      ends_at: z.coerce.date(),
      emails_to_invite: z.array(z.string().email()),
    });

    const {
      destination,
      starts_at,
      ends_at,
      emails_to_invite,
    } = createTripSchema.parse(request.body);

    if (dayjs(starts_at).isBefore(new Date())) {
      throw new ClientError("Invalid trip start date.");
    }

    if (dayjs(ends_at).isBefore(starts_at)) {
      throw new ClientError("Invalid trip end date.");
    }

    const trip = await prisma.trip.create({
      data: {
        destination,
        starts_at,
        ends_at,
        owner_id: request.user!.id,
        participants: {
          createMany: {
            data: [
              {
                name: request.user!.name,
                email: request.user!.email,
                is_owner: true,
                is_confirmed: true,
                user_id: request.user!.id,
              },
              ...emails_to_invite.map((email) => {
                return { email };
              }),
            ],
          },
        },
      },
    });

    const formattedStartDate = dayjs(starts_at).format("LL");
    const formattedEndDate = dayjs(ends_at).format("LL");

    const confirmationLink = `${env.API_BASE_URL}/trips/${trip.id}/confirm`;

    const mail = await getEmailClient();

    const message = await mail.sendMail({
      from: {
        name: "Equipe plann.er",
        address: "oi@plann.er",
      },
      to: {
        name: request.user!.name,
        address: request.user!.email,
      },
      subject: `Confirme sua viagem para ${destination} em ${formattedStartDate}`,
      html: `
        <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
          <p>Você solicitou a criação de uma viagem para <strong>${destination}</strong> nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>
          <p></p>
          <p>Para confirmar sua viagem, clique no link abaixo:</p>
          <p></p>
          <p>
            <a href=${confirmationLink}>Confirmar viagem</a>
          </p>
          <p></p>
          <p>Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>
        </div>
      `.trim(),
    });

    console.log(nodemailer.getTestMessageUrl(message));

    return { tripId: trip.id };
  });
}
