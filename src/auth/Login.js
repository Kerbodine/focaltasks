import { useState } from "react";
import { BiHide, BiInfoCircle, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  // const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const { signup } = useAuth();

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {};

  return (
    <div className="w-screen h-screen bg-slate-400 overflow-hidden p-0 xs:p-[52px] grid place-items-center draggable">
      <div className="no-drag w-full max-w-4xl h-full xs:max-h-[600px] bg-white border-[1px] border-gray-200 rounded-none xs:rounded-2xl pt-[52px] xs:p-0">
        <div className="w-full h-full p-8 flex gap-8">
          <div className="w-full sm:w-1/2 flex justify-center items-center xs:py-4">
            <form onSubmit={handleSubmit} className="max-w-[312px] w-full">
              <h1 className="text-2xl sm:text-3xl font-semibold">Log in</h1>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={updateEmail}
                required
                className="form-input mt-6"
              />
              <div className="flex mt-3 items-center">
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
                to="/forgot-password"
              >
                Forgot password?
              </Link>
              {error && (
                <div className="mt-3 w-full box-border border-[2px] border-red-400 bg-red-100 text-red-400 text-sm px-1 py-0.5 rounded-md flex items-center gap-1">
                  <BiInfoCircle className="text-xl rotate-180" />
                  <p className="flex-auto truncate">{error}</p>
                </div>
              )}
              <button type="submit" className="mt-8 form-button">
                Log in
              </button>
              <p className="mt-2 ml-0.5 block text-sm text-gray-500">
                Need an account?{" "}
                <Link to="/signup" className="hover:underline cursor-pointer">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
          <div className="hidden sm:block h-full w-1/2 bg-red-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
