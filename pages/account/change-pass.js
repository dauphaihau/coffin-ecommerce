import {useForm} from "react-hook-form";
import * as Yup from 'yup';
import {useState} from "react";
import {toast} from "react-hot-toast";
import {yupResolver} from "@hookform/resolvers/yup";

import {useAuth} from "../../context/authContext";
import banner from "../../public/images/banners/contemporary-banner.png";
import ProfileSidebar from "../../layouts/main/pages/account/ProfileSidebar";
import {Input} from "../../core/Input";
import {Button} from "../../core/Button";
import {Text} from "../../core";
import {accountService} from "../../services/account";
import BannerCard from "../../layouts/main/pages/account/BannerCard";
import {Grid} from "../../core/Layout";

const ChangePass = () => {

  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const {user} = useAuth();
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const {register, handleSubmit, reset, formState, setError} = useForm(formOptions);
  const {errors} = formState;

  const onSubmit = async (values) => {
    const formatData = {...values, email: user.email}

    setIsBtnLoading(true)
    const res = await accountService.updatePassword(formatData)
    setIsBtnLoading(res.isLoading)

    if (res.isSuccess) {
      toast.success('Update success!')
      reset();
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
    <>
      <BannerCard srcImg={banner} title='Profile'/>
      <Grid md={2} lg={6} gapx={12} classes='mt-12'>
        <ProfileSidebar active='change-pass'/>
        <div className='laptop:col-span-3'>
          <div className='p-4 rounded-lg'>
            <Text sx='3xl' weight='bold' classes='mb-6'>Change Password</Text>
            <form onSubmit={handleSubmit(onSubmit)} className="xl:pb-8 space-y-6 laptop:w-1/2">
              <Input name='password' type='password' label='Current Password' register={register} errors={errors}/>
              <Input name='newPassword' type='password' label='New Password' register={register} errors={errors}/>
              <Input name='confirmPassword' type='password' label='Confirm New Password' register={register} errors={errors}/>
              <Button size='lg' type="submit" isLoading={isBtnLoading}>Change</Button>
            </form>
          </div>
        </div>
      </Grid>
    </>
  );
}

export default ChangePass;