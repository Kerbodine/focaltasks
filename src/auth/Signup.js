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
        <div className="w-full h-full p-8 flex gap-8">
          <div className="w-full sm:w-1/2 flex justify-center items-center xs:py-4">
            {loading ? (
              <Loader />
            ) : (
              <form onSubmit={handleSubmit} className="max-w-[312px] w-full">
                <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
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
                <div className="flex mt-2 items-center">
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
                    className="-ml-7 rounded-full text-gray-400 hover:text-gray-600 text-xl"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <BiShow /> : <BiHide />}
                  </button>
                </div>
                {error && (
                  <div className="mt-2 error-alert">
                    <BiInfoCircle className="text-xl rotate-180" />
                    <p className="flex-auto truncate">{error}</p>
                  </div>
                )}
                <button type="submit" className="mt-6 form-button">
                  Sign up
                </button>
                <p className="mt-2 ml-0.5 block text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link to="/login" className="hover:underline cursor-pointer">
                    Log in
                  </Link>
                </p>
              </form>
            )}
          </div>
          <div className="hidden sm:block h-full w-1/2 bg-red-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
