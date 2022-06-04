import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {XIcon} from "@heroicons/react/solid";

import {useUIController} from "../../../../context/UIControllerContext";
import {useAuth} from "../../../../context/authContext";
import {Checkbox, Input} from "../../../../core/Input";
import {Button} from "../../../../core/Button";
import {accountService} from "../../../../services/account";
import {Text} from "../../../../core";
import {Row} from "../../../../core/Layout";
import Dialog from "../../../../core/Modal/Dialog";
import {Link} from "../../../../core/Next";
import {ROLE_OPTIONS} from "../../../../utils/enums";


const formType = {
  login: {
    title: 'Login',
    message: '',
    textButton: 'Login to your account',
    textFooter: 'Don\'t have an account?',
    linkTextFooter: 'Create one'
  },
  register: {
    title: 'Register',
    message: '',
    textButton: 'Register',
    textFooter: 'Already have an account?',
    linkTextFooter: 'Login'
  },
}


const LoginRegisterModal = () => {
  const [currentForm, setCurrentForm] = useState('login')
  const {openLoginRegisterModal, closeDrawerModal} = useUIController();
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const {setUser, user, setIsAuthorize} = useAuth();
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(6, 'Name must be at least 6 characters'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  useEffect(() => {
    reset();
    setCurrentForm('login')
  }, [openLoginRegisterModal])

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
    if (currentForm === 'register') {
      return handleRegister(data)
    }
    return handleLogin(data)
  };

  const handleLogin = async (values) => {
    setIsBtnLoading(true)
    const {isSuccess, isLoading, data, message} = await accountService.login(values)
    setIsBtnLoading(isLoading)

    if (isSuccess) {
      if (data.role !== ROLE_OPTIONS.CUSTOMER) {
        await router.push('/admin')
      }
      setUser({...user, ...data})
      setIsAuthorize(true)
      closeDrawerModal();
    } else {
      if (errors) {
        setError('email', {
          type: "server",
          message
        });
      }
    }
  }

  const handleRegister = async (values) => {
    setIsBtnLoading(true)
    const {isSuccess, isLoading, data, message} = await accountService.register(values)
    setIsBtnLoading(isLoading)

    if (isSuccess) {
      setUser({...user, ...data})
      setIsAuthorize(true)
      closeDrawerModal();
    } else {
      if (errors) {
        setError('email', {
          type: "server",
          message
        });
      }
    }
  }

  return (
    <Dialog
      nonDarkMode
      isOpen={openLoginRegisterModal}
      closeDialog={closeDrawerModal}
      width={390}
      noPadding
    >
      <Dialog.Content>
        <Row justify='end' classes="p-2 mb-[-44px]">
          <XIcon className='btn-icon' onClick={() => closeDrawerModal()}/>
        </Row>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-6 pb-4 space-y-6 pt-4 lg:px-8 pb-6 xl:pb-8"
        >
          <Text noDarkMode h1 sx='xl' weight='medium' color='gray-900'>
            {formType[currentForm].title}
          </Text>
          <Text>{formType[currentForm].message}</Text>
          {currentForm === 'register' && <Input name='name' label='Name' register={register} errors={errors}/>}
          <Input
            name='email'
            type='email'
            label='Email'
            register={register}
            errors={errors}/>
          {
            currentForm !== 'forgotPassword' &&
            <Input
              name='password'
              type='password'
              label='Password'
              register={register}
              errors={errors}
            />
          }
          {
            currentForm === 'login' &&
            <Row justify='between' align='center'>
              <Checkbox name='rememberMe' label='Remember me'/>
              <Link href='/forgot-password'>
                <Text as='button' classes="text-sm text-black hover:underline pt-[2px]">Forgot Password?</Text>
              </Link>
            </Row>
          }
          <Button
            type="submit" width='full'
            classes={currentForm === 'forgotPassword' && '!mt-[5px]'} size='lg'
            isLoading={isBtnLoading}>
            {formType[currentForm].textButton}
          </Button>
          {
            formType[currentForm].textFooter &&
            <Row classes="text-sm font-medium text-gray-500 dark:text-gray-300">
              <Text noDarkMode span classes='mr-2'>{formType[currentForm].textFooter}</Text>
              <Text
                noDarkMode as='button' span
                color='black' weight='medium'
                classes="hover:underline"
                onClick={() => {
                  setCurrentForm(currentForm === 'register' ? 'login' : 'register');
                  reset();
                }}
              >
                {formType[currentForm].linkTextFooter}
              </Text>
            </Row>
          }
        </form>
      </Dialog.Content>
    </Dialog>
  );
}

export default LoginRegisterModal;