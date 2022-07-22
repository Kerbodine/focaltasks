import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiInfoCircle } from "react-icons/bi";
import { useTasks } from "../../contexts/TaskContext";
import ShareProfile from "../ShareProfile";
import ModalWrapper from "./ModalWrapper";

const ShareModal = ({ currentList, modalOpen, setModalOpen }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { inviteUser } = useTasks();

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

  return (
    <ModalWrapper modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <Dialog.Title as="h3" className="mt-1 text-xl font-medium leading-6">
        Share List
      </Dialog.Title>
      <div className="mt-4 space-y-2">
        {currentList.profiles && (
          <div className="space-y-2">
            {currentList.profiles.map((profile) => (
              <ShareProfile
                key={profile.id}
                profile={profile}
                owner={currentList.author === profile.id}
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
            className="w-full rounded-lg border-none bg-gray-100 px-3 py-2 pr-20 font-medium text-gray-600 outline-none placeholder:text-gray-400"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            {...(currentList.disableGuestShare && { disabled: true })}
            {...(loading && { disabled: true })}
            className="hover:border-accent hover:bg-accent absolute right-1 top-1 bottom-1 w-16 rounded-md border-2 border-gray-200 bg-white px-2 font-medium text-gray-600 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Invite
          </button>
        </div>
        {error && (
          <div className="mt-2 flex w-full gap-1 rounded-lg border-2 border-red-500 bg-red-100 p-0.5 text-sm font-medium text-red-500">
            <BiInfoCircle className="flex-none rotate-180 text-xl" />
            <p className="flex-auto truncate">{error}</p>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

export default ShareModal;
