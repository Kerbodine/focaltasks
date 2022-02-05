import { useState } from "react";
import { BiCheck, BiInfoCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Loader from "../components/Loader";

export default function ForgotPassword() {
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
    <div className="draggable grid h-screen w-screen place-items-center bg-white">
      <div className="no-drag border-box w-full max-w-[296px] rounded-2xl border-[2px] border-gray-200 bg-white p-8">
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
              className="mt-1 block w-full text-right text-sm text-gray-500 hover:underline"
              to="/login"
            >
              Back to login page
            </Link>
            {error && (
              <div className="error-alert mt-2">
                <BiInfoCircle className="rotate-180 text-xl" />
                <p className="flex-auto truncate">{error}</p>
              </div>
            )}
            {message && (
              <div className="success-alert mt-2">
                <BiCheck className="text-xl" />
                <p className="flex-auto truncate">{message}</p>
              </div>
            )}
            <button type="submit" className="form-button mt-8">
              Reset password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
