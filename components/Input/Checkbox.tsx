import {InputHTMLAttributes, ReactNode, useState} from "react";
import {FieldErrors} from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label?: string,
  classes?: string,
  classesForm?: string,
  register?: (name: string) => void,
  errors?: FieldErrors,
  checked?: boolean,
}

const Checkbox = (props: InputProps) => {

  const [isChecked, setIsChecked] = useState(false)

  const {
    value,
    checked,
    classes = '',
    classesForm = '',
    defaultChecked = null,
    label = '',
    onChange,
    ...others
  } = props;

  return (
    <div onClick={() => setIsChecked(!isChecked)} className={`form-checkbox-input ${classesForm}`}>
      <input
        type="checkbox"
        // checked={value || defaultChecked}
        // checked={value}
        value={value}
        onChange={onChange}
        checked={isChecked}
        {...others}
        className={classes}
      />
      <label className='text-smaller'>{label}</label>

    </div>
  );
}

export default Checkbox;
