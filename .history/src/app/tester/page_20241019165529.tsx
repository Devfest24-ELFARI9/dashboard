"use client"; // Mark the component as a Client Component

import React, { useEffect, useState } from 'react';

const WebSocketClient = () => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [channel, setChannel] = useState('');

  useEffect(() => {
    // Create a WebSocket connection on component mount
    const websocket = new WebSocket('ws://localhost:8080');

    websocket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const text = `Channel: ${JSON.stringify(data.channel, null, 2)}, Message: ${JSON.stringify(data.message, null, 2)}`;
      
      // Update messages state
      setMessages((prevMessages) => [...prevMessages, text]);
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
      ws.send(JSON.stringify({ action: 'subscribe', channel:'sensor-data' }));
    }
  };

  return (
    
      <div>
       text 
      </div>
  );
};

export default WebSocketClient;
