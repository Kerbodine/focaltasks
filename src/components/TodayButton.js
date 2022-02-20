import React from "react";
import { HiSun } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useView } from "../contexts/ViewContext";

export default function InboxButton() {
  const { navbar } = useView();
  const { pathname } = useLocation();

  return (
    <Link
      to="/today"
      className={`${
        pathname === "/today" && "!bg-amber-100 text-amber-600"
      } flex h-8 w-full cursor-pointer items-center gap-1.5 rounded-lg px-1.5 text-gray-600 hover:bg-amber-50 hover:text-amber-600 active:bg-amber-100`}
    >
      <span className={`flex-none text-xl`}>
        <HiSun />
      </span>
      <p
        className={`${
          !navbar && "hidden sm:block"
        } flex-auto truncate text-sm font-medium`}
      >
        Today
      </p>
    </Link>
  );
}
