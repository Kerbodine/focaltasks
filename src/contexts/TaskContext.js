import { createContext, useContext, useState } from "react";
import { app } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDoc,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { useAuth } from "../auth/AuthContext";

const TaskContext = createContext();

export function useTasks() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const { currentUser } = useAuth();

  const db = getFirestore(app);

  const [userLists, setUserLists] = useState([]);

  const createTask = async (listId) => {
    await updateDoc(doc(db, "Users", currentUser.uid, "Lists", listId), {
      tasks: arrayUnion({
        id: uuidv4(),
        title: "",
        completed: false,
        description: "",
        remindDate: null,
        dueDate: null,
        important: false,
        createdAt: new Date(),
        modifiedAt: new Date(),
      }),
    });
  };

  const deleteTask = async (listId, id) => {
    const listRef = doc(db, "Users", currentUser.uid, "Lists", listId);
    let tempUserLists = userLists;
    let deleteTask;
    tempUserLists.forEach((list) => {
      if (list.id === listId) {
        list.tasks.forEach((task) => {
          if (task.id === id) {
            deleteTask = task;
          }
        });
      }
    });
    await updateDoc(listRef, {
      tasks: arrayRemove(deleteTask),
    });
  };

  const updateTask = async (listId, taskId, updatedItems) => {
    const listRef = doc(db, "Users", currentUser.uid, "Lists", listId);
    const docSnap = await getDoc(listRef);
    const tasks = docSnap.data().tasks;
    const task = tasks.find((task) => task.id === taskId);
    const updatedTask = { ...task, ...updatedItems };
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? updatedTask : task
    );
    await updateDoc(listRef, {
      tasks: updatedTasks,
    });
  };

  const updateList = async (listId, updatedItems) => {
    const listRef = doc(db, "Users", currentUser.uid, "Lists", listId);
    await updateDoc(listRef, updatedItems);
  };

  const deleteList = async (listId) => {
    const listRef = doc(db, "Users", currentUser.uid, "Lists", listId);
    await deleteDoc(listRef);
  };

  const newList = async (title) => {
    const listId = uuidv4();
    await setDoc(doc(db, `Users/${currentUser.uid}/Lists`, listId), {
      id: listId,
      title,
      notes: "",
      icon: "",
      tasks: [],
      sort: "createdAt",
      createdAt: new Date(),
      modifiedAt: new Date(),
    });
    return listId;
  };

  const toggleTask = async (listId, taskId) => {
    const listRef = doc(db, "Users", currentUser.uid, "Lists", listId);
    const docSnap = await getDoc(listRef);
    const tasks = docSnap.data().tasks;
    const task = tasks.find((task) => task.id === taskId);
    const updatedTask = { ...task, completed: !task.completed };
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? updatedTask : task
    );
    await updateDoc(listRef, {
      tasks: updatedTasks,
    });
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
    toggleTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
