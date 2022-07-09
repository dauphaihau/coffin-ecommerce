import {ReactNode} from "react";

interface Props {
  children: ReactNode,
  blur?: boolean,
  classes?: string,
  style?: object,
}

const Backdrop = (props: Props) => {
  const {children, blur, classes, ...others} = props;

  return (
    <div
      className={`backdrop overflow-y-auto overflow-y-hidden 
    ${blur && 'bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25'}
    ${classes}
    `}
      {...others}
    >{children}</div>
  )
}

export default Backdrop;