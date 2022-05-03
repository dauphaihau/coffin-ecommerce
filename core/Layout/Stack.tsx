import {ReactNode} from "react";

interface Props {
  // sx?: number,
  // md?: number,
  // lg?: number,
  gap?: number,
  direction?: 'column' | 'row',
  // direction?: {
  //   sx?: 'col' | 'row',
  //   md?: 'col' | 'row',
  //   lg?: 'col' | 'row',
  // }
  classes?: string,
  children?: ReactNode,
}

const Stack = (props: Props) => {

  const {direction, children, classes, gap} = props

  // flex-${direction?.sx ?? 'row'}
  // ipad:flex-${direction?.md ?? 'row'}
  // laptop:flex-${direction?.lg ?? 'row'}
  return (
    <div
      className={`
          flex
           justify-between
           ${direction === 'column' && 'flex-col'}
           gap-${gap}
           ${classes}
        `}>
      {children}
    </div>
  );
}

export default Stack;