import { useState, useEffect } from "react";
import { BiCheck } from "react-icons/bi";
import { HiX } from "react-icons/hi";

export default function TaskItem({
  id,
  listId,
  title,
  completed,
  deleteTask,
  updateTask,
  toggleTask,
}) {
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskCompleted, setTaskCompleted] = useState(completed);

  const toggleTaskCompleted = () => {
    toggleTask(listId, id);
    setTaskCompleted(!taskCompleted);
  };

  useEffect(() => {
    setTaskCompleted(completed);
  }, [completed]);

  return (
    <div
      className={`group flex w-full items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50`}
    >
      <button
        className={`h-6 w-6 flex-none rounded-md text-2xl text-white transition-colors ${
          taskCompleted ? "bg-accent" : "border-2 border-gray-300"
        }`}
        onClick={toggleTaskCompleted}
      >
        {taskCompleted && <BiCheck />}
      </button>
      <input
        className={`w-full flex-auto truncate bg-transparent font-medium placeholder-gray-400 outline-none ${
          taskCompleted ? "text-gray-400 line-through" : "text-gray-600"
        }`}
        placeholder="Task title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        onBlur={() =>
          taskTitle !== title && updateTask(listId, id, { title: taskTitle })
        }
      />
      <button
        className="mr-2 flex-none text-xl text-gray-400 opacity-0 transition-opacity hover:text-gray-600 group-hover:inline-flex group-hover:opacity-100"
        onClick={() => deleteTask(listId, id)}
      >
        <HiX />
      </button>
    </div>
  );
}
