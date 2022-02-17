import { Link, useLocation } from "react-router-dom";
import { useView } from "../contexts/ViewContext";
import Shortcut from "./Shortcut";

export default function NavbarItem({ icon, title, shortcut, link }) {
  const { navbar } = useView();
  const { pathname } = useLocation();

  return (
    <Link
      to={link}
      className={`${
        pathname === link && "!bg-gray-100"
      } flex h-8 w-full cursor-pointer items-center gap-1.5 rounded-lg px-1.5 hover:bg-gray-50 active:bg-gray-100`}
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
      <span className={`${!navbar && "hidden sm:inline-flex"}`}>
        {shortcut && <Shortcut shortcut={shortcut} />}
      </span>
    </Link>
  );
}

NavbarItem.defaultProps = {
  link: "/",
};
