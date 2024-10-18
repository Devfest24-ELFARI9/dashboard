import { ApexOptions } from "apexcharts";
import React, { ReactNode } from "react";
import ReactApexChart from "react-apexcharts";

export interface CardWithPieProps {
  title: string;
  working_count: number;
  down_count: number;
  machine_id: string;
}


const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#28a745", "#dc3545"],
  labels: ["Working", "Down"],
  legend: {
    show: false,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "80%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 80,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 100,
        },
      },
    },
  ],
};





const CardWithPie: React.FC<CardWithPieProps> = ({
  title,
  machine_id,
  working_count,
  down_count,
}) => {
  const series = [working_count, down_count];
  return (
    <div className="rounded-md border border-stroke bg-white px-3 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="m-1 flex items-end justify-between">
        <div className="my-auto">
          <h4
            className={`text-title-md font-bold text-black dark:text-white`}
          >
            {title}
          </h4>
          <span className="text-sm font-medium">{machine_id}</span>
        </div>

        <span className={`flex items-center gap-1 text-sm font-medium `}>
          <div id="chartThree" className="mx-auto flex justify-center">
            <ReactApexChart options={options} series={series} type="donut" />
          </div>
        </span>
      </div>
    </div>
  );
};

export default CardWithPie;
