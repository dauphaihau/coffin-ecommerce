import {Divider, Image, Paper, Text} from '../../../core';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {MENU} from '../../../utils/menu';
import {Box, List, Row} from '../../../core/Layout';
import {isDarkMode, isNil} from '../../../utils/helpers';
import {Transition} from '@headlessui/react'
import {Link} from '../../../core/Next';
import {useDarkMode} from "usehooks-ts";

const SubMenu = ({open, subLinks, handleActive}) => {
  // const router = useRouter();
  // subLinks.map((item) => {
  //   if ([item.link].includes(router.pathname)) open = true;
  //   // if ([item.link, item.link + '/[id]'].includes(router.pathname)) open = true;
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

const Menu = ({link, handleActive, minimizeSidebar, isHovered}) => {

  const router = useRouter();
  const [active, setActive] = useState(false)

  useEffect(() => {
    link.subLinks?.map((item) => {
      if ([item.href, item.href + '/[id]'].includes(router.pathname)) setActive(true);
    })
  }, [router.asPath])

  if (!link) return null;

  return (
    <List.Item classes='item'>
      <Box classes='cursor-pointer' onClick={() => setActive(!active)}>
        <Row justify='between' align='center' classes='w-full'>
          <Row align='center'>
            <Box classes='drop-shadow rounded-lg'>
              <Text i classes={`${link.icon} dark:text-black p-2 bg-gray-custom-52 rounded-lg`}/>
            </Box>

            {
              !minimizeSidebar &&
              <Text
                span classes={
                `text-sm ml-3 text-gray-custom-501 transition-all duration-300 ease-in-out hover:text-gray-600
               ${handleActive(link) && 'dark:text-white'} 
                     `}
              >{link.title}</Text>
            }
            {
              minimizeSidebar && isHovered &&
              <Text
                span classes={
                `text-sm ml-3 text-gray-custom-501 transition-all duration-300 ease-in-out hover:text-gray-600
               ${handleActive(link) && '!text-gray-600'} 
                     `}
              >{link.title}</Text>
            }
          </Row>

          {!minimizeSidebar &&
            <Text i classes={
              ` ${!active ? 'fa-solid fa-chevron-down' : 'fa-solid fa-angle-up'}
            text-[10px] 
            text-gray-custom-501 transition-all duration-300
            ease-in-out hover:text-gray-600 block 
         `}/>}
          {minimizeSidebar && isHovered &&
            <Text i classes={
              ` ${!active ? 'fa-solid fa-chevron-down' : 'fa-solid fa-angle-up'}
            text-[10px] 
            text-gray-custom-501 transition-all duration-300
            ease-in-out hover:text-gray-600 block 
         `}/>}
        </Row>
        {!minimizeSidebar && <SubMenu open={active} subLinks={link.subLinks} handleActive={handleActive}/>}
        {minimizeSidebar && isHovered && <SubMenu open={active} subLinks={link.subLinks} handleActive={handleActive}/>}
      </Box>
    </List.Item>
  )
}

const AdminSidebar = ({minimizeSidebar, isHovered, hoverRef}) => {
  const router = useRouter();
  // const [subLinks, setSubLinks] = useState()
  const handleActive = (link) => router.pathname === link.href
  const {isDarkMode} = useDarkMode()

  return (
    <Box
      aside ref={hoverRef} aria-label='Sidebar'
      classes={`sidebar animate ${minimizeSidebar && 'w-[6.5rem]'} 
      ${minimizeSidebar && isHovered && 'w-[16rem]'} `}
    >
      {/*<Box aside classes={`sidebar ${minimizeSidebar && 'w-[6.5rem]'} `} aria-label='Sidebar'>*/}
      {/*<div ref={hoverRef}>{isHovered ? 'hovered' : 'nope️'}</div>*/}
      <Paper noPadding classes='sidebar-inner dark:bg-gray-custom-901 rounded-2xl'>
        <Row justify='center' classes='header'>
          <Link href='/'>
            <Image normalTag
              // src='/images/logo.png'
              src={isDarkMode ? '/images/logo-dark.png': '/images/logo.png'}
              // src={`/images/logo${isDarkMode ? '-dark' : ''}.png`}
              alt='logo'
              classes={`ipad:h-[55px] ${minimizeSidebar && 'ipad:h-[40px]'} ${isHovered ? '!ipad:h-[55px]' : ''} `}
            />
          </Link>
        </Row>
        <Divider classes='my-4 w-4/5 mx-auto'/>
        <List classes='body'>
          {MENU.admin.map((link, id) => {
            if (!Array.isArray(link.subLinks)) {
              return <List.Item classes='item' key={id}>
                <Link scroll={false} href={link.href}>
                  <Row justify='between' align='center' classes='w-full'>
                    <Row align='center' classes='infoItem'>
                      <Box classes='infoItem__icon'>
                        <Text i classes={`${link.icon} !w-8 `}/>
                      </Box>
                      {
                        !minimizeSidebar && (
                          <Text span classes={`infoItem__title ${handleActive(link) && '!text-gray-600'} `}>
                            {link.title}
                          </Text>
                        )
                      }
                      {
                        minimizeSidebar && isHovered && (
                          <Text span classes={`infoItem__title ${handleActive(link) && '!text-gray-600'} `}>
                            {link.title}
                          </Text>
                        )
                      }
                    </Row>
                  </Row>
                </Link>
              </List.Item>
            }
            return (
              <Menu minimizeSidebar={minimizeSidebar} isHovered={isHovered} link={link} handleActive={handleActive}
                    key={id}/>)
          })}
        </List>
      </Paper>
    </Box>
  );
}

export default AdminSidebar;