import {
  HiCalendar,
  HiExclamationCircle,
  HiInbox,
  HiMenu,
  HiPlusSm,
  HiSun,
} from "react-icons/hi";
import { ReactComponent as IconUl } from "./svg/icon-ul.svg";
import { useView } from "../contexts/ViewContext";
import NavbarItem from "./NavbarItem";
import { useAuth } from "../auth/AuthContext";
import { useTasks } from "../contexts/TaskContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { userData } = useAuth();
  const { userLists, newList } = useTasks();
  const { navbar, toggleNavbar } = useView();

  const navigate = useNavigate();

  const createNewList = async () => {
    const listId = await newList();
    navigate(`/${listId}`);
  };

  return (
    <div
      className={`${
        navbar ? "w-[240px]" : "w-[56px] sm:w-[240px]"
      } absolute h-full border-r border-gray-200 bg-white sm:relative`}
    >
      <div className="flex h-[56px] w-full items-center border-b border-gray-200 px-3">
        {/* Account info and seettings */}
        <div
          className={`${!navbar && "hidden sm:grid"} ${
            !userData.photoURL && "bg-accent font-semibold text-white"
          } grid h-8 w-8 flex-none cursor-pointer place-items-center overflow-hidden rounded-lg ring-accent ring-offset-2 hover:ring-2`}
        >
          {userData.photoURL ? (
            <img
              className="h-full w-full"
              src={userData.photoURL}
              alt="pfp"
            ></img>
          ) : (
            userData.displayName[0]
          )}
        </div>
        <div
          className={`${
            !navbar && "hidden sm:block"
          } no-select ml-3 flex-auto truncate text-sm`}
        >
          <p className="truncate font-medium text-gray-700">{`${userData.displayName}`}</p>
          <p className="-mt-1 truncate text-gray-500">{userData.email}</p>
        </div>

        <button
          onClick={toggleNavbar}
          className={`grid h-8 w-8 place-items-center text-xl text-gray-500 sm:hidden`}
        >
          <HiMenu />
        </button>
      </div>
      <div className="px-3">
        <div className="mt-3">
          <NavbarItem icon={<HiInbox />} title="Inbox" link={"/"} />
        </div>
        <div className="mt-3 flex flex-col gap-1">
          {/* Pinned lists */}
          <NavbarItem icon={<HiSun />} title="Today" link={"/today"} />
          <NavbarItem
            icon={<HiCalendar />}
            title="Upcoming"
            link={"/upcoming"}
          />
          <NavbarItem
            icon={<HiExclamationCircle />}
            title="Important"
            link={"/important"}
          />
        </div>
        {/* Horizontal divider */}
        <hr className="my-3 h-[1px] w-full border-gray-200" />
        <div className="flex flex-col gap-1">
          {/* User lists */}
          {userLists
            .filter((list) => list.id !== "inbox")
            .map((list) => (
              <NavbarItem
                icon={<IconUl />}
                key={list.id}
                title={list.title}
                link={`/${list.id}`}
              />
            ))}
          {/* New list button */}
          <button
            className={`group flex h-8 w-full cursor-pointer items-center gap-1.5 rounded-lg px-1.5 text-gray-400 hover:bg-accent hover:text-white`}
            onClick={createNewList}
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
          </button>
        </div>
      </div>
    </div>
  );
}
