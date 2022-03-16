import { Dialog, Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { BiDotsVerticalRounded, BiTrash, BiX } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../contexts/TaskContext";
import { useView } from "../contexts/ViewContext";

const TaskSettings = ({ currentList }) => {
  const { showSettings, setShowSettings } = useView();
  const { userLists, deleteList } = useTasks();

  const navigate = useNavigate();

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  const deleteCurrentList = () => {
    deleteList(currentList.id);
    closeSettings();
    navigate("/");
  };

  console.log(userLists);

  return (
    <>
      <button
        onClick={openSettings}
        className="grid h-8 w-8 place-items-center rounded-lg text-2xl text-gray-500 transition-colors hover:bg-gray-100"
      >
        <BiDotsVerticalRounded />
      </button>
      <Transition appear show={showSettings} as={Fragment}>
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
              <div className="relative inline-block w-full max-w-[288px] transform rounded-2xl bg-white p-6 text-left align-middle shadow-lg">
                <Dialog.Title
                  as="h3"
                  className="mt-1 text-2xl font-medium leading-6"
                >
                  List Options
                </Dialog.Title>
                <div className="mt-4 space-y-1">
                  <div className="flex items-center">
                    <p className="flex-auto text-gray-600">Delete list</p>
                    <button
                      onClick={deleteCurrentList}
                      className="grid h-8 w-8 place-items-center rounded-lg bg-red-100 text-2xl text-red-400 transition-colors hover:bg-red-400 hover:text-white"
                    >
                      <BiTrash />
                    </button>
                  </div>
                </div>
                <button
                  className="absolute right-6 top-6 rounded-full p-1 text-2xl transition-colors hover:bg-gray-100"
                  onClick={closeSettings}
                >
                  <BiX />
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default TaskSettings;
