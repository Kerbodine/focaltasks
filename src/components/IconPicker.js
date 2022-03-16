import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { listIcons } from "../config/icons";

const IconPicker = ({ iconName, setIconName }) => {
  const [showIcons, setShowIcons] = useState(false);

  return (
    <div>
      <div className="rounded-lg bg-gray-100 p-2 text-gray-600">
        <div className="flex items-center px-1">
          <p className="flex-auto font-medium">Icon</p>
          <span className="text-2xl text-gray-500">
            {listIcons.find((icon) => icon.name === iconName && icon).icon}
          </span>
          <button
            type="button"
            onClick={() => {
              setShowIcons(!showIcons);
            }}
            className="ml-1 text-2xl text-gray-500"
          >
            {showIcons ? <BiChevronUp /> : <BiChevronDown />}
          </button>
        </div>
        <div
          className={`${
            showIcons ? "h-[176px]" : "h-0"
          } overflow-hidden rounded-md transition-all`}
        >
          <div className="mt-2 flex w-full flex-wrap gap-2">
            {listIcons.map((icon, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setIconName(icon.name);
                    setShowIcons(false);
                  }}
                  className="grid h-9 w-9 place-items-center rounded-md bg-white text-2xl text-gray-500 transition-colors hover:bg-accent hover:text-white"
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
