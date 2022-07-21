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
      <div className="mt-4 space-y-2"></div>
    </ModalWrapper>
  );
};

export default ShareModal;
