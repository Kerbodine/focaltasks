import { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  onSnapshot,
  orderBy,
  query,
  collectionGroup,
  where,
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
import { SettingsProvider } from "../contexts/SettingsContext";
import { mobile } from "../config/functions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragLayer from "../components/DragLayer";
import BetaBadge from "../components/BetaBadge";

export default function MainView() {
  const [loading, setLoading] = useState(true);
  const { setUserData, currentUser } = useAuth();
  const { userLists, setUserLists } = useTasks();

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
  }, [setUserData, currentUser, db]);

  // Query snapshot for user lists
  useEffect(() => {
    setLoading(true);
    // Listener for user Lists collection
    const unsubscribeLists = onSnapshot(
      query(
        collectionGroup(db, "Lists"),
        where("users", "array-contains", currentUser.uid),
        orderBy("createdAt")
      ),
      (allLists) => {
        let tempLists = [];
        allLists.docs.forEach((list) => {
          tempLists.push(list.data());
        });
        const objectList = tempLists.reduce((obj, item) => {
          return Object.assign(
            obj,
            {
              // sort item.tasks by createdAt
              [item.id]: {
                ...item,
                tasks: Object.values(item.tasks).sort(
                  (a, b) => a.createdAt - b.createdAt
                ),
              },
            },
            {}
          );
        }, {});
        setUserLists({ ...objectList });
        setLoading(false);
        console.log("Updating lists");
      }
    );
    // Cleanup listeners
    return () => {
      unsubscribeLists();
    };
  }, [currentUser.uid, setUserLists, setLoading, db]);

  return (
    <div className="h-screen w-screen bg-white dark:bg-gray-900">
      {loading ? (
        <div className="grid h-full w-full place-items-center">
          <Loader />
        </div>
      ) : (
        <SettingsProvider>
          <PomodoroProvider>
            <DndProvider backend={HTML5Backend}>
              <hr className="absolute top-[56px] h-[2px] w-screen border-0 bg-gray-100 dark:bg-gray-800" />
              <div className="mx-auto flex h-full w-full max-w-screen-xl">
                {/* Navbar section */}
                <Navbar />
                {/* Main task area */}
                <div
                  className={`${
                    mobile() ? "ml-0" : "ml-[56px]"
                  } flex h-full flex-auto flex-col transition-margin duration-300 sm:ml-0`}
                >
                  <div
                    className={`${
                      mobile() ? "justify-center" : "justify-end"
                    } flex h-[56px] w-full flex-none items-center px-3 sm:ml-0`}
                  >
                    <CommandPalette />
                  </div>
                  {/* Account for topbar height */}
                  <div className="flex h-[calc(100vh-58px)] w-full">
                    <Routes>
                      <Route
                        exact
                        path="/today"
                        element={
                          <Category title="Today" sort={(task) => task.today} />
                        }
                      />
                      <Route
                        exact
                        path="/upcoming"
                        element={
                          <Category
                            title="Upcoming"
                            sort={(task) => task.upcoming}
                          />
                        }
                      />
                      <Route
                        exact
                        path="/important"
                        element={
                          <Category
                            title="Important"
                            sort={(task) => task.important}
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
                      <Route
                        exact
                        path="/all"
                        element={<Category title="All" sort={(task) => task} />}
                      />
                      <Route exact path="/settings" element={<Settings />} />
                      <Route path="/:listId" element={<ListRoute />} />
                    </Routes>
                    {/* Sidebar section */}
                    <Sidebar />
                    {/* Remove in v1.0 */}
                    <BetaBadge />
                  </div>
                </div>
              </div>
              <div key={userLists}>
                <DragLayer />
              </div>
            </DndProvider>
          </PomodoroProvider>
        </SettingsProvider>
      )}
    </div>
  );
}
