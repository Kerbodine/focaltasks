import { useState, useEffect } from "react";
import { BiCheck } from "react-icons/bi";
import { HiExclamationCircle, HiPlusSm, HiX } from "react-icons/hi";

export default function TaskItem({
  listId,
  data: { id, title, completed, dueDate, today, important },
  deleteTask,
  updateTask,
}) {
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskCompleted, setTaskCompleted] = useState(completed);
  const [taskImportant, setTaskImportant] = useState(important);
  const [taskDueDate, setTaskDueDate] = useState(dueDate);
  const [taskExpanded, setTaskExpanded] = useState(false);

  const toggleTaskCompleted = () => {
    updateTask(listId, id, { completed: !taskCompleted });
    setTaskCompleted(!taskCompleted);
  };

  const toggleTaskImportant = () => {
    updateTask(listId, id, { important: !taskImportant });
    setTaskImportant(!taskImportant);
  };

  useEffect(() => {
    setTaskCompleted(completed);
  }, [completed]);

  return (
    <div
      className={`${
        taskExpanded
          ? "h-[72px] bg-gray-50 ring-gray-300 focus-within:ring-2"
          : "h-10 hover:bg-gray-50"
      } group flex w-full overflow-hidden rounded-lg p-2 outline-none transition-all`}
    >
      <div className="flex w-full gap-2">
        <button
          className={`h-6 w-6 flex-none rounded-md text-2xl text-white outline-none transition-colors ${
            taskCompleted ? "bg-accent" : "border-2 border-gray-300"
          }`}
          onClick={() => toggleTaskCompleted()}
        >
          {taskCompleted && <BiCheck />}
        </button>
        {/* Task badges and input */}
        <div
          tabIndex="0"
          className="flex flex-auto flex-col gap-2 outline-none"
          onFocus={() => setTaskExpanded(true)}
          onBlur={() => setTaskExpanded(false)}
        >
          {/* First row input */}
          <div className="flex w-full items-center gap-1">
            {/* Task important icon */}
            <div
              className={`${
                taskImportant ? "h-5 w-5" : "h-0 w-0"
              } flex-none overflow-hidden text-xl text-gray-500 transition-all`}
            >
              <HiExclamationCircle />
            </div>
            {/* Task title input */}
            <input
              className={`h-6 w-full flex-auto truncate bg-transparent font-medium placeholder-gray-400 outline-none transition-colors ${
                taskCompleted ? "text-gray-400 line-through" : "text-gray-600"
              } ${taskTitle === "" && "no-underline"}`}
              placeholder="Task title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              onBlur={() => {
                taskTitle !== title &&
                  updateTask(listId, id, { title: taskTitle });
              }}
            />
          </div>
          {/* Second row */}
          <div className="flex w-full">
            <div className={`flex w-full gap-2`}>
              {/* Toggle important button */}
              <button
                className={`${
                  taskImportant ? "bg-gray-500 text-white" : "bg-gray-200"
                } ml-auto flex h-6 items-center gap-1 rounded-md px-1 text-sm font-medium text-gray-600 transition-colors`}
                onClick={toggleTaskImportant}
              >
                <span className="text-xl">
                  {taskImportant ? <HiExclamationCircle /> : <HiPlusSm />}
                </span>
                <p className="mr-1 hidden sm:block">Important</p>
              </button>
              {/* Due date input */}
              <input
                type="date"
                className="h-6 w-40 rounded-md bg-gray-200 px-2 text-sm font-medium text-gray-600 placeholder-gray-400 outline-none"
                placeholder="Due date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
                onBlur={() =>
                  taskDueDate !== dueDate &&
                  updateTask(listId, id, { dueDate: taskDueDate })
                }
              />
            </div>
          </div>
        </div>
        <button
          className="mr-2 grid h-6 w-6 flex-none place-items-center text-xl text-gray-400 opacity-0 transition-opacity hover:text-gray-600 group-hover:inline-flex group-hover:opacity-100"
          onClick={() => deleteTask(listId, id)}
        >
          <HiX />
        </button>
      </div>
    </div>
  );
}
