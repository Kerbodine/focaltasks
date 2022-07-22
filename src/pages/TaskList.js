import React, { useCallback, useEffect, useRef, useState } from "react";
import { HiPlusSm } from "react-icons/hi";
import NotFound from "../components/NotFound";
import TaskItem from "../components/TaskItem";
import { useTasks } from "../contexts/TaskContext";
import TaskSettings from "../components/TaskSettings";
import { useReactToPrint } from "react-to-print";

export default function TaskList({ listId, author }) {
  const { createTask, userLists, updateList } = useTasks();

  const newTask = () => {
    createTask(listId, author);
  };

  // Initialize list settings
  const [list, setList] = useState(
    Object.values(userLists).filter((list) => list.id === listId)[0]
  );

  const filterTasks = useCallback(() => {
    let categoryTasks = [];
    if (list.category) {
      categoryTasks = userLists[listId].tasks.filter(
        (task) => task.today || task.upcoming || task.important
      );
      categoryTasks.sort(function (a, b) {
        var dateA = new Date(a.dueDate),
          dateB = new Date(b.dueDate);
        return dateA - dateB;
      });
    }
    return [
      ...categoryTasks,
      ...Object.values(userLists[listId].tasks).filter(
        (task) => task.listId === listId
      ),
    ];
  }, [list, userLists, listId]);

  const [tasks, setTasks] = useState([]);

  const [listTitle, setListTitle] = useState(list.title);
  const [listNotes, setListNotes] = useState(list.notes);

  useEffect(() => {
    setList(Object.values(userLists).filter((list) => list.id === listId)[0]);
    setListTitle(list && list.title);
    setListNotes(list && list.notes);
    const newTasks = filterTasks();
    setTasks([...newTasks]);
  }, [userLists, listId, list, filterTasks]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      {list ? (
        <div
          className="flex h-full w-full flex-col overflow-y-auto p-6 print:p-16 sm:p-8"
          ref={componentRef}
        >
          <div className="flex w-full flex-none gap-2">
            <input
              className="w-full min-w-0 truncate text-3xl font-semibold outline-none"
              value={listTitle}
              placeholder="Untitled List"
              onChange={(e) => !list.default && setListTitle(e.target.value)}
              onBlur={() => {
                list.title !== listTitle &&
                  updateList(listId, { title: listTitle }, author);
              }}
            />
            {!list.default && (
              <TaskSettings currentList={list} handlePrint={handlePrint} />
            )}
          </div>
          <input
            className="w-full flex-none font-medium text-gray-600 placeholder-gray-400 outline-none print:placeholder:text-transparent"
            placeholder="Notes"
            value={listNotes}
            onChange={(e) => setListNotes(e.target.value)}
            onBlur={() => {
              updateList(listId, { notes: listNotes }, author);
            }}
          />
          <div className="flex-auto pb-14">
            <div className="-mx-2 mt-4 flex flex-col gap-0.5">
              {tasks.map(
                (task, index) =>
                  (list.hideCompleted
                    ? list.hideCompleted && !task.completed
                    : true) && (
                    <TaskItem
                      key={task.id + index}
                      listId={listId}
                      data={task}
                      author={
                        Object.values(userLists).filter(
                          (list) => list.id === task.listId
                        )[0].author
                      }
                    />
                  )
              )}
            </div>
            <button
              className="mt-4 flex h-9 flex-none items-center gap-2 rounded-lg border-2 border-dashed border-gray-200 pr-4 pl-2 text-gray-400 transition-all hover:border-solid hover:bg-gray-50 print:hidden"
              onClick={newTask}
            >
              <div className="grid h-5 w-5 place-items-center text-xl">
                <HiPlusSm />
              </div>
              <p className="text-sm font-medium">New Task</p>
            </button>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}
