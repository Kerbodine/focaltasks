import { Link } from "react-router-dom";
import { ReactComponent as PageNotFound } from "./svg/404.svg";

export default function NotFound() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <PageNotFound className="mb-8 h-min w-full max-w-[16rem]" />
      <div className="flex items-center gap-2 text-gray-700">
        <h2 className="font-mono text-2xl font-medium">404</h2>
        <div className="h-6 w-[2px] bg-gray-700"></div>
        <p className="text-sm">Page not found</p>
      </div>
      <Link to="/" className="mt-2 text-sm hover:underline">
        Return to home page →
      </Link>
    </div>
  );
}
