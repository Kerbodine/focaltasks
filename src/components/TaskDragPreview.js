import React from "react";
import { useSettings } from "../contexts/SettingsContext";
import { useTasks } from "../contexts/TaskContext";

export default function TaskDragPreview({ title, completed }) {
  const { completedAppearance } = useSettings();

  return (
    <div className="flex h-10 w-64 items-center gap-3 rounded-lg bg-white px-2 shadow-lg ring-2 ring-gray-200 dark:bg-gray-900 dark:ring-gray-700">
      <input
        type="checkbox"
        checked={completed}
        readOnly
        className="h-6 w-6 flex-none cursor-pointer rounded-md border-2 border-gray-300 bg-transparent text-2xl text-accent transition-colors focus:outline-none focus:ring-0 focus:ring-offset-0 dark:border-gray-600 dark:checked:border-none"
      />
      <input
        className={`h-6 w-full flex-auto truncate bg-transparent font-medium placeholder-gray-300 outline-none transition-colors dark:placeholder-gray-600 ${
          completed
            ? `text-gray-400 dark:text-gray-500 ${
                completedAppearance !== "fade" && "line-through"
              }`
            : "text-gray-600 dark:text-gray-300"
        } ${title === "" && "no-underline"}`}
        placeholder="Task title"
        value={title}
        readOnly
      />
    </div>
  );
}
