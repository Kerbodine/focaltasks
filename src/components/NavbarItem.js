import { Transition } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import { useView } from "../contexts/ViewContext";

export default function NavbarItem({ icon, title, link, length }) {
  const { navbar } = useView();
  const { pathname } = useLocation();

  return (
    <Link
      to={link}
      className={`${
        pathname === link ? "!bg-gray-100" : "hover:bg-gray-50"
      } no-select relative flex h-8 w-full cursor-pointer items-center gap-1.5 rounded-lg px-1.5 transition-colors`}
    >
      <span className="flex-none fill-gray-500 text-xl text-gray-500">
        {icon}
      </span>
      <p
        className={`${
          !navbar && "hidden sm:block"
        } flex-auto truncate text-sm font-medium text-gray-600`}
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
          <span className="grid h-5 w-5 place-items-center rounded-md bg-gray-500 font-mono text-xs text-white">
            {length}
          </span>
        </Transition>
      </div>
    </Link>
  );
}

NavbarItem.defaultProps = {
  link: "/",
};
