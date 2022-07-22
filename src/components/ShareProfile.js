import React from "react";

export default function ShareProfile({ profile, owner }) {
  return (
    <div className="flex w-full items-center gap-2">
      <div
        className={`${
          !profile.photoURL && "bg-accent font-semibold text-white"
        } grid h-8 w-8 flex-none cursor-pointer place-items-center overflow-hidden rounded-lg`}
      >
        {/* Account profile image or placeholder */}
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
      <div
        className={`${
          owner ? "bg-gray-100 text-gray-500" : "text-gray-400"
        } rounded-md px-2 py-1 text-xs font-bold uppercase`}
      >
        {owner ? "Owner" : "Guest"}
      </div>
    </div>
  );
}
