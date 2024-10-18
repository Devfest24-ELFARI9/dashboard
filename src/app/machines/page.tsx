import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Machine from "@/components/Machine";
import { StaticImageData } from "next/image";
import stampingPressImage from "@/assets/machines/Stamping_press.jpeg";
import WeldingRobots from '@/assets/machines/welding_robots.jpg'
import cnc from '@/assets/machines/CNC.jpg'
import agvs from '@/assets/machines/AGVs.jpeg'
import leakTest from '@/assets/machines/Leak_test_machines.jpg'

export const metadata: Metadata = {
  title: "Machines informations stats",
  description: "a page for machine info visualization",
};

interface Machine {
  machineName: string;
  imageUrl: StaticImageData;
}

const MachineList: React.FC = () => {
  const machines: Machine[] = [
    {
      machineName: "Stamping press",
      imageUrl: stampingPressImage,
    },
    {
        machineName: "Welding robots",
        imageUrl: WeldingRobots,
    },      
    {
        machineName: "CNC Machines",
        imageUrl: cnc,
    },
    {
        machineName: "AGVs",
        imageUrl: agvs,
    },
    {
        machineName: "Leak Test Machines",
        imageUrl: leakTest,
    }
    
  ];

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 ">
          {machines.map((machine, index) => (
            <Machine
              key={index}
              imageUrl={machine.imageUrl}
              machineName={machine.machineName}
            />
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default MachineList;
