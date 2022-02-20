import { useState } from "react";
import { HiX } from "react-icons/hi";

export default function TaskItem({
  id,
  listId,
  title,
  deleteTask,
  updateTask,
}) {
  const [taskTitle, setTaskTitle] = useState(title);

  return (
    <div
      className={`group flex h-9 w-full items-center gap-2 rounded-lg px-2 hover:bg-gray-50`}
    >
      <div className="h-5 w-5 flex-none rounded-md border-2 border-gray-400"></div>
      <input
        className="flex-auto bg-transparent font-medium text-gray-500 outline-none"
        placeholder="Task title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        onBlur={() =>
          taskTitle !== title && updateTask(listId, id, { title: taskTitle })
        }
      />
      <button
        className="hidden flex-none text-xl text-gray-400 hover:text-gray-600 group-hover:inline-flex"
        onClick={() => deleteTask(listId, id)}
      >
        <HiX />
      </button>
    </div>
  );
}
