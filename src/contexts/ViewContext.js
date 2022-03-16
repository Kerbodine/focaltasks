import { createContext, useContext, useState } from "react";

const ViewContext = createContext();

export function useView() {
  return useContext(ViewContext);
}

export function ViewProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [navbar, setNavbar] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [sidebarPanel, setSidebarPanel] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

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
    loading,
    setLoading,
    navbar,
    toggleNavbar,
    setNavbar,
    sidebar,
    toggleSidebar,
    sidebarPanel,
    changeSidebarPanel,
    showSettings,
    setShowSettings,
  };

  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
}
