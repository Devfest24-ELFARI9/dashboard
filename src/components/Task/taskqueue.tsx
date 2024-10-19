import React from 'react'

const color="#1A222C"
interface TaskQueueProps {
    tasks: string[];
  }

  const TaskQueue: React.FC<TaskQueueProps> = ({ tasks }) => {
    return (
      <div className="max-w-lg mx-auto my-5 p-4 border border-gray-200 rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-bold mb-4">Task Queue</h2>
        <div className="bg-gray-50 rounded-md overflow-hidden">
          {tasks.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No tasks in the queue.</div>
          ) : (
            tasks.map((task, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-100 transition duration-200"
              >
                <span className="text-gray-700">{task}</span>
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
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
