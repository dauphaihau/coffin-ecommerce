import {useState} from "react";
import {useForm} from "react-hook-form";
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import {useUtil} from "../../context/utilContext";

import {Button} from "../index";
import {userService} from "../../services";
import Input from "../Input/Input";
import {useAuth} from "../../context/authContext";

const LoginModal = () => {

  const [registerForm, setRegisterForm] = useState(false)
  const {modalOpen, modalToggle,} = useUtil();
  const {setUser, user, setIsAuthorize} = useAuth();

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(6, 'Name must be at least 6 characters'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .transform(x => x === '' ? undefined : x)
      .concat(registerForm ? Yup.string().required('Password is required') : null)
      .min(6, 'Password must be at least 6 characters'),
  });

  const formOptions = {resolver: yupResolver(validationSchema),};
  const {register, handleSubmit, reset, formState, setError} = useForm();
  const {errors} = formState;

  const onSubmit = (data) => {
    console.log('data-submit', data);
    return registerForm
      ? handleRegister(data)
      : handleLogin(data)
  };

  const handleLogin = ({email = '', password = ''}) => {
    return userService.login(email, password)
      .then((res) => {
        setUser({...user, ...res})
        setIsAuthorize(true)
        modalToggle();
      })
      .catch((err) => {
          if (errors) {
            setError('email', {
              type: "server",
              message: err,
            });
          }
        }
      )
  }

  const handleRegister = (values) => {
    return userService.register(values)
      .then((res) => {
        setUser({...user, ...res})
        modalToggle();
      })
      .catch((err) => {
          if (errors) {
            setError('email', {
              type: "server",
              message: err,
            });
          }
        }
      )
  }

  return (
    <div className={`${!modalOpen && 'hidden'}
          fixed inset-0 z-[200] 
          top-[10%]
          ipad:top-[20%] 
          laptop:left-[39%] laptop:top-[15%] 
          justify-center items-center
          p-4 w-full laptop:max-w-md h-full md:h-auto
           `}>
      <div className="bg-white rounded-lg shadow">
        <div className="flex justify-end p-2">
          <button
            type="button"
            onClick={() => modalToggle()}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="authentication-modal">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"/>
            </svg>
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
        >
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {registerForm ? 'Register' : 'Sign in to our platform'}
          </h3>
          {registerForm && <Input name='name' label='Name' register={register} errors={errors}/>}
          <Input name='email' type='email' label='Your email' register={register} errors={errors}/>
          <Input name='password' type='password' label='Your password' register={register} errors={errors}/>

          <div className="flex justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember" aria-describedby="remember" type="checkbox"
                  className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  required=""
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="font-medium text-gray-900 dark:text-gray-300">Remember me</label>
              </div>
            </div>
            <a href="#" className="text-sm text-black hover:underline dark:text-blue-500">Lost Password?</a>
          </div>

          <Button type="submit" className='w-full'>{!registerForm ? 'Login to your account' : 'Register'}</Button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            {
              registerForm
                ? <span className='mr-2'>Already have an account?</span>
                : <span className='mr-2'>Not registered?</span>
            }
            <button className="text-black font-medium hover:underline dark:text-blue-500"
                    onClick={() => {
                      setRegisterForm(!registerForm)
                      reset();
                    }}
            >
              {registerForm ? 'Login' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;