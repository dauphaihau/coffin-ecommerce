import {useUtil} from "../../context/utilContext";

const Backdrop = () => {
  const {launchBackdrop, closeDrawerModal,} = useUtil();

  if (launchBackdrop) {
    return <div
      onClick={() => closeDrawerModal()}
      className="backdrop overflow-y-auto overflow-y-hidden"
    />
  }
  return ''
}

export default Backdrop;