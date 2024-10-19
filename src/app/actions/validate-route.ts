import { lucia } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const getSession = async () => {
  const cookies = headers().get("cookie");
  const sessionId = lucia.readSessionCookie(cookies);
  const { session, user } = await lucia.validateSession(sessionId);
  return { session, user };
};
export const validateRoute = async () => {
  const { session, user } = await getSession();

  if (!session) {
    redirect("/auth/signin");
  }
  return { session, user };
};

export const validateAuthRoute = async () => {
  const { session, user } = await getSession();
  if (session) {
    redirect("/");
  }
  return { session, user };
};
