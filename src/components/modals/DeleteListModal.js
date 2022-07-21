import { Dialog } from "@headlessui/react";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../contexts/TaskContext";
import ModalWrapper from "./ModalWrapper";

const DeleteListModal = ({ currentList, modalOpen, setModalOpen }) => {
  const { deleteList } = useTasks();
  const navigate = useNavigate();

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDeleteList = (e) => {
    e.preventDefault();
    closeModal();
    deleteList(currentList.id);
    toast.success("List deleted");
    navigate("/");
  };

  return (
    <ModalWrapper modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <Dialog.Title as="h3" className="mt-1 text-xl font-medium leading-6">
        Are you sure?
      </Dialog.Title>
      <p className="text-gray-600">This action cannot be undone</p>
      <div className="mt-4 flex gap-4">
        <button
          type="button"
          className="w-full rounded-lg border-2 border-gray-200 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          onClick={closeModal}
        >
          Go back
        </button>
        <button
          type="button"
          className="w-full rounded-lg border-2 border-red-400 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-400 hover:text-white"
          onClick={handleDeleteList}
        >
          Delete list
        </button>
      </div>
    </ModalWrapper>
  );
};

export default DeleteListModal;
