import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";
import * as Yup from "yup";

import {useAuth} from "../../../context/authContext";
import {AvatarInput, Input, Select, Switch} from "../../../core/Input";
import {Col, Grid, Row} from "../../../core/Layout";
import {Link, Paper, Text} from "../../../core";
import {Button} from "../../../core/Button";
import {userService} from "../../../services/users";
import {Helmet} from "../../../layouts/admin/common/Helmet";
import {ROLE_OPTIONS} from "../../../utils/enums";
import {capitalize} from "../../../utils/helpers";
import {otherService} from "../../../services/other";

const dataBreadcrumb = [
  {path: "/admin", name: "Dashboard", firstLink: true},
  {path: "/admin/users", name: "Users"},
  {path: "", name: "New User", lastLink: true}
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
});

const formOptions = {
  resolver: yupResolver(validationSchema),
  defaultValues: {
    role: ROLE_OPTIONS.STAFF
  }
};

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

const NewUser = () => {
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const {user} = useAuth();
  const router = useRouter();
  const {register, handleSubmit, control, formState: {errors}, setError} = useForm(formOptions);

  const onSubmit = async (values) => {
    setIsBtnLoading(true)
    let formatData = values;
    if (formatData.avatar) {
      const body = new FormData();
      body.append("file", formatData.avatar);
      const {data} = await otherService.uploadFile(body)
      formatData = {...formatData, avatar: data}
    }
    formatData = {...formatData, role: values.role.value ?? values.role}
    const {isLoading, isSuccess, message} = await userService.create(formatData)

    setIsBtnLoading(isLoading)
    if (isSuccess) {
      router.push('/admin/users')
      toast.success('Create success!')
    } else {
      if (errors) {
        setError('email', {
          type: "server",
          message
        });
      }
    }
  }

  return (
    <Helmet title='Create a new user' classes='w-2/3' dataBreadcrumb={dataBreadcrumb}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid md={2} lg={2} gapx={4} classes='w-[57rem] laptop:max-w-[80rem]'>
          <Paper classes='h-fit'>
            <Controller
              control={control}
              name='avatar'
              render={({field: {onChange}}) => (<AvatarInput name='avatar' onFileChange={(n, v) => onChange(v)}/>)}
            />
            <Row align='center' justify='between' classes='mt-8'>
              <Col>
                <Text classes='font-bold text-[0.875rem]'>Set Password</Text>
                <Text classes='text-gray-500 text-[0.875rem] w-4/5'>Disabling this will automatically send the user a
                  set password email</Text>
              </Col>
              <Controller
                control={control}
                name='sendSetPasswordEmail'
                render={({field: {onChange}}) => (<Switch onChange={onChange}/>)}
              />
            </Row>
          </Paper>
          <Paper classes='h-fit'>
            <Input label='Full Name *' name='name' register={register} errors={errors}/>
            <Grid md={2} lg={2} gapx={4}>
              <Input label='Address' name='address' register={register} errors={errors}/>
              <Input label='Phone/Mobile' name='phoneNumber' register={register} errors={errors}/>
            </Grid>
            <Input label='Email *' name='email' register={register} errors={errors}/>
            <Controller
              control={control}
              name='role'
              render={({field: {onChange, value}}) => (
                <Select
                  label='Role'
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
              <Button type='submit' width='fit' isLoading={isBtnLoading}>Create</Button>
            </Row>
          </Paper>
        </Grid>
      </form>
    </Helmet>
  );
}

NewUser.layout = 'admin';
export default NewUser;