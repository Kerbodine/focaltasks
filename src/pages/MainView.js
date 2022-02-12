import Navbar from "../components/Navbar";
import { useView } from "../contexts/ViewContext";
import { BiDockLeft } from "react-icons/bi";

export default function MainView() {
  const { navbar, toggleNavbar } = useView();

  return (
    <div className="flex h-screen w-screen justify-center xs:p-12">
      <div className="box-content h-full w-full max-w-7xl overflow-hidden rounded-2xl xs:border-2 xs:border-gray-200">
        <div className="box-content flex h-12 w-full items-center border-b-2 border-gray-200 px-2">
          <button
            onClick={toggleNavbar}
            className={`${
              navbar ? "ml-[170px]" : "ml-0"
            } z-10 grid h-8 w-8 place-items-center rounded-md text-2xl text-gray-700 transition-all duration-200 hover:bg-gray-200`}
          >
            <BiDockLeft />
          </button>
        </div>
        <div className="flex h-full w-full">
          <div className="-mt-[50px] h-full">
            <Navbar navbar={navbar} />
          </div>
        </div>
      </div>
    </div>
  );
}
