import { useState } from "react";
import { BiHide, BiInfoCircle, BiLoaderAlt, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ReactComponent as GoogleIcon } from "../svg/google.svg";

export default function Signup() {
  const navigate = useNavigate();
  const { signup, signInWithGoogle } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const googleSignIn = async () => {
    await signInWithGoogle();
    navigate("/inbox");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signup(email, password, firstName, lastName);
      setLoading(false);
      navigate("/inbox");
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
    <div className="grid h-screen w-screen place-items-center bg-white dark:bg-gray-900">
      <div className="rounded-2xl border-gray-200 p-8 dark:border-gray-700 xs:border-2">
        <form className="relative w-[240px]" onSubmit={handleSubmit}>
          <h1 className="mb-4 text-2xl font-semibold tracking-tight dark:text-white xs:text-3xl">
            Sign up
          </h1>
          <button type="button" onClick={googleSignIn} className="auth-google">
            <span className="text-base">
              <GoogleIcon />
            </span>
            Continue with Google
          </button>
          <div className="my-2 flex w-full items-center">
            <div className="h-0.5 flex-auto bg-gray-200 dark:bg-gray-700"></div>
            <p className="mx-2 text-xs font-bold text-gray-500">OR</p>
            <div className="h-0.5 flex-auto bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="First name"
              className="auth-input mb-2"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last name"
              className="auth-input mb-2"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email address"
            className="auth-input mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="-ml-7 text-xl text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BiHide /> : <BiShow />}
            </button>
          </div>
          {error && (
            <div className="auth-error mt-2">
              <BiInfoCircle className="flex-none rotate-180 text-xl" />
              <p className="flex-auto truncate">{error}</p>
            </div>
          )}
          <button type="submit" className="auth-button mt-8">
            Sign up →
          </button>
          <p className="mt-2 text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-gray-700 hover:underline dark:text-gray-400"
            >
              Log in
            </Link>
          </p>
          {loading && (
            <div className="absolute inset-0 grid place-items-center bg-white dark:bg-gray-900">
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
