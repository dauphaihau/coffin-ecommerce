import {yupResolver} from "@hookform/resolvers/yup";
import {useForm, Controller} from "react-hook-form";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";
import * as Yup from "yup";

import {Grid} from "@core/Layout";
import {Input, Select, Switch, AvatarInput} from "@core/Input";
import {Button} from "@core/Button";
import {userService} from "@services/users";
import {useAuth} from "@context/authContext";
import {Paper} from "@core";
import {Helmet} from "../../../../layouts/admin/common/Helmet";
import {Col, Row} from "../../../../core/Layout";
import {Link} from "../../../../core/Next";
import {ROLE_OPTIONS, USER_STATUS} from "../../../../utils/enums";
import {capitalize} from "../../../../utils/helpers";

const handleRole = (role) => {
  let arr = [];
  for (let n in ROLE_OPTIONS) {
    if (typeof ROLE_OPTIONS[n] === 'number') arr.push(n);
  }
  let options = arr.map((opt) => ({
    label: capitalize(ROLE_OPTIONS[ROLE_OPTIONS[opt]].toLowerCase()),
    value: ROLE_OPTIONS[opt]
  }));
  return options.filter(({value}) => role !== ROLE_OPTIONS.ADMIN ? value !== ROLE_OPTIONS.ADMIN : value)
}

const UserEdit = () => {
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const router = useRouter();
  const {user: userInfo} = useAuth();
  const [statusBadgeLock, setStatusBadgeLock] = useState()
  const [user, setUser] = useState()

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady])

  const loadInit = async () => {
    const {id} = router.query;
    const {data} = await userService.detail(id);
    setUser(data)
    setStatusBadgeLock(data.status)
    // setIsLocked(data.status)
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
      ...values, role: values.role.value ?? values.role
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
          {/*<Grid md={2} lg={2} gapx={4}>*/}
          {/*  <Input label='Last Name *' name='lastName' register={register} errors={errors}/>*/}
          {/*</Grid>*/}

          <Grid md={2} lg={2} gapx={4} classes='w-[60rem] laptop:max-w-[80rem]'>
            <Paper>
              <div className='text-right mb-6'>
                {statusBadgeLock === USER_STATUS.LOCKED ?
                  <span className="badge-danger">Locked</span>
                  : <span className="badge-green">Active</span>
                }
              </div>
              <div className='flex justify-center flex-col mb-4'>
                <div className='mb-4 bg-transparent rounded-full'>
                  {/*<div className='mb-4 bg-gray-500 rounded-full py-14 px-16 w-fit'>*/}
                  <AvatarInput/>
                </div>
              </div>
              <Row align='center' justify='between' classes='mb-4'>
                <div>
                  <p className='font-bold text-[0.875rem]'>Locked</p>
                  <p className='text-gray-500 text-[0.875rem]'>Apply disable account</p>
                </div>
                <Controller
                  control={control}
                  name='status'
                  render={({field: {onChange, value}}) => (
                    <Switch value={value === USER_STATUS.LOCKED} onChange={(e) => {
                      // console.log('eee', e)
                      onChange(e ? USER_STATUS.LOCKED : USER_STATUS.ACTIVE);
                      setStatusBadgeLock(e ? USER_STATUS.LOCKED : USER_STATUS.ACTIVE);
                    }}/>)}
                />
              </Row>
              {/*<Row align='center' justify='between' classes='mb-4'>*/}
              {/*  <div>*/}
              {/*    <p className='font-bold text-[0.875rem]'>Email Verified</p>*/}
              {/*    <p className='text-gray-500 text-[0.875rem] w-4/5'>Disabling this will automatically send the user a*/}
              {/*      verification email</p>*/}
              {/*  </div>*/}
              {/*  <Controller*/}
              {/*    control={control}*/}
              {/*    name='isVerified'*/}
              {/*    render={({field: {onChange, value}}) => (*/}
              {/*      <Switch value={value} onChange={onChange}/>)}*/}
              {/*  />*/}
              {/*</Row>*/}
            </Paper>
            <Paper classes='h-fit'>
              <Grid md={1} lg={2} gapx={4}>
                <Input label='Full Name *' name='name' register={register} errors={errors}/>
                <Input label='Email *' name='email' register={register} errors={errors}/>
              </Grid>
              <Grid md={2} lg={2} gapx={4}>
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
                    options={handleRole(user?.role)}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Row justify='end' classes='mt-2'>
                <Link href='/admin/users'>
                  <Button light shadow type='button'>Back</Button>
                </Link>
                <Button shadow type='submit' isLoading={isBtnLoading}>Save Changes</Button>
              </Row>
            </Paper>
          </Grid>
        </form>
      </Helmet>
    </div>
  );
}

UserEdit.layout = 'admin';
export default UserEdit;