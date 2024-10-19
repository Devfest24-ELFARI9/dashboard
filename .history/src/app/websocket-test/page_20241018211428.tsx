"use client"; // Add this directive to mark the component as a Client Component

import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from 'react';

const WS = ({ onMessage }) => {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:4000');

    // Listen for messages from the server
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data); // Pass the data to the parent component without stringify
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
        {result && (
          
        )}
      </div>
    </DefaultLayout>
  );
}
