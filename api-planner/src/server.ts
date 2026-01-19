import fastify from "fastify";
import cors from "@fastify/cors";
import { createTrip } from "./routes/create-trip";
import { confirmTrip } from "./routes/confirm-trip";
import { confirmParticipantSelf } from "./routes/confirm-participant-self";
import { unconfirmParticipantSelf } from "./routes/unconfirm-participant-self";
import { confirmParticipants } from "./routes/confirm-participant";
import { confirmParticipantApi } from "./routes/confirm-participant-api";
import { updateParticipant } from "./routes/update-participant";
import { createActivity } from "./routes/create-activity";
import { getActivities } from "./routes/get-activities";
import { updateActivity } from "./routes/update-activity";
import { deleteActivity } from "./routes/delete-activity";
import { createLink } from "./routes/create-link";
import { getLinks } from "./routes/get-links";
import { updateLink } from "./routes/update-link";
import { deleteLink } from "./routes/delete-link";
import { getParticipants } from "./routes/get-participants";
import { createInvite } from "./routes/create-invite";
import { removeParticipant } from "./routes/remove-participant";
import { updateTrip } from "./routes/update-trip";
import { getTripDetails } from "./routes/get-trip-details";
import { getTripPublic } from "./routes/get-trip-public";
import { deleteTrip } from "./routes/delete-trip";
import { getParticipant } from "./routes/get-participant";
import { joinTripViaLink } from "./routes/join-trip-via-link";
import { leaveTrip } from "./routes/leave-trip";
import { register } from "./routes/register";
import { login } from "./routes/login";
import { me } from "./routes/me";
import { getUserTrips } from "./routes/get-user-trips";
import { updateProfile } from "./routes/update-profile";
import { errorHandler } from "./error-handler";
import { env } from "./env";

const app = fastify();

app.register(cors, {
  origin: true,
});

app.setErrorHandler(errorHandler);

// Auth routes
app.register(register);
app.register(login);
app.register(me);
app.register(getUserTrips);
app.register(updateProfile);

// Trip routes

app.register(createTrip);
app.register(confirmTrip);
app.register(updateTrip);
app.register(deleteTrip);
app.register(getTripDetails);
app.register(getTripPublic);
app.register(joinTripViaLink);
app.register(leaveTrip);

app.register(confirmParticipants);
app.register(confirmParticipantSelf);
app.register(unconfirmParticipantSelf);
app.register(confirmParticipantApi);
app.register(updateParticipant);
app.register(getParticipants);
app.register(createInvite);
app.register(removeParticipant);
app.register(getParticipant);

app.register(createActivity);
app.register(getActivities);
app.register(updateActivity);
app.register(deleteActivity);

app.register(createLink);
app.register(getLinks);
app.register(updateLink);
app.register(deleteLink);

app.get("/health", async () => {
  return { status: "OK" };
});

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server running!`);
});
