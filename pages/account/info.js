import {useForm} from "react-hook-form";

import ImgBannerCard from "../../components/Card/ImgBannerCard";
import banner from "../../public/images/contemporary-banner.png";
import Grid from "../../components/Grid";
import {Button} from "../../components";
import Input from "../../components/Input/Input";
import {useAuth} from "../../context/authContext";
import SidebarProfile from "../../components/SidebarProfile";

const Info = () => {

  const {user} = useAuth();

  const {register, handleSubmit, reset, formState, setError} = useForm({
    defaultValues: {
      id: user.id,
    }
  });
  const {errors} = formState;

  const onSubmit = (values) => {
    console.log('values', values)
  }

  return (
    <div>
      <ImgBannerCard srcImg={banner} title='Profile'/>
      <Grid md={2} lg={6} gapx={12} css='mt-12'>
        <SidebarProfile active='info'/>
        <div className='laptop:col-span-3'>
          <div className='p-4 rounded-lg'>
            <h1 className='text-3xl font-bold mb-6'>Account Details</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid md={2} gapx={4}>
                <Input label='First Name *' name='firstName' register={register} errors={errors}/>
                <Input label='Last Name *' name='lastName' register={register} errors={errors}/>
              </Grid>
              <Input label='Address *' name='address' register={register} errors={errors}/>
              <Grid md={2} gapx={4}>
                <Input label='Phone/Mobile *' name='phoneNumber' register={register} errors={errors}/>
                <Input label='Email *' name='email' register={register} errors={errors}/>
              </Grid>
              <Grid md={2} gapx={4}>
                <Input label='City/Town *' name='city' register={register} errors={errors}/>
                <Input label='Postcode *' name='postcode' register={register} errors={errors}/>
              </Grid>
              <Button type="submit" className='ipad:w-1/3'>Update</Button>
            </form>
          </div>
        </div>
      </Grid>
    </div>
  );
}

export default Info;