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
      <Dialog.Title as="h3" className="mt-1 text-xl font-medium leading-6">
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
    </ModalWrapper>
  );
};

export default NameModal;
