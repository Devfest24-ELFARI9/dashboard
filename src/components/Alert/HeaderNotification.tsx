import { Notification } from '@/contexts/NotificationsContext';
import Link from 'next/link';
import React from 'react'

export const HeaderNotification: React.FC<Notification & { onClick: () => void }> = ({
  id,
  status,
  machine_name,
  alert_message,
  fixed,
  onClick,
}) => {
  return (
    <Link
      className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
      href={`/machines/${machine_name}`}
      onClick={onClick}
    >
      <p className="text-sm">
        <span className="text-black dark:text-white">
         {machine_name}
        </span>{" "}
       {alert_message}
      </p>

      <p className="text-xs">12 May, 2025</p>
    </Link>
  );
};
