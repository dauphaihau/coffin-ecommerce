import banner from "../../public/images/banners/contemporary-banner.png";
import Grid from "../../components/Grid";
import {useForm} from "react-hook-form";
import {useAuth} from "../../context/authContext";
import {useRouter} from "next/router";
import SidebarProfile from "../../components/SidebarProfile";
import {ImgBannerCard} from "../../components/Card";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";

const ChangePass = () => {

  const {user, setIsAuthorize} = useAuth();
  const router = useRouter();
  console.log('user', user)

  const {register, handleSubmit, reset, formState, setError} = useForm({
    defaultValues: {
      id: user.id,
      type: 'updatePassword'
    }
  });
  const {errors} = formState;

  const onSubmit = (values) => {
    console.log('values', values)
    const {id, body, type} = values

    // return userService.update(id, body, type)
    //   .then(() => {
    //     // setUser({...user, ...res})
    //     // setIsAuthorize(true)
    //     // modalToggle();
    //     alert('success')
    //   })
    //   .catch((err) => {
    //     alert('error')
    //       // if (errors) {
    //       //   setError('password', {
    //       //     type: "server",
    //       //     message: err,
    //       //   });
    //       // }
    //     }
    //   )
  }

  return (
    <div>
      <ImgBannerCard srcImg={banner} title='Profile'/>
      <Grid md={2} lg={6} gapx={12} css='mt-12'>
        <SidebarProfile active='change-pass'/>
        <div className='laptop:col-span-3'>
          <div className='p-4 rounded-lg'>
            <h1 className='text-3xl font-bold mb-6'>Change Password</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              // className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
              className="xl:pb-8 space-y-6 laptop:w-1/2"
            >
              <Input name='password' type='password' label='Old Password' register={register} errors={errors}/>
              <Input name='newPassword' type='password' label='New Password' register={register} errors={errors}/>
              <Button type="submit" className='w-full'>Change</Button>
            </form>
          </div>
        </div>
      </Grid>
    </div>
  );
}

export default ChangePass;