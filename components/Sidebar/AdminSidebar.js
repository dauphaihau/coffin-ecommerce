import {Link} from "../index";
import {CogIcon, HomeIcon, IdentificationIcon, LogoutIcon, ShoppingCartIcon} from "@heroicons/react/outline";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

const AdminSidebar = () => {

  const router = useRouter();
  const [active, setActive] = useState()

  // console.log('router-pathname', router.pathname)
  const paths = [`${router.pathname.slice(7)}/`]
  const links = ['users', 'admin']
  // console.log('paths', paths)
  // console.log('active', active)


  console.log('paths', paths)
  useEffect(() => {
    links.map(l => {
      // console.log('active', active)
      console.log('link', l)
      if (paths.includes(l)) {
        return setActive(l)
      }
    })
  }, [router.asPath])

  let css = 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg'
  return (
    <aside className="w-[15%] h-full shadow-2xl rounded-lg" aria-label="Sidebar">
      <div className="overflow-y-auto h-full py-4 px-3
              {/*bg-gray-50*/} bg-white rounded-lg
               dark:bg-black">

        <div className='flex justify-center'>
          <Link href="/">
            <img
              src="/images/logo.png"
              alt="logo"
              className='w-[60px] ipad:h-[60px]'
            />
          </Link>
        </div>
        <div className={`border-b border-gray-100 my-4 w-4/5 mx-auto`}></div>
        <ul className="space-y-2">
          <li>
            <Link
              scroll={false}
              href='/admin'
              className={`${css} ${active === '/admin' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
            >
              <HomeIcon
                className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'/>
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              scroll={false}
              href='/admin/products'
              className={`${css} ${active === 'order' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
            >
              <ShoppingCartIcon
                className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'/>
              <span className="ml-3">Products</span>
            </Link>
          </li>
          <li>
            <Link
              scroll={false}
              href='/admin/users'
              className={`${css} ${active === 'users' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
            >
              <IdentificationIcon
                className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'/>
              <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
            </Link>
          </li>
          <li>
            <Link
              scroll={false}
              href='/admin/post'
              className={`${css} ${active === 'change-pass' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
            >
              <CogIcon
                className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'/>
              <span className="flex-1 ml-3 whitespace-nowrap">Posts</span>
            </Link>
          </li>
          {/*<li>*/}
          {/*  <div*/}
          {/*    onClick={() => logout()}*/}
          {/*    className="flex items-center p-2 text-base font-normal text-gray-900*/}
          {/*        cursor-pointer*/}
          {/*         rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"*/}
          {/*  >*/}
          {/*    <LogoutIcon*/}
          {/*      className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'/>*/}
          {/*    <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>*/}
          {/*  </div>*/}
          {/*</li>*/}
        </ul>

      </div>

    </aside>
  );
}

export default AdminSidebar;