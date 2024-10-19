'use client';

import { useState, useEffect } from "react";

// Define the type for a phase in a journey
type Phase = {
  name: string;
  duration: number; // Duration in seconds
};

// Define the type for each car's journey
type Journey = {
  carId: string; // A unique identifier for the car
  phases: Phase[]; // Array of phases
};

// Define the props for the CarJourney component
interface CarJourneyProps {
  journeys: Journey[]; // Array of car journeys
}

const CarJourney: React.FC<CarJourneyProps> = ({ journeys }) => {
  // State to track the position of each car along its journey
  const [carPositions, setCarPositions] = useState<number[]>(Array(journeys.length).fill(0));
  const [currentPhases, setCurrentPhases] = useState<number[]>(Array(journeys.length).fill(0));

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    journeys.forEach((journey, carIndex) => {
      if (currentPhases[carIndex] < journey.phases.length) {
        const timer = setTimeout(() => {
          setCarPositions((prev) => {
            const newPositions = [...prev];
            newPositions[carIndex] = newPositions[carIndex] + 100 / journey.phases.length;
            return newPositions;
          });

          setCurrentPhases((prev) => {
            const newPhases = [...prev];
            newPhases[carIndex] = newPhases[carIndex] + 1;
            return newPhases;
          });
        }, journey.phases[currentPhases[carIndex]].duration * 1000);

        timers.push(timer);
      }
    });

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [currentPhases, journeys]);

  return (
    <div className="space-y-10">
      {journeys.map((journey, carIndex) => (
        <div key={journey.carId} className="flex flex-col items-center space-y-6">
          <h2 className="text-lg font-bold text-black dark:text-white">
            Simulating for {journey.carId}
          </h2>

          <div className="relative w-full max-w-2xl h-4 bg-white dark:bg-gray-800 mt-4">
            <div className="absolute inset-0 flex space-x-1">
              {journey.phases.map((phase, index) => (
                <div
                  key={index}
                  className={`flex-1 h-full rounded ${
                    index % 2 === 0
                      ? "bg-[#1A222C] dark:bg-[#3C50E0]" // Light phase color and dark mode color
                      : "bg-[#24303F] dark:bg-[#5A79FF]" // Keep previous colors for other phases
                  }`}
                ></div>
              ))}
            </div>
            <div
              className="absolute w-6 h-6 bg-red-500 rounded-full"
              style={{ left: `${carPositions[carIndex]}%`, top: "-8px" }}
            ></div>
          </div>

          <div className="flex justify-between w-full max-w-2xl mt-2">
            {journey.phases.map((phase, index) => (
              <div key={index} className="text-center text-black dark:text-white text-sm">
                {phase.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarJourney;
