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

  const toggleNavbar = () => {
    setNavbar(!navbar);
  };

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const closeNavbar = () => {
    setNavbar(false);
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
    closeNavbar,
  };

  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
}
