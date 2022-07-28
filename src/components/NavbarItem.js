import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTasks } from "../contexts/TaskContext";
import { useView } from "../contexts/ViewContext";
import { useDrop } from "react-dnd";

export default function NavbarItem({ icon, title, link, listId, filter }) {
  const { navbar } = useView();
  const { pathname } = useLocation();
  const { userLists } = useTasks();

  const [length, setLength] = useState(0);

  useEffect(() => {
    if (listId) {
      const list = userLists[listId];
      if (list) {
        setLength(list.tasks.filter((task) => !task.completed).length);
      }
    } else {
      const lists = Object.values(userLists);
      const length = lists
        .map((list) => list.tasks.filter(filter).length)
        .reduce((a, b) => a + b, 0);
      setLength(length);
    }
  }, [userLists, listId, filter]);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: () => ({ listId: listId }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <Link
      ref={drop}
      to={link}
      className={`${
        pathname === link
          ? "!bg-gray-100 dark:!bg-gray-800"
          : "hover:bg-gray-100 dark:hover:bg-gray-800"
      } ${
        canDrop && isOver && listId
          ? "ring-2 ring-inset ring-accent"
          : canDrop && listId && "ring-2 ring-inset ring-gray-400/25"
      } no-select relative flex h-8 w-full cursor-pointer items-center gap-1.5 rounded-lg px-1.5 transition-colors`}
    >
      <span className="flex-none fill-gray-500 text-xl text-gray-500 dark:text-gray-400">
        {icon}
      </span>
      <p
        className={`${
          !navbar && "hidden sm:block"
        } flex-auto truncate text-sm font-medium text-gray-600 dark:text-gray-400`}
      >
        {title}
      </p>
      <div className={`${!navbar && "hidden sm:block"}`}>
        <Transition
          show={length > 0}
          enter="ease-out duration-200"
          enterFrom="scale-75 opacity-0"
          enterTo="scale-105 opacity-100"
          leave="ease-in duration-150"
          leaveFrom="scale-105 opacity-100"
          leaveTo="scale-75 opacity-0"
        >
          <span className="grid h-5 w-5 place-items-center rounded-md bg-gray-100 font-mono text-[13px] font-bold text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            {length}
          </span>
        </Transition>
      </div>
    </Link>
  );
}

NavbarItem.defaultProps = {
  link: "/",
  filter: (task) => !task.completed,
};
