import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import WebSocket from 'ws';

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

const WS = () => {
    const socket = new WebSocket('ws://localhost:4000');
    // Listen for messages from the server
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      return data ;

    };

}

export default function Home() {
  return (
    <>
      <DefaultLayout>
        Here will put results of websocket
        <WS>
        </WS>
      </DefaultLayout>
    </>
  );
}
