// useSocket.ts

import { useEffect, useRef, useState } from "react";

// Type definition for the data received from the server
type UseSocketData<T> = {
  data: T | null;
  error: Error | null;
};

const url = "http://localhost:3005";

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

