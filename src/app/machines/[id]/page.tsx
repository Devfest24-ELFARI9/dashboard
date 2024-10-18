"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { WeldingRobotData } from "@/types/machine";
import MachineData from "@/components/machine_data";

const data: any = {
  machine_id: "painting_robot_002",
  spray_pressure: 3.5, // in bar
  paint_thickness: 120, // in μm
  arm_position: { x: 120.5, y: 80.4, z: 200.3 }, // spatial coordinates
  temperature: 25, // in °C
  humidity: 60, // in %RH
  paint_flow_rate: 4.2, // in ml/min
  paint_volume_used: 0.8, // in liters
  atomizer_speed: 20000, // in RPM
  overspray_capture_efficiency: 95, // in %
  booth_airflow_velocity: 0.5, // in m/s
  solvent_concentration: 5.2, // in %
  timestamp: "2024-10-14T10:35:00Z",
};

let socket: any;

const MachineInfo: React.FC<any> = () => {
  // const [data, setData] = useState<any | null>(null);

  // useEffect(() => {
  //     // Initialize the Socket.IO client connection when the component mounts
  //     socket = io("http://localhost:5001",{
  //         withCredentials: true, // Use this if you need to include cookies or authorization
  //     }); // Change the URL to your backend server's URL

  //     // Listen for "machineData" event from the server
  //     socket.on("webhook_data", (newData: any) => {
  //         setData(newData);
  //         console.log(data)// Update state with real-time data
  //     });

  //     // Cleanup: Disconnect from the server when the component unmounts
  //     return () => {
  //         if (socket) socket.disconnect();
  //     };
  // }, []);

  return (
    <DefaultLayout>
      <MachineData data={data} />
    </DefaultLayout>
  );
};

export default MachineInfo;
