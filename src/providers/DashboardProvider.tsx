import { loadNotificationsAction } from "@/app/actions/loadNotifications";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
import { lucia } from "@/lib/auth";
import React from "react";
import { console } from "inspector";
import { User } from "lucia";
import { AuthProvider } from "@/contexts/AuthContext";
import { validateRoute } from "@/app/actions/validate-route";

export default async function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRoute();
  const notis = await loadNotificationsAction();
  // const authorizationHeader = request.headers.get("Authorization");
  // const bearer = lucia.readBearerToken();
  // const {user} = await lucia.validateSession();
  return (
    <NotificationsProvider notis={notis}>
      <AuthProvider  session={session.session} user={session.user} >
        <DefaultLayout>{children} </DefaultLayout>
      </AuthProvider>
    </NotificationsProvider>
  );
}
