import React from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { usePomodoro } from "../contexts/PomodoroContext";

const PomodoroTime = ({ minutes, seconds, time, isPaused }) => {
  const { mode, workMinutes, setWorkMinutes, breakMinutes, setBreakMinutes } =
    usePomodoro();

  const increment = () => {
    if (mode === "work") {
      setWorkMinutes((workMinutes) =>
        workMinutes === 90 ? workMinutes : (workMinutes += 5)
      );
    } else {
      setBreakMinutes((breakMinutes) =>
        breakMinutes === 60 ? breakMinutes : (breakMinutes += 5)
      );
    }
  };

  const decrement = () => {
    if (mode === "work") {
      setWorkMinutes((workMinutes) =>
        workMinutes === 10 ? workMinutes : (workMinutes -= 5)
      );
    } else {
      setBreakMinutes((breakMinutes) =>
        breakMinutes === 5 ? breakMinutes : (breakMinutes -= 5)
      );
    }
  };

  return (
    <div className="mt-4 mb-1 flex items-center">
      <p className="text-4xl font-medium text-gray-500">{`${minutes}:${seconds}`}</p>
      {isPaused &&
        time === (mode === "work" ? workMinutes : breakMinutes) * 60 && (
          <div className="absolute right-12 flex flex-col -space-y-1 text-xl text-gray-400">
            <button
              onClick={increment}
              className="transition-colors hover:text-gray-600"
            >
              <HiChevronUp />
            </button>
            <button
              onClick={decrement}
              className="transition-colors hover:text-gray-600"
            >
              <HiChevronDown />
            </button>
          </div>
        )}
    </div>
  );
};

export default PomodoroTime;
