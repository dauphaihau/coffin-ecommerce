import {AuthProvider} from "../../context/authContext";
import {HomeIcon, ShoppingCartIcon, CogIcon, UsersIcon, LogoutIcon} from "@heroicons/react/outline";
import banner from '../../public/images/contemporary-banner.png';

const MyAccount = () => {
  return (
    <AuthProvider>
      <div>
        <div
          className='flex justify-center items-center p-6 h-40 md:p-10 2xl:p-8 relative bg-no-repeat bg-center bg-cover rounded-lg'
          style={{
            backgroundImage: `url(${banner.src})`,
            width: '100%',
            height: '100%',
          }}
        >
         <span className='text-4xl text-white font-light'>
            Profile
         </span>
        </div>
        <div className='mt-12 grid grid-cols-4 gap-x-12 max-w-[68rem]'>
          <div className='col-span-1'>
            {/*<h1 className='font-bold text-2xl mb-8'>Shipping Address</h1>*/}
            <div className="overflow-y-auto h-screen py-4 px-3">
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white bg-gray-100 dark:hover:bg-gray-700">
                    <HomeIcon className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'/>
                    <span className="ml-3">Dashboard</span>
                  </a>
                </li>
                <li>
                  <a href="/account/order"
                     className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <ShoppingCartIcon className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'/>
                    <span className="ml-3">Order</span>
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/posts" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <UsersIcon className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'/>
                    <span className="flex-1 ml-3 whitespace-nowrap">Account detail</span>
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/users" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <CogIcon className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'/>
                    <span className="flex-1 ml-3 whitespace-nowrap">Change Password</span>
                  </a>
                </li>
                <li>
                  <a href="/"
                     onClick={() => {
                       localStorage.removeItem('user');
                     }}
                     className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <LogoutIcon className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'/>
                    <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='col-span-3'>
            <div className="flex flex-col w-full">
              <div className='p-4 rounded-lg'>
                <h1 className='text-3xl font-bold mb-6'>Dashboard</h1>
                <p> From your account dashboard you can view your recent orders, manage your Account Details and change
                  your password.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default MyAccount;