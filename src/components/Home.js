import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useView } from "./ViewContext";

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
    <div className="draggable w-screen h-screen bg-slate-400 grid place-items-center p-8 pt-[52px] overflow-y-auto">
      <div className="no-drag w-full max-w-[400px] rounded-2xl shadow-xl bg-white p-8">
        <h1 className="text-2xl font-semibold mb-2">User Info:</h1>
        <div className="text-gray-600 flex flex-wrap">
          <p className="font-semibold">UserID:</p>
          <p className="break-all">{currentUser.uid}</p>
        </div>
        <div className="text-gray-600 flex flex-wrap">
          <p className="font-semibold">Email:</p>
          <p className="break-all">{currentUser.email}</p>
        </div>
        <div className="mt-4 flex">
          <button className="ml-auto form-button" onClick={signOut}>
            Sign out
          </button>
        </div>
        <h1 className="text-2xl font-semibold mt-4 mb-2">App Info:</h1>
        <div className="flex flex-col gap-1">
          <div className="text-gray-600 flex flex-wrap items-center">
            <p className="font-semibold">Navbar:</p>
            <p className="break-all">{JSON.stringify(navbar)}</p>
            <button className="ml-auto text-button" onClick={toggleNavbar}>
              Toggle
            </button>
          </div>
          <div className="text-gray-600 flex flex-wrap items-center">
            <p className="font-semibold">Sidebar:</p>
            <p className="break-all">{JSON.stringify(sidebar)}</p>
            <button className="ml-auto text-button" onClick={toggleSidebar}>
              Toggle
            </button>
          </div>
          <div className="text-gray-600 flex flex-wrap items-center">
            <p className="font-semibold">Sidebar panel:</p>
            <p className="break-all">{sidebarPanel}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
