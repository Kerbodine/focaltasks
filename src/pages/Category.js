import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskItem from "../components/TaskItem";
import { useTasks } from "../contexts/TaskContext";

export default function Category({ title, sort }) {
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
            className="w-full min-w-0 truncate text-3xl font-semibold outline-none dark:text-white"
            placeholder="Untitled List"
          >
            {title}
          </h1>
        </div>
        {title === "Today" && (
          <p className="font-medium text-gray-500">{today}</p>
        )}
        <Droppable droppableId={title}>
          {(provided) => (
            <div
              className="-mx-2 mt-4 flex flex-col gap-0.5"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.length ? (
                tasks.map((task, index) => (
                  <TaskItem
                    index={index}
                    key={task.id + index}
                    listId={task.listId}
                    data={task}
                    author={
                      Object.values(userLists).filter(
                        (list) => list.id === task.listId
                      )[0].author
                    }
                  />
                ))
              ) : (
                <p className="ml-2 font-medium text-gray-700 dark:text-gray-300">
                  No tasks
                </p>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
}
