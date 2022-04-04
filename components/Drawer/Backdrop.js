import {useUtil} from "../../context/utilContext";

const Backdrop = () => {
  const {
    drawerToggle, modalToggle,
    drawerOpen, modalOpen,
    modalSearchOpen ,modalSearchToggle
  } = useUtil();

  if (drawerOpen) {
    return (<div onClick={() => drawerToggle()} className="backdrop overflow-y-auto overflow-y-hidden"/>);
  } else if (modalOpen) {
    return (<div onClick={() => modalToggle()} className="backdrop overflow-y-auto overflow-y-hidden"/>);
  } else if (modalSearchOpen) {
    return (<div onClick={() => modalSearchToggle()} className="backdrop overflow-y-auto overflow-y-hidden"/>);
  }
}

export default Backdrop;