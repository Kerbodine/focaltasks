import { Tab } from "@headlessui/react";
import { useView } from "../contexts/ViewContext";
import { ReactComponent as IconClock } from "../svg/icon-clock.svg";
import { ReactComponent as IconChart } from "../svg/icon-chart.svg";
import Pomodoro from "./Pomodoro";

export default function Sidebar() {
  const { sidebar } = useView();

  const sidebarIcons = [<IconClock />, <IconChart />];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div
      className={`${
        sidebar ? "w-[240px]" : "hidden w-0 lg:block lg:w-[240px]"
      } absolute right-0 h-full border-l-2 border-gray-100 bg-white lg:relative`}
    >
      <div>
        <Tab.Group>
          <div className="h-[56px] w-full items-center border-b-2 border-gray-100 p-3">
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
            <Tab.Panel>
              <Pomodoro />
            </Tab.Panel>
            <Tab.Panel>2</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
