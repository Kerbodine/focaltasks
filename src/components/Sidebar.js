import { useView } from "../contexts/ViewContext";
import Pomodoro from "./pomodoro/Pomodoro";

export default function Sidebar() {
  const { sidebar } = useView();

  return (
    <div
      className={`${
        sidebar ? "w-[240px]" : "hidden w-0 lg:block lg:w-[240px]"
      } sidenav absolute right-0 flex h-full flex-none flex-col overflow-y-auto border-l-2 border-gray-100 p-3 pb-[68px] dark:border-gray-800 lg:relative`}
    >
      <Pomodoro />
    </div>
  );
}
