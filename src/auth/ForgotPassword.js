import { useState } from "react";
import { BiCheck, BiInfoCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Loader from "../components/Loader";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { resetPassword } = useAuth();

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

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
    <div className="w-screen h-screen bg-white grid place-items-center">
      <div className="max-w-[320px] w-full rounded-2xl border-[2px] border-gray-200 bg-white p-8">
        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit} className="">
            <h1 className="text-2xl font-semibold">Reset password</h1>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={updateEmail}
              required
              className="form-input mt-3"
            />
            <Link
              className="mt-1 w-full text-right block text-sm text-gray-500 hover:underline"
              to="/login"
            >
              Back to login page
            </Link>
            {error && (
              <div className="mt-4 w-full box-border border-[2px] border-red-400 bg-red-100 text-red-400 text-sm px-1 py-0.5 rounded-md flex items-center gap-1">
                <BiInfoCircle className="text-xl rotate-180" />
                <p className="flex-auto truncate">{error}</p>
              </div>
            )}
            {message && (
              <div className="mt-4 w-full box-border border-[2px] border-green-400 bg-green-100 text-green-400 text-sm px-1 py-0.5 rounded-md flex items-center gap-1">
                <BiCheck className="text-xl" />
                <p className="flex-auto truncate">{message}</p>
              </div>
            )}
            <button type="submit" className="mt-8 form-button">
              Reset password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
