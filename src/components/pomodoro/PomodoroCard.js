import React from "react";

export default function PomodoroCard() {
  return (
    <li className="flex w-full items-center rounded-lg border-2 border-gray-100 p-1">
      <div className="ml-1 mr-2 h-4 w-4 rounded-md bg-accent"></div>
      <p className="text-sm font-medium text-gray-500">Tag</p>
      <span className="ml-auto rounded-md bg-gray-100 px-1.5 py-0.5 text-sm font-medium text-gray-500">
        25 min
      </span>
    </li>
  );
}
