import {ReactNode} from "react";

interface Props {
  // sx?: number,
  // md?: number,
  // lg?: number,
  gap?: number,
  classes?: string,
  children?: ReactNode,
}

const Col = (props: Props) => {

  const {
    children, classes, gap,
  } = props

  // flex-${direction?.sx ?? 'row'}
  // ipad:flex-${direction?.md ?? 'row'}
  // laptop:flex-${direction?.lg ?? 'row'}
  return (
    <div
      className={`
      flex flex-col
           gap-${gap}
           ${classes}
        `}>
      {children}
    </div>
  );
}

export default Col;