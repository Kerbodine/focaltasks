import React from "react";
import { HiPlusSm } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { useTasks } from "../contexts/TaskContext";

export default function TaskList() {
  const { pathname } = useLocation();
  const { createTask } = useTasks();

  const newTask = () => {
    createTask(`/Lists${pathname}/Tasks`);
  };

  return (
    <div className="h-full w-full">
      <div className="h-[56px] w-full border-b border-gray-200"></div>
      <div className="h-full w-full p-8">
        <h1 className="text-2xl font-semibold">Custom List</h1>
        <div className="-mx-2 mt-2 flex flex-col gap-1">
          {/* {userInbox.map((task) => (
            <TaskItem
              id={task.id}
              key={task.id}
              title={task.title}
              path="Inbox"
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))} */}
        </div>
        <button
          className="mt-4 flex h-9 items-center gap-2 rounded-lg border-2 border-dashed border-gray-200 pr-4 pl-2 text-gray-400 hover:border-solid hover:bg-gray-50"
          onClick={newTask}
        >
          <div className="grid h-5 w-5 place-items-center text-xl">
            <HiPlusSm />
          </div>
          <p className="text-sm font-medium">New Task</p>
        </button>
      </div>
    </div>
  );
}
