import {ReactNode} from "react";

interface Props {
  sx?: number,
  md?: number,
  lg?: number,
  gap?: number,
  gapx?: number,
  gapy?: number,
  classes?: string
  children: ReactNode
}

const Grid = (props: Props) => {

  const {
    children, gap, classes,
    sx, md, lg, gapx, gapy
  } = props;

  return (
    <div
      className={`grid gap-${gap} gap-x-${gapx} gap-y-${gapy}
        grid-cols-${sx}
        ipad:grid-cols-${md}
        laptop:grid-cols-${lg}
        ${classes}
      `}>
      {children}
    </div>
  );
}

export default Grid;