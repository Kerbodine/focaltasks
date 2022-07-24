import React from "react";
import { HiCheckCircle, HiMinusCircle, HiXCircle } from "react-icons/hi";
import { usePomodoro } from "../../contexts/PomodoroContext";

export default function PomodoroCard({ session }) {
  const { currentId } = usePomodoro();

  return (
    <li className="flex w-full items-center rounded-lg border-2 border-gray-100 px-1.5 py-1">
      <div className="mr-1 text-2xl">
        {session.completed ? (
          <HiCheckCircle className="text-accent" />
        ) : currentId === session.id ? (
          <HiMinusCircle className="animate-spin-slow text-gray-400" />
        ) : (
          <HiXCircle className="text-gray-400" />
        )}
      </div>
      <p className="text-sm font-medium text-gray-500">
        {Math.round(session.time)} min
      </p>
      <span className="ml-auto rounded-md bg-gray-100 px-1.5 py-0.5 text-sm font-medium text-gray-500">
        {session.completedAt
          ? session.completedAt.toDate().toLocaleString("en-US", {
              month: "short",
              day: "numeric",
            })
          : currentId === session.id
          ? "-"
          : "Canceled"}
      </span>
    </li>
  );
}
