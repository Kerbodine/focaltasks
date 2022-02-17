import { Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import { useView } from "../contexts/ViewContext";
import { ReactComponent as IconInfo } from "./icons/icon-info.svg";
import { ReactComponent as IconClock } from "./icons/icon-clock.svg";
import { ReactComponent as IconChart } from "./icons/icon-chart.svg";

export default function Sidebar() {
  const { sidebar } = useView();

  const sidebarIcons = [<IconInfo />, <IconClock />, <IconChart />];
  const sidebarPanels = [<p>Panel 1</p>, <p>Panel 2</p>, <p>Panel 3</p>];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div
      className={`${
        sidebar ? "w-[240px]" : "w-0 lg:w-[240px]"
      } absolute right-0 h-full border-l border-gray-200 bg-white lg:relative`}
    >
      <div>
        <Tab.Group>
          <div className="h-[56px] w-full items-center border-b border-gray-200 p-3">
            <Tab.List className="flex h-8 w-full gap-1 rounded-lg bg-gray-100 p-1">
              {sidebarIcons.map((icon, index) => (
                <Tab
                  key={index}
                  className={({ selected }) =>
                    classNames(
                      selected && "bg-white shadow-sm",
                      "grid h-full w-full place-items-center rounded-md text-2xl text-gray-600"
                    )
                  }
                >
                  {icon}
                </Tab>
              ))}
            </Tab.List>
          </div>
          <Tab.Panels className="w-full p-3">
            {sidebarPanels.map((panel, index) => (
              <Tab.Panel key={index}>{panel}</Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
