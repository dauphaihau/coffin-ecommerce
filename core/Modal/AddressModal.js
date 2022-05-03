import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import {Grid, Text} from "../index";
import {Checkbox, Input, Select} from "../Input";
import {Button} from "../Button";
import {useUIController} from "../../context/UIControllerContext";
import {XIcon} from "@heroicons/react/solid";
import countryOpts from "../../assets/data/country.json";
import {useAuth} from "../../context/authContext";
import {Modal} from "./Modal";

const AddressModal = () => {

  const {openAddressModal, closeDrawerModal, addressModalToggle, ...state} = useUIController();

  const {user, setUser} = useAuth();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Email is invalid')
  });

  const formOptions = {resolver: yupResolver(validationSchema)};
  const {register, handleSubmit, reset, formState, setError} = useForm(formOptions);
  const {errors} = formState;

  const onSubmit = async (values) => {
    console.log('values', values)
  }

  return (
    <Modal isOpen={openAddressModal} width='ipad:max-w-[40rem]'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-6 pb-4 space-y-6 lg:px-8 pb-6 xl:pb-8"
      >
        {/*<Grid md={2} gapx={12} classes='mt-12'>*/}
        <div className=''>
          <Text h1 sx='2xl' weight='bold' classes='mb-8'>Shipping Address</Text>
          <Grid md={1} lg={2} gapx={4}>
            <Input label='Full Name *' name='name' register={register} errors={errors}/>
            <Input label='Phone/Mobile *' name='phoneNumber' register={register} errors={errors}/>
          </Grid>
          <Input label='Address *' name='address' register={register} errors={errors}/>
          <Grid md={1} lg={2} gapx={4}>
            {/*<Input label='Email ' name='email' register={register} errors={errors}/>*/}
          </Grid>
          <Grid md={1} lg={3} gapx={4}>
            <Input label='City/Town *' name='city' register={register} errors={errors}/>
            <Input label='Zip/Postcode *' name='postcode' register={register} errors={errors}/>
            <Input label='State *' name='postcode' register={register} errors={errors}/>
          </Grid>
          <Checkbox label='Use this address as default.' classesForm='mb-4'/>
          <Select size='medium' options={countryOpts} onChange={(e) => console.log(e)}/>
          {/*<Textarea*/}
          {/*  register={register} errors={errors}*/}
          {/*  label='Order Notes (Optional)'*/}
          {/*  name='note'*/}
          {/*  rows={5}*/}
          {/*  className='mb-6'*/}
          {/*  placeholder='Notes about your order, e.g. special notes for delivery'*/}
          {/*/>*/}
          <div className="flex gap-x-4">
            <Button
              classes='w-fit'
              onClick={() => {
                // localStorage.removeItem('COFFIN_ECOMMERCE');
                // setUser({...user, numberAllOfItemsInCart: 0})
              }}
            >Deliver to this Address</Button>
          </div>
        </div>
        {/*</Grid>*/}
      </form>
    </Modal>
  );
}

export default AddressModal;