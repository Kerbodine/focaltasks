import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function MainView() {
  return (
    <div className="h-screen w-screen">
      <hr className="absolute top-[55px] h-[1px] w-screen border-gray-200" />
      <div className="mx-auto flex h-full w-full max-w-screen-xl">
        {/* Navbar section */}
        <Navbar />
        {/* Main task area */}
        <div className="ml-[56px] h-full flex-auto bg-red-100 sm:ml-0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
          saepe.
        </div>
        {/* Sidebar section */}
        <Sidebar />
      </div>
    </div>
  );
}
