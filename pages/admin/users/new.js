import * as Yup from "yup";
import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";

import {useAuth} from "../../../context/authContext";
import {AvatarInput, Input, Select, Switch} from "../../../core/Input";
import {Grid, Stack} from "../../../core/Layout";
import {Paper} from "../../../core";
import {Button} from "../../../core/Button";
import {roleOpts} from "../../../assets/data/options";
import {userService} from "../../../services/users";
import { Helmet } from "../../../layouts/admin/common/Helmet";

const dataBreadcrumb = [
  {path: "/admin", name: "Dashboard", firstLink: true},
  {path: "/admin/users", name: "Users"},
  {path: "", name: "New User", lastLink: true}
];

const NewUser = () => {
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const {user} = useAuth();
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      role: roleOpts[0].value
    }
  };
  const {register, handleSubmit, control, formState, setError} = useForm(formOptions);
  const {errors} = formState;

  const onSubmit = async (values) => {
    const formatData = {...values, role: values.role.value ?? values.role}
    setIsBtnLoading(true)
    const res = await userService.create(formatData)
    setIsBtnLoading(res.isLoading)

    if (res.isSuccess) {
      router.push('/admin/users')
      toast.success('Create success!')
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
    <div className='w-2/3'>
      <Helmet title='Create a new user' dataBreadcrumb={dataBreadcrumb}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid md={2} lg={2} gapx={4}>
            <Paper>
              <div className='flex justify-center flex-col mb-4'>
                <div className='mb-4 bg-transparent rounded-full'>
                {/*<div className='mb-4 bg-gray-500 rounded-full py-14 px-16 w-fit'>*/}
                  <AvatarInput/>
                </div>
              </div>
              <Stack classes='mb-4 items-center'>
                <div>
                  <p className='font-bold text-[0.875rem]'>Banned</p>
                  <p className='text-gray-500 text-[0.875rem]'>Apply disable account</p>
                </div>
                <Switch/>
              </Stack>
              <Stack classes='mb-4 items-center'>
                <div>
                  <p className='font-bold text-[0.875rem]'>Email Verified</p>
                  <p className='text-gray-500 text-[0.875rem] w-4/5'>Disabling this will automatically send the user a verification email</p>
                </div>
                <Controller
                  control={control}
                  name='isVerified'
                  render={({field: {onChange}}) => (<Switch onChange={onChange}/>)}
                />
              </Stack>
            </Paper>
            <Paper>
              <Input label='Full Name *' name='name' register={register} errors={errors}/>
              <Grid md={1} lg={2} gapx={4}>
                <Input label='Address' name='address' register={register} errors={errors}/>
                <Input label='Phone/Mobile' name='phoneNumber' register={register} errors={errors}/>
              </Grid>
              <Grid md={1} lg={2} gapx={4}>
                <Input label='Email *' name='email' register={register} errors={errors}/>
                <Input label='Password' type='password' name='password' register={register} errors={errors}/>
              </Grid>
              <Controller
                control={control}
                name='role'
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <Select
                    size='medium'
                    name='role'
                    title='Role'
                    options={roleOpts.filter(({value}) => user?.role !== 'admin' ? value !== 'admin' : value)}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Paper>
           </Grid>
          <div className="flex gap-x-4 mt-6">
            <Button type='submit' isLoading={isBtnLoading}>Create</Button>
          </div>
        </form>
      </Helmet>
    </div>
  );
}

NewUser.layout = 'admin';
export default NewUser;