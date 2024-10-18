"use client";
import dynamic from "next/dynamic";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";





//first one :
const porductsperdday = "50 car";
const porductsperdday_rate = "0.34%";
//second :
const timecycle = "76 hours";
const timecycle_rate = "5.4%";
//third:
const total_consumed_power = "500 KWH";
const total_consumed_power_rate = "2.02%";
//forth
const revenue_per_day = "4 000 0000 $";
const revenue_per_day_rate = "1.2%";



//array of charts : 
const dd=[23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45]
const year=2024

//cars without problems , cars with problems : 
const goodcars=[5,3,14,12]
const badcars=[0,2,1,3]




const Global: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Products / day"
          total={porductsperdday}
          rate={porductsperdday_rate}
          levelUp
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="40"
            viewBox="0 0 64 64"
            fill="none"
          >
            <path d="M8 42H56L60 30H4L8 42Z" fill="#3C4B64" />
            <path
              d="M4 30H60C62.2091 30 64 31.7909 64 34V42C64 44.2091 62.2091 46 60 46H4C1.79086 46 0 44.2091 0 42V34C0 31.7909 1.79086 30 4 30Z"
              fill="#6D7F99"
            />
            <circle cx="14" cy="48" r="6" fill="#3C4B64" />
            <circle cx="50" cy="48" r="6" fill="#3C4B64" />
            <path
              d="M16 22H48C50.2091 22 52 23.7909 52 26V32H12V26C12 23.7909 13.7909 22 16 22Z"
              fill="#B0C4DE"
            />
            <path d="M0 34V30H4H60H64V34H60H4H0Z" fill="#6D7F99" />
          </svg>
        </CardDataStats>
        <CardDataStats
          title="Average Time of one cycle"
          total={timecycle}
          rate={timecycle_rate}
          levelDown
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="40"
            viewBox="0 0 64 64"
            fill="none"
          >
            <circle
              cx="32"
              cy="32"
              r="30"
              stroke="#3C4B64"
              strokeWidth="4"
              fill="#B0C4DE"
            />
            <line
              x1="32"
              y1="32"
              x2="32"
              y2="14"
              stroke="#3C4B64"
              strokeWidth="4"
            />
            <line
              x1="32"
              y1="32"
              x2="50"
              y2="32"
              stroke="#3C4B64"
              strokeWidth="4"
            />
            <circle cx="32" cy="32" r="2" fill="#3C4B64" />
            <text
              x="30"
              y="10"
              fill="#3C4B64"
              font-family="Arial"
              font-size="8"
            >
              12
            </text>
            <text
              x="54"
              y="34"
              fill="#3C4B64"
              font-family="Arial"
              font-size="8"
            >
              3
            </text>
            <text
              x="30"
              y="58"
              fill="#3C4B64"
              font-family="Arial"
              font-size="8"
            >
              6
            </text>
            <text x="6" y="34" fill="#3C4B64" font-family="Arial" font-size="8">
              9
            </text>
          </svg>
        </CardDataStats>
        <CardDataStats
          title="Total Consumed Power"
          total={total_consumed_power}
          rate={total_consumed_power_rate}
          levelUp
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
          >
            <circle
              cx="32"
              cy="32"
              r="10"
              fill="#FFD700"
              stroke="#3C4B64"
              strokeWidth="2"
            />

            <line
              x1="32"
              y1="10"
              x2="32"
              y2="2"
              stroke="#FFD700"
              strokeWidth="2"
            />
            <line
              x1="32"
              y1="54"
              x2="32"
              y2="62"
              stroke="#FFD700"
              strokeWidth="2"
            />
            <line
              x1="10"
              y1="32"
              x2="2"
              y2="32"
              stroke="#FFD700"
              strokeWidth="2"
            />
            <line
              x1="54"
              y1="32"
              x2="62"
              y2="32"
              stroke="#FFD700"
              strokeWidth="2"
            />
            <line
              x1="46"
              y1="46"
              x2="52"
              y2="52"
              stroke="#FFD700"
              strokeWidth="2"
            />
            <line
              x1="46"
              y1="18"
              x2="52"
              y2="12"
              stroke="#FFD700"
              strokeWidth="2"
            />
            <line
              x1="18"
              y1="46"
              x2="12"
              y2="52"
              stroke="#FFD700"
              strokeWidth="2"
            />
            <line
              x1="18"
              y1="18"
              x2="12"
              y2="12"
              stroke="#FFD700"
              strokeWidth="2"
            />

            <rect x="28" y="42" width="8" height="12" fill="#3C4B64" />
          </svg>
        </CardDataStats>
        <CardDataStats
          title="Revenue/ day"
          total={revenue_per_day}
          rate={revenue_per_day_rate}
          levelDown
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 64 64"
            fill="none"
          >
            <rect
              x="4"
              y="16"
              width="56"
              height="32"
              rx="4"
              fill="#4CAF50"
              stroke="#2E7D32"
              strokeWidth="2"
            />

            <circle
              cx="32"
              cy="32"
              r="10"
              fill="#C8E6C9"
              stroke="#2E7D32"
              strokeWidth="2"
            />

            <text
              x="27"
              y="37"
              font-family="Arial"
              font-size="20"
              fill="#2E7D32"
            >
              $
            </text>
          </svg>
        </CardDataStats>
      </div>

      <div className="mt-16 grid grid-cols-12 gap-4 md:mt-16 md:gap-6 2xl:mt-16 2xl:gap-7.5">
        <ChartOne year={year} dataOne={dd} />
        <ChartTwo title={"cars production"} producedCars={goodcars} carsWithProblems={badcars}  timePeriod={"weekly"}/>
        {/* <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard /> */}
      </div>
    </>
  );
};

export default Global;
