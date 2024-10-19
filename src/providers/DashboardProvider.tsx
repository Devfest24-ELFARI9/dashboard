import { loadNotificationsAction } from "@/app/actions/loadNotifications";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
import React from "react";

export default async function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const notis = await loadNotificationsAction();

  return (
    <NotificationsProvider notis={notis}>
      <DefaultLayout>{children} </DefaultLayout>
    </NotificationsProvider>
  );
}
