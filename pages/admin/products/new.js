import * as Yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";

import {Helmet, Grid} from "@components";
import {Button} from "@components/Button";
import {Select, Checkbox, Textarea, Input} from "@components/Input"
import {productService} from "../../../services/products";
import {brandOpts, categoryOpts, colorOpts} from "../../../assets/data/options";

const dataBreadcrumb = [
  {path: "/admin", name: "Dashboard", firstLink: true},
  {path: "/admin/products", name: "Products"},
  {path: "", name: "New product", lastLink: true}
];

const NewProduct = () => {

  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required')
      .min(6, 'Name product must be at least 6 characters')
      .max(40, 'the max length of 40 characters is reached'),
    price: Yup.number()
      .typeError('price must be a number')
      .positive('price must be greater than zero')
      .required('price is required'),
    // salePrice: Yup.number()
    //   .typeError('sale price must be a number')
    //   .positive('sale price must be greater than zero'),
    quantity: Yup.number()
      .required('quantity is required')
      .typeError('quantity must be a number'),
    // .positive('quantity must be greater than zero'),
    sku: Yup.string().required('SKU is required')
      .min(11, 'description must be at least 11 characters')
      .max(12, 'the max length of 12 characters is reached'),
    // category: Yup.number().required('Price is required'),
    // brand: Yup.string().required('Price is required'),
    description: Yup.string().required('description is required')
      .min(20, 'description must be at least 20 characters')
      .max(300, 'the max length of 300 characters is reached'),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      category: categoryOpts[0],
      color: colorOpts[0],
      brand: brandOpts[0],
    }
  };

  const {register, handleSubmit, control, formState, setError} = useForm(formOptions);
  const {errors} = formState;

  const onSubmit = async (values) => {
    const formatData = {
      ...values,
      brand: values.brand.value,
      category: values.category.value,
      color: values.color.value
    }

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
      <Helmet title='Create a new product' dataBreadcrumb={dataBreadcrumb}>
        <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-6 rounded-lg shadow-lg'>
          <Grid md={1} lg={2} gapx={4}>
            <Input label='Name *' name='name' register={register} errors={errors}/>
            <Input label='Quantity *' name='quantity' register={register} errors={errors}/>
          </Grid>
          <Grid md={1} lg={2} gapx={4}>
            <Controller
              control={control}
              name='category'
              render={({field: {onChange, onBlur, value, ref}}) => (
                <Select
                  size='medium'
                  title='Category *'
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
                  title='Brand *'
                  options={brandOpts}
                  onChange={onChange}
                />
              )}
            />
          </Grid>
          <Grid md={1} lg={2} gapx={4}>
            <Controller
              control={control}
              name='color'
              render={({field: {onChange, onBlur, value, ref}}) => (
                <Select
                  size='medium'
                  title='Color *'
                  options={colorOpts}
                  onChange={onChange}
                />
              )}
            />
            <Input label='SKU *' name='sku' register={register} errors={errors} placeholder='712834657911'/>
          </Grid>
          <Grid md={1} lg={2} gapx={4}>
            <Input label='Price *' name='price' register={register} errors={errors} placeholder='99.00'/>
            <Input label='Sale Price' type='number' name='salePrice' register={register} errors={errors}/>
          </Grid>
          {/*<Checkbox label='Save this information for next time'/>*/}
          <Textarea name='description' label='Description *' register={register} errors={errors}/>
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