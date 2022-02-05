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
        <div className="w-full h-full p-8 flex gap-8">
          <div className="w-full sm:w-1/2 flex justify-center items-center xs:py-4">
            {loading ? (
              <Loader />
            ) : (
              <form onSubmit={handleSubmit} className="max-w-[312px] w-full">
                <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
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
                <Link
                  className="mt-1 w-full h-4 text-right block text-sm text-gray-500 hover:underline"
                  to="/reset-password"
                >
                  Forgot password?
                </Link>
                {error && (
                  <div className="mt-2 error-alert">
                    <BiInfoCircle className="text-xl rotate-180" />
                    <p className="flex-auto truncate">{error}</p>
                  </div>
                )}
                <button type="submit" className="mt-6 form-button">
                  Log in
                </button>
                <p className="mt-2 ml-0.5 block text-sm text-gray-500">
                  Need an account?{" "}
                  <Link to="/signup" className="hover:underline cursor-pointer">
                    Sign up
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
