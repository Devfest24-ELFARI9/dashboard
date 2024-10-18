import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { db } from "./prisma";


export const lucia = new Lucia(
  new PrismaAdapter(db.session, db.user),
  {
    getSessionAttributes: async (att) => {
      return {
        email: att?.email,
      }
    }
  },
);


// IMPORTANT!
declare module "lucia" {
	interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
    };
  }
}