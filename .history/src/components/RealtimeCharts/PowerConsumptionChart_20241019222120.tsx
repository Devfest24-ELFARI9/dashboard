"use client";

import { ApexOptions } from "apexcharts";
import React, { use, useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import useSocket from "@/app/hooks/useSocket";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE", "#DC3545"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
    animations: {
      enabled: true, // Enables animation (default is true)
      easing: "linear", // Animation easing option, can also be "linear", "easeout", etc.
      speed: 800, // Duration of animation in milliseconds
      animateGradually: {
        enabled: true, // Controls whether series should animate one by one
        delay: 150, // Delay between series animation in milliseconds
      },
      dynamicAnimation: {
        enabled: false, // Enable/disable dynamic animations on data updates
        speed: 350, // Speed of dynamic animation
      },
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE", "#DC3545"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 12,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

export const data = [
  {
    name: "Temperature",
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
  },

  {
    name: "Vibration",
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
  },
  {
    name: "Power Consumption",
    data: [25, 28, 36, 70, 45, 45, 25, 52, 52, 66, 40, 51],
  },
];

const PowerConsumptionChart: React.FC = ({
  timestamps,
}: {
  data: {
    name: string;
    data: number[];
  }[];
  timestamps: string[];
}) => {
  const [data, setData] = React.useState<
    {
      name: string;
      data: number[];
    }[]
  >([
    {
      name: "Real Time Power Consumption",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ]);

  useEffect(() => {
    boolRef.current = !boolRef.current;
    console.log("data", data);
  }, [data]);

  const onMessage = (message: any) => {
    setData((prevData) => {
      const newData = [...prevData];
      if (message !== undefined) {
        newData[0].data = [...newData[0].data, message];
        newData[0].data.shift();
      }
      return [...newData];
    });
  };

  const boolRef = useRef<boolean>(true);

  useSocket('power_consumption',onMessage, (error) => console.error(error));

  const plot = useMemo(
    () => (
      <ReactApexChart
        key={boolRef.current?.toString()}
        options={options}
        series={data}
        type="line"
        height={350}
        width={"100%"}
      />
    ),
    [data],
  );

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Real Time Power Consumption</p>
              {/* <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p> */}
            </div>
          </div>
        </div>
        {/* <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white px-3 py-1 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Day
            </button>
            <button className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Week
            </button>
            <button className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div>
        </div> */}
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          {data && plot}
        </div>
      </div>
    </div>
  );
};

export default PowerConsumptionChart;
