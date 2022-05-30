import {forwardRef, InputHTMLAttributes, ReactNode, useEffect, useState} from "react";
import {FieldErrors} from "react-hook-form";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label?: string,
  classes?: string,
  classesForm?: string,
  register?: (name: string) => void,
  errors?: FieldErrors,
  checked?: boolean,
  value?: string | number,
}

const Checkbox = forwardRef(
  (props: CheckboxProps, ref) => {

    const {
      value = '',
      checked,
      classes = '',
      classesForm = '',
      defaultChecked,
      label = '',
      onChange,
      ...others
    } = props;

    const [isChecked, setIsChecked] = useState(defaultChecked)

    useEffect(() => {
      setIsChecked(defaultChecked)
    }, [defaultChecked])

    return (
      <div onClick={() => setIsChecked(!isChecked)} className={`form-checkbox-input ${classesForm}`}>
        <input
          type="checkbox"
          // @ts-ignore
          ref={ref}
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
)

export default Checkbox;
