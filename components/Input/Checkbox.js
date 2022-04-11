const Checkbox = (props) => {

  const {
    value,
    checked,
    classes = '',
    defaultChecked = null,
    label = '',
    ...others
  } = props;

  return (
    <div className="form-check-input">
      <input
        type="checkbox"
        checked={value || defaultChecked}
        {...others}
        className={classes}
      />
      <label className='text-smaller'>{label}</label>

    </div>
  );
}

export default Checkbox;
