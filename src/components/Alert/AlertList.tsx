"use client"
import { useNotifications } from "@/contexts/NotificationsContext";
import React from "react";
import Alert from ".";
import Link from "next/link";

export default function AlertsList() {
  const { notifications, fixNotification } = useNotifications();
  return (
    <div className="flex max-h-[40rem] flex-col gap-7.5 overflow-auto">
      {notifications.map((notification) => (
        <Link
          key={notification.id}
          href={`/machines/${notification.machine_name}`}
        >
          <Alert
            onClick={() => {fixNotification(notification.id);}}
            id={notification.id}
            status={notification.fixed ? "Issue Fixed" : "Attention Needed"}
            machine_name={notification.machine_name}
            alert_message={notification.alert_message}
            fixed={notification.fixed}
          />
        </Link>
      ))}
    </div>
  );
}
