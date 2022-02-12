import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useView } from "../contexts/ViewContext";

export default function Home() {
  const navigate = useNavigate();

  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");

  const signOut = async () => {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      setError("Failed to logout");
    }
  };

  const {
    navbar,
    toggleNavbar,
    sidebar,
    toggleSidebar,
    sidebarPanel,
    setSidebarPanel,
  } = useView();

  return (
    <div className="grid h-screen w-screen place-items-center overflow-y-auto bg-slate-400 p-8 pt-[48px]">
      <div className="w-full max-w-[400px] rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-2xl font-semibold">User Info:</h1>
        <div className="flex flex-wrap text-gray-600">
          <p className="font-semibold">UserID:</p>
          <p className="break-all">{currentUser.uid}</p>
        </div>
        <div className="flex flex-wrap text-gray-600">
          <p className="font-semibold">Email:</p>
          <p className="break-all">{currentUser.email}</p>
        </div>
        <div className="mt-4 flex">
          <button className="form-button ml-auto" onClick={signOut}>
            Sign out
          </button>
        </div>
        <h1 className="mt-4 mb-2 text-2xl font-semibold">App Info:</h1>
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center text-gray-600">
            <p className="font-semibold">Navbar:</p>
            <p className="break-all">{JSON.stringify(navbar)}</p>
            <button className="text-button ml-auto" onClick={toggleNavbar}>
              Toggle
            </button>
          </div>
          <div className="flex flex-wrap items-center text-gray-600">
            <p className="font-semibold">Sidebar:</p>
            <p className="break-all">{JSON.stringify(sidebar)}</p>
            <button className="text-button ml-auto" onClick={toggleSidebar}>
              Toggle
            </button>
          </div>
          <div className="flex flex-wrap items-center text-gray-600">
            <p className="font-semibold">Sidebar panel:</p>
            <p className="break-all">{sidebarPanel}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
