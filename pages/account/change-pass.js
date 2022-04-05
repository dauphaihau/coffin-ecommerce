import ImgBannerCard from "../../components/Card/ImgBannerCard";
import banner from "../../public/images/contemporary-banner.png";
import Grid from "../../components/Grid";
import {Button, Link} from "../../components";
import {CogIcon, HomeIcon, LogoutIcon, ShoppingCartIcon, UsersIcon} from "@heroicons/react/outline";
import Input from "../../components/Input/Input";
import {useForm} from "react-hook-form";
import {userService} from "../../services";
import {useAuth} from "../../context/authContext";
import {useRouter} from "next/router";

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
        <div className='col-span-1'>
          <div className="overflow-y-auto py-4 px-3">
            <ul className="space-y-2">
              <li>
                <Link
                  href='/account'
                  className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                >
                  <HomeIcon
                    className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'/>
                  <span className="ml-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href='/account/order'
                  className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                >
                  <ShoppingCartIcon
                    className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'/>
                  <span className="ml-3">Order</span>
                </Link>
              </li>
              <li>
                <Link
                  href='/account/detail'
                  className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                >
                  <UsersIcon
                    className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'/>
                  <span className="flex-1 ml-3 whitespace-nowrap">Account detail</span>
                </Link>
              </li>
              <li>
                <Link
                  href='/account/change-pass'
                  className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white bg-gray-100 dark:hover:bg-gray-700'
                >
                  <CogIcon
                    className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'/>
                  <span className="flex-1 ml-3 whitespace-nowrap">Change Password</span>
                </Link>
              </li>
              <li>
                <div
                  onClick={() => {
                    localStorage.removeItem('user');
                    router.push('/');
                    setIsAuthorize(false);
                  }}
                  className="flex items-center p-2 text-base font-normal text-gray-900
                  cursor-pointer
                   rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <LogoutIcon
                    className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'/>
                  <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
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