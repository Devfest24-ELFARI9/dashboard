// useSocket.ts

import { useEffect, useRef } from "react";

// Type definition for the data received from the server
type UseSocketData<T> = {
  data: T | null;
  error: Error | null;
};

interface SocketMessage {
  channel: string;
  message: string;
}
const url = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

interface UseSocketProps<T> {
  url: string; // WebSocket URL passed as a parameter
  onMessage: (data: T) => void; // Callback to handle the received message
  onError?: (error: ErrorEvent) => void; // Optional callback to handle errors
}
// The hook takes a URL and an event name as parameters
const useSocket = <T = unknown>(
  channel: string,
  onMessage: (data) => void,
  onError: (error: ErrorEvent) => void,
): UseSocketData<T> => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Initialize Socket.IO connection
    const socket = new WebSocket(url);

    socketRef.current = socket;

    // Listen for data from the specified event
    socketRef.current.onmessage = onMessageReceived(onMessage);
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

const onMessageReceived = (onMessage: (data) => void) => (event) => {
  const data: SocketMessage = JSON.parse(event.data) as SocketMessage;
  console.log("Received data on ", data.channel, "Received data", data.message);
  const message = JSON.parse(data.message);
  onMessage(message);
};
