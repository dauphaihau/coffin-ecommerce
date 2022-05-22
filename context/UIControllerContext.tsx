import {createContext, FC, Reducer, useContext, useEffect, useReducer, useState} from "react";
import reducer, {
  uiControllerActions,
  uiControllerActionsKind,
  uiControllerState
} from "../store/reducers/uiControllerReducer";

const initialState = {
  openCartDrawer: false,
  openAddressModal: false,
  openSearchModal: false,
  openConfirmLogout: false,
  confirmDelete: {
    openDialog: false,
    id: '',
  },
  openLoginRegisterModal: false,
  openNavDrawer: false,
  openFiltersDrawer: false,
  launchBackdrop: false,
  categories: [],
  progress: 0,
};


const UIControllerContext = createContext<Partial<uiControllerState>>({});

// const UIControllerContext = createContext(initialState);

function useUIController() {
  return useContext(UIControllerContext);
}

// function UIControllerProvider ({children}) {
const UIControllerProvider: FC = ({children}) => {

  const [controller, dispatch] = useReducer<Reducer<uiControllerState, uiControllerActions>>(reducer, initialState);
  const {
    // openLoginRegisterModal,
    openFiltersDrawer,
    openNavDrawer,
    // openAddressModal,
    openCartDrawer,
    openSearchModal

  } = controller
  const {categories: c, progress: g, ...res} = controller

  const [launchBackdrop, setLaunchBackdrop] = useState(false)
  const [categories, setCategories] = useState([])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (openFiltersDrawer
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
  }, [res])
  // }, [openCartDrawer, openLoginRegisterModal, openSearchModal, openNavDrawer, openFiltersDrawer, openAddressModal])

  const closeDrawerModal = () => {
    dispatch({type: uiControllerActionsKind.CLOSE_DRAWER_MODAL})
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

export {UIControllerProvider, useUIController};

