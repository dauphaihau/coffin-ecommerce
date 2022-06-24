/*
Item :
alignItems, autoFocus, disabled, selected,

Item.Button

Item.Icon

 */

import {ReactNode} from "react";

interface ListProps {
  classes?: string
  children: ReactNode
}

const List = ({children, classes = '', ...others}: ListProps) => {
  return (
    <ul className={classes} {...others}>
      {children}
    </ul>
  )
}

const Item = ({children, classes, ...others}: ListProps) => <li {...others} className={classes}>{children}</li>;

List.Item = Item;

export default List