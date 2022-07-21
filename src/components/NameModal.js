import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { BiX } from "react-icons/bi";
import { useAuth } from "../contexts/AuthContext";

const NameModal = ({ userData, modalOpen, setModalOpen }) => {
  const { changeUserName } = useAuth();

  const [firstName, setFirstName] = useState(
    userData.displayName.split(" ")[0]
  );
  const [lastName, setLastName] = useState(userData.displayName.split(" ")[1]);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeUserName(firstName, lastName);
    closeModal();
  };

  return (
    <Transition appear show={modalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <form className="relative inline-block w-full max-w-xs transform rounded-2xl bg-white p-6 text-left align-middle shadow-lg">
              <Dialog.Title
                as="h3"
                className="mt-1 text-xl font-medium leading-6"
              >
                Change Name
              </Dialog.Title>
              <div className="mt-4 space-y-2">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="w-full rounded-lg border-none bg-gray-100 px-3 py-2 font-medium text-gray-600 outline-none placeholder:text-gray-400"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="w-full rounded-lg border-none bg-gray-100 px-3 py-2 font-medium text-gray-600 outline-none placeholder:text-gray-400"
                />
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="hover:border-accent hover:bg-accent mt-4 w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-white disabled:cursor-not-allowed"
              >
                Save
              </button>
              <button
                type="button"
                className="absolute right-6 top-6 rounded-full p-1 text-2xl transition-colors hover:bg-gray-100"
                onClick={closeModal}
              >
                <BiX />
              </button>
            </form>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NameModal;
