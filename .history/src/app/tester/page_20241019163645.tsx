import Global from "@/components/Dashboard/Global";
import { Metadata } from "next";
import DashboardProvider from "@/providers/DashboardProvider";

export const metadata: Metadata = {
  title:
    " Global Dashboard ",
  description: "This is Home Dashboard ",
};

export default async function Home() {
  return (
    <DashboardProvider>
    </DashboardProvider>
  );
}
