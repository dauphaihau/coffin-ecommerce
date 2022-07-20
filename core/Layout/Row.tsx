import React from "react";
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
};

const ALIGN_ITEM_MAPS: Record<SPACE, string> = {
  [SPACE.CENTER]: 'items-center',
  [SPACE.BETWEEN]: 'items-between',
  [SPACE.AROUND]: 'items-around',
};

const ALIGN_CONTENT_MAPS: Record<SPACE, string> = {
  [SPACE.START]: 'content-start',
  [SPACE.END]: 'content-end',
  [SPACE.CENTER]: 'content-center',
  [SPACE.BETWEEN]: 'content-between',
  [SPACE.AROUND]: 'content-around',
};

interface Props {
  // sx?: number,
  // md?: number,
  // lg?: number,
  gap?: number,
  justify?: 'center' | 'between' | 'around' | 'start' | 'end',
  align?: 'center' | 'between' | 'around' | 'start' | 'end',
  content?: 'center' | 'between' | 'around',
  wrap?: 'wrap' | 'reverse' | 'around',
  classes?: string,
  children: React.ReactNode
}

const Row = (props: Props) => {
  const {children, classes, gap, justify, align = '', content = '', wrap = ''} = props
  return (
    <div
      className={classNames('flex',
        GAP_MAPS[gap],
        JUSTIFY_MAPS[justify],
        ALIGN_ITEM_MAPS[align],
        ALIGN_CONTENT_MAPS[content],
        classes,
      )}>
      {children}
    </div>
  );
}

export default Row;