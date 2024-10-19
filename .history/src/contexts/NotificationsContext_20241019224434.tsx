"use client"
import { apiClient } from "@/api/client";
import useSocket from "@/app/hooks/useSocket";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export const notifcationDelay = 5000;// Define the notification type
export interface Notification {
  id: number;
  title: string;
  machine_name: string;
  fixed: boolean;
  status: string;
  alert_message: string;
  timestamp: string;
}

// Define the context type
interface NotificationsContextType {
  notifications: Notification[];
  unfixed: Notification[];
  notifying: boolean;
  dropdownOpen: boolean;
  displayAlert: { display: boolean; data: Notification | null };
  setDropdownOpen: (open: boolean) => void;
  setNotifying: (notifying: boolean) => void;
  showUnfixed: () => Notification[];
  fixNotification: (id: number) => void;
  hideNotificationAlert: () => void;
}

// Create the context with default value (undefined)
const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

// Create a provider component to wrap the app
export const NotificationsProvider: React.FC<{
  children: ReactNode;
  notis: Notification[]
}> = ({ notis, children }) => {
  const [displayAlert, setDisplayAlert] = useState<{display: boolean; data: Notification | null}>({display: false, data: null});
  const [notifications, setNotifications] =
    useState<Notification[]>(notis);

    const [unfixed, setUnfixed] = useState(
      notifications.filter((noti) => !noti.fixed),
    );

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

    useEffect(() => {
      setUnfixed([...notifications.filter((noti) => !noti.fixed)]);
    }, [notifications])


    const displayNotificationAlert = (data: Notification) => {
      setDisplayAlert({display: true, data});
      setTimeout(() => {
        setDisplayAlert({ display: false, data });
      }, notifcationDelay)
    }
  const onMessage = (data) => {
    setNotifying(true);


    setNotifications((prevNotifications) => {
      return [{
      id: 6,
      title: "Stamping Presses",
      machine_name: "stamping_press_001",
      fixed: false,
      alert_message:
        "2 You can't index the microchip without copying the neural TCP matrix!",
    }, ...prevNotifications];
    });
    displayNotificationAlert({
      id: 6,
      title: "Stamping Presses",
      machine_name: "stamping_press_001",
      fixed: false,
      alert_message:
        "2 You can't index the microchip without copying the neural TCP matrix!",
    });

    if (data?.channel === "notifications") {
      displayNotificationAlert({
        id: 6,
        title: "Stamping Presses",
        machine_name: "stamping_press_001",
        fixed: false,
        alert_message:
          "2 You can't index the microchip without copying the neural TCP matrix!",
      });
      setNotifying(true);
      setNotifications((prevNotifications) => {
        return [data?.data, ...prevNotifications];
      });
    }

  }

  const hideNotificationAlert = () => {
    setDisplayAlert({display: false, data: null});
  }

  useSocket(,onMessage, (error) => console.error(error));

  const showUnfixed = () => {
   return notifications.filter((noti) => !noti.fixed);
  }


  const fixNotification = async (id: number) => {
    // TODO: Fix the notification with the given ID
    // const res = await apiClient("/notifications/fix", {method: "POST", body: JSON.stringify({id})});
    // if(!res.ok) {
    //   alert("Failed to fix the notification");
    // }
    alert(id);
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
      value={{
        notifications,
        showUnfixed,
        fixNotification,
        unfixed,
        notifying,
        setNotifying,
        dropdownOpen,
        setDropdownOpen,
        displayAlert,
        hideNotificationAlert,
      }}
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
