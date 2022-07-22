import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { HiPlusSm } from "react-icons/hi";
import { useTasks } from "../contexts/TaskContext";
import { useView } from "../contexts/ViewContext";
import IconPicker from "./IconPicker";
import ModalWrapper from "./modals/ModalWrapper";

const NewListButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { navbar } = useView();
  const { newList } = useTasks();

  const [listTitle, setListTitle] = useState("");
  const [iconName, setIconName] = useState("list");

  const openModal = () => {
    setModalOpen(true);
  };

  const closeSettings = () => {
    setModalOpen(false);
  };

  const createNewList = (e) => {
    e.preventDefault();
    closeSettings();
    setListTitle("");
    newList(listTitle, iconName);
  };

  return (
    <>
      <button
        className={`group hover:bg-accent flex h-8 w-full cursor-pointer items-center gap-1.5 rounded-lg px-1.5 text-gray-400 outline-none transition-colors hover:text-white`}
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
        <Dialog.Title as="h3" className="mt-1 text-xl font-medium leading-6">
          New List
        </Dialog.Title>
        <div className="mt-4 space-y-2">
          <input
            type="text"
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
            placeholder="List title"
            className="w-full rounded-lg border-0 bg-gray-100 px-3 py-2 font-medium text-gray-600 outline-none placeholder:text-gray-400"
          />
          <IconPicker iconName={iconName} setIconName={setIconName} />
        </div>
        <button
          type="submit"
          onClick={createNewList}
          className="hover:border-accent hover:bg-accent mt-4 w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-white disabled:cursor-not-allowed"
        >
          Create list
        </button>
      </ModalWrapper>
    </>
  );
};

export default NewListButton;
