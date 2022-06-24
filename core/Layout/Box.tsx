import {forwardRef, ForwardRefRenderFunction, ReactNode} from "react";

interface BoxProps {
  // sx?: number,
  // md?: number,
  // lg?: number,
  // gap?: number,
  // justify?: 'center' | 'between' | 'around',
  // align?: 'center' | 'between' | 'around',
  // content?: 'center' | 'between' | 'around',
  classes?: string,
  children?: ReactNode,
  footer?: boolean,
  nav?: boolean,
  header?: boolean,
  main?: boolean,
  form?: boolean,
  section?: boolean,
  aside?: boolean,
}

const Box = forwardRef((props: BoxProps, ref: any) => {

  const {
    children, classes,
    // gap, justify, align = '',
    footer, nav, header, main, form, section, aside,
    ...others
  } = props

  if (header) return <header ref={ref} className={classes} {...others}>{children}</header>
  if (nav) return <nav ref={ref} className={classes} {...others}>{children}</nav>
  if (footer) return <footer ref={ref} className={classes} {...others}>{children}</footer>
  if (main) return <main ref={ref} className={classes} {...others}>{children}</main>
  if (form) return <form ref={ref} className={classes} {...others}>{children}</form>
  if (aside) return <aside ref={ref} className={classes} {...others}>{children}</aside>
  return (<div ref={ref} className={classes} {...others}>{children}</div>);
})

export default Box;
