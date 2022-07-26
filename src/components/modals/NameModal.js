import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import ModalWrapper from "./ModalWrapper";

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
    <ModalWrapper modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <Dialog.Title
        as="h3"
        className="mt-1 text-xl font-medium leading-6 dark:text-white"
      >
        Change Name
      </Dialog.Title>
      <div className="mt-4 space-y-2">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          className="modal-input"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name"
          className="modal-input"
        />
      </div>
      <button type="submit" onClick={handleSubmit} className="modal-button">
        Save
      </button>
    </ModalWrapper>
  );
};

export default NameModal;
