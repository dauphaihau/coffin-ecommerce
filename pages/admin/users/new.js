import Helmet from "../../../layout/AdminLayout/Content";
import {Button, Input} from "../../../components";
import Grid from "../../../components/Grid";
import Checkbox from "../../../components/Input/Checkbox";
import Textarea from "../../../components/Input/Textarea";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import Select from "../../../components/Input/Select";
import {useState} from "react";
import {userService} from "../../../services/users";
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";

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
  {path: "", name: "New User", lastLink: true}
];

const NewUser = () => {

  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
  });

  const formOptions = {resolver: yupResolver(validationSchema)};
  const {register, handleSubmit, reset, formState, setError} = useForm(formOptions);
  const {errors} = formState;

  const onSubmit = async (values) => {
    console.log('values', values)

    setIsBtnLoading(true)
    const res = await userService.create(values)
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
    <div className='w-1/2'>
      <Helmet title='Create a new user' dataBreadcrumb={dataBreadcrumb}>
        <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-6 rounded-lg shadow-lg'>
          <Input label='Full Name *' name='name' register={register} errors={errors}/>
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
          <Select
            size='medium'
            title='Select Role'
            options={options}
            onChange={(e) => console.log(e)}
          />
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