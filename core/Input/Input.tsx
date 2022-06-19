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
  defaultValue?: number | string,
  errors?: FieldErrors,
  contentLeft?: ReactNode,
  contentRight?: ReactNode,
  ref?: any,
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      type = 'text',
      label, name = '',
      register = () => {},
      onChange = () => {},
      errors, clearable,
      defaultValue,
      className, classes, placeholder,
      classesSpace, contentLeft, contentRight,
      ...others
    } = props;

    const [value, setValue] = useState<string | null>('')

    // @ts-ignore
    useEffect(() => setValue(defaultValue), [defaultValue]);

    return (
      <>
        <div className={`form-input group ${classesSpace}`}>
          {label && <label htmlFor={name}>{label}</label>}
          {
            <Text span classes={`form-input__contentLeft ${isEmpty(errors) ? 'top-[18px]' : 'top-[-5px]'} `}>
              {contentLeft}
            </Text> ?? ''
          }
          {clearable ?
            <button type='button' onClick={() => {
            }}
                    className={`form-input__contentRight ${isEmpty(errors) ? 'top-[18px]' : 'top-[-5px]'} `}>
              <svg xmlns="http://www.w3.org/2000/svg" className="clear-icon" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
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

const Password = (props) => {

  const {
    type = 'password',
    label, name = '',
    register = () => {
    },
    onChange = () => {
    },
    errors, clearable,
    className, classes, placeholder,
    classesSpace, contentLeft,

    // contentRight,
    ...others
  } = props;

  const [typeInput, setTypeInput] = useState(type)

  return (
    <>
      <div className={`form-input group ${classesSpace}`}>
        {label && <label htmlFor={name}>{label}</label>}
        {
          <Text span classes={`form-input__contentLeft ${isEmpty(errors) ? 'top-[18px]' : 'top-[-5px]'} `}>
            {contentLeft}
          </Text> ?? ''
        }
        {clearable ?
          <button type='button' onClick={() => {
          }}
                  className={`form-input__contentRight ${isEmpty(errors) ? 'top-[18px]' : 'top-[-5px]'} `}>
            <svg xmlns="http://www.w3.org/2000/svg" className="clear-icon" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </button> : ''
        }
        {
          <Text span classes={`form-input__contentRight ${isEmpty(errors) ? 'top-[18px]' : 'top-[-5px]'} `}>
            {
              typeInput === 'password' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-[10px] cursor-pointer"
                       onClick={() => setTypeInput('text')}
                       fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                ) :
                (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-[10px] cursor-pointer"
                       onClick={() => setTypeInput('password')}
                       fill="none" viewBox="0 0 24 24"
                       stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                  </svg>
                )
            }
          </Text> ?? ''
        }
        <input
          autoFocus={false}
          type={typeInput}
          // value={value}
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
}

Input.displayName = 'Input';

// @ts-ignore
Input.Password = Password;
export default Input;
