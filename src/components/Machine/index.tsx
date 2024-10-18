import { StaticImageData } from "next/image";
import React from "react";
import Image from "next/image";

// Define the props for the MachineCard component with StaticImageData
interface MachineCardProps {
  imageUrl: StaticImageData; // Updated to StaticImageData
  machineName: string; // Keep this as a string for machine names
}

const Machine: React.FC<MachineCardProps> = ({ imageUrl, machineName }) => {
  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
      
      <Image
        src={imageUrl}
        alt={machineName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-center">{machineName}</h2>
      </div>
    </div>
  );
};

export default Machine;
