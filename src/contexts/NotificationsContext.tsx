import { apiClient } from "@/api/client";
import useSocket from "@/app/hooks/useSocket";
import React, { createContext, useContext, useState, ReactNode, use } from "react";

// Define the notification type
export interface Notification {
  id: number;
  title: string;
  machine_name: string;
  fixed: boolean;
  alert_message: string;
}

// Define the context type
interface NotificationsContextType {
  notifications: Notification[];
  showUnfixed: () => Notification[];
  fixNotification: (id: number) => void;
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

  const showUnfixed = () => {
   return notifications.filter((noti) => !noti.fixed);
  }

  const fixNotification = async (id: number) => {
    // TODO: Fix the notification with the given ID
    // const res = await apiClient("/notifications/fix", {method: "POST", body: JSON.stringify({id})});
    // if(!res.ok) {
    //   alert("Failed to fix the notification");
    // }
    setNotifications((prevNotifications) => {
      return prevNotifications.map((noti) => {
        if (noti.id === id) {
          return { ...noti, fixed: true };
        }
        return noti;
      });
  });
}

  return (
    <NotificationsContext.Provider
      value={{ notifications, showUnfixed, fixNotification }}
    >
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
