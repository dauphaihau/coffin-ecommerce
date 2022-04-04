import {createContext, useContext, useEffect, useState} from "react";

const defaultValues = {
  drawerOpen: false,
  modalSearchOpen: false,
  modalOpen: false,
};

const UtilContext = createContext(defaultValues);

export function useUtil() {
  return useContext(UtilContext);
}

export function UtilProvider({children}) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSearchOpen, setModalSearchOpen] = useState(false)

  useEffect(() => {
    if (modalSearchOpen || modalOpen || drawerOpen) {
      document.getElementsByTagName('body')[0].style.overflow = "hidden";
    }
    return () => document.getElementsByTagName('body')[0].style.overflow = "auto";
  },[drawerOpen, modalOpen, modalSearchOpen])

  const drawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  const closeDrawerModal = () => {
    setDrawerOpen(false);
    setModalSearchOpen(false);
    setModalOpen(false);
  }

  const modalToggle = () => {
    setModalOpen(!modalOpen)
  }

  const modalSearchToggle = () => {
    setModalSearchOpen(!modalSearchOpen)
  }


  return (
    <UtilContext.Provider value={{
      drawerOpen, drawerToggle, closeDrawerModal,
      modalOpen, modalToggle,
      modalSearchOpen ,modalSearchToggle
    }}>
      {children}
    </UtilContext.Provider>
  );
}

