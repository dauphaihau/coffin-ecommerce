import {ReactNode} from "react";

interface Props {
  // sx?: number,
  // md?: number,
  // lg?: number,
  display?: 'flex' | 'grid',
  gap?: number,
  justify?: 'center' | 'between' | 'around',
  align?: 'center' | 'between' | 'around',
  content?: 'center' | 'between' | 'around',
  wrap?: 'wrap' | 'reverse' | 'around',
  classes?: string,
  children?: ReactNode,
}

const Container = (props: Props) => {

  const {
    children, classes, gap,
    display,
    justify, align = '', content = '', wrap = ''
  } = props

  // flex-${direction?.sx ?? 'row'}
  // ipad:flex-${direction?.md ?? 'row'}
  // laptop:flex-${direction?.lg ?? 'row'}
  return (
    <div
      className={`
         ${display === 'flex' && 'flex'}
         ${display === 'grid' && 'grid'}
          ${wrap === 'wrap' && `flex-${wrap}`}
          ${wrap === 'reverse' && `flex-row-${wrap}`}
          ${justify ? `justify-${justify}` : `justify-start`}
          ${align ? `items-${align}` : `items-start`}
          ${content ? `content-${content}` : `content-start`}
           gap-${gap}
           ${classes}
        `}>
      {children}
    </div>
  );
}

export default Container;