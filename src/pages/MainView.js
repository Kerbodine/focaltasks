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
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";
import { useTasks } from "../contexts/TaskContext";
import Settings from "./Settings";
import CommandPalette from "../components/CommandPalette";
import { PomodoroProvider } from "../contexts/PomodoroContext";
import ListRoute from "../components/ListRoute";
import Category from "./Category";

export default function MainView() {
  const [loading, setLoading] = useState(true);
  const { setUserData, currentUser } = useAuth();
  const { userLists, setUserLists, userTasks, setUserTasks } = useTasks();

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
    // Listener for user Lists collection
    const unsubscribeLists = onSnapshot(
      query(
        collection(db, "Users", currentUser.uid, "Lists"),
        orderBy("createdAt")
      ),
      (allLists) => {
        let tempLists = [];
        allLists.docs.forEach((list) => {
          tempLists.push(list.data());
        });
        console.log("Updating lists");
        setUserLists(tempLists);
        setLoading(false);
      }
    );
    // Listener for user Tasks collection
    const unsubscribeTasks = onSnapshot(
      query(
        collection(db, "Users", currentUser.uid, "Tasks"),
        orderBy("createdAt")
      ),
      (allTasks) => {
        let tempTasks = [];
        allTasks.docs.forEach((list) => {
          tempTasks.push(list.data());
        });
        console.log("Updating tasks");
        setUserTasks(tempTasks);
        setLoading(false);
      }
    );
    console.log(userLists);
    console.log(userTasks);
    // Cleanup listeners
    return () => {
      unsubscribeLists();
      unsubscribeTasks();
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
          <hr className="absolute top-[54px] h-[2px] w-screen border-0 bg-gray-100" />
          <div className="mx-auto flex h-full w-full max-w-screen-xl">
            {/* Navbar section */}
            <Navbar />
            {/* Main task area */}
            <div className="ml-[56px] h-full flex-auto sm:ml-0">
              <div className="flex h-[56px] w-full items-center justify-end px-3">
                <CommandPalette />
              </div>
              <Routes>
                <Route
                  exact
                  path="/today"
                  element={
                    <Category
                      title="Today"
                      sort={(task) => task.categories.includes("today")}
                    />
                  }
                />
                <Route
                  exact
                  path="/upcoming"
                  element={
                    <Category
                      title="Upcoming"
                      sort={(task) => task.categories.includes("upcoming")}
                    />
                  }
                />
                <Route
                  exact
                  path="/important"
                  element={
                    <Category
                      title="Important"
                      sort={(task) => task.categories.includes("important")}
                    />
                  }
                />
                <Route
                  exact
                  path="/completed"
                  element={
                    <Category
                      title="Completed"
                      sort={(task) => task.completed}
                    />
                  }
                />
                <Route exact path="/settings" element={<Settings />} />
                <Route path="/:listId" element={<ListRoute />} />
              </Routes>
            </div>
            {/* Sidebar section */}
            <PomodoroProvider>
              <Sidebar />
            </PomodoroProvider>
          </div>
        </>
      )}
    </div>
  );
}
