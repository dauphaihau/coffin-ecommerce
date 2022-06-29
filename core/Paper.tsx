import {ReactNode} from "react";

interface Paper {
  noPadding?: boolean,
  children: ReactNode,
  classes?: string,
}

const Paper = (props: Paper) => {
  const {children, noPadding, classes} = props;
  return (
    <div className={`
    bg-white dark:bg-gray-custom-901 rounded-lg shadow-lg
    ${noPadding ? '' : 'p-6'}
    ${classes}
    `}>
      {children}
    </div>
  );
}

export default Paper;