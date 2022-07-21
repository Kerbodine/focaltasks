import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import toast from "react-hot-toast";
import { BiX } from "react-icons/bi";
import { useTasks } from "../contexts/TaskContext";

const DeleteTaskModal = ({
  taskId,
  listId,
  modalOpen,
  setModalOpen,
  author,
}) => {
  const { deleteTask } = useTasks();

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDeleteTask = (e) => {
    e.preventDefault();
    closeModal();
    deleteTask(taskId, listId, author);
    toast.success("Task deleted");
  };

  return (
    <Transition appear show={modalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
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
                Are you sure?
              </Dialog.Title>
              <p className="text-gray-600">This action cannot be undone</p>
              <div className="mt-4 flex gap-4">
                <button
                  type="button"
                  className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                  onClick={closeModal}
                >
                  Go back
                </button>
                <button
                  type="button"
                  className="w-full rounded-lg border-2 border-red-400 px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-400 hover:text-white"
                  onClick={handleDeleteTask}
                >
                  Delete task
                </button>
              </div>
              <button
                type="button"
                className="absolute right-6 top-6 rounded-full p-1 text-2xl transition-colors hover:bg-gray-100"
                onClick={closeModal}
              >
                <BiX />
              </button>
            </form>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteTaskModal;
