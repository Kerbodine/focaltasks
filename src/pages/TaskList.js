import React, { useCallback, useEffect, useState } from "react";
import { HiPlusSm } from "react-icons/hi";
import NotFound from "../components/NotFound";
import TaskItem from "../components/TaskItem";
import { useTasks } from "../contexts/TaskContext";
import TaskSettings from "../components/TaskSettings";

export default function TaskList({ listId }) {
  const { createTask, userLists, userTasks, updateList } = useTasks();

  const newTask = () => {
    createTask(listId);
  };

  // Initialize list settings
  const [list, setList] = useState(
    userLists.filter((list) => list.id === listId)[0]
  );

  const filterTasks = useCallback(() => {
    let categoryTasks = [];
    if (list.category) {
      categoryTasks = userTasks.filter((task) =>
        task.categories.includes(list.id)
      );
      categoryTasks.sort(function (a, b) {
        var dateA = new Date(a.dueDate),
          dateB = new Date(b.dueDate);
        return dateA - dateB;
      });
    }
    return [
      ...categoryTasks,
      ...userTasks.filter((task) => task.listId === listId),
    ];
  }, [list, userTasks, listId]);

  const [tasks, setTasks] = useState([]);

  const [listTitle, setListTitle] = useState(list.title);
  const [listNotes, setListNotes] = useState(list.notes);

  useEffect(() => {
    setList(userLists.filter((list) => list.id === listId)[0]);
    setListTitle(list && list.title);
    setListNotes(list && list.notes);
    const newTasks = filterTasks();
    setTasks([...newTasks]);
  }, [userLists, userTasks, listId, list, filterTasks]);

  return (
    <>
      {list ? (
        <div className="h-full w-full p-6 sm:p-8">
          <div className="flex w-full gap-2">
            <input
              className="w-full min-w-0 truncate text-3xl font-semibold outline-none"
              value={listTitle}
              placeholder="Untitled List"
              onChange={(e) => !list.default && setListTitle(e.target.value)}
              onBlur={() => {
                list.title !== listTitle &&
                  updateList(listId, { title: listTitle });
              }}
            />
            {!list.default && <TaskSettings currentList={list} />}
          </div>
          <input
            className="w-full font-medium text-gray-600 placeholder-gray-400 outline-none"
            placeholder="Notes"
            value={listNotes}
            onChange={(e) => setListNotes(e.target.value)}
            onBlur={() => {
              updateList(listId, { notes: listNotes });
            }}
          />
          <div className="-mx-2 mt-4 flex flex-col gap-0.5">
            {tasks.map((task, index) =>
              list.hideCompleted === true ? (
                !task.completed && (
                  <TaskItem key={task.id + index} listId={listId} data={task} />
                )
              ) : (
                <TaskItem key={task.id + index} listId={listId} data={task} />
              )
            )}
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
