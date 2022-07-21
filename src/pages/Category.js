import React from "react";
import TaskItem from "../components/TaskItem";
import { useTasks } from "../contexts/TaskContext";

export default function Category({ title, sort, listId }) {
  const { userLists } = useTasks();

  // const tasks = userLists[listId].tasks.flat().filter(sort);
  const tasks = Object.values(
    Object.values(userLists)
      .map((list) => Object.values(list.tasks))
      .flat()
      .filter(sort)
  );

  // get current date and weekday
  const today = new Date().toLocaleString("en-us", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <>
      <div className="h-full w-full p-6 sm:p-8">
        <div className="flex w-full gap-2">
          <h1
            className="w-full min-w-0 truncate text-3xl font-semibold outline-none"
            placeholder="Untitled List"
          >
            {title}
          </h1>
        </div>
        {title === "Today" && (
          <p className="font-medium text-gray-500">{today}</p>
        )}
        <div className="-mx-2 mt-4 flex flex-col gap-0.5">
          {tasks.length ? (
            tasks.map((task, index) => (
              <TaskItem
                key={task.id + index}
                listId={task.listId}
                data={task}
              />
            ))
          ) : (
            <p className="ml-2 font-medium text-gray-700">No tasks</p>
          )}
        </div>
      </div>
    </>
  );
}
