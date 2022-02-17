import {
  HiCalendar,
  HiExclamationCircle,
  HiInbox,
  HiMenu,
  HiPlusSm,
  HiSearch,
  HiSun,
} from "react-icons/hi";
import { ReactComponent as IconUl } from "./icons/icon-ul.svg";
import { useView } from "../contexts/ViewContext";
import NavbarItem from "./NavbarItem";
import Shortcut from "./Shortcut";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { currentUser } = useAuth();
  const { navbar, toggleNavbar } = useView();

  return (
    <div
      className={`${
        navbar ? "w-[240px]" : "w-[56px] sm:w-[240px]"
      } absolute h-full border-r border-gray-200 bg-white sm:relative`}
    >
      <div className="flex h-[56px] w-full items-center border-b border-gray-200 px-3">
        {/* Account info and seettings */}
        <div
          className={`${
            !navbar && "hidden sm:grid"
          } grid h-8 w-8 flex-none cursor-pointer place-items-center rounded-lg bg-accent font-semibold text-white ring-accent ring-offset-2 hover:ring-2`}
        >
          M
        </div>
        <div
          className={`${
            !navbar && "hidden sm:block"
          } ml-3 flex-auto truncate text-sm`}
        >
          <p className="font-medium text-gray-700">Michael Tong</p>
          <p className="-mt-1 truncate text-gray-500">{currentUser.email}</p>
        </div>

        <button
          onClick={toggleNavbar}
          className={`grid h-8 w-8 place-items-center text-xl text-gray-500 sm:hidden`}
        >
          <HiMenu />
        </button>
      </div>
      <div className="px-3">
        {/* Searchbar */}
        <div
          className={`${
            navbar ? "bg-gray-100" : "cursor-pointer hover:bg-gray-100"
          } mt-3 flex h-8 w-full items-center gap-1.5 rounded-lg px-1.5 ring-accent focus-within:ring-2 sm:bg-gray-100`}
        >
          <HiSearch className="flex-none text-xl text-gray-600" />
          {/* Searchfield */}
          <input
            className={`${
              !navbar && "hidden sm:block"
            } w-full flex-auto bg-transparent text-sm text-gray-600 outline-none`}
            type="text"
            placeholder="Search"
          />
          {/* Keyboard shortcut */}
          <span className={`${!navbar && "hidden sm:inline-flex"}`}>
            <Shortcut shortcut="⌘K" />
          </span>
        </div>
        <div className="mt-3 flex flex-col gap-0.5">
          {/* Pinned lists */}
          <NavbarItem icon={<HiInbox />} title="Inbox" shortcut="⌘1" />
          <NavbarItem icon={<HiSun />} title="Today" shortcut="⌘2" />
          <NavbarItem icon={<HiCalendar />} title="Upcoming" shortcut="⌘3" />
          <NavbarItem
            icon={<HiExclamationCircle />}
            title="Important"
            shortcut="⌘4"
          />
        </div>
        {/* Horizontal divider */}
        <hr className="my-3 h-[1px] w-full border-gray-200" />
        <div className="flex flex-col gap-0.5">
          {/* User lists */}
          <NavbarItem icon={<IconUl />} title="Task list 1" />
          <NavbarItem icon={<IconUl />} title="Task list 2" />
          <NavbarItem icon={<IconUl />} title="Task list 3" />
          {/* New list button */}
          <button
            className={`group flex h-8 w-full cursor-pointer items-center gap-1.5 rounded-lg px-1.5 text-gray-400 hover:bg-accent hover:text-white`}
          >
            <span className="flex-none text-xl">
              <HiPlusSm />
            </span>
            <p
              className={`${
                !navbar && "hidden sm:block"
              } flex-auto text-left text-sm font-medium`}
            >
              New list
            </p>
            <span className={`${!navbar && "hidden sm:inline-flex"}`}>
              <Shortcut shortcut="⇧⌘N" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
