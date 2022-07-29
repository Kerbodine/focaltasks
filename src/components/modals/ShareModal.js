import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiCopy, BiInfoCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TaskContext";
import ShareProfile from "../ShareProfile";
import ToggleIcon from "../ToggleIcon";
import ModalWrapper from "./ModalWrapper";

const ShareModal = ({ currentList, modalOpen, setModalOpen }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { updateList, inviteUser, removeGuest } = useTasks();
  const { userData } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setEmail("");
    const error = await inviteUser(currentList.id, email, currentList.author);
    if (error) {
      setError(error);
    } else {
      toast.success("Successfully shared!");
    }
    setLoading(false);
  };

  const leaveList = async (e) => {
    e.preventDefault();
    navigate("/inbox");
    toast("Bye bye!", {
      icon: "👋",
    });
    await removeGuest(currentList.id, userData.id, currentList.author);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(
      `https://share.focaltasks.com/${currentList.id}`
    );
    toast.success("Copied to clipboard!");
  };

  return (
    <ModalWrapper modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <Dialog.Title
        as="h3"
        className="mt-1 text-xl font-medium leading-6 dark:text-white"
      >
        Share Settings
      </Dialog.Title>
      <div className="mt-4 space-y-2">
        {currentList.author === userData.id && (
          <>
            <div className="flex w-full items-center gap-4">
              <label
                htmlFor="toggleGuestSharing"
                className="text-gray-600 dark:text-gray-400"
              >
                Disable guest sharing
              </label>
              <ToggleIcon
                id="toggleGuestSharing"
                state={currentList.disableSharing}
                clickHandler={() => {
                  updateList(
                    currentList.id,
                    { disableSharing: !currentList.disableSharing },
                    currentList.author
                  );
                }}
              />
            </div>
            <div className="flex w-full items-center gap-4">
              <label
                htmlFor="togglePublic"
                className="text-gray-600 dark:text-gray-400"
              >
                Public list
              </label>
              <ToggleIcon
                id="togglePublic"
                state={currentList.public}
                clickHandler={() => {
                  updateList(
                    currentList.id,
                    { public: !currentList.public },
                    currentList.author
                  );
                }}
              />
            </div>
            {currentList.public && (
              <div className="flex h-8 w-full items-center rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-800">
                <p className="truncate pl-3 pr-1 text-sm">{`https://share.focaltasks.com/${currentList.id}`}</p>
                <button
                  type="button"
                  onClick={copyLink}
                  className="grid h-8 w-8 flex-none place-items-center rounded-lg text-xl text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                >
                  <BiCopy />
                </button>
              </div>
            )}
            <hr className="h-0.5 border-0 bg-gray-200 dark:bg-gray-700" />
          </>
        )}
        {currentList.profiles && (
          <div className="max-h-64 space-y-2 overflow-y-auto">
            {currentList.profiles.map((profile) => (
              <ShareProfile
                key={profile.id}
                profile={profile}
                owner={currentList.author === profile.id}
                currentList={currentList}
                userIsOwner={currentList.author === userData.id}
              />
            ))}
          </div>
        )}
        <div className="relative">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="modal-input"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            {...(currentList.disableSharing &&
              currentList.author !== userData.id && { disabled: true })}
            {...(loading && { disabled: true })}
            className="absolute right-1 top-1 bottom-1 w-16 rounded-md border-2 border-gray-200 bg-white px-2 font-medium text-gray-600 transition-colors hover:border-accent hover:bg-accent hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-accent dark:hover:bg-accent dark:hover:text-white"
          >
            Invite
          </button>
        </div>
        {error && (
          <div className="auth-error mt-2">
            <BiInfoCircle className="flex-none rotate-180 text-xl" />
            <p className="flex-auto truncate">{error}</p>
          </div>
        )}
        {currentList.author !== userData.id && (
          <button
            type="button"
            onClick={leaveList}
            className="rounded-lg border-2 border-gray-200 px-2 py-1 text-sm font-semibold text-gray-600 transition-colors hover:border-gray-400 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-500"
          >
            Leave list
          </button>
        )}
      </div>
    </ModalWrapper>
  );
};

export default ShareModal;
