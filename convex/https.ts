import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Missing Clerk webhook secret");
    }

    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      throw new Response("Missing required headers", {
        status: 400,
      });
    }
  }),
});

// Convex expects the router to be the default export of `convex/http.js`.
export default http;
