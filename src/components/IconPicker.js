import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { listIcons } from "../config/icons";

const IconPicker = ({ iconName, setIconName }) => {
  const [showIcons, setShowIcons] = useState(false);

  return (
    <div>
      <div className="rounded-lg bg-gray-100 p-2 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
        <button
          className="flex w-full items-center px-1 text-left outline-none"
          type="button"
          onClick={() => {
            setShowIcons(!showIcons);
          }}
        >
          <p className="flex-auto font-medium">Icon</p>
          <span className="text-2xl text-gray-500">
            {listIcons.find((icon) => icon.name === iconName && icon).icon}
          </span>
          <span className="ml-1 text-2xl text-gray-500">
            {showIcons ? <BiChevronUp /> : <BiChevronDown />}
          </span>
        </button>
        <div
          className={`${
            showIcons ? "h-[184px]" : "h-0"
          } overflow-hidden rounded-md transition-all`}
        >
          <div className="mt-2 flex w-full flex-wrap gap-2">
            {listIcons
              .filter((icon) => !icon.hidden)
              .map((icon, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setIconName(icon.name);
                      setShowIcons(false);
                    }}
                    className="grid h-[38px] w-[38px] place-items-center rounded-md bg-white text-2xl text-gray-500 transition-colors hover:bg-accent hover:text-white dark:bg-gray-900 dark:hover:bg-accent"
                  >
                    {icon.icon}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconPicker;
