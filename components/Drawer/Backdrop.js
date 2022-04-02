import {useUtil} from "../../context/utilContext";

const Backdrop = () => {
  const {
    drawerToggle, modalToggle,
    drawerOpen,
    modalOpen
  } = useUtil();

  if (drawerOpen) {
    return (<div onClick={() => drawerToggle()} className="backdrop overflow-y-auto overflow-y-hidden"/>);
  } else if (modalOpen) {
    return (<div onClick={() => modalToggle()} className="backdrop overflow-y-auto overflow-y-hidden"/>);
  }
}

export default Backdrop;