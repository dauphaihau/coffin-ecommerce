import {createContext, useContext, useState} from "react";

const defaultValues = {
  drawerOpen: false,
  user: {},
  setUser: () => {}
};

const UtilContext = createContext(defaultValues);

export function useUtil() {
  return useContext(UtilContext);
}

export function UtilProvider({children}) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [user, setUser] = useState({})

  const drawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
  }

  const modalToggle = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <UtilContext.Provider value={{
      drawerOpen, drawerToggle, closeDrawer,
      modalOpen, modalToggle,
      user , setUser
    }}>
      {children}
    </UtilContext.Provider>
  );
}

