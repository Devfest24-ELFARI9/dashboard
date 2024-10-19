"use client"
import CardWithPie, { CardWithPieProps } from "./CardWithPie";
import React from 'react'



export const data: CardWithPieProps[] = [
  {
    title: "Stamping Presses",
    machine_id: "stamping_press_001",
    working_count: 4,
    down_count: 1,
  },
  {
    title: "Welding Robots",
    machine_id: "welding_robot_006",
    working_count: 1,
    down_count: 3,
  },
  {
    title: "CNC Milling Machine",
    machine_id: "cnc_milling_004",
    working_count: 4,
    down_count: 1,
  },
  {
    title: "Automated Guided Vehicle",
    machine_id: "agv_003",
    working_count: 1,
    down_count: 3,
  },
  {
    title: "Painting Robots",
    machine_id: "painting_robot_002",
    working_count: 4,
    down_count: 1,
  },
  {
    title: "Leak Test Machine",
    machine_id: "leak_test_005",
    working_count: 1,
    down_count: 3,
  },
];


export default function MachineCountsCards({data}: {data: CardWithPieProps[]}) {
  return (
    <div className="py-5">
      <h4 className="text-title-lg font-bold text-black dark:text-white mb-3">
        Operating Machines
      </h4>
      <div className="grid grid-cols-3 gap-2">
        {data?.map((d, i) => (
          <CardWithPie key={i} {...d} />
        ))}
      </div>
    </div>
  );
}
