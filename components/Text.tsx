import {ReactNode} from "react";

interface Props {
  children: ReactNode,
  classes?: string
  sx?: string,
  md?: string,
  lg?: string,
  color?: string,
  weight?: string
  h1?: boolean,
  span?: boolean,
}

const Text = (props: Props) => {

  const {
    children, classes, color,
    sx, md, lg, weight, h1, span,
    ...res
  } = props

  const allClass = `
        text-${sx}
        ipad:text-${md}
        laptop:text-${lg}
        text-${color}
        font-${weight}
      ${classes}`


  if (h1) {
    return <h1 className={allClass}>{children}</h1>
  }

  if (span) {
    return <span className={allClass}>{children}</span>
  }

  return (
    <p className={allClass}>{children}</p>
  );
}

export default Text;