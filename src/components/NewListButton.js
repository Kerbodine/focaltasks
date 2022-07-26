import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { HiPlusSm } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../contexts/TaskContext";
import { useView } from "../contexts/ViewContext";
import IconPicker from "./IconPicker";
import ModalWrapper from "./modals/ModalWrapper";

const NewListButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { navbar } = useView();
  const { newList } = useTasks();
  const navigate = useNavigate();

  const [listTitle, setListTitle] = useState("");
  const [iconName, setIconName] = useState("list");

  const openModal = () => {
    setModalOpen(true);
  };

  const closeSettings = () => {
    setModalOpen(false);
  };

  const createNewList = async (e) => {
    e.preventDefault();
    closeSettings();
    setListTitle("");
    const listId = await newList(listTitle, iconName);
    navigate(`/${listId}`);
  };

  return (
    <>
      <button
        className={`group flex h-8 w-full cursor-pointer items-center gap-1.5 rounded-lg px-1.5 text-gray-400 outline-none transition-colors hover:bg-accent hover:text-white dark:text-gray-600 dark:hover:text-white`}
        onClick={openModal}
      >
        <span className="flex-none text-xl">
          <HiPlusSm />
        </span>
        <p
          className={`${
            !navbar && "hidden sm:block"
          } flex-auto truncate text-left text-sm font-medium`}
        >
          New list
        </p>
      </button>
      <ModalWrapper modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <Dialog.Title
          as="h3"
          className="mt-1 text-xl font-medium leading-6 dark:text-white"
        >
          New List
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
        <button type="submit" onClick={createNewList} className="modal-button">
          Create list
        </button>
      </ModalWrapper>
    </>
  );
};

export default NewListButton;
