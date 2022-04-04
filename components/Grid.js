import PropTypes from "prop-types";

const propTypes = {
  sx: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  gapx: PropTypes.number,
  gap: PropTypes.number,
  gapy: PropTypes.number,
  // children: PropTypes.func,
  css: PropTypes.string
}

const defaultProps = {
  sx: undefined,
  md: undefined,
  lg: undefined,
  css: undefined,
};

const Grid = (props) => {

  const {
    children, gap, css,
    sx, md, lg, gapx, gapy
  } = props;

  return (
    <div className={`grid gap-${gap} gap-x-${gapx} gap-y-${gapy}
        grid-cols-${sx}
        ipad:grid-cols-${md}
        laptop:grid-cols-${lg}
        ${css}
        `}>
      {children}
    </div>
  );
}

// Grid.propTypes = propTypes;
// Grid.defaultProps = defaultProps;

export default Grid;