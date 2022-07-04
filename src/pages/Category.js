import React from "react";
import TaskItem from "../components/TaskItem";
import { useTasks } from "../contexts/TaskContext";

export default function Category({ title, sort }) {
  const { userTasks } = useTasks();
  const tasks = userTasks.filter(sort);

  return (
    <>
      <div className="h-full w-full p-8">
        <div className="flex w-full gap-2">
          <h1
            className="w-full min-w-0 truncate text-3xl font-semibold outline-none"
            placeholder="Untitled List"
          >
            {title}
          </h1>
        </div>
        <div className="-mx-2 mt-4 flex flex-col gap-2">
          {tasks.length ? (
            tasks.map((task, index) => (
              <TaskItem
                key={task.id + index}
                listId={task.listId}
                data={task}
              />
            ))
          ) : (
            <p className="text-gray-700">No tasks</p>
          )}
        </div>
      </div>
    </>
  );
}
