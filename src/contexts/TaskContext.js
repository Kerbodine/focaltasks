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
  deleteField,
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

  const createTask = async (listId) => {
    const taskId = uuidv4();
    const task = {
      id: taskId,
      title: "",
      completed: false,
      description: "",
      dueDate: null,
      listId,
      createdAt: new Date(),
      modifiedAt: new Date(),
      categories: [],
    };
    await updateDoc(doc(db, "Users", currentUser.uid, "Lists", listId), {
      tasks: {
        ...Object.values(userLists[listId].tasks),
        [taskId]: task,
      },
    });
  };

  const updateTask = async (taskId, updatedItems, listId) => {
    await updateDoc(doc(db, "Users", currentUser.uid, "Lists", listId), {
      tasks: {
        ...Object.values(userLists[listId].tasks).filter(
          (task) => task.id !== taskId
        ),
        [taskId]: {
          ...Object.values(userLists[listId].tasks).filter(
            (task) => task.id === taskId
          )[0],
          ...updatedItems,
          modifiedAt: new Date(),
        },
      },
    });
  };

  const deleteTask = async (taskId, listId) => {
    await updateDoc(doc(db, "Users", currentUser.uid, "Lists", listId), {
      [`tasks.${taskId}`]: deleteField(),
    });
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
      hideCompleted: false,
      tasks: {},
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
    updateList,
    createTask,
    deleteTask,
    updateTask,
    newList,
    deleteList,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
