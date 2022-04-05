import { useParams } from "react-router-dom";
import { useTasks } from "../contexts/TaskContext";
import TaskList from "../pages/TaskList";
import NotFound from "./NotFound";

export default function ListRoute({ component: Component, ...rest }) {
  const { listId } = useParams();
  const { userLists } = useTasks();

  const list = userLists.filter((list) => list.id === listId)[0];

  return list ? <TaskList listId={listId} /> : <NotFound />;
}
