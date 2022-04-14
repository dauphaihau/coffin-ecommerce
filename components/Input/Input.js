import PropTypes from 'prop-types'
import { ErrorMessage } from '@hookform/error-message';

const propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  register: PropTypes.func,
  placeholder: PropTypes.string,
}

const defaultProps = {
  type: 'text',
  className: undefined,
  placeholder: undefined,
  onChange: () => {},
  register: () => {},
};

const Input = (props) => {

  const {
    type, label, name = '',
    register, errors,
    className, placeholder, ...others
  } = props;

  return (
    <div className="form-input group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        name={name}
        {...register(name)}
        className={`peer p-4 ${className}`}
        placeholder={placeholder}
        {...others}
      />
      {errors && <p className="text-red-500 text-[0.9rem] mt-2">{errors[name]?.message}</p>}
    </div>
  );
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
