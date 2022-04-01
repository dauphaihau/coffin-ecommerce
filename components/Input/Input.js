const Input = (props) => {
  const {
    type = 'text',
    label = '',
    name,
    register,
    errors,
    className = '',
    placeholder = '',
    ...others
  } = props;

  return (
    <div className="form-input group">
      {label &&
        <label htmlFor={name}>{label}</label>
      }
      <input
        type={type}
        name={name}
        className={`peer p-4 ${className}`}
        placeholder={placeholder} required=""
        {...others}
      />
      {errors && <p className="text-red-500">{errors[name]?.message}</p>}
    </div>
  );
}

export default Input;
