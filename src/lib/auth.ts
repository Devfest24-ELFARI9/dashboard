import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

// expect error (see next section)
export const auth = lucia({
  adapter: prisma(client),
  env: "DEV", // "PROD" if deployed to HTTPS
  middleware: nextjs_future(), // NOT nextjs()
  sessionCookie: {
    expires: false,
  },
});

export type Auth = typeof auth;
