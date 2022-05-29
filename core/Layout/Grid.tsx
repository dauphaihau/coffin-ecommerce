import {ReactNode} from "react";
import {classNames} from "../../utils/helpers";

enum COL {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6
}

enum GAP {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3,
  FOUR = 4,
  EIGHT = 8,
}

const COL_SX_MAPS: Record<COL, string> = {
  [COL.FIRST]: 'grid-cols-1',
  [COL.SECOND]: 'grid-cols-2',
  [COL.THIRD]: 'grid-cols-3',
  [COL.FOUR]: 'grid-cols-4',
  [COL.FIVE]: 'grid-cols-5',
  [COL.SIX]: 'grid-cols-6',
};
const COL_MD_MAPS: Record<COL, string> = {
  [COL.FIRST]: 'ipad:grid-cols-1',
  [COL.SECOND]: 'ipad:grid-cols-2',
  [COL.THIRD]: 'ipad:grid-cols-3',
  [COL.FOUR]: 'ipad:grid-cols-4',
  [COL.FIVE]: 'ipad:grid-cols-5',
  [COL.SIX]: 'ipad:grid-cols-6',
};
const COL_LG_MAPS: Record<COL, string> = {
  [COL.FIRST]: 'laptop:grid-cols-1',
  [COL.SECOND]: 'laptop:grid-cols-2',
  [COL.THIRD]: 'laptop:grid-cols-3',
  [COL.FOUR]: 'laptop:grid-cols-4',
  [COL.FIVE]: 'laptop:grid-cols-5',
  [COL.SIX]: 'laptop:grid-cols-6',
};
const COL_XL_MAPS: Record<COL, string> = {
  [COL.FIRST]: 'desktop:grid-cols-1',
  [COL.SECOND]: 'desktop:grid-cols-2',
  [COL.THIRD]: 'desktop:grid-cols-3',
  [COL.FOUR]: 'desktop:grid-cols-4',
  [COL.FIVE]: 'desktop:grid-cols-5',
  [COL.SIX]: 'desktop:grid-cols-6',
};
const GAP_MAPS: Record<GAP, string> = {
  [GAP.FIRST]: 'gap-1',
  [GAP.SECOND]: 'gap-2',
  [GAP.THIRD]: 'gap-3',
  [GAP.FOUR]: 'gap-4',
  [GAP.EIGHT]: 'gap-8',
};
const GAP_X_MAPS: Record<GAP, string> = {
  [GAP.FIRST]: 'gap-x-1',
  [GAP.SECOND]: 'gap-x-2',
  [GAP.THIRD]: 'gap-x-3',
  [GAP.FOUR]: 'gap-x-4',
  [GAP.EIGHT]: 'gap-x-8',
};
const GAP_Y_MAPS: Record<GAP, string> = {
  [GAP.FIRST]: 'gap-y-1',
  [GAP.SECOND]: 'gap-y-2',
  [GAP.THIRD]: 'gap-y-3',
  [GAP.FOUR]: 'gap-y-4',
  [GAP.EIGHT]: 'gap-y-8',
};

type Props = {
  sx?: number,
  md?: number,
  lg?: number,
  xl?: number,
  gap?: number,
  gapx?: number,
  gapy?: number,
  classes?: string
  children: ReactNode
}

const Grid = (props: Props) => {

  const {
    children, gap, classes = '',
    sx = '', md = '', lg = '', xl = '',
    gapx = '', gapy = ''
  } = props;

  return (
    <div
      className={classNames('grid',
        COL_SX_MAPS[sx],
        COL_MD_MAPS[md],
        COL_LG_MAPS[lg],
        COL_XL_MAPS[xl],
        GAP_MAPS[gap],
        GAP_X_MAPS[gapx],
        GAP_Y_MAPS[gapy],
        classes
      )}>
      {children}
    </div>
  );
}

export default Grid;