import {createContext, useContext, useEffect, useState} from "react";

const defaultValues = {
  drawerOpen: false,
  modalSearchOpen: false,
  modalOpen: false,
  drawerMenuOpen: false,
};

const UtilContext = createContext(defaultValues);

export function useUtil() {
  return useContext(UtilContext);
}

export function UtilProvider({children}) {
  const [launchBackdrop, setLaunchBackdrop] = useState(false)
  const [categories, setCategories] = useState([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerNavOpen, setDrawerNavOpen] = useState(false)
  const [drawerFiltersOpen, setDrawerFiltersOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSearchOpen, setModalSearchOpen] = useState(false)

  useEffect(() => {
    if (modalSearchOpen || modalOpen || drawerOpen || drawerNavOpen || drawerFiltersOpen) {
      document.getElementsByTagName('body')[0].style.overflow = "hidden";
      setLaunchBackdrop(true)
    }
    return () => {
      document.getElementsByTagName('body')[0].style.overflow = "auto";
      setLaunchBackdrop(false)
    }
  }, [drawerOpen, modalOpen, modalSearchOpen, drawerNavOpen, drawerFiltersOpen])

  const drawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  const drawerNavToggle = () => {
    setDrawerNavOpen(!drawerNavOpen)
  }

  const drawerFiltersToggle = () => {
    setDrawerFiltersOpen(!drawerFiltersOpen)
  }

  const closeDrawerModal = () => {
    setDrawerOpen(false);
    setDrawerNavOpen(false);
    setDrawerFiltersOpen(false);
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
      launchBackdrop,
      setCategories, categories,
      drawerOpen, drawerToggle, closeDrawerModal,
      drawerNavOpen, drawerNavToggle,
      modalOpen, modalToggle,
      modalSearchOpen, modalSearchToggle,
      drawerFiltersOpen, drawerFiltersToggle
    }}>
      {children}
    </UtilContext.Provider>
  );
}

