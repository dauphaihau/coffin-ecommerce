import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm, Controller} from "react-hook-form";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Helmet from "../../../../layout/AdminLayout/Content";
import {Input, } from "../../../../components/Input";
import Grid from "../../../../components/Grid";
import {Button} from "../../../../components";
import {userService} from "../../../../services/users";
import SelectFormEdit from "../../../../components/Input/SelectFormEdit";

const options = [
  {
    value: 'staff',
    label: 'Staff',
  },
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'customer',
    label: 'Customer',
  },
]

const dataBreadcrumb = [
  {path: "/admin", name: "Dashboard", firstLink: true},
  {path: "/admin/users", name: "Users"},
  {path: "", name: "John", lastLink: true}
];

const UserEdit = () => {

  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState()

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
    // return () => {};
  }, [router.isReady])


  const loadInit = async () => {
    console.log('router-query', router.query)
    const {id} = router.query;
    const res = await userService.detail(id);
    console.log('res', res)
    setUser(res.data)


    // const school = await schoolService.detail(id);
    // if (!school.status || _.isEmpty(school.data)) {
    //   swal('Truờng này không tồn tại', '', 'error')
    //     .then(Router.push('/to-chuc/truong'))
    // }
    // setSchool(school.data);
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
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
    console.log('values', values)

    setIsBtnLoading(true)
    const res = await userService.update(values, id)
    // setIsBtnLoading(res.isLoading)

    if (res.isSuccess) {
      router.push('/admin/users')
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
    <div className='flex justify-between items-center'>
      <Helmet title='Edit user' dataBreadcrumb={dataBreadcrumb}>
        <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-6 rounded-lg shadow-lg'>
          <Input label='Full Name *' name='name' register={register} errors={errors}/>
          {/*<Grid md={1} lg={2} gapx={4}>*/}
          {/*  <Input label='Last Name *' name='lastName' register={register} errors={errors}/>*/}
          {/*</Grid>*/}
          <Grid md={1} lg={2} gapx={4}>
            <Input label='Address' name='address' register={register} errors={errors}/>
            <Input label='Phone/Mobile' name='phoneNumber' register={register} errors={errors}/>
          </Grid>
          <Grid md={1} lg={2} gapx={4}>
            <Input label='Email *' name='email' register={register} errors={errors}/>
            <Input label='Password' type='password' name='password' register={register} errors={errors}/>
            {/*<Input label='Repeat Password' name='repeatPassword' register={register} errors={errors}/>*/}
          </Grid>
          {/*<Checkbox label='Save this information for next time'/>*/}

          <Controller
            control={control}
            name='role'
            render={({field: {onChange, onBlur, value, ref}}) => (
              // <Select
              //   onChange={onChange}
              //   name='coffin'
              //   theme={(theme) => ({
              //     ...theme,
              //     borderRadius: 0,
              //     colors: {
              //       ...theme.colors,
              //       text: 'orangered',
              //       primary25: 'neutral90',
              //       primary: 'black',
              //     },
              //   })}
              //   value={value}
              //   options={coffinOpts}
              //   className='mb-4'
              // />
              //
              <SelectFormEdit
              size='medium'
              name='role'
              title='Select Role'
              options={options}
              value={value}
              onChange={onChange}
              />
            )}
          />
          <div className="flex gap-x-4 mt-6">
            <Button type='submit' isLoading={isBtnLoading}>Create User</Button>
          </div>
        </form>
      </Helmet>
    </div>
  );
}

UserEdit.layout = 'admin';

export default UserEdit;