import {Text} from "../../core";
import {Input} from "../../core/Input";
import {accountService} from "../../services/account";
import {Button} from "../../core/Button";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {useState} from "react";
import {useRouter} from "next/router";

const ResetPassword = () => {

  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const router = useRouter();
  const {id, token} = router.query;

  const validationSchema = Yup.object().shape({
    password: Yup.string()
    //   .min(6, 'Password must be at least 6 characters')
    //   .required('Password is required'),
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    //   .required('Confirm Password is required'),
  });

  console.log('router-query', router.query)
  const onSubmit = async (values) => {
    // console.log('values', values)
    const {newPassword} = values
    const res = await accountService.updatePassword({password: newPassword, userId: id, token})
  }

  const formOptions = {
    resolver: yupResolver(validationSchema),
  };

  const {
    register, handleSubmit,
    reset, setError, setValue,
    formState: {errors},
  } = useForm(formOptions);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-6 pb-4 space-y-6 pt-4 lg:px-8 pb-6 xl:pb-8 mx-auto max-w-md"
    >
      <Text noDarkMode h1 sx='xl' weight='medium' color='gray-900'>
        Reset Password
      </Text>
      <Text>
        Enter the new password for email abc@gmail.com
      </Text>
      <Input name='newPassword' type='password' label='New Password' register={register} errors={errors}/>
      <Input name='confirmPassword' type='password' label='Confirm New Password' register={register} errors={errors}/>
      <Button
        type="submit" width='full'
        classes='mt-5' size='lg'
        isLoading={isBtnLoading}>
        Change
      </Button>
    </form>
  );
}

export default ResetPassword;