import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import {useUtil} from "../../context/utilContext";
import {useAuth} from "../../context/authContext";
import {XIcon} from "@heroicons/react/solid";
import {Button} from "../Button";
import {Input} from "../Input";
import Checkbox from "../Input/Checkbox";
import {accountService} from "../../services/account";

const LoginModal = () => {

  const [registerForm, setRegisterForm] = useState(false)
  const {modalOpen, modalToggle,} = useUtil();
  const [isBtnLoading, setIsBtnLoading] = useState(false)
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
      setValue('email', 'customer@email.com')
      setValue('password', '111111')
    } else {
      setValue('email', '')

      setValue('password', '')
    }
  }, [registerForm])

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: 'customer@email.com',
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
    setIsBtnLoading(true)
    const res = await accountService.login(values)
    setIsBtnLoading(res.isLoading)

    if (res.isSuccess) {
      setUser({...user, ...res})
      setIsAuthorize(true)
      modalToggle();
    } else {
      if (errors) {
        setError('email', {
          type: "server",
          message: res.message
        });
      }
    }
  }

  const handleRegister = async (values) => {
    setIsBtnLoading(true)
    const res = await accountService.register(values)
    setIsBtnLoading(res.isLoading)

    if (res.isSuccess) {
      setUser({...user, ...res})
      setIsAuthorize(true)
      modalToggle();
    } else {
      if (errors) {
        setError('email', {
          type: "server",
          message: res.message
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
              <div className="h-5">
                <Checkbox label='Remember me'/>
              </div>
              <a href="#" className="text-sm text-black hover:underline dark:text-blue-500">Lost Password?</a>
            </div>
          }
          <Button type="submit" className='w-full' isLoading={isBtnLoading}>
            {!registerForm ? 'Login to your account' : 'Register'}
          </Button>
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