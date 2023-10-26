import { Clerk } from "@clerk/nextjs/server";

export const clerk = Clerk({
  apiKey: process.env.CLERK_SECRET_KEY,
});
