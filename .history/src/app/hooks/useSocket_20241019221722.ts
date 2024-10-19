// useSocket.ts

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useRef } from "react";

// Type definition for the data received from the server
type UseSocketData<T> = {
  data: T | null;
  error: Error | null;
};

const url = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

interface UseSocketProps<T> {
  url: string; // WebSocket URL passed as a parameter
  onMessage: (data: T) => void; // Callback to handle the received message
  onError?: (error: ErrorEvent) => void; // Optional callback to handle errors
}
// The hook takes a URL and an event name as parameters
const useSocket = <T = unknown>(
  onMessage: (data) => void,
  onError: (error: ErrorEvent) => void
): UseSocketData<T> => {
  const socketRef = useRef<WebSocket | null>(null);




  useEffect(() => {
    // Initialize Socket.IO connection
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
      socket.send(JSON.stringify({ action: 'subscribe', channel:c }));
  };

    socketRef.current = socket;

    // Listen for data from the specified event
    socketRef.current.onmessage = (event) => {
      console.log("Received data on ", event);
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    // Handle connection errors
    socketRef.current.onerror = (err: any) => {
      onError(err);
    };

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      socketRef.current?.close();
    };
  }, []);

  return null;
};

export default useSocket;

