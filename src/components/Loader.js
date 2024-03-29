import { BiLoaderAlt } from "react-icons/bi";

export default function Loader() {
  return (
    <div className="grid h-full w-full place-items-center">
      <span className="animate-spin text-2xl text-black dark:text-white">
        <BiLoaderAlt />
      </span>
    </div>
  );
}
