import {createContext, useContext, useEffect, useReducer, useState} from "react";
import reducer from "../reducers/uiControllerReducer";
import PropTypes from "prop-types";

const initialState = {
  openCartDrawer: false,
  openAddressModal: false,
  openSearchModal: false,
  openLoginRegisterModal: false,
  openNavDrawer: false,
  openFiltersDrawer: false,

  launchBackdrop: false,
  categories: [],
  progress: 0,
};

const UIControllerContext = createContext(initialState);

function useUIController() {
  return useContext(UIControllerContext);
}

function UIControllerProvider({children}) {

  const [controller, dispatch] = useReducer(reducer, initialState);
  const {
    openLoginRegisterModal,
    openFiltersDrawer,
    openNavDrawer,
    openAddressModal,
    openCartDrawer,
    openSearchModal
  } = controller

  const [launchBackdrop, setLaunchBackdrop] = useState(false)
  const [categories, setCategories] = useState([])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (openLoginRegisterModal
      || openFiltersDrawer
      || openAddressModal
      || openNavDrawer
      || openCartDrawer
      || openSearchModal
    ) {
      document.getElementsByTagName('body')[0].style.overflow = "hidden";
      setLaunchBackdrop(true)
    }
    return () => {
      document.getElementsByTagName('body')[0].style.overflow = "auto";
      setLaunchBackdrop(false)
    }
  }, [openCartDrawer, openLoginRegisterModal, openSearchModal, openNavDrawer, openFiltersDrawer, openAddressModal])

  const closeDrawerModal = () => {
    dispatch({type: 'CLOSE_DRAWER_MODAL'})
  }

  return (
    <UIControllerContext.Provider value={{
      ...controller, dispatch,
      launchBackdrop,
      setCategories, categories,
      closeDrawerModal,
      progress, setProgress,
    }}>
      {children}
    </UIControllerContext.Provider>
  );
}

UIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {UIControllerProvider, useUIController};

