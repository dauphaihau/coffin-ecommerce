import {ReactNode} from "react";

interface Props {
  // sx?: number,
  // md?: number,
  // lg?: number,
  gap?: number,
  justify?: 'center' | 'between' | 'around',
  align?: 'center' | 'between' | 'around',
  content?: 'center' | 'between' | 'around',
  wrap?: 'wrap' | 'reverse' | 'around',
  classes?: string,
  children?: ReactNode,
}

const Col = (props: Props) => {

  const {children, classes, gap, justify, align = ''} = props

  // flex-${direction?.sx ?? 'row'}
  // ipad:flex-${direction?.md ?? 'row'}
  // laptop:flex-${direction?.lg ?? 'row'}
  return (
    <div
      className={`
      flex flex-col
          ${justify ? `justify-${justify}` : `justify-start`}
          ${align ? `items-${align}` : `items-start`}
           gap-${gap}
           ${classes}
        `}>
      {children}
    </div>
  );
}

export default Col;