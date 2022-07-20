import React from "react";
import ToggleIcon from "../components/ToggleIcon";
import { useAuth } from "../contexts/AuthContext";
import { useSettings } from "../contexts/SettingsContext";

const Settings = () => {
  const { logout, currentUser } = useAuth();
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

  return (
    <div className="h-full w-full overflow-y-auto p-6 sm:p-8">
      <h1 className="mb-4 w-full text-3xl font-semibold">Settings</h1>
      <div className="flex flex-col gap-2 leading-5">
        {/* Sign out */}
        <h3 className="text-lg font-semibold">Account:</h3>
        <div className="flex">
          <div>
            <p className="-mb-0.5 text-black">Current Account</p>
            <p className="text-gray-500">{currentUser.email}</p>
          </div>
          <button
            className="ml-auto flex-none rounded-lg border-2 border-gray-200 bg-white px-2 py-1 text-sm font-semibold text-gray-600 transition-colors hover:border-gray-500"
            onClick={logout}
          >
            Sign Out
          </button>
        </div>
        <hr className="my-2 h-0.5 border-0 bg-gray-100" />
        <h3 className="text-lg font-semibold">Date & Time:</h3>
        {/* Calendar */}
        <div className="flex w-full items-center">
          <label htmlFor="startCalendarDay">First day of the week</label>
          <select
            id="startCalendarDay"
            className="ml-auto inline-block items-center rounded-lg border-2 border-gray-200 py-1 pl-2 pr-8 text-sm font-semibold text-gray-600 focus:border-gray-500 focus:outline-none focus:ring-0"
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
        <hr className="my-2 h-0.5 border-0 bg-gray-100" />
        <h3 className="text-lg font-semibold">Lists:</h3>
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
            className="mr-2 h-5 w-5 rounded-md border-2 border-gray-200 text-accent focus:ring-0 focus:ring-offset-0"
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
            className="mr-2 h-5 w-5 rounded-md border-2 border-gray-200 text-accent focus:ring-0 focus:ring-offset-0"
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
        <hr className="my-2 h-0.5 border-0 bg-gray-100" />
        <h3 className="text-lg font-semibold">Tasks:</h3>
        {/* Completed task appearance */}
        <div className="flex w-full items-center">
          <label htmlFor="completedAppearance">Completed task appearance</label>
          <select
            id="completedAppearance"
            className="ml-auto inline-block items-center rounded-lg border-2 border-gray-200 py-1 pl-2 pr-8 text-sm font-semibold text-gray-600 focus:border-gray-500 focus:outline-none focus:ring-0"
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
        <div className="flex w-full items-center">
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
        <hr className="my-2 h-0.5 border-0 bg-gray-100" />
      </div>
    </div>
  );
};

export default Settings;
