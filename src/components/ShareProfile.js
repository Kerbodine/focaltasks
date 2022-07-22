import React from "react";
import { useTasks } from "../contexts/TaskContext";

export default function ShareProfile({
  currentList,
  profile,
  owner,
  userIsOwner,
}) {
  const { removeGuest } = useTasks();

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    if (!owner && e.target.value === "delete") {
      await removeGuest(currentList.id, profile.id, currentList.author);
    }
  };

  return (
    <div className="flex w-full items-center gap-2">
      <div
        className={`${
          !profile.photoURL && "bg-accent font-semibold text-white"
        } grid h-8 w-8 flex-none cursor-pointer place-items-center overflow-hidden rounded-lg`}
      >
        {profile.photoURL ? (
          <img className="h-full w-full" src={profile.photoURL} alt="pfp"></img>
        ) : (
          profile.displayName[0]
        )}
      </div>
      <div className={`flex-auto truncate text-sm`}>
        <p className="truncate font-medium text-gray-700">{`${profile.displayName}`}</p>
        <p className="-mt-1 truncate text-gray-500">{profile.email}</p>
      </div>
      <select
        onChange={(e) => handleDeleteUser(e)}
        {...(!userIsOwner && { disabled: true })}
        className={`${
          owner
            ? "bg-gray-100 text-gray-500"
            : "text-gray-400 hover:bg-gray-100"
        } no-caret cursor-pointer appearance-none rounded-md border-0 p-1 text-center text-xs font-bold uppercase focus:ring-0`}
      >
        <option value="">{owner ? "Owner" : "Guest"}</option>
        <option value="delete">Remove</option>
      </select>
    </div>
  );
}
