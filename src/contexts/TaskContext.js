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
  collection,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const TaskContext = createContext();

export function useTasks() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const { currentUser, userData } = useAuth();

  const db = getFirestore(app);

  const [userLists, setUserLists] = useState([]);

  const getTask = (taskId) => {
    const task = Object.values(userLists)
      .map((list) => list.tasks.find((task) => task.id === taskId))
      .filter((task) => task !== undefined)
      .flat()[0];
    return task;
  };

  const getAuthor = (listId) => {
    const list = Object.values(userLists).filter((list) => list.id === listId);
    return list[0].author;
  };

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
      profiles: [
        {
          id: userData.id,
          displayName: userData.displayName,
          email: userData.email,
          photoURL: userData.photoURL ? userData.photoURL : null,
        },
      ],
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

  const inviteUser = async (listId, email, author) => {
    let user;
    const userDoc = await getDocs(
      query(collection(db, "Users"), where("email", "==", email))
    );

    try {
      user = userDoc.docs[0].data();
      console.log(user);
    } catch {
      return "Account does not exist";
    }

    if (userLists[listId].users.includes(user.id)) {
      return "User already invited";
    } else {
      const listRef = doc(db, "Users", author, "Lists", listId);
      await updateDoc(listRef, {
        users: [...userLists[listId].users, user.id],
        profiles: [
          ...userLists[listId].profiles,
          {
            id: user.id,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL ? user.photoURL : null,
          },
        ],
        modifiedAt: new Date(),
      });
    }
  };

  const removeGuest = async (listId, guestId, author) => {
    const listRef = doc(db, "Users", author, "Lists", listId);
    await updateDoc(listRef, {
      users: userLists[listId].users.filter((user) => user !== guestId),
      profiles: userLists[listId].profiles.filter(
        (profile) => profile.id !== guestId
      ),
      modifiedAt: new Date(),
    });
  };

  const moveTask = async (taskId, listId) => {
    const categories = [
      "today",
      "upcoming",
      "important",
      "completed",
      "all",
      "settings",
    ];
    if (!categories.includes(listId)) {
      let taskData = getTask(taskId); // task data
      let originalListId = taskData.listId; // listId before move
      taskData.listId = listId; // listId after move
      const author = getAuthor(originalListId);
      const newAuthor = getAuthor(listId);
      await deleteTask(taskId, originalListId, author);
      await updateTask(taskId, taskData, listId, newAuthor);
      toast.success("Task moved");
    }
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
    inviteUser,
    removeGuest,
    moveTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
