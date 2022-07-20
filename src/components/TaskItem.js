import { useState, useEffect } from "react";
import { BiCheck } from "react-icons/bi";
import {
  HiExclamationCircle,
  HiFlag,
  HiOutlineExclamationCircle,
  HiOutlineSun,
  HiSun,
  HiX,
} from "react-icons/hi";
import { useTasks } from "../contexts/TaskContext";
import DatePicker from "react-datepicker";
import { useSettings } from "../contexts/SettingsContext";
import DeleteTaskModal from "./DeleteTaskModal";

export default function TaskItem({
  data: { id, title, completed, dueDate, categories },
}) {
  const { addCategory, removeCategory, deleteTask, updateTask } = useTasks();
  const { calendarStartDay, completedAppearance, taskDeleteWarning } =
    useSettings();

  const [taskTitle, setTaskTitle] = useState(title);
  const [taskCompleted, setTaskCompleted] = useState(completed);
  const [taskImportant, setTaskImportant] = useState(
    categories.includes("important")
  );
  const [taskToday, setTaskToday] = useState(categories.includes("today"));
  const [taskDueDate, setTaskDueDate] = useState(dueDate);
  const [taskExpanded, setTaskExpanded] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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

  const updateDueDate = (date) => {
    updateTask(id, { dueDate: date });
    if (date === null) {
      removeCategory(id, "upcoming");
    } else {
      addCategory(id, "upcoming");
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
  }, [completed]);

  useEffect(() => {
    updateDueDate(taskDueDate);
  }, [taskDueDate]);

  function iOS() {
    return (
      [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
      ].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
  }

  return (
    <div
      className={`${
        taskExpanded ? "h-[72px] bg-white ring-2 ring-gray-200" : "h-10"
      } flex w-full overflow-hidden rounded-lg p-2 outline-none transition-all`}
    >
      <div className="flex w-full gap-3">
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
                taskTitle !== title && updateTask(id, { title: taskTitle });
              }}
            />
            {taskDueDate && (
              <div className="mr-2 flex h-6 items-center rounded-md bg-gray-100 px-1 text-sm font-medium text-gray-600">
                <span className="text-lg text-gray-500">
                  <HiFlag />
                </span>
                <p className="mr-1 whitespace-nowrap">{getDueInDays()}</p>
              </div>
            )}
            <button
              className={`h-6 w-6 flex-none place-items-center text-xl text-gray-400 transition-opacity hover:text-gray-600 ${
                taskExpanded ? "inline-block" : "hidden"
              }`}
              onClick={() => {
                if (taskDeleteWarning) {
                  setDeleteModalOpen(true);
                } else {
                  deleteTask(id);
                }
              }}
            >
              <HiX />
            </button>
          </div>
          {/* Second row */}
          <div className="flex w-full">
            <div className={`flex w-full gap-1`}>
              {/* Toggle today button */}
              <button
                className={`${
                  taskToday ? "bg-gray-500 text-white" : "hover:bg-gray-100"
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
                  taskImportant ? "bg-gray-500 text-white" : "hover:bg-gray-100"
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
              <div className="mr-1">
                {iOS() ? (
                  <input
                    type="date"
                    className="block h-6 w-24 rounded-md bg-gray-100 px-1 text-sm font-medium text-gray-600 placeholder-gray-400 outline-none"
                    value={taskDueDate}
                    placeholder="Due date"
                    onInput={(e) => {
                      const target = e.nativeEvent.target;
                      function iosClearDefault() {
                        target.defaultValue = "";
                      }
                      window.setTimeout(iosClearDefault, 0);
                      setTaskDueDate(null);
                    }}
                    onChange={(e) => {
                      setTaskDueDate(e.target.value);
                    }}
                  />
                ) : (
                  <DatePicker
                    placeholderText="Enter deadline"
                    selected={new Date(taskDueDate)}
                    onClickOutside={() => setTaskExpanded(false)}
                    onChange={(date) => {
                      const dateString = date.toISOString().split("T")[0];
                      setTaskDueDate(dateString);
                      setTaskExpanded(false);
                    }}
                    todayButton="☉Today"
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
        modalOpen={deleteModalOpen}
        setModalOpen={setDeleteModalOpen}
      />
    </div>
  );
}
