import * as Yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";

import {Helmet, Grid} from "@components";
import {Button} from "@components/Button";
import {Select, Checkbox, Textarea, Input, Switch} from "@components/Input"
import {productService} from "../../../services/products";
import {brandOpts, categoryOpts, colorOpts} from "../../../assets/data/options";
import {Autocomplete, ImageInput} from "../../../components/Input";
import {Image} from "../../../components";

const dataBreadcrumb = [
  {path: "/admin", name: "Dashboard", firstLink: true},
  {path: "/admin/products", name: "Products"},
  {path: "", name: "New product", lastLink: true}
];


const people = [
  {id: 1, name: 'Coffin'},
  {id: 2, name: 'Casket'},
  {id: 3, name: 'Death'},
  {id: 4, name: 'Die'},
  {id: 5, name: 'Willow'},
  {id: 6, name: 'Curved'},
]

const NewProduct = () => {

  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const router = useRouter();
  const [arrTags, setArrTags] = useState([people[0]])
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])


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

  const handleAutoComplete = (...e) => {
    const tempArr = [...arrTags, ...e]
    const uniqElement = [...new Set(tempArr.filter((value, index, self) => self.indexOf(value) === index))]
    setArrTags(uniqElement)
  }

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
  }

  return (
    <div className='w-full'>
      <Helmet title='Create a new product' dataBreadcrumb={dataBreadcrumb}>
        <form onSubmit={handleSubmit(onSubmit)}>

          <Grid md={1} lg={2} gapx={4}>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <Grid md={1} lg={1} gapx={4}>
                <Input label='Name *' name='name' register={register} errors={errors}/>
                <Textarea name='description' label='Description *' register={register} errors={errors}/>
                <ImageInput onSelectFile={(e) => onSelectFile(e)}/>
                <div className='my-2'>
                  {/*{selectedFile && <Image src={preview} classesSize='w-20 h-20 rounded-2xl' classes='w-20 h-20 rounded-2xl'/>}*/}
                  {console.log(preview)}
                  {selectedFile && <img src={preview} className='w-20 h-20 rounded-xl'/>}
                </div>
              </Grid>
            </div>

            <div>
              <div className='bg-white p-6 rounded-lg shadow-lg'>
                <Grid md={1} lg={2} gapx={4}>
                  <Input label='Quantity *' name='quantity' register={register} errors={errors}/>
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
                  <div>
                    <Autocomplete label='Tags' onChange={(e) => handleAutoComplete(e)} options={people}/>
                    <div className='mt-3 border rounded-lg p-2 flex flex-wrap gap-2'>
                      {
                        arrTags?.map((tag, id) => (
                          <div className='py-1 px-2 bg-[#edeff1] rounded-2xl w-fit' key={id}>
                            {tag.name}
                            <i
                              className="fa-solid fa-circle-xmark text-base text-[#b9bcc0] animate
                              hover:text-gray-500 cursor-pointer !opacity-1 ml-2 "
                              onClick={() => {
                                const filtered = arrTags.filter(e => e.id !== tag.id);
                                setArrTags(filtered);
                              }}
                            />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </Grid>
                <Grid md={1} lg={2} gapx={4}>
                </Grid>
                {/*<Checkbox label='Save this information for next time'/>*/}
              </div>

              <div className='bg-white p-6 rounded-lg shadow-lg mt-6'>
                <Grid md={1} lg={2} gapx={4}>
                  <Input label='Price *' name='price' register={register} errors={errors} placeholder='99.00'/>
                  <Input label='Sale Price' type='number' name='salePrice' register={register} errors={errors}/>
                </Grid>
                <Switch label='Price includes taxes'/>
              </div>
            </div>
            <div className="flex gap-x-4 mt-6">
              <Button type='submit' isLoading={isBtnLoading}>Create</Button>
            </div>

          </Grid>
        </form>
      </Helmet>
    </div>
  );
}

NewProduct.layout = 'admin';

export default NewProduct;