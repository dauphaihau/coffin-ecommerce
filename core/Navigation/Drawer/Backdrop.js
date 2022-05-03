import {useUIController} from "../../../context/UIControllerContext";

const Backdrop = () => {
  const {launchBackdrop, closeDrawerModal,} = useUIController();

  if (launchBackdrop) {
    return <div
      onClick={() => closeDrawerModal()}
      className="backdrop overflow-y-auto overflow-y-hidden"
    />
  }
  return ''
}

export default Backdrop;