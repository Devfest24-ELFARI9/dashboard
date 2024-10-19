// components/ChartTwo.tsx
"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  colors: ["#3C50E0", "#DC3545"], // Good cars in blue, defect cars in red
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "bar",
    height: 335,
    stacked: false,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: "25%",
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",
  },
  fill: {
    opacity: 1,
  },
};

// Define the types for the props
interface ChartTwoProps {
  title: string; // Title prop
  producedCars: number[]; // Array for cars produced without problems
  carsWithProblems?: number[]; // Optional array for cars with problems
  timePeriod: 'weekly' | 'monthly'; // New prop for time period selection
}

const ChartFour: React.FC<ChartTwoProps> = ({ title, producedCars, carsWithProblems, timePeriod }) => {
  // Define categories based on the selected time period
  const xAxisCategories = timePeriod === 'weekly'
    ? ["M", "T", "W", "T", "F", "S", "S"] // Days of the week
    : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]; // Months

  // Define series dynamically based on provided props
  const series = [
    {
      name: "Energy consumption : Kwh",
      data: producedCars,
    },
    ...(carsWithProblems
      ? [
          {
            name:  "Energy consumption : Kwh",
            data: carsWithProblems,
          },
        ]
      : []),
  ];

  // Update the x-axis categories in the options
  const updatedOptions = {
    ...options,
    xaxis: {
      categories: xAxisCategories,
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">{title}</h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          <ReactApexChart
            options={updatedOptions}
            series={series}
            type="bar"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartFour;
