import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <h2 className="font-mono text-3xl font-medium">404</h2>
        <div className="h-6 w-[2px] bg-gray-700 dark:bg-gray-300"></div>
        <p>Page not found</p>
      </div>
      <Link
        to="/inbox"
        className="mt-2 font-medium hover:underline dark:text-white"
      >
        Return to home page →
      </Link>
    </div>
  );
}
