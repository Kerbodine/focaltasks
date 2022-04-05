import { useState, useEffect } from "react";
import { BiCheck } from "react-icons/bi";
import {
  HiExclamationCircle,
  HiOutlineExclamationCircle,
  HiOutlineStar,
  HiOutlineSun,
  HiStar,
  HiSun,
  HiX,
} from "react-icons/hi";
import { useTasks } from "../contexts/TaskContext";

export default function TaskItem({
  data: { id, title, completed, dueDate, categories },
  deleteTask,
  updateTask,
}) {
  const { addCategory, removeCategory } = useTasks();

  const [taskTitle, setTaskTitle] = useState(title);
  const [taskCompleted, setTaskCompleted] = useState(completed);
  const [taskImportant, setTaskImportant] = useState(
    categories.includes("important")
  );
  const [taskToday, setTaskToday] = useState(categories.includes("today"));
  const [taskDueDate, setTaskDueDate] = useState(dueDate);
  const [taskExpanded, setTaskExpanded] = useState(false);

  const toggleTaskCompleted = () => {
    updateTask(id, { completed: !taskCompleted });
    setTaskCompleted(!taskCompleted);
  };

  const toggleTaskImportant = () => {
    setTaskImportant(!taskImportant);
    if (categories.includes("important")) {
      removeCategory(id, "important");
    } else {
      addCategory(id, "important");
    }
  };

  const toggleTaskToday = () => {
    setTaskToday(!taskToday);
    if (categories.includes("today")) {
      removeCategory(id, "today");
    } else {
      addCategory(id, "today");
    }
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
          <div className="flex w-full items-center">
            {/* Task today icon */}
            <div
              className={`${
                taskToday ? "mr-1 h-5 w-5" : "h-0 w-0"
              } flex-none overflow-hidden text-xl text-gray-500 transition-all`}
            >
              <HiSun />
            </div>
            {/* Task important icon */}
            <div
              className={`${
                taskImportant ? "mr-1 h-5 w-5" : "h-0 w-0"
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
                taskTitle !== title && updateTask(id, { title: taskTitle });
              }}
            />
            <button
              className="grid h-6 w-6 flex-none place-items-center text-xl text-gray-400 opacity-0 transition-opacity hover:text-gray-600 group-hover:inline-flex group-hover:opacity-100"
              onClick={() => deleteTask(id)}
            >
              <HiX />
            </button>
          </div>
          {/* Second row */}
          <div className="flex w-full">
            <div className={`flex w-full gap-2`}>
              {/* Toggle today button */}
              <button
                className={`${
                  taskToday ? "bg-gray-500 text-white" : "bg-gray-200"
                } ml-auto flex h-6 items-center gap-1 rounded-md px-1 text-sm font-medium text-gray-600 transition-colors`}
                onClick={toggleTaskToday}
              >
                <span className="text-xl">
                  {taskToday ? <HiSun /> : <HiOutlineSun />}
                </span>
                <p className="mr-1 hidden sm:block">Today</p>
              </button>
              {/* Toggle important button */}
              <button
                className={`${
                  taskImportant ? "bg-gray-500 text-white" : "bg-gray-200"
                } flex h-6 items-center gap-1 rounded-md px-1 text-sm font-medium text-gray-600 transition-colors`}
                onClick={toggleTaskImportant}
              >
                <span className="text-xl">
                  {taskImportant ? (
                    <HiExclamationCircle />
                  ) : (
                    <HiOutlineExclamationCircle />
                  )}
                </span>
                <p className="mr-1 hidden sm:block">Important</p>
              </button>
              {/* Due date input */}
              <input
                type="date"
                className="h-6 w-40 rounded-md bg-gray-200 px-2 text-sm font-medium text-gray-600 placeholder-gray-400 outline-none"
                placeholder="Due date"
                value={taskDueDate ? taskDueDate : ""}
                onChange={(e) => setTaskDueDate(e.target.value)}
                onBlur={() =>
                  taskDueDate !== dueDate &&
                  updateTask(id, { dueDate: taskDueDate })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
