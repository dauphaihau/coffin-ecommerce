import Input from "./Input";
import PropTypes from "prop-types";

const propTypes = {
  name: PropTypes.string,
  classes: PropTypes.string,
  label: PropTypes.string,
  register: PropTypes.func,
  placeholder: PropTypes.string,
}

const defaultProps = {
  type: 'text',
  classes: undefined,
  placeholder: undefined,
  onChange: () => {},
  register: () => {},
};

const Textarea = (props) => {

  const {
    label, name,
    classes = '',
    classNameLabel = '',
    placeholder = '',
    register, errors,
    rows = 3,
    ...others
  } = props;

  return (
    <div className={`form-textarea-input ${classes}`}>
      {label && <label className={classNameLabel}>{label}</label>}
      <textarea
        {...others} placeholder={placeholder} rows={rows}
        {...register(name)}
      />
      {errors && <p className="text-red-500 text-[0.9rem] mt-2">{errors[name]?.message}</p>}
    </div>
  );
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Textarea;
