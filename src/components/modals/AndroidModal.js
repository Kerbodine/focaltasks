import { Dialog } from "@headlessui/react";
import React from "react";
import toast from "react-hot-toast";
import ModalWrapper from "./ModalWrapper";

const AndroidModal = ({ modalOpen, setModalOpen }) => {
  return (
    <ModalWrapper modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <Dialog.Title as="h3" className="mt-1 text-xl font-medium leading-6">
        Android Install Instructions
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
          in Chrome. (Tap to copy)
        </p>
        <p>Tap the “3 dot” menu in the top right corner</p>
        <p>Tap “Add to Home screen”</p>
      </div>
    </ModalWrapper>
  );
};

export default AndroidModal;
