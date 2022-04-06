import {createContext, useContext, useEffect, useState} from "react";

const defaultValues = {
  drawerOpen: false,
  modalSearchOpen: false,
  modalOpen: false,
  drawerCategoriesOpen: false,
};

const UtilContext = createContext(defaultValues);

export function useUtil() {
  return useContext(UtilContext);
}

export function UtilProvider({children}) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerCategoriesOpen, setDrawerCategoriesOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSearchOpen, setModalSearchOpen] = useState(false)

  useEffect(() => {
    if (modalSearchOpen || modalOpen || drawerOpen || drawerCategoriesOpen) {
      document.getElementsByTagName('body')[0].style.overflow = "hidden";
    }
    return () => document.getElementsByTagName('body')[0].style.overflow = "auto";
  }, [drawerOpen, modalOpen, modalSearchOpen, drawerCategoriesOpen])

  const drawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  const drawerCategoriesToggle = () => {
    setDrawerCategoriesOpen(!drawerCategoriesOpen)
  }

  const closeDrawerModal = () => {
    setDrawerOpen(false);
    setDrawerCategoriesOpen(false);
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
      drawerCategoriesOpen, drawerCategoriesToggle,
      modalOpen, modalToggle,
      modalSearchOpen, modalSearchToggle,
    }}>
      {children}
    </UtilContext.Provider>
  );
}

