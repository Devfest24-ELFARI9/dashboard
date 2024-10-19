import Global from "@/components/Dashboard/Global";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
import { loadNotificationsAction } from "./actions/loadNotifications";

export const metadata: Metadata = {
  title:
    " Global Dashboard ",
  description: "This is Home Dashboard ",
};

export default async function Home() {
  const notis = await loadNotificationsAction();
  return (
    <NotificationsProvider notis={notis}>
      <DefaultLayout>
        <Global />
      </DefaultLayout>
    </NotificationsProvider>
  );
}
