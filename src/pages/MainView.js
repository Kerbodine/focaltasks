import Navbar from "../components/Navbar";
import { useView } from "../contexts/ViewContext";

export default function MainView() {
  const { navbar, toggleNavbar, sidebar } = useView();

  return (
    <div className="h-screen w-screen">
      <hr className="absolute top-[55px] h-[1px] w-screen border-gray-200" />
      <Navbar expanded={navbar} />
    </div>
  );
}
