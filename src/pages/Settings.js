import { Switch } from "@headlessui/react";
import React from "react";
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
    updateSettings,
  } = useSettings();

  return (
    <div className="h-full w-full p-8">
      <h1 className="mb-4 w-full text-3xl font-semibold">Settings</h1>
      <div className="space-y-2">
        {/* Sign out */}
        <div className="flex">
          <p>
            <span className="font-medium">Current Account:</span>{" "}
            {currentUser.email}
          </p>
          <button
            className="ml-auto rounded-lg border-2 border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-600 transition-colors hover:border-gray-500"
            onClick={logout}
          >
            Sign Out
          </button>
        </div>
        {/* Calendar */}
        <div className="flex w-full">
          <label htmlFor="startCalendarDay">First day of the week: </label>
          <select
            id="startCalendarDay"
            className="ml-auto inline-block rounded-lg border-2 border-gray-200 px-2 py-1.5 text-sm font-semibold text-gray-600 focus:border-gray-500 focus:outline-none"
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
        {/* Completed task appearance */}
        <div className="flex w-full">
          <label htmlFor="startCalendarDay">Completed task appearance: </label>
          <select
            id="startCalendarDay"
            className="ml-auto inline-block rounded-lg border-2 border-gray-200 px-2 py-1.5 text-sm font-semibold text-gray-600 focus:border-gray-500 focus:outline-none"
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
        <div className="flex w-full">
          <label htmlFor="startCalendarDay">Show list delete warning: </label>
          <Switch
            checked={!hideDeleteWarning}
            onChange={() => {
              setHideDeleteWarning(!hideDeleteWarning);
              updateSettings({ hideDeleteWarning: !hideDeleteWarning });
            }}
            className={`
        ${!hideDeleteWarning ? "bg-accent" : "bg-gray-200"}
        relative ml-auto inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
          >
            <span className="sr-only">Use setting</span>
            <span
              className={`${
                !hideDeleteWarning ? "translate-x-5" : "translate-x-0"
              }
                pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
              `}
            >
              <span
                className={`${
                  !hideDeleteWarning
                    ? "opacity-0 duration-100 ease-out"
                    : "opacity-100 duration-200 ease-in"
                }
                  absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                aria-hidden="true"
              >
                <svg
                  className="h-3 w-3 text-gray-400"
                  fill="none"
                  viewBox="0 0 12 12"
                >
                  <path
                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span
                className={`${
                  !hideDeleteWarning
                    ? "opacity-100 duration-200 ease-in"
                    : "opacity-0 duration-100 ease-out"
                }
                  absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                aria-hidden="true"
              >
                <svg
                  className="h-3 w-3 text-accent"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                </svg>
              </span>
            </span>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Settings;
