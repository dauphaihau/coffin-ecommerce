import {ReactNode} from "react";

interface Divider {
  classes?: string,
}

const Divider = (props: Divider) => {
  const {classes} = props;
  return (
    <div className={` border-b border-gray-100 
    ${classes}
    `}/>
  );
}

export default Divider;