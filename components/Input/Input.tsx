import {FC, forwardRef, InputHTMLAttributes, ReactNode} from "react";
import {FieldErrors} from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label?: string,
  classes?: string,
  classesSpace?: string,
  register?: (name: string) => void,
  errors?: FieldErrors,
  contentLeft?: ReactNode,
  ref?: any,
}

const Input: FC<InputProps> = forwardRef(
  (props, ref) => {

    const {
      type = 'text',
      label, name = '',
      register, errors,
      className, classes, placeholder,
      classesSpace, contentLeft,
      ...others
    } = props;

    return (
      <div className={`form-input group relative ${classesSpace}`}>
        {label && <label htmlFor={name}>{label}</label>}
        {
          <div className='absolute inset-y-0 left-[12px] top-[16px] flex items-center text-gray-600'>
            {contentLeft}
          </div> ?? ''
        }

        <input
          ref={ref}
          type={type}
          name={name}
          {...register(name)}
          className={`peer p-4 ${className} ${classes}
        ${contentLeft && '!pl-7'}
        `}
          placeholder={placeholder}
          {...others}
        />
        {errors && <p className="text-red-500 text-[0.9rem] mt-2">{errors[name]?.message}</p>}
      </div>
    );
  })

Input.displayName = 'Input';
export default Input;
