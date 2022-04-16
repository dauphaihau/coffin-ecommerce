import {FC, forwardRef, InputHTMLAttributes} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  name: string,
  label?: string,
  classes?: string,
  register: (name: string) => void,
  errors: boolean,
  ref?: any,
}

const Input: FC<InputProps> = forwardRef(
  (props, ref) => {

  const {
    type, label, name = '',
    register, errors,
    className, classes, placeholder,
    ...others
  } = props;

  return (
    <div className="form-input group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        ref={ref}
        type={type}
        name={name}
        {...register(name)}
        className={`peer p-4 ${className} ${classes}`}
        placeholder={placeholder}
        {...others}
      />
      {errors && <p className="text-red-500 text-[0.9rem] mt-2">{errors[name]?.message}</p>}
    </div>
  );
})

Input.displayName = 'Input';
export default Input;
