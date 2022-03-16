import React from "react";
import { useAuth } from "../auth/AuthContext";

const Settings = () => {
  const { signOut, currentUser } = useAuth();

  return (
    <div className="h-full w-full p-8">
      <h1 className="mb-4 w-full text-2xl font-semibold">Settings</h1>
      <div className="flex">
        <p className="text-gray-700">
          <span className="font-medium">Current Account:</span>{" "}
          {currentUser.email}
        </p>
        <button
          className="ml-auto rounded-md border-2 border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-500 transition-colors hover:border-accent hover:bg-accent hover:text-white"
          onClick={signOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Settings;
