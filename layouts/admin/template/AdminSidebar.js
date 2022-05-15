import {Divider, Paper, Text} from "../../../core";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {MENU} from "../../../utils/menu";
import {Row} from "../../../core/Layout";
import {isDarkMode, isNil} from "../../../utils/helpers";
import {Link} from "../../../core/Next";

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
          classes='sidebar-suvLink'
        >
          {/*<Link*/}
          {/*  href={link.href} key={idz}*/}
          {/*  className='block px-3 mt-4'*/}
          {/*>*/}
          <Row align='center'>
            <i className={`fa-solid fa-circle   
              ${handleActive(link) 
              ? 'sidebar-suvLink__icon--active'
              : 'sidebar-suvLink__icon' }
              `} />
            <Text span classes={`sidebar-suvLink__title
              ${handleActive(link) ? 'text-black dark:text-white' : 'text-gray-custom-501'} `}
            >
              {link.title}
            </Text>
          </Row>
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
      <Row justify='between' align='center' classes='w-full'>
        <Row align='center'>
          <div className='drop-shadow rounded-lg'>
            <i className={`${link.icon}  p-2 bg-gray-custom-52 rounded-lg`}/>
          </div>
          <Text span
                classes={`text-sm ml-3 text-gray-custom-501 transition-all duration-300 ease-in-out hover:text-gray-600 ${handleActive(link) && '!text-gray-600'} `}>{link.title}</Text>
        </Row>
        <i className={
          ` ${!active ? 'fa-solid fa-chevron-down' : 'fa-solid fa-angle-up'}
            text-[10px] 
            text-gray-custom-501 transition-all duration-300
            ease-in-out hover:text-gray-600 block 
         `}/>
      </Row>
      <SubMenu open={active} subLinks={link.subLinks} handleActive={handleActive}/>
    </div>
  </li>
}

const AdminSidebar = () => {
  const router = useRouter();
  // const [subLinks, setSubLinks] = useState()
  const handleActive = (link) => router.pathname === link.href

  return (
    // <aside className="hidden laptop:block w-[18%] h-full shadow-2xl rounded-2xl" aria-label="Sidebar">
    <aside className='sidebar' aria-label="Sidebar">
      <Paper noPadding classes='sidebar-inner dark:bg-gray-custom-901'>
        <Row justify='center'>
          <Link href="/">
            <img
              src={`/images/logo${isDarkMode() ? '-dark' : ''}.png`}
              alt="logo"
              className='ipad:h-[55px]'
            />
          </Link>
        </Row>
        <Divider classes='my-4 w-4/5 mx-auto'/>
        <ul className="space-y-2">
          {MENU.admin.map((link, id) => {
            if (!Array.isArray(link.subLinks)) {
              return <li className='mx-3 p-[10px]' key={id}>
                <Link scroll={false} href={link.href}>
                  <Row justify='between' align='center' classes='w-full'>
                    <Row align='center' classes='sidebar-link'>
                      <div className='sidebar-link__icon'>
                        <i className={`${link.icon} !w-8 `}/>
                      </div>
                      <Text span classes={`sidebar-link__title ${handleActive(link) && '!text-gray-600'} `}>
                        {link.title}
                      </Text>
                    </Row>
                  </Row>
                </Link>
              </li>
            }
            return (<Menu link={link} handleActive={handleActive} key={id}/>)
          })}
        </ul>
      </Paper>
    </aside>
  );
}

export default AdminSidebar;