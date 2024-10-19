import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Machine from "@/components/Machine";
import { StaticImageData } from "next/image";
import stampingPressImage from "@/assets/machines/Stamping_press.jpeg";
import WeldingRobots from '@/assets/machines/welding_robots.jpg'
import cnc from '@/assets/machines/CNC.jpg'
import agvs from '@/assets/machines/AGVs.jpeg'
import leakTest from '@/assets/machines/Leak_test_machines.jpg'
import Link from 'next/link';
import PaintingRobot from '@/assets/machines/painting_robots.jpeg'
import DashboardProvider from "@/providers/DashboardProvider";

export const metadata: Metadata = {
  title: "Machines informations stats",
  description: "a page for machine info visualization",
};

interface Machine {
    machineName: string;
    imageUrl: StaticImageData;
    key: string; // Add key property for URL
  }

const MachineList: React.FC = () => {
  const machines: Machine[] = [
    {
      machineName: "Stamping press",
      imageUrl: stampingPressImage,
      key: "stamping_press_001",
    },
    {
        machineName: "Welding robots",
        imageUrl: WeldingRobots,
        key: "welding_robot_006",
    },      
    {
        machineName: "CNC Machines",
        imageUrl: cnc,
        key: "cnc_milling_004",
    },
    {
        machineName: "AGVs",
        imageUrl: agvs,
        key: "agv_003",
    },
    {
        machineName: "Painting robot",
        imageUrl: PaintingRobot,
        key: "painting_robot_002",
    },
    {
        machineName: "Leak Test Machines",
        imageUrl: leakTest,
        key: "leak_test_005",
    },
    
  ];

  return (
    <DashboardProvider>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 ">
          {machines.map((machine, index) => (
            <Link key={index} href={`/machines/${machine.key}`}>
              <Machine
                key={index}
                imageUrl={machine.imageUrl}
                machineName={machine.machineName}
              />
            </Link>
          ))}
        </div>
      </div>
    </DashboardProvider>
  );
};

export default MachineList;
