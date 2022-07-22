import { createContext, useContext, useState } from "react";
import { app } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
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

  const createTask = async (listId, author) => {
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
    };
    await updateDoc(doc(db, "Users", author, "Lists", listId), {
      tasks: {
        ...Object.values(userLists[listId].tasks)
          .filter((task) => task.id !== taskId)
          .reduce((obj, item) => Object.assign(obj, { [item.id]: item }), {}),
        [`${taskId}`]: task,
      },
      modifiedAt: new Date(),
    });
  };

  const updateTask = async (taskId, updatedItems, listId, author) => {
    await updateDoc(doc(db, "Users", author, "Lists", listId), {
      tasks: {
        ...Object.values(userLists[listId].tasks)
          .filter((task) => task.id !== taskId)
          .reduce((obj, item) => Object.assign(obj, { [item.id]: item }), {}),
        [`${taskId}`]: {
          ...Object.values(userLists[listId].tasks).filter(
            (task) => task.id === taskId
          )[0],
          ...updatedItems,
          modifiedAt: new Date(),
        },
      },
      modifiedAt: new Date(),
    });
  };

  const deleteTask = async (taskId, listId, author) => {
    await updateDoc(doc(db, "Users", author, "Lists", listId), {
      [`tasks.${taskId}`]: deleteField(),
      modifiedAt: new Date(),
    });
  };

  const newList = async (title, icon) => {
    const listId = uuidv4();
    await setDoc(doc(db, "Users", currentUser.uid, "Lists", listId), {
      id: listId,
      title,
      icon,
      notes: "",
      createdAt: new Date(),
      modifiedAt: new Date(),
      hideCompleted: false,
      author: currentUser.uid,
      users: [`${currentUser.uid}`],
      tasks: {},
    });
    return listId;
  };

  const updateList = async (listId, updatedItems, author) => {
    const listRef = doc(db, "Users", author, "Lists", listId);
    await updateDoc(listRef, { ...updatedItems, modifiedAt: new Date() });
  };

  const deleteList = async (listId, author) => {
    const listRef = doc(db, "Users", author, "Lists", listId);
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
