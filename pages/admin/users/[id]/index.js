import {yupResolver} from "@hookform/resolvers/yup";
import {useForm, Controller} from "react-hook-form";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";
import * as Yup from "yup";

import {Helmet, Grid, Stack} from "@components/Layout";
import {Input, Select, Switch, AvatarInput} from "@components/Input";
import {Button} from "@components/Button";
import {userService} from "@services/users";
import {roleOpts} from "@assets/data/options";
import {useAuth} from "@context/authContext";
import {Paper} from "@components";

const UserEdit = () => {
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const router = useRouter();
  const {user: userInfo} = useAuth();
  const [isBanned, setIsBanned] = useState(false)
  const [user, setUser] = useState()

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady])

  const loadInit = async () => {
    const {id} = router.query;
    const res = await userService.detail(id);
    setUser(res.data)
    setIsBanned(res.data.isBanned)
  }

  const dataBreadcrumb = [
    {path: "/admin", name: "Dashboard", firstLink: true},
    {path: "/admin/users", name: "Users"},
    {path: "", name: user?.name, lastLink: true}
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
  });
  const formOptions = {resolver: yupResolver(validationSchema)};

  if (user) {
    const {...defaultValue} = user;
    formOptions.defaultValue = defaultValue;
  }
  const {register, handleSubmit, reset, formState, setError, control} = useForm(formOptions);
  const {errors} = formState;

  useEffect(() => {
    if (user) {
      reset(user)
    }
  }, [user, reset])

  const onSubmit = async (values) => {
    const formatForm = {
      ...values,
      role: values.role.value ?? values.role
    }
    setIsBtnLoading(true)
    const res = await userService.update(formatForm)
    setIsBtnLoading(res.isLoading)

    if (res.isSuccess) {
      router.push('/admin/users')
      toast.success('Update success!')
    } else {
      if (res.message === 'you are not authorized') {
        return toast.error(res.message)
      }
      console.log('res-message', res)
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
      <Helmet title='Edit user' dataBreadcrumb={dataBreadcrumb}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/*<Grid md={1} lg={2} gapx={4}>*/}
          {/*  <Input label='Last Name *' name='lastName' register={register} errors={errors}/>*/}
          {/*</Grid>*/}

          <Grid md={1} lg={2} gapx={4}>
            <Paper>
              <div className='text-right mb-6'>
                {isBanned ?
                  <span className="badge-danger">Banned</span>
                  :<span className="badge-green">Active</span>
                }
              </div>
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
                <Controller
                  control={control}
                  name='isBanned'
                  render={({field: {onChange, value}}) => (
                    <Switch value={value} onChange={(e) => {
                      onChange(e);
                      setIsBanned(e);
                    }}/>)}
                />
              </Stack>
              <Stack classes='mb-4 items-center'>
                <div>
                  <p className='font-bold text-[0.875rem]'>Email Verified</p>
                  <p className='text-gray-500 text-[0.875rem] w-4/5'>Disabling this will automatically send the user a
                    verification email</p>
                </div>
                <Controller
                  control={control}
                  name='isVerified'
                  render={({field: {onChange, value}}) => (
                    <Switch value={value} onChange={onChange}/>)}
                />
              </Stack>
            </Paper>
            <Paper>
              <Grid md={1} lg={2} gapx={4}>
                <Input label='Full Name *' name='name' register={register} errors={errors}/>
                <Input label='Email *' name='email' register={register} errors={errors}/>
              </Grid>
              <Grid md={1} lg={2} gapx={4}>
                <Input label='Address' name='address' register={register} errors={errors}/>
                <Input label='Phone/Mobile' name='phoneNumber' register={register} errors={errors}/>
              </Grid>
              {/*<Checkbox label=''/>*/}
              <Controller
                control={control}
                name='role'
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <Select
                    size='medium'
                    name='role'
                    title='Role'
                    options={roleOpts.filter(({value}) => userInfo?.role !== 'admin' ? value !== 'admin' : value)}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Paper>
          </Grid>
          <div className="flex gap-x-4 mt-6">
            <Button shadow type='submit' isLoading={isBtnLoading}>Save Changes</Button>
          </div>
        </form>
      </Helmet>
    </div>
  );
}

UserEdit.layout = 'admin';
export default UserEdit;