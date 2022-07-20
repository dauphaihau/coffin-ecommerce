import { ReactNode } from "react";
import button from "./Button/Button";

enum Transforms {
  UPPERCASE = 'uppercase',
  LOWERCASE = 'lowercase',
}

interface Props {
  children?: ReactNode,
  classes?: string
  sx?: string,
  md?: string,
  lg?: string,
  transforms?: 'uppercase' | 'lowercase',
  color?: string,
  weight?: string
  noDarkMode?: boolean,
  h1?: boolean,
  b?: boolean,
  label?: boolean,
  i?: boolean,
  span?: boolean,
  as?: 'button',
  onClick?: () => any,
}

const Text = (props: Props) => {

  const {
    children, classes, color, as, transforms = '', b, noDarkMode,
    sx, md, lg, weight, h1, span, label, i, ...others
  } = props

  const allClass = `
        ${noDarkMode ? 'dark:text-black' : 'dark:text-white'}
        ${Transforms[transforms.toUpperCase()]}
        text-${sx}
        ipad:text-${md}
        laptop:text-${lg}
        text-${color}
        font-${weight}
        ${as === 'button' && 'cursor-pointer'}
      ${classes}
  `

  if (h1) return <h1 className={allClass} {...others}>{children}</h1>
  if (i) return <i className={allClass} {...others}>{children}</i>
  if (label) return <label className={allClass} {...others}>{children}</label>
  if (span) return <span className={allClass} {...others}>{children}</span>
  if (b) return <b className={allClass} {...others}>{children}</b>
  return (<p className={allClass} {...others}>{children}</p>);
}

export default Text;