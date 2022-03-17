import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { BiX } from "react-icons/bi";
import { HiPlusSm } from "react-icons/hi";
import { useTasks } from "../contexts/TaskContext";
import { useView } from "../contexts/ViewContext";
import IconPicker from "./IconPicker";

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
        className={`group flex h-8 w-full cursor-pointer items-center gap-1.5 rounded-lg px-1.5 text-gray-400 outline-none transition-colors hover:bg-accent hover:text-white`}
        onClick={openModal}
      >
        <span className="flex-none text-xl">
          <HiPlusSm />
        </span>
        <p
          className={`${
            !navbar && "hidden sm:block"
          } flex-auto text-left text-sm font-medium`}
        >
          New list
        </p>
      </button>
      <Transition appear show={modalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeSettings}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/25" />
            </Transition.Child>
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <form className="relative inline-block w-full max-w-xs transform rounded-2xl bg-white p-6 text-left align-middle shadow-lg">
                <Dialog.Title
                  as="h3"
                  className="mt-1 text-xl font-medium leading-6"
                >
                  New List
                </Dialog.Title>
                <div className="mt-4 space-y-2">
                  <input
                    type="text"
                    value={listTitle}
                    onChange={(e) => setListTitle(e.target.value)}
                    placeholder="List title"
                    className="w-full rounded-lg bg-gray-100 px-3 py-2 font-medium text-gray-600 outline-none"
                  />
                  <IconPicker iconName={iconName} setIconName={setIconName} />
                </div>
                <button
                  type="submit"
                  onClick={createNewList}
                  {...(!listTitle && { disabled: true })}
                  className="mt-4 w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-accent hover:bg-accent hover:text-white disabled:cursor-not-allowed"
                >
                  Create list
                </button>
                <button
                  type="button"
                  className="absolute right-6 top-6 rounded-full p-1 text-2xl transition-colors hover:bg-gray-100"
                  onClick={closeSettings}
                >
                  <BiX />
                </button>
              </form>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default NewListButton;
