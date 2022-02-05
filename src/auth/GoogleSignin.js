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
      className="border-box flex h-10 w-full items-center gap-3 rounded-md border-[2px] border-gray-200 px-3 hover:border-gray-300"
    >
      <GoogleLogo />
      <p className="text-sm font-medium text-gray-500">
        Sign {type === "signup" ? "up" : "in"} with Google
      </p>
    </button>
  );
}
