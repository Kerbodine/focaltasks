import { useState } from "react";
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

  return (
    <div
      className={`group flex h-9 w-full items-center gap-3 rounded-lg px-2 hover:bg-gray-50`}
    >
      <button
        className={`h-6 w-6 flex-none rounded-md text-2xl ${
          taskCompleted ? "bg-accent text-white" : "border-2 border-gray-400"
        }`}
        onClick={toggleTaskCompleted}
      >
        {taskCompleted && <BiCheck />}
      </button>
      <input
        className="w-full flex-auto truncate bg-transparent font-medium text-gray-500 outline-none"
        placeholder="Task title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        onBlur={() =>
          taskTitle !== title && updateTask(listId, id, { title: taskTitle })
        }
      />
      <button
        className="mr-2 hidden flex-none text-xl text-gray-400 hover:text-gray-600 group-hover:inline-flex"
        onClick={() => deleteTask(listId, id)}
      >
        <HiX />
      </button>
    </div>
  );
}
