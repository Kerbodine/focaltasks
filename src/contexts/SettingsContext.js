import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const SettingsContext = createContext();

export function useSettings() {
  return useContext(SettingsContext);
}

export function SettingsProvider({ children }) {
  const { currentUser, userData } = useAuth();

  const [calendarStartDay, setCalendarStartDay] = useState(
    userData.settings.calendarStartDay
  );

  const [completedAppearance, setCompletedAppearance] = useState(
    userData.settings.completedAppearance
  );

  const [hideDeleteWarning, setHideDeleteWarning] = useState(
    userData.settings.hideDeleteWarning
  );

  const updateSettings = async (updatedItems) => {
    const key = Object.keys(updatedItems)[0];
    const value = updatedItems[key];
    const userRef = doc(getFirestore(), "Users", currentUser.uid);
    await updateDoc(userRef, { [`settings.${key}`]: value });
  };

  const value = {
    calendarStartDay,
    setCalendarStartDay,
    completedAppearance,
    setCompletedAppearance,
    hideDeleteWarning,
    setHideDeleteWarning,
    updateSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
