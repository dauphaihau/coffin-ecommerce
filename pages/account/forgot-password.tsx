import {Link, Text} from "../../core";
import {Input} from "../../core/Input";
import {accountService} from "../../services/account";
import {Button} from "../../core/Button";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {useState} from "react";
import {Col, Row} from "../../core/Layout";
import {useUIController} from "../../context/UIControllerContext";

const formType = {
  forgotPassword: {
    title: 'Forgot Password',
    message: () => 'Enter the email address you used when you joined and we’ll send you instructions to reset your password.',
    textButton: 'Send reset link',
    textFooter: 'Remember your password?',
    linkTextFooter: 'Back to login'
  },
  emailSent: {
    title: 'Email Sent',
    message: (email) => `We sent an email to ${email} with a link to reset your password`,
    textButton: 'Continue visit store',
    linkTextFooter: '',
    textFooter: '',
  }
}

const ForgotPassword = () => {

  // @ts-ignore
  const {dispatch} = useUIController();
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const [email, setEmail] = useState(null)
  const [currentForm, setCurrentForm] = useState('forgotPassword')
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
  });
  const {register, handleSubmit, setError, formState: {errors},} = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({email}) => {
    setIsBtnLoading(true)
    setEmail(email)
    const {isLoading, status} = await accountService.forgotPassword({email})
    setIsBtnLoading(isLoading)
    console.log('status', status)
    if (Number(status) === 401) {
      setError('email', {
        type: 'server',
        message: 'No profile found with that email.'
      })
      return
    }
    setCurrentForm('emailSent')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-6 pb-4 space-y-6 pt-4 lg:px-8 pb-6 xl:pb-8 mx-auto max-w-md"
    >
      <Text noDarkMode h1 sx='xl' weight='medium' color='gray-900'>
        {formType[currentForm].title}
      </Text>
      <Text>
        {formType[currentForm].message(email)}
      </Text>
      <Col classes={currentForm === 'emailSent' ? 'hidden' : 'block'}>
        <Input
          name='email'
          type='email'
          label='Email'
          register={register}
          errors={errors}
        />
        <Button
          type="submit" width='full'
           size='lg'
          isLoading={isBtnLoading}>
          {formType[currentForm].textButton}
        </Button>
      </Col>
      <Link href='/pages' classes={currentForm === 'forgotPassword' ? 'hidden' : 'block'}>
        <Button
          type="submit" width='full'
          classes='mt-5' size='lg'
          isLoading={isBtnLoading}>
          {formType[currentForm].textButton}
        </Button>
      </Link>
      <Row
        classes={`text-sm font-medium text-gray-500 dark:text-gray-300 ${currentForm === 'emailSent' ? 'hidden' : ''}`}>
        <Text noDarkMode span classes='mr-2'>{formType[currentForm].textFooter}</Text>
        <Text
          noDarkMode as='button' span
          color='black' weight='medium'
          classes="hover:underline"
          onClick={() => dispatch({type: 'OPEN_LOGIN_REGISTER'})}
        >
          {formType[currentForm].linkTextFooter}
        </Text>
      </Row>
    </form>
  );
}

export default ForgotPassword;