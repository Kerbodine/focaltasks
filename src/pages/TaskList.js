import React, { useEffect, useState } from "react";
import { HiPlusSm } from "react-icons/hi";
import { useOutletContext, useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
import TaskItem from "../components/TaskItem";
import { useTasks } from "../contexts/TaskContext";
import TaskSettings from "../components/TaskSettings";

export default function TaskList({ listId }) {
  const {
    createTask,
    userLists,
    userTasks,
    deleteTask,
    updateTask,
    updateList,
  } = useTasks();

  const newTask = () => {
    createTask(listId);
  };

  // Initialize list settings
  const [list, setList] = useState(
    userLists.filter((list) => list.id === listId)[0]
  );

  const [tasks, setTasks] = useState(
    userTasks.filter((task) => task.listId === listId)
  );

  const [listTitle, setListTitle] = useState(list.title);
  const [listNotes, setListNotes] = useState(list.notes);

  useEffect(() => {
    setList(userLists.filter((list) => list.id === listId)[0]);
    setListTitle(list && list.title);
    setListNotes(list && list.notes);
  }, [userLists, userTasks, listId, list]);

  useEffect(() => {
    setTasks(userTasks.filter((task) => task.listId === listId));
  }, [userTasks, listId]);

  return (
    <>
      {list ? (
        <div className="h-full w-full p-8">
          <div className="flex w-full gap-2">
            <input
              className="w-full min-w-0 truncate text-3xl font-semibold outline-none"
              value={listTitle}
              placeholder="Untitled List"
              onChange={(e) =>
                list.id !== "inbox" && setListTitle(e.target.value)
              }
              onBlur={() => {
                list.title !== listTitle &&
                  updateList(listId, { title: listTitle });
              }}
            />
            {list.id !== "inbox" && <TaskSettings currentList={list} />}
          </div>
          {list.id !== "inbox" && (
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
            {tasks.map((task) => (
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
