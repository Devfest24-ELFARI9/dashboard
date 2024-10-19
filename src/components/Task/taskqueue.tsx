
import React from 'react';

interface TaskQueueProps {
  tasks: string[];
}

const TaskQueue: React.FC<TaskQueueProps> = ({ tasks }) => {
  return (
    <div className="h-screen w-full p-4  text-white overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Task Queue</h2>
      <div className="bg-gray-800 rounded-md overflow-auto">
        {tasks.length === 0 ? (
          <div className="p-4 text-center text-gray-400">No tasks in the queue.</div>
        ) : (
          tasks.map((task, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 border-b border-gray-700 last:border-b-0 hover:bg-gray-700 transition duration-200"
            >
              <span className="text-gray-300">{task}</span>
              <button className="px-3 py-1 bg-[#1A222C] text-white rounded hover:bg-[#24303F] transition duration-200">
                Complete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskQueue;
