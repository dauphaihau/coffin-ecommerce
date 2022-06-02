import {Text} from "../../core";
import {Input} from "../../core/Input";
import {accountService} from "../../services/account";
import { Button } from "../../core/Button";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {useState} from "react";
import { Row } from "../../core/Layout";
import {useUIController} from "../../context/UIControllerContext";

const ForgotPassword = () => {

  // @ts-ignore
  const {dispatch} = useUIController();
  const [isBtnLoading, setIsBtnLoading] = useState(false)

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
  });

  const onSubmit = async ({email}) => {
    setIsBtnLoading(true)
    const {isLoading} = await accountService.forgotPassword({email})
    setIsBtnLoading(isLoading)
  }

  const formOptions = {
    resolver: yupResolver(validationSchema),
  };

  const {register, handleSubmit, formState: {errors},} = useForm(formOptions);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-6 pb-4 space-y-6 pt-4 lg:px-8 pb-6 xl:pb-8 mx-auto max-w-md"
    >
      <Text noDarkMode h1 sx='xl' weight='medium' color='gray-900'>
        Forgot Password
      </Text>
      <Text>
        Enter the email address you used when you joined and we’ll send you instructions to reset your password.
      </Text>
      <Input
        name='email'
        type='email'
        label='Email'
        register={register}
        errors={errors}/>
      <Button
        type="submit" width='full'
        classes='mt-5' size='lg'
        isLoading={isBtnLoading}>
        Send reset link
      </Button>
      <Row classes="text-sm font-medium text-gray-500 dark:text-gray-300">
        <Text noDarkMode span classes='mr-2'>Remember your password?</Text>

        <Text
          noDarkMode as='button' span
          color='black' weight='medium'
          classes="hover:underline"
          onClick={() => dispatch({type: 'OPEN_LOGIN_REGISTER'})}
        >
          Back to login
        </Text>
      </Row>
    </form>
  );
}

export default ForgotPassword;