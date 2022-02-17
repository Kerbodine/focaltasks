import React from "react";
import { BiInfoCircle } from "react-icons/bi";
import { useView } from "../contexts/ViewContext";
import { ReactComponent as IconInfo } from "./icons/icon-info.svg";
import { ReactComponent as IconClock } from "./icons/icon-clock.svg";
import { ReactComponent as IconChart } from "./icons/icon-chart.svg";

export default function Sidebar() {
  const { sidebar } = useView();

  return (
    <div
      className={`${
        sidebar ? "w-[240px]" : "w-0 lg:w-[240px]"
      } absolute right-0 h-full border-l border-gray-200 bg-white lg:relative`}
    >
      <div className="flex h-[56px] w-full items-center border-b border-gray-200 px-3">
        <div className="flex h-8 w-full gap-1 rounded-lg bg-gray-100 p-1">
          <div className="grid h-full w-full place-items-center rounded-md text-2xl text-gray-600">
            <IconInfo />
          </div>
          <div className="grid h-full w-full place-items-center rounded-md bg-white text-2xl text-gray-600 shadow-sm">
            <IconClock />
          </div>
          <div className="grid h-full w-full place-items-center rounded-md text-2xl text-gray-600">
            <IconChart />
          </div>
        </div>
      </div>
    </div>
  );
}
