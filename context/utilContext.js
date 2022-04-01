import {createContext, useContext, useState} from "react";

const defaultValues = {
  drawerOpen: false,
};

const UtilContext = createContext(defaultValues);

export function useUtil() {
  return useContext(UtilContext);
}

export function UtilProvider({children}) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)


  const drawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }
  const modalToggle = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <UtilContext.Provider value={{
      drawerOpen, drawerToggle,
      modalOpen, modalToggle
    }}>
      {children}
    </UtilContext.Provider>
  );
}

