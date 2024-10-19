import useSocket from "@/app/hooks/useSocket";
import React, { createContext, useContext, useState, ReactNode, use } from "react";

// Define the notification type
export interface Notification {
  id: number;
  machine_name: string;
  fixed: boolean;
  alert_message: string;
}

// Define the context type
interface NotificationsContextType {
  notifications: Notification[];
}

// Create the context with default value (undefined)
const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

// Create a provider component to wrap the app
export const NotificationsProvider: React.FC<{
  children: ReactNode;
  notis: Notification[]
}> = ({ notis, children }) => {

  const [notifications, setNotifications] =
    useState<Notification[]>(notis);


  const onMessage = (data) => {
    if (data?.channel === "notifications") {
      setNotifications((prevNotifications) => {
        return [data?.data, ...prevNotifications];
      });
    }

  }

  useSocket(onMessage, (error) => console.error(error));

  return (
    <NotificationsContext.Provider value={{ notifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};

// Custom hook to use the NotificationsContext
export const useNotifications = (): NotificationsContextType => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
};
