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
    updateSettings,
  } = useSettings();

  return (
    <div className="h-full w-full p-6 sm:p-8">
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
          <ToggleIcon
            state={!hideDeleteWarning}
            clickHandler={() => {
              setHideDeleteWarning(!hideDeleteWarning);
              updateSettings({ hideDeleteWarning: !hideDeleteWarning });
            }}
          />
        </div>
        <div className="flex w-full">
          <label htmlFor="startCalendarDay">Show task delete warning: </label>
          <ToggleIcon
            state={taskDeleteWarning}
            clickHandler={() => {
              setTaskDeleteWarning(!taskDeleteWarning);
              updateSettings({ taskDeleteWarning: !taskDeleteWarning });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
