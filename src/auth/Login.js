import { useState } from "react";
import { BiHide, BiInfoCircle, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuth } from "./AuthContext";
import GoogleSignin from "./GoogleSignin";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

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
      await login(email, password);
      setLoading(false);
      navigate("/");
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("User not found");
          break;
        case "auth/wrong-password":
          setError("Wrong password");
          break;
        default:
          setError("Failed to login");
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
                  Log in
                </h1>
                <GoogleSignin type={"login"} />
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
                <Link
                  className="mt-1 block h-4 w-full text-right text-sm text-gray-500 hover:underline"
                  to="/reset-password"
                >
                  Forgot password?
                </Link>
                {error && (
                  <div className="error-alert mt-2">
                    <BiInfoCircle className="rotate-180 text-xl" />
                    <p className="flex-auto truncate">{error}</p>
                  </div>
                )}
                <button type="submit" className="form-button mt-6">
                  Log in
                </button>
                <p className="mt-2 ml-0.5 block text-sm text-gray-500">
                  Need an account?{" "}
                  <Link to="/signup" className="cursor-pointer hover:underline">
                    Sign up
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
