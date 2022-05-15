import {ReactNode} from "react";

interface Divider {
  children: ReactNode,
  classes?: string,
}

const Divider = (props: Divider) => {
  const {children, classes} = props;
  return (
    <div className={` border-b border-gray-100 
    ${classes}
    `}>
      {children}
    </div>
  );
}

export default Divider;