import { Navigate, Outlet } from "react-router-dom";
import { TaskProvider } from "../contexts/TaskContext";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return currentUser ? (
    <TaskProvider>
      <Outlet />
    </TaskProvider>
  ) : (
    <Navigate to="/login" />
  );
}
