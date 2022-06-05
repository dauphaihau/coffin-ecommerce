import {useRouter} from "next/router";
import {destroyCookie} from "nookies";

import {Link} from "../../../../core";
import {CogIcon, HomeIcon, IdentificationIcon, LogoutIcon, ShoppingCartIcon} from "@heroicons/react/outline";
import {useAuth} from "../../../../context/authContext";
import {hashMD5} from "../../../../utils/helpers";
import config from "../../../../config.json";

const ProfileSidebar = ({active}) => {

  const {setIsAuthorize, setUser, user} = useAuth();
  const router = useRouter();

  let css = 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg'

  const logout = () => {
    destroyCookie(null, hashMD5(config.cookies.auth), {
      path: "/",
      expires: new Date(0),
    });
    destroyCookie(null, hashMD5(config.cookies.profile), {
      path: "/",
      expires: new Date(0),
    });
    setUser({numberAllOfItemsInCart: user.numberAllOfItemsInCart})
    router.push('/');
    setIsAuthorize(false);
  }

  return (
    <div className="overflow-y-auto py-4 px-3">
      <ul className="space-y-2">
        <li>
          <Link
            scroll={false}
            href='/account'
            className={`${css} ${active === 'dashboard' ? 'bg-gray-custom-50' : 'hover:bg-gray-custom-hover'}`}
          >
            <HomeIcon
              className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'/>
            <span className="ml-3">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            scroll={false}
            href='/account/order'
            className={`${css} ${active === 'order' ? 'bg-gray-custom-50' : 'hover:bg-gray-custom-hover'}`}
          >
            <ShoppingCartIcon
              className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'/>
            <span className="ml-3">Order</span>
          </Link>
        </li>
        <li>
          <Link
            scroll={false}
            href='/account/info'
            className={`${css} ${active === 'info' ? 'bg-gray-custom-50' : 'hover:bg-gray-custom-hover'}`}
          >
            <IdentificationIcon
              className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'/>
            <span className="flex-1 ml-3 whitespace-nowrap">Account detail</span>
          </Link>
        </li>
        <li>
          <Link
            scroll={false}
            href='/account/change-pass'
            className={`${css} ${active === 'change-pass' ? 'bg-gray-custom-50' : 'hover:bg-gray-custom-hover'}`}
          >
            <CogIcon
              className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'/>
            <span className="flex-1 ml-3 whitespace-nowrap">Change Password</span>
          </Link>
        </li>
        <li>
          <div
            onClick={() => logout()}
            className="flex items-center p-2 text-base font-normal text-gray-900
                  cursor-pointer
                   rounded-lg dark:text-white hover:bg-gray-custom-hover"
          >
            <LogoutIcon
              className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'/>
            <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
          </div>
        </li>
      </ul>

    </div>
  );
}

export default ProfileSidebar;