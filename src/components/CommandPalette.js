import { Combobox, Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState, useEffect } from "react";
import { BiCheck } from "react-icons/bi";
import { HiSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { mobile } from "../config/functions";
import { listIcons } from "../config/icons";
import { useTasks } from "../contexts/TaskContext";

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rawQuery, setRawQuery] = useState("");
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  const { userLists } = useTasks();

  useEffect(() => {
    let filteredTasks = [];
    let filteredLists = [];
    let query = rawQuery.toLowerCase().replace(/^[>-]\s*/, ""); // remove leading >, -, or whitespace
    if (query !== "") {
      if (!rawQuery.startsWith(">")) {
        filteredTasks = Object.values(
          Object.values(userLists)
            .map((list) => Object.values(list.tasks))
            .flat()
        ) // array of tasks
          .map((task) => {
            if (task.title.toLowerCase().includes(query.toLowerCase())) {
              return { ...task, type: "task", listId: task.listId };
            }
            return null;
          })
          .filter((task) => task);
      }
      if (!rawQuery.startsWith("-")) {
        filteredLists = Object.values(userLists) // array of lists
          .flat()
          .map((task) => {
            if (task.title.toLowerCase().includes(query.toLowerCase())) {
              return { ...task, type: "list" };
            }
            return null;
          })
          .filter((task) => task); // Remove null values
      }
    }
    setResults([...filteredTasks, ...filteredLists]);
  }, [rawQuery, userLists]);

  useEffect(() => {
    const onKeydown = (event) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        setIsOpen((isOpen) => !isOpen);
      }
    };
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, []);

  return (
    <>
      <button
        className="flex h-8 w-56 items-center gap-1 rounded-lg bg-gray-100 px-2 text-sm font-medium outline-none"
        onClick={() => setIsOpen(true)}
      >
        <span className="flex-none text-xl text-gray-500">
          <HiSearch />
        </span>
        <p className="no-select w-full cursor-text text-left text-gray-400">
          Quick Search
        </p>
        {!mobile() && (
          <kbd className="grid h-5 place-items-center rounded-md bg-gray-500 px-1 font-sans text-xs font-medium tracking-wider text-white">
            ⌘K
          </kbd>
        )}
      </button>
      <Transition.Root
        show={isOpen}
        as={Fragment}
        afterLeave={() => {
          setRawQuery("");
        }}
      >
        <Dialog onClose={setIsOpen} className="fixed inset-0 pt-[25vh]">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="px-4">
              <Combobox
                onChange={(item) => {
                  if (item.type === "task") {
                    navigate(`/${item.listId}`);
                  } else {
                    navigate(`/${item.id}`);
                  }
                  setIsOpen(false);
                }}
                as="div"
                className="relative mx-auto max-w-xl rounded-2xl bg-white p-2 shadow-lg"
              >
                <div className="relative flex items-center gap-2 rounded-lg bg-gray-100 px-3">
                  <HiSearch className="h-6 w-6 text-gray-500" />
                  <Combobox.Input
                    onChange={(event) => {
                      setRawQuery(event.target.value);
                    }}
                    className="h-10 w-full border-0 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Search..."
                  />
                  <kbd className="absolute right-2 rounded-lg border-2 border-gray-300 px-2 py-1 font-sans text-xs font-bold text-gray-400">
                    ESC
                  </kbd>
                </div>
                {results.length > 0 ? (
                  <p className="mx-2 mt-3 mb-1 text-xs font-bold uppercase tracking-tight text-gray-400">
                    All lists
                  </p>
                ) : (
                  rawQuery && (
                    <p className="p-2 pb-1 text-sm text-gray-500">
                      No Results Found
                    </p>
                  )
                )}
                <Combobox.Options
                  static
                  className="max-h-56 overflow-y-auto text-sm"
                >
                  {/* List of all search items */}
                  {results.map((item) => (
                    <Combobox.Option key={item.id} value={item}>
                      {({ active }) => (
                        <div
                          className={`${
                            active && "bg-gray-100"
                          } flex h-8 items-center gap-1.5 rounded-lg px-1.5 font-medium text-gray-600`}
                        >
                          <span className="flex-none text-gray-500">
                            {item.type === "task" ? ( // Check item type (list or task)
                              item.completed === true ? (
                                <div className="h-5 w-5 rounded-md bg-accent text-xl text-white">
                                  <BiCheck />
                                </div>
                              ) : (
                                <div className="h-5 w-5 rounded-md border-2 border-gray-300"></div>
                              )
                            ) : (
                              <span className="flex-none text-xl text-gray-500">
                                {
                                  listIcons.find(
                                    (icon) => icon.name === item.icon && icon
                                  ).icon // Render icon by looking up key in listIcons
                                }
                              </span>
                            )}
                          </span>
                          {item.title}
                        </div>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
                <div className="mt-2 flex items-center border-t-2 border-gray-100 p-2 text-xs font-medium text-gray-600">
                  Type{" "}
                  <kbd
                    className={`${
                      rawQuery.startsWith(">")
                        ? "border-accent text-accent"
                        : "border-gray-300 text-gray-600"
                    } mx-1 flex h-5 w-5 items-center justify-center rounded-md border-2 bg-white font-semibold`}
                  >
                    &gt;
                  </kbd>{" "}
                  <span>for lists and</span>
                  <kbd
                    className={`${
                      rawQuery.startsWith("-")
                        ? "border-accent text-accent"
                        : "border-gray-300 text-gray-600"
                    } mx-1 flex h-5 w-5 items-center justify-center rounded-md border-2 bg-white font-semibold`}
                  >
                    -
                  </kbd>{" "}
                  for tasks.
                </div>
              </Combobox>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default CommandPalette;
