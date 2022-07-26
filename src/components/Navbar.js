import {
  HiCalendar,
  HiCheckCircle,
  HiCog,
  HiCollection,
  HiExclamationCircle,
  HiInbox,
  HiMenu,
  HiSun,
  HiTrash,
} from "react-icons/hi";
import { useView } from "../contexts/ViewContext";
import NavbarItem from "./NavbarItem";
import { useAuth } from "../contexts/AuthContext";
import { useTasks } from "../contexts/TaskContext";
import NewListButton from "./NewListButton";
import { listIcons } from "../config/icons";
import { useClickOutside } from "@mantine/hooks";
import { mobile } from "../config/functions";
import { useSettings } from "../contexts/SettingsContext";

export default function Navbar() {
  const { userData } = useAuth();
  const { userLists } = useTasks();
  const { navbar, toggleNavbar, closeNavbar } = useView();
  const { sidebarLists } = useSettings();

  const specialLists = ["inbox"];

  const ref = useClickOutside(() => closeNavbar());

  const checkShared = () => {
    return (
      Object.values(userLists).filter((list) => list.users.length > 1).length >
      0
    );
  };

  return (
    <div
      ref={ref}
      className={`${
        navbar
          ? "w-[240px]"
          : `w-[56px] sm:w-[240px] ${mobile() && "-ml-[56px] sm:ml-0"}`
      } absolute box-content flex h-full flex-none flex-col border-r-2 border-gray-100 bg-white transition-all duration-300 sm:relative`}
    >
      <div className="flex h-[58px] w-full flex-none items-center border-b-2 border-gray-100 px-3">
        {/* Account info and seettings */}
        <div
          className={`${!navbar && "hidden sm:grid"} ${
            !userData.photoURL && "bg-accent font-semibold text-white"
          } grid h-8 w-8 flex-none cursor-pointer place-items-center overflow-hidden rounded-lg`}
        >
          {/* Account profile image or placeholder */}
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
        {/* User account info (name, email) */}
        <div
          className={`${
            !navbar && "hidden sm:block"
          } no-select ml-3 flex-auto truncate text-sm`}
        >
          <p className="truncate font-medium text-gray-700">{`${userData.displayName}`}</p>
          <p className="-mt-1 truncate text-gray-500">{userData.email}</p>
        </div>
        {/* Toggle mobile navbar */}
        <button
          onClick={toggleNavbar}
          className={`${
            mobile() && !navbar && "ml-[64px]"
          } grid h-8 w-8 flex-none place-items-center text-2xl text-gray-500 sm:hidden`}
        >
          <HiMenu />
        </button>
      </div>
      {/* All lists */}
      <div className="sidenav flex-auto space-y-3 overflow-y-auto p-3">
        {/* Default lists */}
        <div>
          <NavbarItem
            icon={<HiInbox />}
            title="Inbox"
            link={"/inbox"}
            listId={"inbox"}
          />
        </div>
        <div className="flex flex-col">
          <NavbarItem icon={<HiSun />} title="Today" link={"/today"} />
          <NavbarItem
            icon={<HiExclamationCircle />}
            title="Important"
            link={"/important"}
          />
          <NavbarItem
            icon={<HiCalendar />}
            title="Upcoming"
            link={"/upcoming"}
          />
          {sidebarLists.completed && (
            <NavbarItem
              icon={<HiCheckCircle />}
              title="Completed"
              link={"/completed"}
            />
          )}
          {sidebarLists.all && (
            <NavbarItem
              icon={<HiCollection />}
              title="All tasks"
              link={"/all"}
            />
          )}
        </div>
        <div className="flex flex-col">
          <NavbarItem icon={<HiCog />} title="Settings" link={"/settings"} />
        </div>
        {/* Horizontal divider */}
        {checkShared() && (
          <>
            <div className="relative">
              <hr className="h-[2px] w-full border-0 bg-gray-100" />
              <p
                className={`${
                  navbar ? "opacity-100" : "opacity-0 sm:opacity-100"
                } label-center absolute truncate bg-white px-2 text-xs font-bold uppercase text-gray-400 transition-opacity`}
              >
                Shared
              </p>
            </div>
            <div className="flex flex-col">
              {/* Shared lists */}
              {Object.values(userLists)
                .filter((list) => list.users.length > 1) // Check if its the user's list
                .map((list) => (
                  <NavbarItem
                    icon={
                      listIcons.find((icon) => icon.name === list.icon).icon
                    }
                    key={list.id}
                    title={list.title}
                    link={`/${list.id}`}
                    listId={list.id}
                  />
                ))}
            </div>
          </>
        )}
        <div className="relative">
          <hr className="h-[2px] w-full border-0 bg-gray-100" />
          <p
            className={`${
              navbar ? "opacity-100" : "opacity-0 sm:opacity-100"
            } label-center absolute truncate bg-white px-2 text-xs font-bold uppercase text-gray-400 transition-opacity`}
          >
            My lists
          </p>
        </div>
        <div className="flex flex-col">
          {/* User lists */}
          {Object.values(userLists)
            .filter((list) => !specialLists.includes(list.id)) // Check if its not a default list
            .filter((list) => list.users.length === 1) // Check if its the user's list
            .map((list) => (
              <NavbarItem
                icon={listIcons.find((icon) => icon.name === list.icon).icon}
                key={list.id}
                title={list.title}
                link={`/${list.id}`}
                listId={list.id}
              />
            ))}
          <NewListButton />
        </div>
      </div>
    </div>
  );
}
