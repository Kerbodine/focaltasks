import { createContext, useContext, useState } from "react";

export const PomodoroContext = createContext({});

export function usePomodoro() {
  return useContext(PomodoroContext);
}

export function PomodoroProvider({ children }) {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);

  const [mode, setMode] = useState("work");

  const value = {
    workMinutes,
    setWorkMinutes,
    breakMinutes,
    setBreakMinutes,
    mode,
    setMode,
  };

  return (
    <PomodoroContext.Provider value={value}>
      {children}
    </PomodoroContext.Provider>
  );
}
