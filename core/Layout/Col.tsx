import { ReactNode } from "react";
import { classNames } from "../../utils/helpers";

enum GAP {
  FIRST = 1,
  SECOND,
  THIRD,
  FOUR,
  EIGHT = 8,
}

enum SPACE {
  START = 'start',
  END = 'end',
  CENTER = 'center',
  BETWEEN = 'between',
  AROUND = 'around',
}

const GAP_MAPS: Record<GAP, string> = {
  [GAP.FIRST]: 'gap-1',
  [GAP.SECOND]: 'gap-2',
  [GAP.THIRD]: 'gap-3',
  [GAP.FOUR]: 'gap-4',
  [GAP.EIGHT]: 'gap-8',
};

const JUSTIFY_MAPS: Record<SPACE, string> = {
  [SPACE.CENTER]: 'justify-center',
  [SPACE.BETWEEN]: 'justify-between',
  [SPACE.AROUND]: 'justify-around',
  [SPACE.END]: 'justify-end',
  [SPACE.START]: 'justify-start',
};

const ALIGN_ITEM_MAPS: Record<SPACE, string> = {
  [SPACE.CENTER]: 'items-center',
  [SPACE.BETWEEN]: 'items-between',
  [SPACE.AROUND]: 'items-around',
  [SPACE.END]: 'items-end',
  [SPACE.START]: 'items-start',
};


const ALIGN_SELF_MAPS: Record<SPACE, string> = {
  [SPACE.START]: 'self-start',
  [SPACE.END]: 'self-end',
  [SPACE.CENTER]: 'self-center',
  [SPACE.BETWEEN]: '',
  [SPACE.AROUND]: '',
};

interface Props {
  // sx?: number,
  // md?: number,
  // lg?: number,
  gap?: number,
  justify?: 'center' | 'between' | 'around',
  align?: 'center' | 'between' | 'around',
  content?: 'center' | 'between' | 'around',
  self?: 'center' | 'start' | 'end',
  wrap?: 'wrap' | 'reverse' | 'around',
  classes?: string,
  children?: ReactNode,
}

const Col = (props: Props) => {
  const {children, classes, self, gap, justify, align = ''} = props
  return (
    <div
      className={classNames('flex flex-col',
        GAP_MAPS[gap],
        JUSTIFY_MAPS[justify],
        ALIGN_ITEM_MAPS[align],
        ALIGN_SELF_MAPS[self],
        classes
      )}>
      {children}
    </div>
  );
}

export default Col;