import { createContext, useContext, useState } from "react";
import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

export const PomodoroContext = createContext({});

export function usePomodoro() {
  return useContext(PomodoroContext);
}

export function PomodoroProvider({ children }) {
  const { currentUser } = useAuth();

  const [duration, setDuration] = useState(25);
  const [currentId, setCurrentId] = useState(null);
  const [pomodoros, setPomodoros] = useState([]);
  const [pastData, setPastData] = useState([]);

  const startSession = async (id, time) => {
    const pomodoro = {
      id: id,
      user: currentUser.uid,
      tag: "Test",
      createdAt: new Date(),
      completed: false,
      time: time,
    };
    await setDoc(
      doc(getFirestore(), "Users", currentUser.uid, "Pomodoros", id),
      {
        ...pomodoro,
      }
    );
  };

  const completeSession = async () => {
    await updateDoc(
      doc(getFirestore(), "Users", currentUser.uid, "Pomodoros", currentId),
      {
        completed: true,
        completedAt: new Date(),
      }
    );
  };

  const value = {
    duration,
    setDuration,
    startSession,
    completeSession,
    currentId,
    setCurrentId,
    pomodoros,
    setPomodoros,
    pastData,
    setPastData,
  };

  return (
    <PomodoroContext.Provider value={value}>
      {children}
    </PomodoroContext.Provider>
  );
}
