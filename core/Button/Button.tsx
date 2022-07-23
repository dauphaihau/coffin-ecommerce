import { forwardRef, ReactNode } from "react";
import { Loading } from "../Loading";
import Text from "../Text";

interface Props {
  type?: 'button' | 'reset' | 'submit',
  classes?: string,
  shadow?: boolean,
  size?: 'sx' | 'sm' | 'md' | 'lg' | 'xl',
  light?: boolean,
  variant?: 'gray' | 'warning',
  children: ReactNode,
  icon?: ReactNode,
  iconRight?: ReactNode,
  width?: 'full' | 'fit',
  disabled?: boolean,
  onClick?: () => void;
  isLoading?: boolean,
}

const Button = forwardRef((props: Props, ref: any) => {

  const {
    type = 'button', classes = '',
    width = '', icon = '', iconRight = '',
    children, size = 'md', light = '',
    shadow = '', variant = '',
    isLoading = '',
    ...others
  } = props

  return (
    // ${size ==='sm' ? '!laptop:py-2 !laptop:px-2':''}
    <button
      type={type}
      className={`btn 
      ${shadow ? 'drop-shadow-xl' : ''}
      ${width === 'fit' ? 'w-fit' : '' || width === 'full' ? 'w-full' : ''}
      ${size === 'sm' ? 'laptop:py-2 laptop:px-2' : ''}
      ${size === 'lg' ? 'laptop:py-4 laptop:px-4' : ''}
      ${size === 'xl' ? 'laptop:py-6 laptop:px-6' : ''}
      ${isLoading ? 'opacity-[0.3]' : ''}
      ${light && 'bg-transparent text-black hover:text-black hover:opacity-[0.7]'}
      ${variant === 'gray' ? 'bg-gray-custom-50 text-black hover:bg-gray-custom-hover animate hover:text-black' : ''}
      ${variant === 'warning' ? 'bg-red-custom-500 text-white hover:opacity-[0.8] animate ' : ''}
      ${others.disabled ? 'opacity-[0.3] hover:opacity-[0.3]' : ''}
      ${classes} 
      dark:text-white dark:hover:text-white
      `}
      {...others}
      ref={ref}
    >
      {icon && <Text span classes='btn__icon'>{icon}</Text>}
      {isLoading ? <Loading/> : children}
    </button>
  )
})

Button.displayName = 'Button';
export default Button;

