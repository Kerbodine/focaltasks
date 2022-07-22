import { Dialog } from "@headlessui/react";
import React from "react";
import toast from "react-hot-toast";
import ModalWrapper from "./ModalWrapper";

const AppleModal = ({ modalOpen, setModalOpen }) => {
  return (
    <ModalWrapper modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <Dialog.Title as="h3" className="mt-1 text-xl font-medium leading-6">
        iOS Install Instructions
      </Dialog.Title>
      <div className="mt-4 space-y-2">
        <p>
          Open up{" "}
          <span
            onClick={() => {
              navigator.clipboard.writeText("https://app.focaltasks.com");
              toast.success("Copied to clipboard!");
            }}
            className="cursor-pointer rounded-md bg-gray-100 px-1.5 py-1 font-mono font-medium"
          >
            app.focaltasks.com
          </span>{" "}
          in Safari. (Tap to copy)
        </p>
        <p>Press the “share” icon in the toolbar</p>
        <p>Scroll down and tap “Add to Home Screen”</p>
      </div>
    </ModalWrapper>
  );
};

export default AppleModal;
