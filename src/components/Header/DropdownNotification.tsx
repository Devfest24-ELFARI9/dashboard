import { useState } from "react";
import Link from "next/link";
import ClickOutside from "@/components/ClickOutside";
import HeaderNotificationBell from "../Alert/HeaderBell";
import { useNotifications } from "@/contexts/NotificationsContext";
import { HeaderNotification } from "../Alert/HeaderNotification";

const DropdownNotification = () => {
  const { unfixed, fixNotification, notifying, setNotifying, setDropdownOpen, dropdownOpen } = useNotifications();
  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li>
        <HeaderNotificationBell
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          notifying={notifying}
          setNotifying={setNotifying}
        />

        {dropdownOpen && (
          <div
            className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80`}
          >
            <div className="px-4.5 py-3">
              <h5 className="text-sm font-medium text-bodydark2">
                Notification
              </h5>
            </div>

            <ul className="flex h-auto flex-col overflow-y-auto">
              {unfixed?.map((notif, i) => (
                <li key={i}>
                  <HeaderNotification
                    {...notif}
                    onClick={() => fixNotification(notif.id)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default DropdownNotification;
