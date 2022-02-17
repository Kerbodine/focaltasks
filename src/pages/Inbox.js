import { useAuth } from "../auth/AuthContext";
import TaskItem from "../components/TaskItem";

export default function Inbox() {
  const { userInbox } = useAuth();

  return (
    <div className="h-full w-full">
      <div className="h-[56px] w-full border-b border-gray-200"></div>
      <div className="h-full w-full p-8">
        <h1 className="ml-2 text-2xl font-semibold">Inbox</h1>
        <div className="mt-2 flex flex-col gap-1">
          {userInbox.map((task) => (
            <TaskItem title={task.title} key={task.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
