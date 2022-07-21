import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import toast from "react-hot-toast";
import { BiX } from "react-icons/bi";

const AndroidModal = ({ modalOpen, setModalOpen }) => {
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
            <form className="relative inline-block w-full max-w-sm transform rounded-2xl bg-white p-6 text-left align-middle shadow-lg">
              <Dialog.Title
                as="h3"
                className="mt-1 text-xl font-medium leading-6"
              >
                Android Install Instructions
              </Dialog.Title>
              <div className="mt-4 space-y-2">
                <p>
                  Open up{" "}
                  <span
                    onClick={() => {
                      navigator.clipboard.writeText(
                        "https://app.focaltimer.com"
                      );
                      toast.success("Copied to clipboard!");
                    }}
                    className="cursor-pointer rounded-md bg-gray-100 px-1.5 py-1 font-mono font-medium"
                  >
                    app.focaltimer.com
                  </span>{" "}
                  in Chrome. (Tap to copy)
                </p>
                <p>Tap the “3 dot” menu in the top right corner</p>
                <p>Tap “Add to Home screen”</p>
              </div>
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

export default AndroidModal;
