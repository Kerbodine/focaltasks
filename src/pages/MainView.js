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
import { useTasks } from "../contexts/TaskContext";
import TaskList from "./TaskList";

export default function MainView() {
  const [loading, setLoading] = useState(true);
  const { setUserData, currentUser } = useAuth();
  const { setUserLists } = useTasks();

  const db = getFirestore(app);

  // Query snapshot for user data
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      doc(db, "Users", currentUser.uid),
      (document) => {
        setUserData(document.data());
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
      (allLists) => {
        let tempUserLists = [];
        allLists.docs.forEach((list) => {
          tempUserLists.push(list.data());
        });
        console.log("Updating lists");
        setUserLists(tempUserLists);
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
