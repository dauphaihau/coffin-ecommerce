import { ReactNode } from "react";
import button from "./Button/Button";

enum Transforms {
  UPPERCASE = 'uppercase',
  LOWERCASE = 'lowercase',
}

enum FONT_WEIGHT {
  BOLD = 'bold',
  LIGHT = 'light',
  SEMIBOLD = 'semibold',
}

enum FONT_SIZE {
  XS = 'sx',
  SM = 'sm',
  BASE = 'base',
  LG = 'lg',
  XL = 'xl',
  // ['2XL'] = '2xl',
  // ['3XL'] = '3xl',
  // ['4XL'] = '4xl',
}

const FONT_WEIGHT_MAP: Record<FONT_WEIGHT, string> = {
  [FONT_WEIGHT.BOLD]: 'font-bold',
  [FONT_WEIGHT.LIGHT]: 'font-light',
  [FONT_WEIGHT.SEMIBOLD]: 'font-semibold',
  // [FONT_SIZE['2XL']]: 'text-2xl',
  // [FONT_SIZE['3XL']]: 'text-3xl',
  // [FONT_SIZE['4XL']]: 'text-4xl',
};

// const FONT_SIZE_MAP: Record<FONT_SIZE, string> = {
//   [FONT_SIZE.XS]: 'text-sx',
//   [FONT_SIZE.SM]: 'text-sm',
//   [FONT_SIZE.BASE]: 'text-base',
//   [FONT_SIZE.LG]: 'text-lg',
//   [FONT_SIZE.XL]: 'text-xl',
//   [FONT_SIZE['2XL']]: 'text-2xl',
//   [FONT_SIZE['3XL']]: 'text-3xl',
//   [FONT_SIZE['4XL']]: 'text-4xl',
// };

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
  size?: string | number,
  as?: 'button',
  onClick?: () => any,
}

const Text = (props: Props) => {

  const {
    children, classes, color, as, transforms = '', b, noDarkMode, size,
    sx, md, lg, weight, h1, span, label, i, ...others
  } = props

  const allClass = `
        ${noDarkMode ? 'dark:text-black' : 'dark:text-white'}
        ${Transforms[transforms.toUpperCase()]}
        ${FONT_WEIGHT_MAP[weight]}
        ${as === 'button' && 'cursor-pointer'}
      ${classes}
  `
  if (h1) return <h1 style={{fontSize: size}} className={allClass} {...others}>{children}</h1>
  if (i) return <i style={{fontSize: size}} className={allClass} {...others}>{children}</i>
  if (label) return <label style={{fontSize: size}} className={allClass} {...others}>{children}</label>
  if (span) return <span style={{fontSize: size}} className={allClass} {...others}>{children}</span>
  if (b) return <b style={{fontSize: size}} className={allClass} {...others}>{children}</b>
  return (<p style={{fontSize: size}} className={allClass} {...others}>{children}</p>);
}

export default Text;