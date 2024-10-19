import { StaticImageData } from "next/image";
import React from "react";
import Image from "next/image";


interface MachineCardProps {
  imageUrl: StaticImageData; 
  machineName: string; 
}

const Machine: React.FC<MachineCardProps> = ({ imageUrl, machineName }) => {
  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden cursor-pointer mt-16 transform transition-transform duration-300 hover:scale-105">
      <Image
        src={imageUrl}
        alt={machineName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-center text-black">{machineName}</h2>
      </div>
    </div>
  );
};

export default Machine;
