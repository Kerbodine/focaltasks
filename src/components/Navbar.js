import {
  HiCalendar,
  HiExclamationCircle,
  HiInbox,
  HiMenu,
  HiPlusSm,
  HiSearch,
  HiSun,
} from "react-icons/hi";
import { ReactComponent as IconUl } from "./icon-ul.svg";
import { useView } from "../contexts/ViewContext";
import NavbarItem from "./NavbarItem";
import Shortcut from "./Shortcut";
import React, { useLayoutEffect } from "react";

function useWindowSize() {
  const { setNavbar } = useView();
  useLayoutEffect(() => {
    function checkSize() {
      if (window.innerWidth < 640) {
        if (
          !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          setNavbar(false);
        }
      } else {
        setNavbar(true);
      }
    }
    window.addEventListener("resize", checkSize);
    checkSize();
    return () => window.removeEventListener("resize", checkSize);
  }, []);
}

export default function Navbar() {
  const { navbar, toggleNavbar } = useView();
  useWindowSize();

  return (
    <div
      className={`${
        navbar ? "w-[240px]" : "w-[56px]"
      } absolute h-full border-r border-gray-200 bg-white sm:relative`}
    >
      {/* Account info and toggle */}
      <div className="flex h-[56px] w-full items-center border-b border-gray-200 px-3">
        {navbar && (
          <>
            <div className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg bg-accent font-semibold text-white ring-accent ring-offset-2 hover:ring-2">
              M
            </div>
            <div className="ml-3 flex-auto truncate text-sm">
              <p className="font-medium text-gray-700">Michael Tong</p>
              <p className="-mt-1 text-gray-500">test@test.com</p>
            </div>
          </>
        )}
        <button
          onClick={toggleNavbar}
          className={`grid h-8 w-8 place-items-center text-xl text-gray-500 sm:hidden`}
        >
          <HiMenu />
        </button>
      </div>
      {/* Searchbar */}
      <div className="px-3">
        <div
          className={`${
            navbar ? "bg-gray-100" : "cursor-pointer hover:bg-gray-100"
          } mt-3 flex h-8 w-full items-center gap-1.5 rounded-lg px-1.5 ring-accent focus-within:ring-2`}
        >
          <HiSearch className="flex-none text-xl text-gray-600" />
          {navbar && (
            <>
              <input
                className="w-full flex-auto bg-transparent text-sm text-gray-600 outline-none"
                type="text"
                placeholder="Search"
              />
              {/* Keyboard Shortcut */}
              <Shortcut shortcut="⌘K" />
            </>
          )}
          {/* Pinned Items */}
        </div>
        <div className="mt-3 flex flex-col gap-0.5">
          <NavbarItem icon={<HiInbox />} title="Inbox" shortcut="⌘1" />
          <NavbarItem icon={<HiSun />} title="Today" shortcut="⌘2" />
          <NavbarItem icon={<HiCalendar />} title="Upcoming" shortcut="⌘3" />
          <NavbarItem
            icon={<HiExclamationCircle />}
            title="Important"
            shortcut="⌘4"
          />
        </div>
        <hr className="my-3 h-[1px] w-full border-gray-200" />
        <div className="flex flex-col gap-0.5">
          <NavbarItem icon={<IconUl />} title="Task list 1" />
          <NavbarItem icon={<IconUl />} title="Task list 2" />
          <NavbarItem icon={<IconUl />} title="Task list 3" />
          <button
            className={`group flex h-8 w-full cursor-pointer items-center gap-1.5 rounded-lg px-1.5 text-gray-400 hover:bg-accent hover:text-white`}
          >
            <span className="flex-none text-xl">
              <HiPlusSm />
            </span>
            {navbar && (
              <>
                <p className="flex-auto text-left text-sm font-medium">
                  New list
                </p>
                <span className="group-hover:hidden">
                  <Shortcut shortcut="⇧⌘N" />
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
