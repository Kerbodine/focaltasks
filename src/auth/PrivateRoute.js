import { Navigate, Outlet, useLocation } from "react-router-dom";
import { TaskProvider } from "../contexts/TaskContext";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  const { pathname } = useLocation();

  return currentUser ? (
    <TaskProvider>
      {pathname === "/" ? <Navigate to="/inbox" /> : <Outlet />}
    </TaskProvider>
  ) : (
    <Navigate to="/login" />
  );
}
