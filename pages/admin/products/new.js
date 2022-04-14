import * as Yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";

import Helmet from "@components/Helmet";
import {Button, Input} from "@components";
import Grid from "@components/Grid";
import {Select, Checkbox, Textarea} from "@components/Input"
import {productService} from "../../../services/products";

const brandOpts = [
  {
    value: 'aurora',
    label: 'Aurora',
  },
  {
    value: 'batesville',
    label: 'Batesville',
  },
  {
    value: 'astral',
    label: 'Astral',
  },
]

const categoryOpts = [
  {
    value: 'natural material coffin',
    label: 'Natural material coffin',
  },
  {
    value: 'american caskets',
    label: 'American caskets',
  },
  {
    value: 'traditional',
    label: 'Traditional',
  },
]

const dataBreadcrumb = [
  {path: "/admin", name: "Dashboard", firstLink: true},
  {path: "/admin/users", name: "Users"},
  {path: "", name: "New User", lastLink: true}
];

const NewProduct = () => {

  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    // name: Yup.string().required('Name is required'),
    // password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    // email: Yup.string().email('Email is invalid').required('Email is required'),
  });

  const formOptions = {resolver: yupResolver(validationSchema)};
  const {register, handleSubmit, control, formState, setError} = useForm(formOptions);
  const {errors} = formState;

  const onSubmit = async (values) => {
    console.log('values', values)
    const formatData = {
      ...values,
      brand: values.brand.value,
      category: values.category.value
    }
    console.log('format-form', formatData)

    setIsBtnLoading(true)
    const res = await productService.create(formatData)
    setIsBtnLoading(res.isLoading)

    if (res.isSuccess) {
      router.push('/admin/products')
      toast.success('Create success!')
    } else {
      if (errors) {
        setError('name', {
          type: "server",
          message: res.message
        });
      }
    }
  }

  return (
    <div className='w-1/2'>
      <Helmet title='Create a product' dataBreadcrumb={dataBreadcrumb}>
        <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-6 rounded-lg shadow-lg'>
          <Grid md={1} lg={2} gapx={4}>
            <Input label='Name *' name='name' register={register} errors={errors}/>
            <Input label='stock' name='stock' register={register} errors={errors}/>
          </Grid>
          <Grid md={1} lg={2} gapx={4} css='mb-4'>
            <Controller
              control={control}
              name='category'
              render={({field: {onChange, onBlur, value, ref}}) => (
                <Select
                  size='medium'
                  // name='category'
                  title='Category'
                  options={categoryOpts}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name='brand'
              render={({field: {onChange, onBlur, value, ref}}) => (
                <Select
                  size='medium'
                  title='Brand'
                  // name='brand'
                  options={brandOpts}
                  onChange={onChange}
                />
              )}
            />
          </Grid>
          <Grid md={1} lg={2} gapx={4}>
            <Input label='Price' name='price' register={register} errors={errors}/>
            <Input label='Sale Price' name='salePrice' register={register} errors={errors}/>
          </Grid>
          {/*<Checkbox label='Save this information for next time'/>*/}
          <Textarea name='description' label='Description' register={register} errors={errors}/>
          {/*<input*/}
          {/*type='file'*/}
          {/*className='file:bg-gradient-to-b*/}
          {/*file:from-gray-500 file:to-gray-600*/}
          {/*file:px-6 file:py-3 file:m-5*/}
          {/*file:border-none file:rounded-full*/}
          {/*file:text-white file:cursor-pointer*/}
          {/*file:shadow-lg file:shadow-gray-600/50*/}
          {/*bg-gradient-to-br from-gray-200 to-gray-500*/}
          {/*text-white/80 rounded-full cursor-pointer*/}
          {/*shadow-xl shadow-gray-700/50*/}
          {/*'*/}
          {/*/>*/}
          <div className="flex gap-x-4 mt-6">
            <Button type='submit' isLoading={isBtnLoading}>Create</Button>
          </div>
        </form>
      </Helmet>
    </div>
  );
}

NewProduct.layout = 'admin';

export default NewProduct;