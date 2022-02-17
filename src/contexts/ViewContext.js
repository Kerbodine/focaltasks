import { createContext, useContext, useState } from "react";

const ViewContext = createContext();

export function useView() {
  return useContext(ViewContext);
}

export function ViewProvider({ children }) {
  const [navbar, setNavbar] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [sidebarPanel, setSidebarPanel] = useState(0);
  // 0: taskList statistics
  // 1: pomodoro page
  // 2: pomodoro statistics

  const toggleNavbar = () => {
    setNavbar(!navbar);
  };

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const changeSidebarPanel = (panel) => {
    setSidebarPanel(panel);
  };

  const value = {
    navbar,
    toggleNavbar,
    setNavbar,
    sidebar,
    toggleSidebar,
    sidebarPanel,
    changeSidebarPanel,
  };

  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
}
