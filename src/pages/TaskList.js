import React, { useEffect, useState } from "react";
import { HiPlusSm } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import NotFound from "../components/NotFound";
import TaskItem from "../components/TaskItem";
import { useTasks } from "../contexts/TaskContext";

export default function TaskList() {
  const { createTask, userLists, deleteTask, updateTask, updateList } =
    useTasks();

  const { pathname } = useLocation();
  let listId = "";
  if (pathname === "/") {
    listId = "inbox";
  } else {
    listId = pathname.substring(1);
  }

  const newTask = () => {
    createTask(listId);
  };

  // Initialize list settings
  const [currentList, setCurrentList] = useState(
    userLists.filter((list) => list.id === listId)[0]
  );
  const [listTitle, setListTitle] = useState(currentList && currentList.title);

  useEffect(() => {
    setCurrentList(userLists.filter((list) => list.id === listId)[0]);
    setListTitle(currentList && currentList.title);
  }, [userLists, listId, currentList]);

  return (
    <div className="h-full w-full">
      <div className="h-[56px] w-full border-b border-gray-200"></div>
      {currentList ? (
        <div className="h-full w-full p-8">
          <h1>
            <input
              className="text-2xl font-semibold outline-none"
              value={listTitle}
              placeholder="Untitled List"
              readOnly={currentList.id === "inbox"}
              onChange={(e) => setListTitle(e.target.value)}
              onBlur={() => {
                currentList.title !== listTitle &&
                  updateList(listId, { title: listTitle });
              }}
            />
          </h1>
          <div className="-mx-2 mt-2 flex flex-col gap-1">
            {currentList.tasks.map((task) => (
              <TaskItem
                id={task.id}
                key={task.id}
                title={task.title}
                listId={listId}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
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
      ) : (
        <NotFound />
      )}
    </div>
  );
}
