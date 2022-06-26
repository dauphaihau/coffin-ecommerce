import * as Yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {useEffect, useRef, useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";

// @ts-ignore
import {Button} from "@core/Button";
import {
  Select, Checkbox, Textarea, Input, Switch, Autocomplete, ImageInput,
  TextEditor
} from "../../../core/Input"
import {productService} from "../../../services/products";
import {
  productBrandOptions,
  productCategoriesOptions,
  productColorOptions,
  productTagsOptions,
} from "../../../assets/data/options";
import {Helmet} from "../../../layouts/admin/common/Helmet";
import {Col, Grid, Row} from "../../../core/Layout";
import {Paper} from "../../../core";
import {Link} from "../../../core/Next";

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
    // description: Yup.string().required('description is required')
    //   .min(20, 'description must be at least 20 characters')
    //   .max(300, 'the max length of 300 characters is reached'),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      category: productCategoriesOptions[0],
      color: productColorOptions[0],
      brand: productBrandOptions[0],
    }
  };

  const {register, handleSubmit, control, formState, setError} = useForm(formOptions);
  const {errors} = formState;

  const onSubmit = async (values) => {
    const formatData = {
      ...values,
      brand: values.brand.value,
      category: values.category.value,
      color: values.color.value,
      // tag: values.tag.map(tag => tag.id)
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

  const onFileChange = (files) => {
    console.log(files);
  }

  return (
    <Helmet title='Create a new product' dataBreadcrumb={dataBreadcrumb}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid md={2} lg={2} gapx={4} classes='pb-4 desktop:max-w-[75%]'>
          <Paper classes='mb-6 laptop:mb-0'>
            <Grid md={1} lg={1} gapx={4}>
              <Input label='Product Name *' name='name' register={register} errors={errors} clearable/>
              <Textarea name='description' label='Description *' register={register} errors={errors}/>
              {/*<Controller*/}
              {/*  control={control}*/}
              {/*  name='description'*/}
              {/*  render={({field: {onChange, onBlur, value, ref}}) => (*/}
              {/*    <TextEditor*/}
              {/*      onChange={onChange}*/}
              {/*      name="description"*/}
              {/*      label="Description"*/}
              {/*      tip="Describe the issue in as much detail as you'd like."*/}
              {/*    />*/}
              {/*  )}*/}
              {/*/>*/}
              <ImageInput onFileChange={onFileChange} classesSpace='mb-0'/>
            </Grid>
          </Paper>
          <Col>
            <Paper classes='mb-4'>
              <Grid md={2} lg={2} gapx={4}>
                <Input label='Quantity *' name='quantity' register={register} errors={errors}/>
                <Controller
                  control={control}
                  name='category'
                  render={({field: {onChange, onBlur, value, ref}}) => (
                    <Select
                      size='medium'
                      label='Category *'
                      options={productCategoriesOptions}
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
                      label='Brand *'
                      options={productBrandOptions}
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
                      label='Color *'
                      options={productColorOptions}
                      onChange={onChange}
                    />
                  )}
                />
                <Input
                  label='SKU *' name='sku'
                  register={register} errors={errors} placeholder='712834657911'
                  classesSpace='mb-0'
                />
                <Controller
                  control={control}
                  name='tag'
                  render={({field: {onChange, onBlur, value, ref}}) => (
                    <Autocomplete
                      label='Tags'
                      onChange={onChange}
                      // @ts-ignore
                      options={productTagsOptions}/>
                  )}
                />
              </Grid>
              {/*<Grid md={1} lg={2} gapx={4}>*/}
              {/*</Grid>*/}
              {/*<Checkbox label='Save this information for next time'/>*/}
            </Paper>
            <Paper>
              <Grid md={1} lg={2} gapx={4}>
                <Input
                  label='Price *' name='price'
                  register={register} errors={errors}
                  placeholder='11.00'
                  contentLeft={<i className="fa-solid fa-dollar-sign"/>}
                />
                <Input
                  label='Sale Price' name='salePrice'
                  register={register} errors={errors}
                  placeholder='10.00'
                  contentLeft={<i className="fa-solid fa-dollar-sign"/>}
                />
              </Grid>
              <Controller
                control={control}
                name='tax'
                render={({field: {onChange}}) => (<Switch label='Price includes taxes' onChange={onChange}/>)}
              />
            </Paper>
          </Col>
          <Row classes='mt-4'>
            <Link href='/admin/users'>
              <Button light shadow type='button'>Back</Button>
            </Link>
            <Button shadow type='submit' width='fit' isLoading={isBtnLoading}>Create</Button>
          </Row>
        </Grid>
      </form>
    </Helmet>
  );
}

NewProduct.layout = 'admin';
export default NewProduct;