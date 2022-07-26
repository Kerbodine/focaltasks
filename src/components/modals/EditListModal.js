import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { useTasks } from "../../contexts/TaskContext";
import IconPicker from "../IconPicker";
import ModalWrapper from "./ModalWrapper";

const EditListModal = ({ currentList, modalOpen, setModalOpen }) => {
  const [listTitle, setListTitle] = useState(currentList.title);
  const [iconName, setIconName] = useState(currentList.icon);

  const { updateList } = useTasks();

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleUpdateList = (e) => {
    e.preventDefault();
    closeModal();
    updateList(
      currentList.id,
      { title: listTitle, icon: iconName },
      currentList.author
    );
  };

  return (
    <ModalWrapper modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <Dialog.Title
        as="h3"
        className="mt-1 text-xl font-medium leading-6 dark:text-white"
      >
        Edit List
      </Dialog.Title>
      <div className="mt-4 space-y-2">
        <input
          type="text"
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
          placeholder="List title"
          className="modal-input"
        />
        <IconPicker iconName={iconName} setIconName={setIconName} />
      </div>
      <button type="submit" onClick={handleUpdateList} className="modal-button">
        Update List
      </button>
    </ModalWrapper>
  );
};

export default EditListModal;
