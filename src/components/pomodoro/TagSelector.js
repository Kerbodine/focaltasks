import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BiCaretDown } from "react-icons/bi";
import { HiPencil } from "react-icons/hi";

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
  { id: 7, name: "Caroline Schultz" },
  { id: 8, name: "Mason Heaney" },
  { id: 9, name: "Claudie Smitham" },
  { id: 10, name: "Emil Schaefer" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TagSelector() {
  const [selected, setSelected] = useState(people[3]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          {/* <Listbox.Label className="block text-sm font-medium text-gray-700">
            Assigned to
          </Listbox.Label> */}

          <div className="relative">
            <Listbox.Button className="flex w-[120px] items-center gap-1 rounded-lg bg-gray-100 p-2 py-1 hover:bg-gray-200">
              <div className="h-4 w-4 flex-none rounded-full bg-accent"></div>
              <p className="-mr-1 truncate text-sm font-medium text-gray-600">
                {selected.name}
              </p>
              <BiCaretDown className="ml-auto flex-none text-xl text-gray-400" />
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border-2 border-gray-100 bg-white p-1 text-base shadow-lg focus:outline-none sm:text-sm">
                <div>
                  {people.map((person) => (
                    <Listbox.Option
                      key={person.id}
                      className={({ active }) =>
                        `${
                          active && "bg-gray-100"
                        } relative cursor-default select-none rounded-md py-1 pr-2 pl-1 text-gray-500`
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={`${
                                selected && "ring-2 ring-accent"
                              } inline-block h-4 w-4 flex-shrink-0 rounded-full bg-gray-300`}
                              aria-hidden="true"
                            />
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-1.5 block truncate"
                              )}
                            >
                              {person.name}
                            </span>
                          </div>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </div>
                <hr className="-mx-1 my-1 border border-gray-100" />
                <button className="flex w-full items-center justify-center gap-1 rounded-md py-1 font-medium text-gray-500 hover:bg-gray-100">
                  <HiPencil className="-ml-2.5 -mr-0.5 text-xl" />
                  Customize
                </button>
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
