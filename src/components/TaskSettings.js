import { Dialog, Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { BiDotsVerticalRounded, BiTrash, BiX } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../contexts/TaskContext";

const TaskSettings = ({ currentList }) => {
  const { userLists, deleteList } = useTasks();

  const navigate = useNavigate();

  const deleteCurrentList = () => {
    deleteList(currentList.id);
    navigate("/");
  };

  console.log(userLists);

  return (
    <>
      <Menu as="div" className="relative">
        <div>
          <Menu.Button className="grid h-8 w-8 place-items-center rounded-lg text-2xl text-gray-500 transition-colors hover:bg-gray-100">
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
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="p-2">
              <Menu.Item>
                <div className="flex items-center">
                  <p className="ml-1 flex-auto text-gray-600">Delete list</p>
                  <button
                    onClick={deleteCurrentList}
                    className="grid h-8 w-8 place-items-center rounded-lg bg-red-100 text-2xl text-red-400 transition-colors hover:bg-red-400 hover:text-white"
                  >
                    <BiTrash />
                  </button>
                </div>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default TaskSettings;
