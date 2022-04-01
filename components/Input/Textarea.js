const Textarea = (props) => {

  const {
    label,
    className = '',
    classNameLabel = '',
    placeholder='',
    rows = 3,
    ...others
  } = props;

  return (
    <div className={`form-textarea-input ${className}`}>
      <label className={classNameLabel}>{label}</label>
      <textarea {...others} placeholder={placeholder} rows={rows}/>
    </div>
  );
}

export default Textarea;
