"use client"; // This line marks the component as a Client Component

import Global from "@/components/Dashboard/Global";
import { Metadata } from "next";
import DashboardProvider from "@/providers/DashboardProvider";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "Global Dashboard",
  description: "This is Home Dashboard",
};

export default function Home() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<{ channel: string; message: any }[]>([]);
  const [channel, setChannel] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Create WebSocket connection on component mount
    const websocket = new WebSocket('ws://localhost:8080');

    websocket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, { channel: data.channel, message: data.message }]);
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    websocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWs(websocket);

    // Cleanup function to close WebSocket when the component unmounts
    return () => {
      websocket.close();
    };
  }, []);

  const subscribe = () => {
    if (ws) {
      ws.send(JSON.stringify({ action: 'subscribe', channel }));
    }
  };

  const unsubscribe = () => {
    if (ws) {
      ws.send(JSON.stringify({ action: 'unsubscribe' }));
    }
  };

  const sendMessage = () => {
    if (ws) {
      ws.send(JSON.stringify({ action: 'send-message', message, channel }));
    }
  };

  return (
    <DashboardProvider>
      <div>
        <input
          type="text"
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          placeholder="Enter Channel"
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter Message"
        />
        <button onClick={subscribe}>Subscribe</button>
        <button onClick={unsubscribe}>Unsubscribe</button>
        <button onClick={sendMessage}>Send Message</button>
        <div id="messages">
          {messages.map((msg, index) => (
            <div key={index}>
              Channel: {JSON.stringify(msg.channel, null, 2)}, Message: {JSON.stringify(msg.message, null, 2)}
            </div>
          ))}
        </div>
      </div>
      <Global />
    </DashboardProvider>
  );
}
