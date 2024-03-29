import React, { useEffect, useState } from "react";
import { FiDribbble, FiInstagram } from "react-icons/fi";
import NameModal from "../components/modals/NameModal";
import ToggleIcon from "../components/ToggleIcon";
import { useAuth } from "../contexts/AuthContext";
import { useSettings } from "../contexts/SettingsContext";
import { ReactComponent as FocalTimerLogo } from "../svg/focaltimer.svg";
import { ReactComponent as Android } from "../svg/android.svg";
import { ReactComponent as IOS } from "../svg/ios.svg";
import AppleModal from "../components/modals/AppleModal";
import AndroidModal from "../components/modals/AndroidModal";
import { ReactComponent as System } from "../svg/system.svg";
import { ReactComponent as Dark } from "../svg/dark.svg";
import { ReactComponent as Light } from "../svg/light.svg";

const Settings = () => {
  const { logout, currentUser, userData } = useAuth();
  const {
    calendarStartDay,
    setCalendarStartDay,
    completedAppearance,
    setCompletedAppearance,
    hideDeleteWarning,
    setHideDeleteWarning,
    taskDeleteWarning,
    setTaskDeleteWarning,
    sidebarLists,
    setSidebarLists,
    updateSettings,
  } = useSettings();

  const [theme, setTheme] = useState(null);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showAndroidModal, setShowAndroidModal] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  const socialButtons = [
    {
      icon: <FiInstagram />,
      link: "https://www.instagram.com/focaltasks/",
    },
    {
      icon: <FiDribbble />,
      link: "https://dribbble.com/Kerbodine",
    },
  ];

  const pwaModal = [
    {
      icon: <Android />,
      title: "Android",
      handler: () => setShowAndroidModal(true),
    },
    {
      icon: <IOS />,
      title: "IOS",
      handler: () => setShowIOSModal(true),
    },
  ];

  useEffect(() => {
    if (localStorage.theme === "dark") {
      setTheme("dark");
    } else if (localStorage.theme === "light") {
      setTheme("light");
    } else {
      setTheme("system");
    }
  }, [theme]);

  const themeButtons = [
    {
      icon: <System />,
      handler: () => {
        localStorage.removeItem("theme");
        setTheme("system");
        if (
          localStorage.theme === "dark" ||
          (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
      condition: theme === "system",
      subtitle: "System",
    },
    {
      icon: <Dark />,
      handler: () => {
        (localStorage.theme = "dark") && setTheme("dark");
        document.documentElement.classList.add("dark");
      },
      condition: theme === "dark",
      subtitle: "Dark",
    },
    {
      icon: <Light />,
      handler: () => {
        (localStorage.theme = "light") && setTheme("light");
        document.documentElement.classList.remove("dark");
      },
      condition: theme === "light",
      subtitle: "Light",
    },
  ];

  return (
    <>
      <div className="h-full w-full overflow-y-auto p-6 dark:text-white sm:p-8">
        <h1 className="mb-4 text-3xl font-semibold">Settings</h1>
        <div className="flex w-full flex-col gap-2 leading-5 text-gray-700 dark:text-gray-300">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Theme:
          </h3>
          <div className="flex flex-wrap gap-4">
            {themeButtons.map(
              ({ icon, handler, condition, subtitle }, index) => (
                <div key={index}>
                  <div
                    onClick={handler}
                    className={`${
                      condition &&
                      "cursor-pointer rounded-[9px] ring-2 ring-accent"
                    }`}
                  >
                    {icon}
                  </div>
                  <p className="mt-2 text-center">{subtitle}</p>
                </div>
              )
            )}
          </div>
          <hr className="my-2 h-0.5 border-0 bg-gray-100 dark:bg-gray-800" />
          {/* Sign out */}
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Account:
          </h3>
          {/* <div className="flex gap-4">
            <div>
              <p>Name</p>
              <p className="text-gray-500">{userData.displayName}</p>
            </div>
            <button
              className="ml-auto flex-none rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1 text-sm font-semibold text-gray-600 transition-colors dark:hover:border-gray-500"
              onClick={() => setShowNameModal(true)}
            >
              Change Name
            </button>
          </div> */}
          <div className="flex gap-4">
            <div>
              <p>Current Account</p>
              <p className="text-gray-500">{currentUser.email}</p>
            </div>
            <button
              className="ml-auto flex-none rounded-lg border-2 border-gray-200 bg-white px-2 py-1 text-sm font-semibold text-gray-600 transition-colors dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-gray-500"
              onClick={logout}
            >
              Sign Out
            </button>
          </div>
          <hr className="my-2 h-0.5 border-0 bg-gray-100 dark:bg-gray-800" />
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Date & Time:
          </h3>
          {/* Calendar */}
          <div className="flex w-full items-center gap-4">
            <label htmlFor="startCalendarDay">First day of the week</label>
            <select
              id="startCalendarDay"
              className="ml-auto inline-block items-center rounded-lg border-2 border-gray-200 bg-transparent py-1 pl-2 pr-8 text-sm font-semibold text-gray-600 focus:border-gray-500 focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
              value={calendarStartDay}
              onChange={(e) => {
                setCalendarStartDay(e.target.value);
                updateSettings({ calendarStartDay: e.target.value });
              }}
            >
              <option value="0">Sunday</option>
              <option value="1">Monday</option>
            </select>
          </div>
          <hr className="my-2 h-0.5 border-0 bg-gray-100 dark:bg-gray-800" />
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Lists:
          </h3>
          <p>Show sidebar lists:</p>
          <div className="flex w-full items-center">
            <input
              id="showCompleted"
              type="checkbox"
              checked={sidebarLists.completed}
              onChange={() => {
                setSidebarLists((prev) => ({
                  ...prev,
                  completed: !prev.completed,
                }));
                updateSettings({
                  "sidebarLists.completed": !sidebarLists.completed,
                });
              }}
              className="mr-2 h-5 w-5 rounded-md border-2 border-gray-200 bg-transparent text-accent focus:ring-0 focus:ring-offset-0 dark:border-gray-700 dark:checked:border-none"
            />
            <label htmlFor="showCompleted">Completed</label>
          </div>
          <div className="flex w-full items-center">
            <input
              id="showAll"
              type="checkbox"
              checked={sidebarLists.all}
              onChange={() => {
                setSidebarLists((prev) => ({
                  ...prev,
                  all: !prev.all,
                }));
                updateSettings({
                  "sidebarLists.all": !sidebarLists.all,
                });
              }}
              className="mr-2 h-5 w-5 rounded-md border-2 border-gray-200 bg-transparent text-accent focus:ring-0 focus:ring-offset-0 dark:border-gray-700 dark:checked:border-none"
            />
            <label htmlFor="showAll">All tasks</label>
          </div>
          <div className="flex w-full items-center">
            <label htmlFor="listDeleteWarning">Show list delete warning</label>
            <ToggleIcon
              id="listDeleteWarning"
              state={!hideDeleteWarning}
              clickHandler={() => {
                setHideDeleteWarning(!hideDeleteWarning);
                updateSettings({ hideDeleteWarning: !hideDeleteWarning });
              }}
            />
          </div>
          <hr className="my-2 h-0.5 border-0 bg-gray-100 dark:bg-gray-800" />
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Tasks:
          </h3>
          {/* Completed task appearance */}
          <div className="flex w-full items-center gap-4">
            <label htmlFor="completedAppearance">
              Completed task appearance
            </label>
            <select
              id="completedAppearance"
              className="ml-auto inline-block items-center rounded-lg border-2 border-gray-200 bg-transparent py-1 pl-2 pr-8 text-sm font-semibold text-gray-600 focus:border-gray-500 focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
              value={completedAppearance}
              onChange={(e) => {
                setCompletedAppearance(e.target.value);
                updateSettings({ completedAppearance: e.target.value });
              }}
            >
              <option value="strike">Strikethrough</option>
              <option value="fade">Faded</option>
            </select>
          </div>
          <div className="flex w-full items-center gap-4">
            <label htmlFor="taskDeleteWarning">Show task delete warning</label>
            <ToggleIcon
              id="taskDeleteWarning"
              state={taskDeleteWarning}
              clickHandler={() => {
                setTaskDeleteWarning(!taskDeleteWarning);
                updateSettings({ taskDeleteWarning: !taskDeleteWarning });
              }}
            />
          </div>
          <hr className="my-2 h-0.5 border-0 bg-gray-100 dark:bg-gray-800" />
          <h3 className="text-lg font-semibold text-black dark:text-white">
            About:
          </h3>
          <div className="flex w-full items-center">
            <FocalTimerLogo className="h-16 w-16 rounded-2xl border-2 border-gray-200 dark:border-gray-700" />
            <div className="ml-4">
              <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                FocalTasks
              </p>
              <p className="-mt-0.5 font-mono text-gray-500">v0.95 (Beta)</p>
            </div>
            <div className="ml-auto flex gap-2">
              {socialButtons.map(({ icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg bg-gray-100 p-3 text-2xl text-gray-700 transition-colors hover:bg-accent hover:text-white dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-accent dark:hover:text-white"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
          <div className="flex w-full items-center gap-4">
            <label htmlFor="feedback">
              Have an idea, feature request or found a bug? Let us know!
            </label>
            <a
              href="mailto:contact.michaeltong@gmail.com"
              className="ml-auto flex-none rounded-lg border-2 border-gray-200 bg-white px-2 py-1 text-sm font-semibold text-gray-600 transition-colors dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-gray-500"
            >
              Contact Us
            </a>
          </div>
          <hr className="my-2 h-0.5 border-0 bg-gray-100 dark:bg-gray-800" />
          <h3
            className="text-lg font-semibold text-black dark:text-white"
            id="mobile"
          >
            Mobile App:
          </h3>
          <p>
            If you are using a mobile device, FocalTasks works a lot better with
            the installable progressive web app
          </p>
          <div className="mt-2 flex max-w-md gap-2">
            {pwaModal.map(({ icon, title, handler }, index) => (
              <div
                key={index}
                onClick={handler}
                className="flex flex-1 cursor-pointer flex-col items-center rounded-lg border-2 border-gray-200 p-2 pb-0 hover:border-gray-600 dark:border-gray-700 dark:hover:border-gray-400"
              >
                <p className="mb-4 text-lg font-semibold text-gray-500">
                  {title}
                </p>
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>
      <NameModal
        userData={userData}
        modalOpen={showNameModal}
        setModalOpen={setShowNameModal}
      />
      <AppleModal modalOpen={showIOSModal} setModalOpen={setShowIOSModal} />
      <AndroidModal
        modalOpen={showAndroidModal}
        setModalOpen={setShowAndroidModal}
      />
    </>
  );
};

export default Settings;
