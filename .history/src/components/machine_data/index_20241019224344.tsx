"use client";
import useSocket from "@/app/hooks/useSocket";
// components/MachineData.tsx
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { WeldingRobotData } from "@/types/machine";
import { useState } from "react";



const machineNameDictionary: { [key: string]: string } = {
    "welding_robot_006": "Welding Robot",
    "stamping_press_001": "Stamping Press",
    "cnc_milling_002": "CNC Milling Machine",
    "agv_003": "Automated Guided Vehicle",
    "leak_test_004": "Leak Test Machine",
};

const formatKey = (key: string): string => {
    // Convert snake_case or camelCase to readable format
    return key.replace(/_/g, " ").replace(/([A-Z])/g, ' $1').toUpperCase();
};

const MachineData: React.FC<any> = () => {
    const [data, setData] = useState<any | null>(null);
    const machineName =
      machineNameDictionary[data?.machine_id ?? "welding_robot_006"] ||
      "Unknown Machine";




    const onMessage = (data) => {
        setData(data);
    }

    const onError = (error) => {
        console.log(error)
    }

    useSocket('',onMessage, onError);

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-2  justify-center h-[49rem] overflow-scroll">
            <h2 className="text-2xl font-bold text-dark-blue mb-8 text-center">
                {machineName}
            </h2>
            <div className="space-y-2">
                {data !== null && Object.entries(data).map(([key, value]) => {
                    let displayValue;

                    // Special case for object values (like arm_position)
                    if (typeof value === "object" && value !== null) {
                        // Handle complex objects (like x, y, z coordinates)
                        displayValue = Object.entries(value)
                            .map(([subKey, subValue]) => `${subKey}: ${subValue}`)
                            .join(", ");
                    } else {
                        displayValue = value;
                    }

                    return (
                        <div className="flex justify-between mb-2" key={key}>
                            <span className="font-semibold">{formatKey(key)}:</span>
                            <span>{displayValue}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MachineData;
