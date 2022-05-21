import {ReactChildren} from "react";

interface Props {
  sx?: number,
  md?: number,
  lg?: number,
  xl?: number,
  gap?: number,
  gapx?: number,
  gapy?: number,
  classes?: string
  children: ReactChildren
}

const Grid = (props: Props) => {

  const {
    children, gap, classes,
    sx = '', md = '', lg = '', xl = '',
    gapx, gapy
  } = props;

  return (
    <div
      className={`
         grid gap-${gap} gap-x-${gapx} gap-y-${gapy}
        ${sx ? `grid-cols-${sx}` : ''}
        ${md ? `ipad:grid-cols-${md}` : ''}
        ${lg ? `laptop:grid-cols-${lg}` : ''}
        ${xl ? `desktop:grid-cols-${xl}` : ''}
        ${classes}
      `}>
      {children}
    </div>
  );
}

export default Grid;