import { Notification } from "@/contexts/NotificationsContext";

export const loadNotificationsAction = async () => {
  return [
    {
      id: 1,
      title: "Stamping Presses",
      machine_name: "stamping_press_001",
      fixed: true,
      alert_message:
        "Backing up the program won't do anything, we need to synthesize the multi-byte AI bus!",
    },
    {
      id: 2,
      title: "Welding Robots",
      machine_name: "stamping_press_001",
      fixed: false,
      alert_message: "We need to index the open-source HTTP capacitor!",
    },
    {
      id: 3,
      title: "Stamping Presses",
      machine_name: "Walker-stamping_press_001",
      fixed: true,
      alert_message:
        "The ADP system is down, back up the multi-byte matrix so we can compress the HTTP feed!",
    },
    {
      id: 4,
      title: "Welding Robots",
      machine_name: "stamping_press_001",
      fixed: false,
      alert_message:
        "If we override the pixel, we can get to the JSON protocol through the back-end HTTP application!",
    },
    {
      id: 5,
      title: "Stamping Presses",
      machine_name: "stamping_press_001",
      fixed: false,
      alert_message:
        "You can't index the microchip without copying the neural TCP matrix!",
    },
  ] as Notification[];
}