import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import WebSocket from 'ws';
import { useEffect, useState } from 'react';

export const metadata: Metadata = {
  title: "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

const WS = ({ onMessage }) => {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:4000');

    // Listen for messages from the server
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data); // Pass the data to the parent component
    };

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, [onMessage]);

  return null; // This component doesn't render anything
}

export default function Home() {
  const [result, setResult] = useState(null);

  const handleMessage = (data) => {
    setResult(data); // Update the state with received data
  };

  return (
    <DefaultLayout>
      <h1>E-commerce Dashboard</h1>
      <div>
        <WS onMessage={handleMessage} />
        {result && <div>Received: {JSON.stringify(result)}</div>}
      </div>
    </DefaultLayout>
  );
}
