import React from "react";

export default function BetaBadge() {
  return (
    <div className="absolute right-2 bottom-2 flex gap-1 rounded-lg border-2 border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center rounded-md bg-accent px-1.5 py-1 text-sm font-semibold text-white">
        BETA
      </div>
      <a
        href="https://tally.so/r/nPd8Xb"
        target="_blank"
        rel="noopener noreferrer"
        className="beta-button"
      >
        Bug report
      </a>
      <a
        href="https://tally.so/r/m68A1P"
        target="_blank"
        rel="noopener noreferrer"
        className="beta-button"
      >
        Feature request
      </a>
    </div>
  );
}
