import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Alert from "@/components/Alert";

export const metadata: Metadata = {
  title: "Alerts",
  description: "This is Alert page",
};

// Define an array of notifications
const notifications = [
  { id: 1, machine_name: "Press 01", alert_message: "Temperature problem", fixed: false },
  { id: 2, machine_name: "Machine 02", alert_message: "Pressure problem", fixed: true },
  { id: 3, machine_name: "Conveyor 03", alert_message: "Vibration issue", fixed: false },
  { id: 4, machine_name: "Machine 04", alert_message: "Oil leakage", fixed: true },
  { id: 5, machine_name: "Press 05", alert_message: "Power failure", fixed: false },
  { id: 6, machine_name: "Machine 06", alert_message: "Overheating", fixed: true },
  { id: 7, machine_name: "Conveyor 07", alert_message: "Alignment issue", fixed: false },
];

const Alerts = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Alerts" />

      <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
        {/* Add max height and overflow-auto to make the container scrollable */}
        <div className="flex flex-col gap-7.5 max-h-[40rem] overflow-auto">
          {notifications.map((notification) => (
            <Alert
              key={notification.id}
              id={notification.id}
              status={notification.fixed ? "Issue Fixed" : "Attention Needed"}
              machine_name={notification.machine_name}
              alert_message= {notification.alert_message}
              fixed={notification.fixed}
            />
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Alerts;
