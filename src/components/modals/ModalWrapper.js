import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { BiX } from "react-icons/bi";

const ModalWrapper = ({ modalOpen, setModalOpen, children }) => {
  const closeModal = () => {
    setModalOpen(false);
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
            <Dialog.Overlay className="fixed inset-0 bg-white/50 dark:bg-black/50" />
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
            <form className="relative inline-block w-full max-w-xs transform rounded-2xl border-2 border-gray-200 bg-white p-4 text-left align-middle shadow-lg dark:border-gray-800 dark:bg-gray-900">
              {children}
              <button
                type="button"
                className="absolute right-4 top-4 rounded-full p-1 text-2xl transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
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

export default ModalWrapper;
