import Calendar from "@/components/Calender";
import { Metadata } from "next";
import DashboardProvider from "@/providers/DashboardProvider";
import TaskQueue from "@/components/Task/taskqueue";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "Tasks Page",
  description:
    "Task",
};

const CalendarPage = () => {
  const tasks = [
    'Task 1: Fix bugs',
    'Task 2: Add new feature',
    'Task 3: Write documentation',
    'Task 4: Review code',
    'Task 4: Review code',
    'Task 4: Review code',
    'Task 4: Review code',
    'Task 4: Review code',
    'Task 4: Review code',
    
  ];
  return (
    <DashboardProvider>
      <Breadcrumb pageName="Tasks" />
      <div className="min-h-screen  flex items-center justify-center">
      <TaskQueue tasks={tasks} />
      </div>
      {/* <Calendar /> */}
    </DashboardProvider>
  );
};

export default CalendarPage;
