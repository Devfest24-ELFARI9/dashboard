// useSocket.ts

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

// Type definition for the data received from the server
type UseSocketData<T> = {
  data: T | null;
  error: Error | null;
};

const url = "http://localhost:3000";

// The hook takes a URL and an event name as parameters
const useSocket = <T = unknown>(
  event: string,
): UseSocketData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize Socket.IO connection
    socketRef.current = io(url);

    // Listen for data from the specified event
    socketRef.current.on(event, (receivedData: T) => {
      console.log("Received data on ", event, ":", receivedData);
      setData(receivedData);
    });

    // Handle connection errors
    socketRef.current.on("connect_error", (err: Error) => {
      setError(err);
    });

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      socketRef.current?.disconnect();
    };
  }, [url, event]);

  return { data, error };
};

export default useSocket;
