import { loadNotificationsAction } from "@/app/actions/loadNotifications";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
import { lucia } from "@/lib/auth";
import React from "react";
import { console } from "inspector";
import { User } from "lucia";
import { AuthProvider } from "@/contexts/AuthContext";
import { validateRoute } from "@/app/actions/validate-route";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRoute();
  const notis = await loadNotificationsAction();


  async function logout(): Promise<void> {
    "use server";
   

    await lucia.invalidateSession(session?.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return redirect("/auth/signin");
  }
  // const authorizationHeader = request.headers.get("Authorization");
  // const bearer = lucia.readBearerToken();
  // const {user} = await lucia.validateSession();
  return (
    <NotificationsProvider notis={notis}>
      <AuthProvider logout={logout} session={session.session} user={session.user} >
        <DefaultLayout>{children} </DefaultLayout>
      </AuthProvider>
    </NotificationsProvider>
  );
}
