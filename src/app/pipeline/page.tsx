import React from 'react'
import CarJourney from '@/components/Car'
import DashboardProvider from '@/providers/DashboardProvider';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
const journeysData = [
    {
      carId: "Car 1",
      phases: [
        { name: "Start", duration: 2 },
        { name: "Phase 1", duration: 3 },
        { name: "Phase 2", duration: 4 },
        { name: "Midpoint", duration: 5 },
        { name: "Phase 4", duration: 3 },
        { name: "End", duration: 2 },
      ],
    },
    {
      carId: "Car 2",
      phases: [
        { name: "Start", duration: 1 },
        { name: "Phase 1", duration: 2 },
        { name: "Phase 2", duration: 3 },
        { name: "Midpoint", duration: 4 },
        { name: "Phase 4", duration: 2 },
        { name: "End", duration: 1 },
      ],
    },
    {
      carId: "Car 3",
      phases: [
        { name: "Start", duration: 3 },
        { name: "Phase 1", duration: 4 },
        { name: "Phase 2", duration: 5 },
        { name: "Midpoint", duration: 3 },
        { name: "Phase 4", duration: 4 },
        { name: "End", duration: 3 },
      ],
    },
  ];

export default function page() {
  return (
    
    <DashboardProvider>
    <Breadcrumb pageName="Pipeline"/>
    <div>
    <CarJourney journeys={journeysData} />
    </div>
    </DashboardProvider>
  )
}
