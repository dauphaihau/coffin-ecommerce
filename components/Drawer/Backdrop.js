import {useUtil} from "../../context/utilContext";

const Backdrop = () => {
  const {
    drawerOpen, modalOpen,
    modalSearchOpen,
    drawerCategoriesOpen,
    closeDrawerModal
  } = useUtil();

  if (modalSearchOpen || modalOpen || drawerOpen || drawerCategoriesOpen) {
    return (<div onClick={() => closeDrawerModal()} className="backdrop overflow-y-auto overflow-y-hidden"/>);
  }
  return ''
}

export default Backdrop;