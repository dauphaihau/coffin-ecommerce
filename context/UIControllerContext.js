import {createContext, useContext, useEffect, useState} from "react";

const defaultValues = {
  drawerCartOpen: false,
  modalSearchOpen: false,
  modalOpen: false,
  drawerMenuOpen: false,
};

const UIControllerContext = createContext(defaultValues);

export function useUIController() {
  return useContext(UIControllerContext);
}

export function UIControllerProvider({children}) {

  const [launchBackdrop, setLaunchBackdrop] = useState(false)
  const [categories, setCategories] = useState([])
  const [drawerCartOpen, setDrawerCartOpen] = useState(false)
  const [drawerNavOpen, setDrawerNavOpen] = useState(false)
  const [drawerFiltersOpen, setDrawerFiltersOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSearchOpen, setModalSearchOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (modalSearchOpen || modalOpen || drawerCartOpen || drawerNavOpen || drawerFiltersOpen) {
      document.getElementsByTagName('body')[0].style.overflow = "hidden";
      setLaunchBackdrop(true)
    }
    return () => {
      document.getElementsByTagName('body')[0].style.overflow = "auto";
      setLaunchBackdrop(false)
    }
  }, [drawerCartOpen, modalOpen, modalSearchOpen, drawerNavOpen, drawerFiltersOpen])

  const drawerToggle = () => {
    setDrawerCartOpen(!drawerCartOpen)
  }

  const drawerNavToggle = () => {
    setDrawerNavOpen(!drawerNavOpen)
  }

  const drawerFiltersToggle = () => {
    setDrawerFiltersOpen(!drawerFiltersOpen)
  }

  const closeDrawerModal = () => {
    setDrawerCartOpen(false);
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
    <UIControllerContext.Provider value={{
      launchBackdrop,
      setCategories, categories,
      drawerCartOpen, drawerToggle, closeDrawerModal,
      drawerNavOpen, drawerNavToggle,
      modalOpen, modalToggle,
      modalSearchOpen, modalSearchToggle,
      drawerFiltersOpen, drawerFiltersToggle,
      progress, setProgress,
    }}>
      {children}
    </UIControllerContext.Provider>
  );
}

