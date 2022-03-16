import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useTasks } from "../contexts/TaskContext";
import DeleteListModal from "./DeleteListModal";
import EditListModal from "./EditListModal";

const TaskSettings = ({ currentList }) => {
  const { userLists } = useTasks();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  console.log(userLists);

  return (
    <>
      <Menu as="div" className="relative">
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
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-lg border-2 border-gray-100 bg-white shadow-lg outline-none">
            <div className="space-y-1 p-2">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-gray-100"
                    } flex w-full items-center rounded-md px-2 py-1 text-gray-600`}
                    onClick={() => setEditModalOpen(true)}
                  >
                    <p className="flex-auto text-left text-sm font-medium">
                      Edit list
                    </p>
                    <span className="text-xl">
                      <HiPencil />
                    </span>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-gray-100"
                    } flex w-full items-center rounded-md px-2 py-1 text-gray-600`}
                    onClick={() => setDeleteModalOpen(true)}
                  >
                    <p className="flex-auto text-left text-sm font-medium">
                      Delete list
                    </p>
                    <span className="text-xl">
                      <HiTrash />
                    </span>
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
    </>
  );
};

export default TaskSettings;
