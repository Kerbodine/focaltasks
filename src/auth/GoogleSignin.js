import { ReactComponent as GoogleLogo } from "./g-logo.svg";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function GoogleSignin({ type }) {
  const navigate = useNavigate();

  const { signInWithGoogle } = useAuth();

  const googleAuth = async () => {
    await signInWithGoogle();
    navigate("/");
  };

  return (
    <button
      type="button"
      onClick={googleAuth}
      className="w-full h-10 rounded-md border-box border-[2px] border-gray-200 hover:border-gray-300 flex items-center px-3 gap-3"
    >
      <GoogleLogo />
      <p className="text-sm text-gray-500 font-medium">
        Sign {type === "signup" ? "up" : "in"} with Google
      </p>
    </button>
  );
}
