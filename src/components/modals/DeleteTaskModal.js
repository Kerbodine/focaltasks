import { Dialog } from "@headlessui/react";
import React from "react";
import toast from "react-hot-toast";
import { useTasks } from "../../contexts/TaskContext";
import ModalWrapper from "./ModalWrapper";

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
    <ModalWrapper modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <Dialog.Title
        as="h3"
        className="mt-1 text-xl font-medium leading-6 dark:text-white"
      >
        Are you sure?
      </Dialog.Title>
      <p className="text-gray-600 dark:text-gray-400">
        This action cannot be undone
      </p>
      <div className="mt-4 flex gap-4">
        <button
          type="button"
          className="w-full rounded-lg border-2 border-gray-200 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
          onClick={closeModal}
        >
          Go back
        </button>
        <button
          type="button"
          className="w-full rounded-lg border-2 border-red-400 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-400 hover:text-white dark:border-red-400/50 dark:text-red-400/75 dark:hover:border-transparent dark:hover:bg-red-400/50 dark:hover:text-white"
          onClick={handleDeleteTask}
        >
          Delete task
        </button>
      </div>
    </ModalWrapper>
  );
};

export default DeleteTaskModal;
