import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

const WS = () => {
    console.log('test')
}

export default function Home() {
  return (
    <>
      <DefaultLayout>
        Here will put results of websocket
        
      </DefaultLayout>
    </>
  );
}
