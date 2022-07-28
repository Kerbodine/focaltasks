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

  const deleteListHandler = () => {
    if (!hideDeleteWarning) {
      setDeleteModalOpen(true);
    } else {
      deleteList(currentList.id, currentList.author);
      toast.success("List deleted");
      navigate("/inbox");
    }
  };

  const options = [
    {
      icon: <HiCheckCircle />,
      label: `${currentList.hideCompleted ? "Show" : "Hide"} completed`,
      handler: toggleShowCompleted,
    },
    {
      icon: <HiPencil />,
      label: "Edit",
      handler: () => setEditModalOpen(true),
    },
    {
      icon: <HiShare />,
      label: "Share",
      handler: () => setShareModalOpen(true),
    },
    {
      icon: <HiPrinter />,
      label: "Print",
      handler: printList,
    },
    {
      icon: <HiTrash />,
      label: "Delete list",
      handler: deleteListHandler,
    },
  ];

  return (
    <>
      <Menu as="div" className="relative print:hidden">
        <div>
          <Menu.Button className="grid h-8 w-8 place-items-center rounded-lg text-2xl text-gray-500 outline-none transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
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
          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg border-2 border-gray-100 bg-white shadow-lg outline-none dark:border-gray-700 dark:bg-gray-900">
            <div className="space-y-1 p-1.5">
              {options.map(({ icon, label, handler }, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <button
                      {...(label === "Delete list" &&
                        currentList.author !== userData.id && {
                          disabled: true,
                        })}
                      className={`${
                        active && "bg-gray-100 dark:bg-gray-800"
                      } flex w-full items-center rounded-md px-2 py-1.5 text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-400`}
                      onClick={handler}
                    >
                      <span className="text-xl">{icon}</span>
                      <p className="ml-1.5 text-sm font-medium">{label}</p>
                    </button>
                  )}
                </Menu.Item>
              ))}
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
