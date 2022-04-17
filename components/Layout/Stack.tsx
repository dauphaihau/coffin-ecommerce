import {ReactNode} from "react";

interface Props {
  // sx?: number,
  // md?: number,
  // lg?: number,
  gap?: number,
  direction?: 'column' | 'row' | object,
  classes?: string,
  children?: ReactNode,
}

const Stack = (props: Props) => {

  const {direction, children, classes, gap} = props

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