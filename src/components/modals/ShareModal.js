import { Dialog } from "@headlessui/react";
import React from "react";
import ModalWrapper from "./ModalWrapper";

const ShareModal = ({ modalOpen, setModalOpen }) => {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ModalWrapper modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <Dialog.Title as="h3" className="mt-1 text-xl font-medium leading-6">
        Share List
      </Dialog.Title>
      <div className="mt-4 space-y-2">
        <input
          type="text"
          // value={listTitle}
          // onChange={(e) => setListTitle(e.target.value)}
          placeholder="Email address"
          className="w-full rounded-lg border-none bg-gray-100 px-3 py-2 font-medium text-gray-600 outline-none placeholder:text-gray-400"
        />
      </div>
    </ModalWrapper>
  );
};

export default ShareModal;
