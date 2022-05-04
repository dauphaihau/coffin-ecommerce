import {FC, forwardRef, InputHTMLAttributes, ReactNode, useEffect, useState} from "react";
import Text from "../Text";
import {FieldErrors} from "react-hook-form";
import {isEmpty} from "../../utils/helpers";

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
      register = () => {},
      errors,
      className, classes, placeholder,
      classesSpace, contentLeft,
      ...others
    } = props;

    return (
      <>
        <div className={`form-input group relative ${classesSpace}`}>
          {label && <label htmlFor={name}>{label}</label>}
          {
            <Text span classes={`absolute 
            ${isEmpty(errors) ? 'top-[18px]' : 'top-[-5px]'}
             inset-y-0 left-[12px] 
             flex items-center text-gray-600`}
            >
              {contentLeft}
            </Text> ?? ''
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
          {errors && <Text color='red-500' classes="text-[0.9rem] mt-2">{errors[name]?.message}</Text>}
        </div>
      </>
    );
  })

Input.displayName = 'Input';
export default Input;
