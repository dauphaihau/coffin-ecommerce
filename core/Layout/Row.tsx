import React, {ReactChildren} from "react";

interface Props {
  // sx?: number,
  // md?: number,
  // lg?: number,
  gap?: number,
  justify?: 'center' | 'between' | 'around' | 'start' | 'end',
  align?: 'center' | 'between' | 'around',
  content?: 'center' | 'between' | 'around',
  wrap?: 'wrap' | 'reverse' | 'around',
  classes?: string,
  children: React.ReactNode
}

const Row = (props: Props) => {

  const {children, classes, gap, justify, align = '', content = '', wrap = ''} = props

  // flex-${direction?.sx ?? 'row'}
  // ipad:flex-${direction?.md ?? 'row'}
  // laptop:flex-${direction?.lg ?? 'row'}
  return (
    <div
      className={`
          flex 
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

export default Row;