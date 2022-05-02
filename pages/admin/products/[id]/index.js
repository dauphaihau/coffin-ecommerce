import {yupResolver} from "@hookform/resolvers/yup";
import {useForm, Controller} from "react-hook-form";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";
import * as Yup from "yup";

import {Helmet, Grid} from "@components";
import {Button} from "@components/Button";
import {Select, Checkbox, Textarea, Input} from "@components/Input"
import {productService} from "@services/products";
import {brandOpts, categoryOpts, colorOpts} from "@assets/data/options";
import {Autocomplete, ImageInput, Switch, TextEditor} from "../../../../components/Input";
import {TagOpts} from "../../../../assets/data/options";

const ProductEdit = () => {
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const router = useRouter();
  const [product, setProduct] = useState()

  useEffect(() => {
    if (!router.isReady) return;
    const loadInit = async () => {
      const {id} = router.query;
      const res = await productService.detail(id);
      setProduct(res.data)
    }
    loadInit();
  }, [router.isReady])

  const dataBreadcrumb = [
    {path: "/admin", name: "Dashboard", firstLink: true},
    {path: "/admin/products", name: "Products"},
    {path: "", name: product?.name, lastLink: true}
  ];

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
    sku: Yup.string().required('SKU is required')
      .min(11, 'description must be at least 11 characters')
      .max(12, 'the max length of 12 characters is reached'),
    // category: Yup.number().required('Price is required'),
    // brand: Yup.string().required('Price is required'),
    // description: Yup.string().required('description is required')
    //   .min(20, 'description must be at least 20 characters')
    //   .max(300, 'the max length of 300 characters is reached'),
  });

  const formOptions = {resolver: yupResolver(validationSchema)};

  if (product) {
    const {...defaultValue} = product;
    formOptions.defaultValue = defaultValue;
  }
  const {register, handleSubmit, reset, formState, setError, control} = useForm(formOptions);
  const {errors} = formState;

  useEffect(() => {
    if (product) {
      reset(product)
    }
  }, [product, reset])

  const onSubmit = async (values) => {
    const formatData = {
      ...values,
      brand: values.brand.value ?? values.brand,
      category: values.category.value ?? values.category,
      color: values.color.value ?? values.color
    }

    setIsBtnLoading(true)
    const res = await productService.update(formatData)
    setIsBtnLoading(res.isLoading)

    if (res.isSuccess) {
      router.push('/admin/products')
      toast.success('Update success!')
    } else {
      if (res.message === 'you are not authorized') {
        return toast.error(res.message)
      }
      if (errors) {
        setError('name', {
          type: "server",
          message: res.message
        });
      }
    }
  }

  const onFileChange = (files) => {
    console.log(files);
  }

  return (
    <Helmet title='Make the changes below' dataBreadcrumb={dataBreadcrumb}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid md={1} lg={2} gapx={4} classes='pb-4'>
          <div className='bg-white p-6 rounded-lg drop-shadow-md mb-6 laptop:mb-0'>
            <Grid md={1} lg={1} gapx={4}>
              <Input label='Product Name *' name='name' register={register} errors={errors}/>
              {/*<Textarea name='description' label='Description *' register={register} errors={errors}/>*/}
              <Controller
                control={control}
                name='description'
                render={({field: {onChange, onBlur, value, ref}}) => {
                  console.log('value textEditor', value)
                 return <TextEditor
                    onChange={onChange}
                    // name="description"
                    label="Description"
                    value={value}
                  />
                }}
              />
              <ImageInput onFileChange={onFileChange} classesSpace='mb-0'/>
            </Grid>
          </div>
          <div>
            <div className='bg-white p-6 rounded-lg drop-shadow-md'>
              <Grid md={1} lg={2} gapx={4}>
                <Input label='Quantity *' name='quantity' register={register} errors={errors}/>
                <Controller
                  control={control}
                  name='category'
                  render={({field: {onChange, onBlur, value, ref}}) => (
                    <Select
                      size='medium'
                      label='Category *'
                      value={value}
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
                      value={value}
                      options={brandOpts}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name='color'
                  render={({field: {onChange, onBlur, value, ref}}) => (
                    <Select
                      size='medium'
                      title='Color *'
                      value={value}
                      options={colorOpts}
                      onChange={onChange}
                    />
                  )}
                />
                <Input label='SKU *' name='sku' register={register} errors={errors} placeholder='712834657911'
                       classesSpace='mb-0'/>

                <Controller
                  control={control}
                  name='tag'
                  render={({field: {onChange, onBlur, value, ref}}) => (
                    <Autocomplete
                      value={value}
                      name='tag'
                      label='Tags'
                      onChange={onChange}
                      options={TagOpts}/>
                  )}
                />
              </Grid>
            </div>
            <div className='bg-white p-6 rounded-lg drop-shadow-md mt-6'>
              <Grid md={1} lg={2} gapx={4}>
                <Input label='Price *' name='price' register={register} errors={errors} placeholder='00.00'
                       contentLeft={<i className="fa-solid fa-dollar-sign"/>}
                />
                <Input label='Sale Price' name='salePrice' register={register} errors={errors} placeholder='00.00'
                       contentLeft={<i className="fa-solid fa-dollar-sign"/>}
                />
              </Grid>
              <Controller
                control={control}
                name='tax'
                render={({field: {onChange, value}}) => (
                  <Switch value={value} label='Price includes taxes' onChange={onChange}/>)}
              />
            </div>
          </div>
          <Button shadow type='submit' width='fit' classes='mt-4' isLoading={isBtnLoading}>Save Changes</Button>
        </Grid>
      </form>
    </Helmet>
  );
}

ProductEdit.layout = 'admin';
export default ProductEdit;