import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import {useUIController} from "../../../../context/UIControllerContext";
import {useAuth} from "../../../../context/authContext";
import {Checkbox, Input} from "../../../../core/Input";
import {Button} from "../../../../core/Button";
import {accountService} from "../../../../services/account";
import {Text} from "../../../../core";
import {Modal} from "../../../../core/Modal/Modal";

const LoginRegisterModal = () => {
  const [currentForm, setCurrentForm] = useState('login')
  const {openLoginRegisterModal, closeDrawerModal} = useUIController();
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const {setUser, user, setIsAuthorize} = useAuth();
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    // name: Yup.string().min(6, 'Name must be at least 6 characters'),
    // email: Yup.string()
    //   .email('Email is invalid')
    //   .required('Email is required'),
    // password: Yup.string()
    //   .required('Password is required')
    //   .min(6, 'Password must be at least 6 characters'),
  });

  useEffect(() => {
    reset();
    setCurrentForm('login')
  }, [openLoginRegisterModal])

  const formType = {
    login: {
      title: 'Login',
      message: '',
      textButton: 'Login to your account',
      labelTextFooter: 'Not registered?',
      textFooter: 'Create account'
    },
    register: {
      title: 'Register',
      message: '',
      textButton: 'Register',
      labelTextFooter: 'Already have an account?',
      textFooter: 'Login'
    },
    forgotPassword: {
      title: 'Forgot Password',
      message: 'Enter the email address you used when you joined and we’ll send you instructions to reset your password.\n',
      textButton: 'Send reset link',
      labelTextFooter: '',
      textFooter: ''
    }
  }

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: 'customer@email.com',
      password: '111111'
    }
  };

  const {
    register, handleSubmit,
    reset, setError, setValue,
    formState: {errors},
  } = useForm(formOptions);


  useEffect(() => {
    if (currentForm === 'login') {
      setValue('email', 'customer@email.com')
      setValue('password', '111111')
    } else {
      setValue('email', '')
      setValue('password', '')
    }
  }, [currentForm])

  const onSubmit = (data) => {
    console.log('data', data)
    switch (currentForm) {
      case 'login':
        return handleLogin(data)
        break;
      case 'register':
        return handleRegister(data)
        break
      case 'forgotPassword':
        return handleForgotPassword(data)
        break
    }
  };

  const handleLogin = async (values) => {
    setIsBtnLoading(true)
    const res = await accountService.login(values)
    setIsBtnLoading(res.isLoading)

    if (res.isSuccess) {
      if (res.data.role !== 'customer') {
        await router.push('/admin')
      }
      setUser({...user, ...res.data})
      setIsAuthorize(true)
      closeDrawerModal();
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
      setUser({...user, ...res.data})
      setIsAuthorize(true)
      closeDrawerModal();
    } else {
      if (errors) {
        setError('email', {
          type: "server",
          message: res.message
        });
      }
    }
  }

  const handleForgotPassword = async (values) => {
    // console.log('values', values)
    const {email} = values;
    const res = await accountService.forgotPassword({email})
    console.log('res', res)
  }

  return (
    <Modal isOpen={openLoginRegisterModal}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-6 pb-4 space-y-6 lg:px-8 pb-6 xl:pb-8"
      >
        <Text h1 sx='xl' weight='medium' color='gray-900'>
          {formType[currentForm].title}
        </Text>
        <Text>{formType[currentForm].message}</Text>
        {currentForm === 'register' && <Input name='name' label='Name' register={register} errors={errors}/>}
        <Input name='email' type='email' label='Email' register={register} errors={errors}/>
        {currentForm !== 'forgotPassword' && <Input name='password' type='password' label='Password' register={register} errors={errors}/>}
        {currentForm === 'login' &&
          <div className="flex justify-between items-center">
            <Checkbox label='Remember me'/>
            <Text as='button' classes="text-sm text-black hover:underline pt-[2px]"
                  onClick={() => setCurrentForm('forgotPassword')}
            >Forgot Password?</Text>
          </div>
        }
        <Button type="submit" width='full' classes={currentForm === 'forgotPassword' && '!mt-[5px]'} size='lg'
                isLoading={isBtnLoading}>
          {formType[currentForm].textButton}
        </Button>
        {
          formType[currentForm].textFooter &&
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            <Text span classes='mr-2'>{formType[currentForm].labelTextFooter}</Text>
            <Text as='button' span color='black' weight='medium'
                  classes="hover:underline"
                  onClick={() => {
                    setCurrentForm(currentForm === 'register' ? 'login' : 'register');
                    reset();
                  }}
            >
              {formType[currentForm].textFooter}
            </Text>
          </div>
        }
      </form>
    </Modal>
  );
}

export default LoginRegisterModal;