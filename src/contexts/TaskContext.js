import { createContext, useContext, useState } from "react";
import { app } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const TaskContext = createContext();

export function useTasks() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const { currentUser } = useAuth();

  const db = getFirestore(app);

  const [userLists, setUserLists] = useState([]);
  const [userTasks, setUserTasks] = useState([]);

  const createTask = async (listId) => {
    const taskId = uuidv4();
    const task = {
      id: taskId,
      title: "",
      completed: false,
      description: "",
      dueDate: "",
      listId,
      createdAt: new Date(),
      modifiedAt: new Date(),
      categories: [],
    };
    await setDoc(doc(db, "Users", currentUser.uid, "Tasks", taskId), task);
  };

  const updateTask = async (taskId, updatedItems) => {
    const taskRef = doc(db, "Users", currentUser.uid, "Tasks", taskId);
    await updateDoc(taskRef, updatedItems);
  };

  const addCategory = async (taskId, category) => {
    const taskRef = doc(db, "Users", currentUser.uid, "Tasks", taskId);
    await updateDoc(taskRef, {
      categories: arrayUnion(category),
    });
  };

  const removeCategory = async (taskId, category) => {
    const taskRef = doc(db, "Users", currentUser.uid, "Tasks", taskId);
    await updateDoc(taskRef, {
      categories: arrayRemove(category),
    });
  };

  const deleteTask = async (taskId) => {
    await deleteDoc(doc(db, "Users", currentUser.uid, "Tasks", taskId));
  };

  const newList = async (title, icon) => {
    const listId = uuidv4();
    await setDoc(doc(db, "Users", currentUser.uid, "Lists", listId), {
      id: listId,
      title,
      icon,
      notes: "",
      sort: "createdAt",
      createdAt: new Date(),
      modifiedAt: new Date(),
    });
    return listId;
  };

  const updateList = async (listId, updatedItems) => {
    const listRef = doc(db, "Users", currentUser.uid, "Lists", listId);
    await updateDoc(listRef, updatedItems);
  };

  const deleteList = async (listId) => {
    const listRef = doc(db, "Users", currentUser.uid, "Lists", listId);
    await deleteDoc(listRef);
  };

  const value = {
    userLists,
    setUserLists,
    userTasks,
    setUserTasks,
    updateList,
    createTask,
    deleteTask,
    updateTask,
    newList,
    deleteList,
    addCategory,
    removeCategory,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
