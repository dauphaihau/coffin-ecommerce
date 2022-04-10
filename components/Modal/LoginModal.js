import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import * as Yup from 'yup';
import Cookie from "cookie-cutter";
import {yupResolver} from '@hookform/resolvers/yup';
import axios from "axios";

import {useUtil} from "../../context/utilContext";
import {useAuth} from "../../context/authContext";
import {XIcon} from "@heroicons/react/solid";
import {Button} from "../Button";
import {Input} from "../Input";

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
      .required('Password is required')
      // .concat(registerForm ? Yup.string().required('Password is required') : null)
      .min(6, 'Password must be at least 6 characters'),
  });

  useEffect(() => {
    reset();
    setRegisterForm(false);
  }, [user])

  useEffect(() => {
    if (!registerForm) {
      setValue('email', 'dauphaihau@email.com')
      setValue('password', '111111')
    } else {
      setValue('email', '')

      setValue('password', '')
    }
  }, [registerForm])

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: 'dauphaihau@email.com',
      password: '111111'
    }
  };

  const {register, handleSubmit, reset, formState, setError, setValue} = useForm(formOptions);
  const {errors} = formState;

  const onSubmit = (data) => {
    return registerForm
      ? handleRegister(data)
      : handleLogin(data)
  };

  const handleLogin = async (values) => {
    try {
      const {data} = await axios.post('/api/users/login', values);
      setUser({...user, ...data})
      setIsAuthorize(true)
      modalToggle();
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (err) {
      const {message} = JSON.parse(err.response.request.responseText);
      if (message) {
        if (errors) {
          setError('email', {
            type: "server",
            message
          });
        }
      }
    }
  }

  const handleRegister = async (values) => {
    try {
      const {data} = await axios.post('/api/users/register', values);
      setUser({...user, ...data})
      setIsAuthorize(true)
      modalToggle();
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (err) {
      const {message} = JSON.parse(err.response.request.responseText);
      if (errors) {
        setError('email', {
          type: "server",
          message
        });
      }
    }
  }

  return (
    <div className={`${!modalOpen && 'hidden'}
          fixed z-[200] justify-center items-center
          p-4 w-full h-full 
          inset-0 
          top-[10%]
          ipad:left-[23%] ipad:top-[15%] 
          laptop:left-[36%]
          ipad:max-w-md ipad:h-auto
           `}>
      <div className="bg-white rounded-lg shadow">
        <div className="flex justify-end p-2">
          <XIcon className='btn-icon' onClick={() => modalToggle()}/>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-6 pb-4 space-y-6 lg:px-8 pb-6 xl:pb-8"
        >
          <h3 className="text-xl font-medium text-gray-900">
            {registerForm ? 'Register' : 'Sign in'}
          </h3>
          {registerForm && <Input name='name' label='Name' register={register} errors={errors}/>}
          <Input name='email' type='email' label='Your email' register={register} errors={errors}/>
          <Input name='password' type='password' label='Your password' register={register} errors={errors}/>

          {!registerForm &&
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
          }
          <Button type="submit" className='w-full'>{!registerForm ? 'Login to your account' : 'Register'}</Button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            {
              registerForm
                ? <span className='mr-2'>Already have an account?</span>
                : <span className='mr-2'>Not registered?</span>
            }
            <span
              className="text-black font-medium hover:underline cursor-pointer"
              onClick={() => {
                setRegisterForm(!registerForm);
                reset();
              }}
            >
              {registerForm ? 'Login' : 'Create account'}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;