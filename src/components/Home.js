import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="w-screen h-screen bg-slate-400 grid place-items-center">
      <div className="w-[300px] rounded-2xl shadow-xl bg-white p-8">
        <p className="font-semibold">
          UserID:{" "}
          <span className="text-gray-700 font-normal">{currentUser.uid}</span>
        </p>
        <p className="font-semibold">
          Email:{" "}
          <span className="text-gray-700 font-normal">{currentUser.email}</span>
        </p>

        <div className="mt-4 flex">
          <button className="ml-auto form-button" onClick={signOut}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
