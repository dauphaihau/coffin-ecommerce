import {Link} from "../index";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {MENU} from "@utils/menu";

const SubMenu = ({open, subLinks, handleActive}) => {
  // const router = useRouter();
  // subLinks.map((item) => {
  //   if ([item.link].includes(router.pathname)) open = true;
  //   // if ([item.link, item.link + "/[id]"].includes(router.pathname)) open = true;
  // })
  if (!subLinks) return null;

  return (
    <ul className={`${open ? '' : 'hidden'}`}>
      {subLinks?.map((link, idz) => (
        <Link
          href={link.href} key={idz}
          className='block px-3 mt-4'
        >
          <button className={`suvlink-sidebar ${handleActive(link) && 'is-selected'} `}>
            <span className={`text-sm text-[#7e8a88] transition-all duration-300 ease-in-out hover:text-gray-600 
              ${handleActive(link) && '!text-black'} `}>
              {link.title}
            </span>
          </button>
        </Link>
      ))}
    </ul>
  );
}

const Menu = ({link, handleActive}) => {

  const router = useRouter();
  const [active, setActive] = useState(false)

  useEffect(() => {
    link.subLinks?.map((item) => {
      if ([item.href, item.href + "/[id]"].includes(router.pathname)) setActive(true);
    })
  }, [router.asPath])

  if (!link) return null;


  return <li className='mx-3 p-[10px]'>
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
            className={`text-sm ml-3 text-[#7e8a88] transition-all duration-300 ease-in-out hover:text-gray-600 ${handleActive(link) && '!text-gray-600'} `}>{link.title}</span>
        </div>
        <i className={
          ` ${!active ? 'fa-solid fa-chevron-down' : 'fa-solid fa-angle-up'}
            text-[10px] 
            text-[#7e8a88] transition-all duration-300
            ease-in-out hover:text-gray-600 block 
         `}/>
      </div>
      <SubMenu open={active} subLinks={link.subLinks} handleActive={handleActive}/>
    </div>
  </li>
}

const AdminSidebar = () => {
  const router = useRouter();
  // const [subLinks, setSubLinks] = useState()
  const handleActive = (link) => router.pathname === link.href

  return (
    <aside className="hidden laptop:block w-[15%] h-full shadow-2xl rounded-2xl" aria-label="Sidebar">
      <div className="overflow-y-auto h-full py-4 px-3 bg-white rounded-2xl dark:bg-black">
        <div className='flex justify-center'>
          <Link href="/">
            <img
              src="/images/logo.png"
              alt="logo"
              className='ipad:h-[55px]'
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
                        className={`text-sm ml-3 text-[#7e8a88] transition-all duration-300 ease-in-out hover:text-gray-600 ${handleActive(link) && '!text-gray-600'} `}>{link.title}</span>
                    </div>
                  </div>
                </Link>
              </li>
            }
            return (<Menu link={link} handleActive={handleActive} key={id}/>)
          })}
        </ul>
      </div>
    </aside>
  );
}

export default AdminSidebar;