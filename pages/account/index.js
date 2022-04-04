import {HomeIcon, ShoppingCartIcon, CogIcon, UsersIcon, LogoutIcon} from "@heroicons/react/outline";
import banner from '../../public/images/contemporary-banner.png';
import ImgBannerCard from "../../components/Card/ImgBannerCard";
import Grid from "../../components/Grid";
import {Link} from "../../components";
import {router} from "next/client";
import {useAuth} from "../../context/authContext";

const MyAccount = () => {
  const {setIsAuthorize} = useAuth();

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
                  className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white bg-gray-100 dark:hover:bg-gray-700'
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
                  className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
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
          <div className="flex flex-col w-full">
            <div className='p-4 rounded-lg'>
              <h1 className='text-3xl font-bold mb-6'>Dashboard</h1>
              <p> From your account dashboard you can view your recent orders, manage your Account Details and change
                your password.
              </p>
            </div>
          </div>
        </div>
      </Grid>
    </div>

  );
}

export default MyAccount;