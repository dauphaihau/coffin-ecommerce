import { ReactNode } from "react";

interface Tooltip {
  title: string,
  classes?: string,
  children: ReactNode,
}

const Tooltip = (props: Tooltip) => {
  const {title = '', children, classes} = props;
  return (
    <div className="relative flex flex-row group w-full">
      <div
        className={`z-10 absolute group-hover:block hidden bg-black text-white
        text-xs rounded py-1 px-4 right-[-1rem] bottom-[110%] ${classes}`}>
        {title}
        <svg className="absolute text-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
          <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
        </svg>
      </div>
      {children}
    </div>
  );
}

export default Tooltip;