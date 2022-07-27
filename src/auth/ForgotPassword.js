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
    <div className="grid h-screen w-screen place-items-center bg-white dark:bg-gray-900">
      <div className="rounded-2xl border-gray-200 p-8 dark:border-gray-700 xs:border-2">
        <form className="relative w-[240px]" onSubmit={handleSubmit}>
          <h1 className="mb-4 text-xl font-semibold tracking-tight dark:text-white xs:text-2xl">
            Reset password
          </h1>
          <input
            type="email"
            placeholder="Email address"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && (
            <div className="auth-error mt-2">
              <BiInfoCircle className="flex-none rotate-180 text-xl" />
              <p className="flex-auto truncate">{error}</p>
            </div>
          )}
          {message && (
            <div className="auth-message mt-2">
              <BiCheck className="flex-none text-xl" />
              <p className="flex-auto truncate">{message}</p>
            </div>
          )}
          <div className="mt-1 flex text-sm text-gray-500 hover:underline">
            <Link to="/login" className="ml-auto">
              Back to login
            </Link>
          </div>
          <button type="submit" className="auth-button mt-4">
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
