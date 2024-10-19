import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Alert from "@/components/Alert";
import { loadNotificationsAction } from "@/app/actions/loadNotifications";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
import AlertsList from "@/components/Alert/AlertList";
import DashboardProvider from "@/providers/DashboardProvider";
import { headers } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Alerts",
  description: "This is Alert page",
};

// Define an array of notifications
const notifications = [
  {
    id: 1,
    machine_name: "Press 01",
    alert_message: "Temperature problem",
    fixed: false,
  },
  {
    id: 2,
    machine_name: "Machine 02",
    alert_message: "Pressure problem",
    fixed: true,
  },
  {
    id: 3,
    machine_name: "Conveyor 03",
    alert_message: "Vibration issue",
    fixed: false,
  },
  {
    id: 4,
    machine_name: "Machine 04",
    alert_message: "Oil leakage",
    fixed: true,
  },
  {
    id: 5,
    machine_name: "Press 05",
    alert_message: "Power failure",
    fixed: false,
  },
  {
    id: 6,
    machine_name: "Machine 06",
    alert_message: "Overheating",
    fixed: true,
  },
  {
    id: 7,
    machine_name: "Conveyor 07",
    alert_message: "Alignment issue",
    fixed: false,
  },
];

const Alerts = async () => {
  return (
    <DashboardProvider>
      <Breadcrumb pageName="Alerts" />
      <AlertsList />
    </DashboardProvider>
  );
};

export default Alerts;
