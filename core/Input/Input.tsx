import {ChangeEvent, FC, forwardRef, InputHTMLAttributes, ReactNode, useEffect, useState} from "react";
import Text from "../Text";
import {FieldErrors} from "react-hook-form";
import {isEmpty} from "../../utils/helpers";

// type Value = {
//   value: string | number
// }

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label?: string,
  classes?: string,
  classesSpace?: string,
  register?: (name: string) => void,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  clearable?: boolean,
  defaultValue?: string | number,
  errors?: FieldErrors,
  contentLeft?: ReactNode,
  contentRight?: ReactNode,
  ref?: any,
}

const Input: FC<InputProps> = forwardRef(
  (props, ref) => {

    const {
      type = 'text',
      label, name = '',
      register = () => {},
      onChange= () => {},
      errors, clearable,
      defaultValue,
      className, classes, placeholder,
      classesSpace, contentLeft, contentRight,
      ...others
    } = props;

    const [value, setValue] = useState<string | null>('')

    useEffect(() => {
      // @ts-ignore
      setValue(defaultValue);
    }, [defaultValue]);

    return (
      <>
        <div className={`form-input group ${classesSpace}`}>
          {label && <label htmlFor={name}>{label}</label>}
          {
            <Text span classes={`form-input__contentLeft ${isEmpty(errors) ? 'top-[18px]' : 'top-[-5px]'} `}>
              {contentLeft}
            </Text> ?? ''
          }
          { clearable ?
            <button type='button' onClick={() => {}}
              className={`form-input__contentRight ${isEmpty(errors) ? 'top-[18px]' : 'top-[-5px]'} `}>
              <svg xmlns="http://www.w3.org/2000/svg" className="clear-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button> : ''
          }
          {
            <Text span classes={`form-input__contentRight ${isEmpty(errors) ? 'top-[18px]' : 'top-[-5px]'} `}>
              {contentRight}
            </Text> ?? ''
          }
          <input
            autoFocus={false}
            ref={ref}
            type={type}
            value={value}
            name={name}
            onChange={onChange}
            {...register(name)}
            className={`peer p-4 ${className} ${classes}
           ${contentLeft && '!pl-7'}
          `}
            placeholder={placeholder}
            {...others}
          />
          {errors && <Text color='red-500' classes="text-[0.9rem] mt-2">{errors[name]?.message}</Text>}
        </div>
      </>
    );
  })

Input.displayName = 'Input';
export default Input;
