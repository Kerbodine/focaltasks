import { useState, useEffect } from "react";
import {
  HiExclamationCircle,
  HiFlag,
  HiOutlineExclamationCircle,
  HiOutlineFlag,
  HiOutlineSun,
  HiSun,
  HiX,
} from "react-icons/hi";
import { useTasks } from "../contexts/TaskContext";
import DatePicker from "react-datepicker";
import { useSettings } from "../contexts/SettingsContext";
import DeleteTaskModal from "./modals/DeleteTaskModal";
import { iOS } from "../config/functions";
import toast from "react-hot-toast";
import { BiX } from "react-icons/bi";

export default function TaskItem({
  author,
  data: { id, title, completed, dueDate, today, important, listId },
}) {
  const { deleteTask, updateTask } = useTasks();
  const { calendarStartDay, completedAppearance, taskDeleteWarning } =
    useSettings();

  const [taskTitle, setTaskTitle] = useState(title);
  const [taskCompleted, setTaskCompleted] = useState(completed);
  const [taskImportant, setTaskImportant] = useState(important);
  const [taskToday, setTaskToday] = useState(today);
  const [taskDueDate, setTaskDueDate] = useState(dueDate);
  const [taskExpanded, setTaskExpanded] = useState(false);
  // const [dueIn, setDueIn] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const toggleTaskCompleted = () => {
    updateTask(id, { completed: !taskCompleted }, listId, author);
    setTaskCompleted(!taskCompleted);
  };

  const toggleTaskImportant = () => {
    setTaskImportant(!taskImportant);
    if (important) {
      updateTask(id, { important: false }, listId, author);
    } else {
      updateTask(id, { important: true }, listId, author);
    }
  };

  const toggleTaskToday = () => {
    setTaskToday(!taskToday);
    if (today) {
      updateTask(id, { today: false }, listId, author);
    } else {
      updateTask(id, { today: true }, listId, author);
    }
  };

  const getDueInDays = () => {
    const today = new Date();
    const dueDate = new Date(taskDueDate);
    const diffTime = dueDate - today.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
    if (Math.abs(diffDays) > 99) {
      return dueDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
      });
    } else if (diffDays < -1) {
      return `${Math.abs(diffDays)} days ago`;
    } else if (diffDays === -1) {
      return "Yesterday";
    } else if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Tomorrow";
    } else {
      return `${diffDays} days`;
    }
  };

  useEffect(() => {
    setTaskCompleted(completed);
    setTaskTitle(title);
    setTaskImportant(important);
    setTaskToday(today);
    setTaskDueDate(dueDate);
  }, [completed, title, important, today, dueDate]);

  const updateDate = (date) => {
    setTaskDueDate(date);
    if (date !== taskDueDate) {
      if (date === null || date === "") {
        updateTask(id, { dueDate: date, upcoming: false }, listId, author);
      } else {
        updateTask(id, { dueDate: date, upcoming: true }, listId, author);
      }
    }
  };

  const adjustTimezone = (date) => {
    return new Date(
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
    );
  };

  return (
    <div
      className={`${
        taskExpanded
          ? "h-[76px] bg-white shadow-lg ring-2 ring-gray-200"
          : "h-10"
      } flex w-full overflow-hidden rounded-lg p-2 outline-none transition-all`}
    >
      <div className="flex w-full gap-3">
        <input
          type="checkbox"
          checked={taskCompleted}
          className="h-6 w-6 flex-none cursor-pointer rounded-md border-2 border-gray-300 text-2xl text-accent transition-colors focus:outline-none focus:ring-0 focus:ring-offset-0"
          onChange={() => toggleTaskCompleted()}
        />
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
              className={`h-6 w-full flex-auto truncate bg-transparent font-medium placeholder-gray-300 outline-none transition-colors ${
                taskCompleted
                  ? `text-gray-400 ${
                      completedAppearance !== "fade" && "line-through"
                    }`
                  : "text-gray-600"
              } ${taskTitle === "" && "no-underline"}`}
              placeholder="Task title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              onBlur={() => {
                taskTitle !== title &&
                  updateTask(id, { title: taskTitle }, listId, author);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.target.blur();
                }
              }}
            />
            {taskDueDate && (
              <div className="mr-2 flex h-6 items-center rounded-md bg-gray-100 px-1 text-sm font-medium text-gray-600">
                <span className="text-lg text-gray-500">
                  <HiFlag />
                </span>
                <p className="mr-1 whitespace-nowrap">{`${getDueInDays()}`}</p>
              </div>
            )}
            <button
              className={`h-6 w-6 flex-none place-items-center text-xl text-gray-400 hover:text-gray-600 ${
                taskExpanded ? "block" : "w-0 text-[0px]" // hide button patch
              }`}
              onClick={() => {
                if (taskDeleteWarning) {
                  setDeleteModalOpen(true);
                } else {
                  deleteTask(id, listId, author);
                  toast.success("Task deleted");
                }
              }}
            >
              <HiX />
            </button>
          </div>
          {/* Second row */}
          <div
            className={`flex w-full ${
              taskExpanded ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className={`flex w-full gap-2`}>
              {/* Toggle today button */}
              <button
                className={`${
                  taskToday ? "bg-gray-500 text-white" : "bg-gray-100"
                } ml-auto flex h-7 items-center gap-1 rounded-md px-1.5 text-sm font-medium text-gray-600 transition-colors`}
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
                  taskImportant ? "bg-gray-500 text-white" : "bg-gray-100"
                } flex h-7 items-center gap-1 rounded-md px-1.5 text-sm font-medium text-gray-600 transition-colors`}
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
              <div
                className={`flex h-7 w-36 items-center rounded-md px-1.5 text-sm font-medium ${
                  taskDueDate
                    ? "bg-gray-500 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <span className="mr-1 text-xl">
                  {taskDueDate ? <HiFlag /> : <HiOutlineFlag />}
                </span>
                {iOS() ? (
                  <input
                    type="date"
                    className={`w-28 ${
                      taskDueDate
                        ? "bg-gray-500 text-white"
                        : "bg-gray-100 text-gray-600"
                    } border-0 p-0 text-left text-sm placeholder-gray-400`}
                    value={taskDueDate ? taskDueDate : ""}
                    placeholder="Due date"
                    onInput={(e) => {
                      const target = e.nativeEvent.target;
                      function iosClearDefault() {
                        target.defaultValue = "";
                      }
                      window.setTimeout(iosClearDefault, 0);
                      updateDate(null);
                    }}
                    onChange={(e) => {
                      updateDate(e.target.value);
                    }}
                  />
                ) : (
                  <DatePicker
                    placeholderText="Enter deadline"
                    selected={taskDueDate ? new Date(taskDueDate) : ""}
                    onClickOutside={() => setTaskExpanded(false)}
                    onChange={(date) => {
                      if (date) {
                        const newDate = adjustTimezone(date);
                        const dateString = newDate.toISOString().split("T")[0];
                        updateDate(dateString);
                        setTaskExpanded(false);
                      } else {
                        updateDate(null);
                      }
                    }}
                    todayButton="Today"
                    dateFormat="dd/MM/yyyy"
                    format="y-MM-dd"
                    calendarStartDay={calendarStartDay}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteTaskModal
        taskId={id}
        listId={listId}
        author={author}
        modalOpen={deleteModalOpen}
        setModalOpen={setDeleteModalOpen}
      />
    </div>
  );
}
