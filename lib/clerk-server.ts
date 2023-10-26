import { Clerk } from "@clerk/nextjs/server";

export const clerk = Clerk({
  secretKey: process.env.CLERK_SECRET_KEY,
});
