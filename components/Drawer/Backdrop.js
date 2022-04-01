import {useUtil} from "../../context/utilContext";

const Backdrop = () => {
    const {drawerToggle, modalToggle} = useUtil();
    return (<div onClick={() =>  modalToggle()} className="backdrop overflow-y-auto overflow-y-hidden" />);
}

export default Backdrop;