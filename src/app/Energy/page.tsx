"use client"
import ChartTwo from "@/components/Charts/ChartTwo";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const Energy: React.FC = () => {
    // This is the array of cars produced (for this example)
    const producedCars = [44, 55, 41, 67, 22, 43, 65]; // Example data for good cars
  
    return (

        <DefaultLayout>
        {/* Pass only the producedCars array as a prop */}
        <ChartTwo title={"enregy consumption"} producedCars={producedCars} timePeriod={"weekly"} />
        </DefaultLayout>
    );
  };
  
  export default Energy;