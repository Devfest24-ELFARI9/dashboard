import ChartFour from "@/components/Charts/ChartFour";
import ChartTwo from "@/components/Charts/ChartTwo";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MachineCountsCards, { data } from "@/components/MachineCounts/MachineCountsCards";
import PowerConsumptionChart from "@/components/RealtimeCharts/PowerConsumptionChart";
import TempChart from "@/components/RealtimeCharts/TempChart";
import VibrationChart from "@/components/RealtimeCharts/VibrationChart";
import DashboardProvider from "@/providers/DashboardProvider";


const Energy: React.FC = () => {
    // This is the array of cars produced (for this example)
    const consumedenergy = [44, 55, 41, 67, 22, 43, 65]; 


  
    return (
      <DashboardProvider>
        {/* Pass only the producedCars array as a prop */}
        <ChartFour
          title={"enregy consumption"}
          producedCars={consumedenergy}
          timePeriod={"weekly"}
        />
        <MachineCountsCards data={data} />
        <PowerConsumptionChart />
        {/* <TempChart />
        <VibrationChart /> */}
      </DashboardProvider>
    );
  };
  
  export default Energy;