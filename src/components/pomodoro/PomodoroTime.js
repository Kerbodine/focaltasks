import React from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { usePomodoro } from "../../contexts/PomodoroContext";

const PomodoroTime = ({ minutes, seconds, time, isPaused, minute }) => {
  const { duration, setDuration } = usePomodoro();

  const increment = () => {
    setDuration((duration) => (duration === 90 ? duration : (duration += 5)));
  };

  const decrement = () => {
    setDuration((duration) => (duration === 10 ? duration : (duration -= 5)));
  };

  return (
    <div className="mb-1 flex flex-col items-center justify-center">
      {isPaused && time === duration * minute && (
        <button
          onClick={increment}
          className="text-2xl text-gray-300 hover:text-gray-500"
        >
          <HiChevronUp />
        </button>
      )}
      <p className="text-4xl font-medium tracking-tight text-gray-500">{`${minutes}:${seconds}`}</p>
      {isPaused && time === duration * minute && (
        <button
          onClick={decrement}
          className="text-2xl text-gray-300 hover:text-gray-500"
        >
          <HiChevronDown />
        </button>
      )}
    </div>
  );
};

export default PomodoroTime;
