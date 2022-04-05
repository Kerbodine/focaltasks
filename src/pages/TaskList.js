import React, { useEffect, useMemo, useState } from "react";
import { HiPlusSm } from "react-icons/hi";
import { useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
import TaskItem from "../components/TaskItem";
import { useTasks } from "../contexts/TaskContext";
import TaskSettings from "../components/TaskSettings";

export default function TaskList() {
  const { createTask, userLists, deleteTask, updateTask, updateList } =
    useTasks();

  const { listId } = useParams();

  const newTask = () => {
    createTask(listId);
  };

  // Initialize list settings
  const [currentList, setCurrentList] = useState(
    userLists.filter((list) => list.id === listId)[0]
  );

  const [listTitle, setListTitle] = useState(currentList && currentList.title);
  const [listNotes, setListNotes] = useState(currentList && currentList.notes);

  useEffect(() => {
    setCurrentList(userLists.filter((list) => list.id === listId)[0]);
    setListTitle(currentList && currentList.title);
  }, [userLists, listId, currentList]);

  return (
    <>
      {currentList ? (
        <div className="h-full w-full p-8">
          <div className="flex w-full gap-2">
            <input
              className="w-full min-w-0 truncate text-3xl font-semibold outline-none"
              value={listTitle}
              placeholder="Untitled List"
              readOnly={currentList.id === "inbox"}
              onChange={(e) => setListTitle(e.target.value)}
              onBlur={() => {
                currentList.title !== listTitle &&
                  updateList(listId, { title: listTitle });
              }}
            />
            {currentList.id !== "inbox" && (
              <TaskSettings currentList={currentList} />
            )}
          </div>
          {currentList.id !== "inbox" && (
            <div className="">
              <input
                className="w-full font-medium text-gray-600 placeholder-gray-400 outline-none"
                placeholder="Notes"
                value={listNotes}
                onChange={(e) => setListNotes(e.target.value)}
                onBlur={() => {
                  updateList(listId, { notes: listNotes });
                }}
              />
            </div>
          )}
          <div className="relative -mx-2 mt-4 flex flex-col gap-2">
            {currentList.tasks.map((task) => (
              <TaskItem
                key={task.id}
                listId={listId}
                data={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
          </div>
          <button
            className="mt-4 flex h-9 items-center gap-2 rounded-lg border-2 border-dashed border-gray-200 pr-4 pl-2 text-gray-400 transition-all hover:border-solid hover:bg-gray-50"
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
    </>
  );
}
