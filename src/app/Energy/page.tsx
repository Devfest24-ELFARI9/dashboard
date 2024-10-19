import ChartTwo from "@/components/Charts/ChartTwo";
import DashboardProvider from "@/providers/DashboardProvider";


const Energy: React.FC = () => {
    // This is the array of cars produced (for this example)
    const producedCars = [44, 55, 41, 67, 22, 43, 65]; // Example data for good cars
  
    return (
      <DashboardProvider>
        {/* Pass only the producedCars array as a prop */}
        <ChartTwo
          title={"enregy consumption"}
          producedCars={producedCars}
          timePeriod={"weekly"}
        />
      </DashboardProvider>
    );
  };
  
  export default Energy;