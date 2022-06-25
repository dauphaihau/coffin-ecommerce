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
import {Box, Row} from "../../../../core/Layout";
import Dialog from "../../../../core/Dialog/Dialog";
import {Link} from "../../../../core/Next";
import {ROLE_OPTIONS} from "../../../../utils/enums";

const formType = {
  login: {
    title: 'Welcome back',
    // title: 'Log in',
    message: '',
    textButton: 'Login to your account',
    textFooter: 'Don\'t have an account?',
    linkTextFooter: 'Create one'
  },
  register: {
    title: 'Create account',
    message: '',
    textButton: 'Sign up',
    textFooter: 'Already have an account?',
    linkTextFooter: 'Login'
  },
}

const validationSchema = Yup.object().shape({
  name: Yup.string().min(6, 'Name must be at least 6 characters'),
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const formOptions = {
  resolver: yupResolver(validationSchema),
  defaultValues: {
    email: 'customer11@email.com',
    password: '111111'
  }
};

const LoginRegisterModal = () => {
  const router = useRouter();
  const [currentForm, setCurrentForm] = useState('login')
  // @ts-ignore
  const {openLoginRegisterModal, closeDrawerModal} = useUIController();
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const {setUser, user, setIsAuthorize} = useAuth();

  useEffect(() => {
    reset();
    setCurrentForm('login')
  }, [openLoginRegisterModal])

  const {
    register, handleSubmit,
    reset, setError, setValue,
    formState: {errors},
  } = useForm(formOptions);

  useEffect(() => {
    if (currentForm === 'login') {
      setValue('email', 'customer11@email.com')
      setValue('password', '111111')
    } else {
      setValue('email', '')
      setValue('password', '')
    }
  }, [currentForm])

  const onSubmit = async (values) => {
    setIsBtnLoading(true)
    const {
      isSuccess,
      isLoading,
      data,
      message
    } = currentForm === 'register' ? await accountService.register(values) : await accountService.login(values)
    setIsBtnLoading(isLoading)
    if (isSuccess) {
      if (data.profile.role !== ROLE_OPTIONS.CUSTOMER) {
        await router.push('/admin')
      }
      setUser({...user, ...data.profile})
      // setUser(data.profile)
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
  };

  return (
    <Dialog
      nonDarkMode
      isOpen={openLoginRegisterModal}
      closeDialog={closeDrawerModal}
      // width={390}
      // style={{width: 390}}
      classes='w-[390px]'
      noPadding
    >
      <Dialog.Content>
        <Row justify='end' classes="p-2 mb-[-44px]">
          <XIcon className='btn-icon' onClick={() => closeDrawerModal()}/>
        </Row>
        <Box form
          onSubmit={handleSubmit(onSubmit)}
          className="px-6 pb-4 space-y-6 pt-4 lg:px-8 pb-6 xl:pb-8 subscribe-letter-bg"
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
            errors={errors}
          />
          {
            currentForm !== 'forgotPassword' &&

            // @ts-ignore
            <Input.Password
              name='password'
              // type='password'
              label='Password'
              register={register}
              errors={errors}
            />
          }
          {
            currentForm === 'login' &&
            <Row justify='between' align='center'>
              <Checkbox name='rememberMe' label='Remember me'/>
              <Link href='/account/forgot-password'>
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
        </Box>
      </Dialog.Content>
    </Dialog>
  );
}

export default LoginRegisterModal;