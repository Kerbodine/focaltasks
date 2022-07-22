import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  HiCheckCircle,
  HiPencil,
  HiPrinter,
  HiShare,
  HiTrash,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSettings } from "../contexts/SettingsContext";
import { useTasks } from "../contexts/TaskContext";
import DeleteListModal from "./modals/DeleteListModal";
import EditListModal from "./modals/EditListModal";
import ShareModal from "./modals/ShareModal";

const TaskSettings = ({ currentList, handlePrint }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const { hideDeleteWarning } = useSettings();
  const { updateList, deleteList } = useTasks();
  const { userData } = useAuth();

  const navigate = useNavigate();

  const toggleShowCompleted = () => {
    updateList(
      currentList.id,
      { hideCompleted: !currentList.hideCompleted },
      currentList.author
    );
  };

  const printList = () => {
    handlePrint();
  };

  return (
    <>
      <Menu as="div" className="relative z-10 print:hidden">
        <div>
          <Menu.Button className="grid h-8 w-8 place-items-center rounded-lg text-2xl text-gray-500 outline-none transition-colors hover:bg-gray-100">
            <BiDotsVerticalRounded />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg border-2 border-gray-100 bg-white shadow-lg outline-none">
            <div className="space-y-1 p-1.5">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-gray-100"
                    } flex w-full items-center rounded-md px-2 py-1.5 text-gray-600`}
                    onClick={toggleShowCompleted}
                  >
                    <span className="text-xl">
                      <HiCheckCircle />
                    </span>
                    <p className="ml-1.5 text-sm font-medium">
                      {currentList.hideCompleted ? "Show" : "Hide"} completed
                    </p>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-gray-100"
                    } flex w-full items-center rounded-md px-2 py-1.5 text-gray-600`}
                    onClick={() => setEditModalOpen(true)}
                  >
                    <span className="text-xl">
                      <HiPencil />
                    </span>
                    <p className="ml-1.5 text-sm font-medium">Edit list</p>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-gray-100"
                    } flex w-full items-center rounded-md px-2 py-1.5 text-gray-600`}
                    onClick={() => setShareModalOpen(true)}
                  >
                    <span className="text-xl">
                      <HiShare />
                    </span>
                    <p className="ml-1.5 text-sm font-medium">Share list</p>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-gray-100"
                    } flex w-full items-center rounded-md px-2 py-1.5 text-gray-600`}
                    onClick={printList}
                  >
                    <span className="text-xl">
                      <HiPrinter />
                    </span>
                    <p className="ml-1.5 text-sm font-medium">Print list</p>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    {...(currentList.author !== userData.id && {
                      disabled: true,
                    })}
                    className={`${
                      active && "bg-gray-100"
                    } flex w-full items-center rounded-md px-2 py-1.5 text-gray-600 disabled:cursor-not-allowed disabled:opacity-50`}
                    onClick={() => {
                      if (!hideDeleteWarning) {
                        setDeleteModalOpen(true);
                      } else {
                        deleteList(currentList.id, currentList.author);
                        toast.success("List deleted");
                        navigate("/");
                      }
                    }}
                  >
                    <span className="text-xl">
                      <HiTrash />
                    </span>
                    <p className="ml-1.5 text-sm font-medium">Delete list</p>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <EditListModal
        currentList={currentList}
        modalOpen={editModalOpen}
        setModalOpen={setEditModalOpen}
      />
      <DeleteListModal
        currentList={currentList}
        modalOpen={deleteModalOpen}
        setModalOpen={setDeleteModalOpen}
      />
      <ShareModal
        currentList={currentList}
        modalOpen={shareModalOpen}
        setModalOpen={setShareModalOpen}
      />
    </>
  );
};

export default TaskSettings;
