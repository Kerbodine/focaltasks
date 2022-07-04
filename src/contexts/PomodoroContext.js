import { createContext, useContext, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

export const PomodoroContext = createContext({});

export function usePomodoro() {
  return useContext(PomodoroContext);
}

export function PomodoroProvider({ children }) {
  const { currentUser } = useAuth();

  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [mode, setMode] = useState("work");

  const getPomodoros = async () => {
    const q = query(
      collection(getFirestore(), "Users", currentUser.uid, "Pomodoros"),
      orderBy("createdAt", "desc"),
      limit(4)
    );
    const snapshot = await getDocs(q);
    const snap = snapshot.docs.map((doc) => doc.data());
    return snap;
  };

  const value = {
    workMinutes,
    setWorkMinutes,
    breakMinutes,
    setBreakMinutes,
    mode,
    setMode,
    getPomodoros,
  };

  return (
    <PomodoroContext.Provider value={value}>
      {children}
    </PomodoroContext.Provider>
  );
}
