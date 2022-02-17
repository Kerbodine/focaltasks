import { createContext, useContext, useState } from "react";
import { app } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../auth/AuthContext";

const TaskContext = createContext();

export function useTasks() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const { currentUser } = useAuth();

  const db = getFirestore(app);

  const [userInbox, setUserInbox] = useState([]);
  const [userLists, setUserLists] = useState([]);

  const createTask = async (path) => {
    const taskId = uuidv4();
    await setDoc(doc(db, `Users/${currentUser.uid}${path}`, taskId), {
      id: taskId,
      title: "",
      description: "",
      remindDate: null,
      dueDate: null,
      important: false,
      createdAt: Date.now(),
    });
  };

  const deleteTask = async (path, id) => {
    await deleteDoc(doc(db, `Users/${currentUser.uid}/${path}/${id}`));
  };

  const updateTask = async (path, id, updatedItems) => {
    await updateDoc(
      doc(db, `Users/${currentUser.uid}/${path}/${id}`),
      updatedItems
    );
  };

  const value = {
    userInbox,
    setUserInbox,
    userLists,
    setUserLists,
    createTask,
    deleteTask,
    updateTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
