import {Divider, Paper, Text} from "../../../core";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {MENU} from "../../../utils/menu";
import {Box, List, Row} from "../../../core/Layout";
import {isDarkMode, isNil, slugify} from "../../../utils/helpers";
import {Transition} from '@headlessui/react'
import {Link} from "../../../core/Next";
import useHover from "../../../utils/hooks/useHover";
import Portal from "../../../core/Portal";

const SubMenu = ({open, subLinks, handleActive}) => {
  // const router = useRouter();
  // subLinks.map((item) => {
  //   if ([item.link].includes(router.pathname)) open = true;
  //   // if ([item.link, item.link + "/[id]"].includes(router.pathname)) open = true;
  // })
  if (!subLinks) return null;

  return (
    <List classes={`${open ? '' : 'hidden'}`}>
      {subLinks?.map((link, idx) => (
        <List.Item key={idx}>
          <Link
            href={link.href}
            classes='sidebar-suvLink'
          >
            {/*<Link*/}
            {/*  href={link.href} key={idz}*/}
            {/*  className='block px-3 mt-4'*/}
            {/*>*/}
            <Row align='center'>
              <Text i classes={`fa-solid fa-circle   
              ${handleActive(link)
                ? 'sidebar-suvLink__icon--active'
                : 'sidebar-suvLink__icon'}
              `}/>
              <Text span classes={`sidebar-suvLink__title
              ${handleActive(link) ? 'text-black dark:text-white' : 'text-gray-custom-501'} `}
              >
                {link.title}
              </Text>
            </Row>
          </Link>
        </List.Item>
      ))}
    </List>
  );
}

const Menu = ({link, handleActive, minimizeSidebar}) => {
  const router = useRouter();
  const [active, setActive] = useState(false)

  useEffect(() => {
    link.subLinks?.map((item) => {
      if ([item.href, item.href + "/[id]"].includes(router.pathname)) setActive(true);
    })
  }, [router.asPath])

  if (!link) return null;
  return (
    <List.Item classes='mx-3 p-[10px]'>
      <Box classes='cursor-pointer' onClick={() => setActive(!active)}>
        <Row justify='between' align='center' classes='w-full'>
          <Row align='center'>
            <Box classes='drop-shadow rounded-lg'>
              <Text i classes={`${link.icon}  p-2 bg-gray-custom-52 rounded-lg`}/>
            </Box>

            {
              !minimizeSidebar &&
              <Text span
                    classes={`text-sm ml-3 text-gray-custom-501 transition-all duration-300 ease-in-out hover:text-gray-600 ${handleActive(link) && '!text-gray-600'} `}>{link.title}</Text>
            }
          </Row>

          {!minimizeSidebar &&
            <Text i classes={
              ` ${!active ? 'fa-solid fa-chevron-down' : 'fa-solid fa-angle-up'}
            text-[10px] 
            text-gray-custom-501 transition-all duration-300
            ease-in-out hover:text-gray-600 block 
         `}/>}
        </Row>
        {!minimizeSidebar && <SubMenu open={active} subLinks={link.subLinks} handleActive={handleActive}/>}
      </Box>
    </List.Item>
  )
}

const AdminSidebar = ({minimizeSidebar, isHovered, hoverRef}) => {
  const router = useRouter();
  // const [subLinks, setSubLinks] = useState()
  const handleActive = (link) => router.pathname === link.href

  return (
    <Box
      aside ref={hoverRef} aria-label="Sidebar"
      classes={`sidebar animate ${minimizeSidebar && 'w-[6.5rem]'}`}
    >
      {/*<Box aside classes={`sidebar ${minimizeSidebar && 'w-[6.5rem]'} `} aria-label="Sidebar">*/}
      {/*<div ref={hoverRef}>{isHovered ? "hovered" : "nope️"}</div>*/}
      <Paper noPadding classes='sidebar-inner dark:bg-gray-custom-901 rounded-2xl'>
        <Row justify='center'>
          <Link href="/">
            <img
              src='/images/logo.png'
              // src={`/images/logo${isDarkMode() ? '-dark' : ''}.png`}
              alt="logo"
              className={`ipad:h-[55px] ${minimizeSidebar && 'ipad:h-[40px]'}`}
            />
          </Link>
        </Row>
        <Divider classes='my-4 w-4/5 mx-auto'/>
        <List classes="space-y-2">
          {MENU.admin.map((link, id) => {
            if (!Array.isArray(link.subLinks)) {
              return (
                <List.Item classes='mx-3 p-[10px] w-[10rem] group' key={id}>
                  <Link scroll={false} href={link.href}>
                    <Row justify='between' align='center' classes='w-full'>
                      <Row align='center' classes='sidebar-link '>
                        <Box classes='sidebar-link__icon'>
                          <Text i classes={`${link.icon} !w-8 `}/>
                        </Box>
                        {/*<Box classes='absolute left-[104%] top-[8%]'>a</Box>*/}

                        {
                          !minimizeSidebar && (
                            <Text span classes={`sidebar-link__title ${handleActive(link) && '!text-gray-600'} `}>
                              {link.title}
                            </Text>
                          )
                        }
                        <List
                          classes={` hidden absolute bg-white w-48 shadow-2xl
                           rounded-lg p-4 z-[999]
                            ${minimizeSidebar && 'group group-hover:block'}
                             left-[45%] top-[8%] ml-12 `}>
                          {/*{link?.map((li, idx) => (*/}
                          <List.Item classes='relative'>
                            <Link classes='sidebar-suvLink' href='/'>
                              <Row align='center'>
                                <Text span classes={`sidebar-suvLink__titl`}>ABC 1</Text>
                              </Row>
                            </Link>

                            {/* sub link level 2*/}
                            <List
                              classes={`hidden absolute bg-white w-48 shadow-2xl rounded-lg p-4 z-[999]
                             left-0 top-0 ml-12 `}>
                              {/*{link?.map((li, idx) => (*/}
                              <List.Item>
                                <Link classes='sidebar-suvLink' href='/'>
                                  <Row align='center'>
                                    <Text span classes={`sidebar-suvLink__titl`}>
                                      ABC 3
                                    </Text>
                                  </Row>
                                </Link>

                              </List.Item>
                              <List.Item>
                                <Link classes='sidebar-suvLink' href='/'>
                                  <Row align='center'>
                                    {/*<Text i classes={`fa-solid fa-circle ${handleActive(li)*/}
                                    {/*  ? 'sidebar-suvLink__icon--active'*/}
                                    {/*  : 'sidebar-suvLink__icon'} `}/>*/}
                                    <Text span classes={`sidebar-suvLink__titl`}
                                    >
                                      ABC 4
                                    </Text>
                                  </Row>
                                </Link>
                              </List.Item>
                              {/*))}*/}
                            </List>
                          </List.Item>
                          <List.Item>
                            <Link classes='sidebar-suvLink' href='/'>
                              <Row align='center'>
                                {/*<Text i classes={`fa-solid fa-circle ${handleActive(li)*/}
                                {/*  ? 'sidebar-suvLink__icon--active'*/}
                                {/*  : 'sidebar-suvLink__icon'} `}/>*/}
                                <Text span classes={`sidebar-suvLink__titl`}
                                >
                                  ABC 2
                                </Text>
                              </Row>
                            </Link>
                          </List.Item>
                          {/*))}*/}
                        </List>
                      </Row>
                    </Row>
                  </Link>
                </List.Item>
              )
            }
            return (<Menu minimizeSidebar={minimizeSidebar} link={link} handleActive={handleActive} key={id}/>)
          })}
        </List>
      </Paper>
    </Box>
  );
}

export default AdminSidebar;