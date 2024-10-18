// useSocket.ts

import { useEffect, useRef, useState } from "react";

// Type definition for the data received from the server
type UseSocketData<T> = {
  data: T | null;
  error: Error | null;
};

const url = "http://localhost:3005";

// The hook takes a URL and an event name as parameters
const useSocket = <T = unknown>(
  event: string,
): UseSocketData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Initialize Socket.IO connection
    const socket = new WebSocket(url);

    socketRef.current = socket;
    // Listen for data from the specified event
    socketRef.current.onmessage = (event) => {
      console.log("Received data on ", event);
      const data = JSON.parse(event.data);
      setData(data);
    };

    // Handle connection errors
    socketRef.current.onerror = (err: any) => {
      setError(err);
    };

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      socketRef.current?.close();
    };
  }, []);

  return { data, error };
};

export default useSocket;

