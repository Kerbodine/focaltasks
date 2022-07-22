import { useState } from "react";
import { BiCheck, BiInfoCircle, BiLoaderAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      await resetPassword(email);
      setEmail("");
      setLoading(false);
      setMessage("Check your email!");
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("User not found");
          break;
        case "auth/invalid-email":
          setError("Invalid email");
          break;
        default:
          setError("Failed to reset password");
      }
      setLoading(false);
    }
  };

  return (
    <div className="grid h-screen w-screen place-items-center bg-white">
      <div className="xs:border-2 rounded-2xl border-gray-200 p-8">
        <form className="relative w-[240px]" onSubmit={handleSubmit}>
          <h1 className="xs:text-2xl mb-4 text-xl font-semibold">
            Reset password
          </h1>
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-lg border-2 border-gray-200 px-2 py-1 text-gray-700 focus:border-gray-600 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && (
            <div className="mt-2 flex w-full gap-1 rounded-lg border-2 border-red-500 bg-red-100 p-0.5 text-sm font-medium text-red-500">
              <BiInfoCircle className="flex-none rotate-180 text-xl" />
              <p className="flex-auto truncate">{error}</p>
            </div>
          )}
          {message && (
            <div className="mt-2 flex w-full gap-1 rounded-lg border-2 border-emerald-500 bg-green-100 p-0.5 text-sm font-medium text-emerald-500">
              <BiCheck className="flex-none text-xl" />
              <p className="flex-auto truncate">{message}</p>
            </div>
          )}
          <div className="mt-1 flex text-sm text-gray-500 hover:underline">
            <Link to="/login" className="ml-auto">
              Back to login
            </Link>
          </div>
          <button
            type="submit"
            className="mt-4 rounded-lg border-2 border-gray-600 px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-600 hover:text-white"
          >
            Reset password →
          </button>
          {loading && (
            <div className="absolute inset-0 grid place-items-center bg-white">
              <span className="animate-spin text-2xl text-gray-500">
                <BiLoaderAlt />
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
