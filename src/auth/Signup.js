import { useState } from "react";
import { BiHide, BiInfoCircle, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuth } from "./AuthContext";
import GoogleSignin from "./GoogleSignin";

export default function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signup } = useAuth();

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      setLoading(false);
      navigate("/");
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Email already in use");
          break;
        case "auth/invalid-email":
          setError("Invalid email");
          break;
        case "auth/weak-password":
          setError("Password must be at least 6 characters");
          break;
        default:
          setError("Failed to signup");
      }
      setLoading(false);
    }
  };

  return (
    <div className="auth-frame">
      <div className="auth-container">
        <div className="flex h-full w-full gap-8 p-8">
          <div className="flex w-full items-center justify-center sm:w-1/2 xs:py-4">
            {loading ? (
              <Loader />
            ) : (
              <form onSubmit={handleSubmit} className="w-full max-w-[312px]">
                <h1 className="mb-6 text-2xl font-semibold sm:text-3xl">
                  Sign up
                </h1>
                <GoogleSignin type={"signup"} />
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={updateFirstName}
                    required
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={updateLastName}
                    required
                    className="form-input"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={updateEmail}
                  required
                  className="form-input mt-2"
                />
                <div className="mt-2 flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={updatePassword}
                    required
                    className="form-input"
                  />
                  <button
                    type="button"
                    className="-ml-7 rounded-full text-xl text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <BiShow /> : <BiHide />}
                  </button>
                </div>
                {error && (
                  <div className="error-alert mt-2">
                    <BiInfoCircle className="rotate-180 text-xl" />
                    <p className="flex-auto truncate">{error}</p>
                  </div>
                )}
                <button type="submit" className="form-button mt-6">
                  Sign up
                </button>
                <p className="mt-2 ml-0.5 block text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link to="/login" className="cursor-pointer hover:underline">
                    Log in
                  </Link>
                </p>
              </form>
            )}
          </div>
          <div className="hidden h-full w-1/2 rounded-xl bg-red-200 sm:block"></div>
        </div>
      </div>
    </div>
  );
}
