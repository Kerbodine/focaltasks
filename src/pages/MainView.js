import { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { app } from "../firebase";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../auth/AuthContext";
import Loader from "../components/Loader";
import Inbox from "./Inbox";
import { useTasks } from "../contexts/TaskContext";
import TaskList from "./TaskList";

export default function MainView() {
  const [loading, setLoading] = useState(true);
  const { setUserData, currentUser } = useAuth();
  const { setUserInbox, setUserLists } = useTasks();

  const db = getFirestore(app);

  // Query snapshot for user data
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      doc(db, "Users", currentUser.uid),
      (document) => {
        console.log(document.data());
        setUserData(document.data());
        setLoading(false);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  // Query snapshot for user inbox
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      query(
        collection(db, "Users", currentUser.uid, "Inbox"),
        orderBy("createdAt")
      ),
      (allTasks) => {
        let taskList = [];
        console.log("Updating tasks");
        allTasks.docs.forEach((task) => {
          taskList.push(task.data());
        });
        setUserInbox(taskList);
        setLoading(false);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  // Query snapshot for user lists
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      query(
        collection(db, "Users", currentUser.uid, "Lists"),
        orderBy("createdAt")
      ),
      (allTasks) => {
        let taskList = [];
        console.log("Updating lists");
        allTasks.docs.forEach((task) => {
          taskList.push(task.data());
        });
        setUserLists(taskList);
        setLoading(false);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="h-screen w-screen">
      {loading ? (
        <div className="grid h-full w-full place-items-center">
          <Loader />
        </div>
      ) : (
        <>
          <hr className="absolute top-[55px] h-[1px] w-screen border-gray-200" />
          <div className="mx-auto flex h-full w-full max-w-screen-xl">
            {/* Navbar section */}
            <Navbar />
            {/* Main task area */}
            <div className="ml-[56px] h-full flex-auto sm:ml-0">
              <Routes>
                <Route exact path="/" element={<Inbox />} />
                <Route exact path="/today" element={<p>Today</p>} />
                <Route exact path="/upcoming" element={<p>Upcoming</p>} />
                <Route exact path="/important" element={<p>Important</p>} />
                <Route path="*" element={<TaskList />} />
              </Routes>
            </div>
            {/* Sidebar section */}
            <Sidebar />
          </div>
        </>
      )}
    </div>
  );
}
