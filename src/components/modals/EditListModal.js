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
      <Dialog.Title as="h3" className="mt-1 text-xl font-medium leading-6">
        Edit List
      </Dialog.Title>
      <div className="mt-4 space-y-2">
        <input
          type="text"
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
          placeholder="List title"
          className="w-full rounded-lg border-none bg-gray-100 px-3 py-2 font-medium text-gray-600 outline-none placeholder:text-gray-400"
        />
        <IconPicker iconName={iconName} setIconName={setIconName} />
      </div>
      <button
        type="submit"
        onClick={handleUpdateList}
        className="hover:border-accent hover:bg-accent mt-4 w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-white disabled:cursor-not-allowed"
      >
        Update List
      </button>
    </ModalWrapper>
  );
};

export default EditListModal;
