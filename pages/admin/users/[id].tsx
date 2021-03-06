import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import * as Yup from 'yup';

import {Grid} from '@core/Layout';
import {Input, Select, Switch, AvatarInput} from '@core/Input';
import {Button} from '@core/Button';
import {userService} from '@services/users';
import {Paper, Text} from '@core';
import {Helmet} from '../../../layouts/admin/common/Helmet';
import {Col, Row} from '../../../core/Layout';
import {Link} from '../../../core/Next';
import {ROLE_OPTIONS, USER_STATUS} from '../../../utils/enums';
import {capitalize} from '../../../utils/helpers';
import {otherService} from '../../../services/other';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
});
const formOptions = {resolver: yupResolver(validationSchema)};

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
  // const [isDisableBtn, setIsDisableBtn] = useState(true)
  const router = useRouter();
  const [statusBadgeLock, setStatusBadgeLock] = useState()
  const [user, setUser] = useState()

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady])

  const loadInit = async () => {
    const {data} = await userService.detail(router.query.id);
    setUser(data)
    setStatusBadgeLock(data.status)
    // setIsLocked(data.status)
  }

  const dataBreadcrumb = [
    {path: '/admin', name: 'Dashboard', firstLink: true},
    {path: '/admin/users', name: 'Users'},
    {path: '', name: user?.name, lastLink: true}
  ];

  if (user) {
    const {...defaultValue} = user;
    formOptions.defaultValue = defaultValue;
  }
  const {register, handleSubmit, reset, formState: {errors}, setError, control} = useForm(formOptions);

  useEffect(() => {
    if (user) reset(user)
  }, [user, reset])

  const onSubmit = async (values) => {
    setIsBtnLoading(true)
    let formatData = {...values, role: values.role.value ?? values.role}
    const {avatar} = values;
    if (avatar !== user?.avatar) {
      const body = new FormData();
      body.append('file', avatar);
      const {data} = await otherService.uploadFile(body)
      formatData = {...formatData, avatar: data}
    }
    const {isLoading, isSuccess, message} = await userService.update(formatData)

    setIsBtnLoading(isLoading)
    if (isSuccess) {
      router.push('/admin/users')
      toast.success('Update success!')
    } else {
      if (message === 'you are not authorized') {
        return toast.error(message)
      }
      if (errors) {
        setError('email', {
          type: 'server',
          message
        });
      }
    }
  }

  return (
    <section className='w-2/3'>
      <Helmet title='Edit user' dataBreadcrumb={dataBreadcrumb}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid md={2} lg={2} gapx={4} classes='w-[57rem] laptop:max-w-[80rem]'>
            <Paper>
              <div className='text-right mb-6'>
                {statusBadgeLock === USER_STATUS.LOCKED ?
                  <Text span classes='badge-danger'>Locked</Text>
                  : <Text span classes='badge-green'>Active</Text>
                }
              </div>
              {/*<Col justify='center'  classes='mb-4'>*/}
              <div className='flex justify-center flex-col mb-4'>
                <div className='mb-4 bg-transparent rounded-full'>
                  <Controller
                    control={control}
                    name='avatar'
                    render={({field: {onChange}}) => (<AvatarInput
                      defaultValue={user?.avatar}
                      name='avatar' onFileChange={(n, v) => onChange(v)}/>)}
                  />
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
              <Row align='center' justify='between' classes='mb-4'>
                <Col>
                  <Text classes='font-bold text-[0.875rem]'>Reset Password</Text>
                  <Text classes='text-gray-500 text-[0.875rem] w-4/5'>Enable this will automatically send the user a
                    reset password email</Text>
                </Col>
                <Controller
                  control={control}
                  name='sendResetPasswordEmail'
                  render={({field: {onChange, value}}) => (
                    <Switch value={value} onChange={onChange}/>)}
                />
              </Row>
            </Paper>
            <Paper classes='h-fit'>
              <Input label='Full Name *' name='name' register={register} errors={errors}/>
              <Grid md={2} lg={2} gapx={4}>
                <Input label='Address' name='address' register={register} errors={errors}/>
                <Input label='Phone/Mobile' name='phoneNumber' register={register} errors={errors}/>
              </Grid>
              {/*<Checkbox label=''/>*/}
              <Input label='Email *' name='email' register={register} errors={errors}/>
              <Controller
                control={control}
                name='role'
                render={({field: {onChange, value}}) => (
                  <Select
                    size='medium'
                    name='role'
                    label='Role'
                    options={handleRole(user?.role)}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Row justify='end' classes='mt-2'>
                <Link href='/admin/index'>
                  <Button light shadow type='button'>Back</Button>
                </Link>
                <Button
                  shadow type='submit'
                  // disabled={isDisableBtn}
                  isLoading={isBtnLoading}
                >
                  Save Changes
                </Button>
              </Row>
            </Paper>
          </Grid>
        </form>
      </Helmet>
    </section>
  );
}

UserEdit.layout = 'admin';
export default UserEdit;