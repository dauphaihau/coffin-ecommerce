import {Link} from "../index";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {MENU} from "../../utils/menu";

const SubMenu = ({open, suvLinks}) => {

  const router = useRouter();
  if (!suvLinks) return null;

  const handleActive = (currentPath, linkActive) => {
    if (currentPath === linkActive) return true
  }

  return (
    <ul className={`${open ? '' : 'hidden'} `}>
      {suvLinks?.map((link, idz) => (
        <Link
          href={link.href} key={idz}
          className='block px-3 mt-4'
        >
          <button className={`suvlink-sidebar ${handleActive(router.pathname, link.href) && 'is-selected'} `}>
            <span
              className={`text-sm text-[#7e8a88] transition-all duration-300 ease-in-out hover:text-gray-600 
              ${handleActive(router.pathname, link.href) && '!text-black'} `}>
              {link.title}
            </span>
          </button>
        </Link>
      ))}
    </ul>
  );
}

const AdminSidebar = () => {

  const router = useRouter();
  const [active, setActive] = useState(false)
  const [suvLinks, setSuvLinks] = useState()

  useEffect(() => {
    suvLinks?.map((item) => {
      if ([item.href, item.href+ "/[id]"].includes(router.pathname)) setActive(true);
    })
  }, [router.asPath])

  const handleActive = (link) => router.pathname === link.href && '!text-gray-600';

  return (
    <aside className="w-[15%] h-full shadow-2xl rounded-2xl" aria-label="Sidebar">
      <div className="overflow-y-auto h-full py-4 px-3 bg-white rounded-2xl dark:bg-black">
        <div className='flex justify-center'>
          <Link href="/">
            <img
              src="/images/logo.png"
              alt="logo"
              className='w-[60px] ipad:h-[60px]'
            />
          </Link>
        </div>
        <div className={`border-b border-gray-100 my-4 w-4/5 mx-auto`}/>
        <ul className="space-y-2">
          {MENU.admin.map((link, id) => {
            if (!Array.isArray(link.subLinks)) {
              return <li className='mx-3 p-[10px]' key={id}>
                <Link scroll={false} href={link.href}>
                  <div className='flex justify-between w-full items-center'>
                    <div className='flex items-center'>
                      <div className='drop-shadow rounded-lg'>
                        <i className={`${link.icon}  p-2 bg-[#e9ecef] rounded-lg`}/>
                      </div>
                      <span
                        className={`text-sm ml-3 text-[#7e8a88] transition-all duration-300 ease-in-out hover:text-gray-600 ${handleActive(link)} `}>{link.title}</span>
                    </div>
                  </div>
                </Link>
              </li>
            }
            return (
              <li className='mx-3 p-[10px]' key={id}>
                <div
                  className='cursor-pointer'
                  onClick={() => setActive(!active)}
                >
                  <div className='flex justify-between w-full items-center'>
                    <div className='flex items-center'>
                      <div className='drop-shadow rounded-lg'>
                        <i className={`${link.icon}  p-2 bg-[#e9ecef] rounded-lg`}/>
                      </div>
                      <span
                        className={`text-sm ml-3 text-[#7e8a88] transition-all duration-300 ease-in-out hover:text-gray-600 ${handleActive(link)} `}>{link.title}</span>
                    </div>
                    <i className={` ${!active ? 'fa-solid fa-chevron-down' : 'fa-solid fa-angle-up'}
                      text-[10px] 
                      text-[#7e8a88] transition-all duration-300
                      ease-in-out hover:text-gray-600 block `}/>
                  </div>
                  <div onClick={() => setSuvLinks(link.subLinks)}>
                    <SubMenu open={active} suvLinks={link.subLinks}/>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  );
}

export default AdminSidebar;