import NextLink from 'next/link';
import {ReactNode} from "react";

interface Link {
  href?: string,
  classes?: string,
  className?: string,
  children?: ReactNode,
  scroll?: boolean,
}

const Link = (props: Link) => {
  const {href, children, scroll , classes, className, ...others} = props;
  return (
    <NextLink href={href} scroll={scroll}>
      <a {...others} className={classes || className}>
        {children}
      </a>
    </NextLink>
  );
}

export default Link