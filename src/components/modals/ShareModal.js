import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { BiCheck, BiInfoCircle, BiLoaderAlt } from "react-icons/bi";
import { useTasks } from "../../contexts/TaskContext";
import ModalWrapper from "./ModalWrapper";

const ShareModal = ({ currentList, modalOpen, setModalOpen }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { inviteUser } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await inviteUser(currentList.id, email, currentList.author);
      setMessage("Successfully added!");
    } catch (err) {
      setError("An error occurred.");
    }
    setLoading(false);
  };

  return (
    <ModalWrapper modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <Dialog.Title as="h3" className="mt-1 text-xl font-medium leading-6">
        Share List
      </Dialog.Title>
      <div className="mt-4 space-y-2">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full rounded-lg border-none bg-gray-100 px-3 py-2 font-medium text-gray-600 outline-none placeholder:text-gray-400"
        />
        {error && (
          <div className="mt-2 flex w-full gap-1 rounded-lg border-2 border-red-500 bg-red-100 p-0.5 text-sm font-medium text-red-500">
            <BiInfoCircle className="flex-none rotate-180 text-xl" />
            <p className="flex-auto truncate">{error}</p>
          </div>
        )}
        {message && (
          <div className="mt-2 flex w-full gap-1 rounded-lg border-2 border-emerald-500 bg-green-100 p-0.5 text-sm font-medium text-emerald-500">
            <BiCheck className="flex-none text-xl" />
            <p className="flex-auto truncate">{message}</p>
          </div>
        )}
        <button
          type="submit"
          onClick={handleSubmit}
          {...(loading && { disabled: true })}
          className={`hover:border-accent hover:bg-accent mt-4 flex h-10 w-full items-center justify-center rounded-lg border-2 border-gray-200 text-sm font-medium text-gray-600 transition-colors hover:text-white disabled:cursor-not-allowed`}
        >
          {loading ? (
            <BiLoaderAlt className="animate-spin text-2xl" />
          ) : (
            "Invite"
          )}
        </button>
      </div>
    </ModalWrapper>
  );
};

export default ShareModal;
