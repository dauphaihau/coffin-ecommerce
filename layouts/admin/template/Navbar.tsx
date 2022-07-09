import {useState} from "react";
import {useRouter} from "next/router";

import {Image, Text} from '../../../core';
import {useAuth} from '../../../context/authContext';
import {Box, Row} from '../../../core/Layout';
import {ROLE_OPTIONS} from '../../../utils/enums';
import {capitalize} from '../../../utils/helpers';
import {MenuDropdown} from '../../../core/Navigation';
import ConfirmLogoutDialog from "./Dialog/ConfirmLogout";
import {MenuIcon, SearchIcon} from "@heroicons/react/solid";
import useScrollPosition from "../../../utils/hooks/useScrollPosition";
import {useDarkMode} from "usehooks-ts";
import {KBarToggleButton} from "./Kbar";
import {useKBar} from "kbar";

const NavbarAdmin = ({setMinimizeSidebar, minimizeSidebar}) => {
  const router = useRouter();
  const {user} = useAuth();
  const [showDialog, setShowDialog] = useState(false)
  const scrollPositionY = useScrollPosition();
  const {isDarkMode} = useDarkMode()
  const {query} = useKBar();

  return (
    <>
      <ConfirmLogoutDialog defaultStatus={showDialog} setShowDialog={setShowDialog}/>
      <Box nav classes={`navbar-admin
        ${scrollPositionY > 15 && 'navbar-admin--mod'}
        ${isDarkMode ? 'backdrop-blur-sm' : 'backdrop-blur-lg'}
        ${minimizeSidebar && 'navbar-admin--resizeWidth'}
      `}>
        <Row wrap='wrap' justify='between' align='center'>
          <Row classes='left-side'>
            <MenuIcon
              className='btn-icon w-10 h-10 mr-4 text-gray-600 dark:text-gray-custom-507 dark:hover:bg-gray-custom-508
              dark:hover:text-white
              '
              onClick={() => setMinimizeSidebar(!minimizeSidebar)}
            />
            <Box classes='search-form' onClick={() => query.toggle()}>
              <Row align='center' classes='search-form__icon'>
                <SearchIcon className='w-5 h-5 text-gray-500 dark:text-gray-custom-503'/>
              </Row>
              <input
                type='text' id='email-adress-icon'
                className='search-form__input'
                placeholder='Search...'
              />
            </Box>
            {/*<KBarToggleButton/>*/}
          </Row>
          <Box classes='right-side' id='mobile-menu'>
            <Box classes='profile'>
              <Box classes='profile__notification'>
                <Text i classes='fa-solid fa-message'/>
                <Text i classes='fa-solid fa-bell'/>
              </Box>

              {/*Dropdown profile ------- */}
              <MenuDropdown
                trigger={
                  <Box classes='profile__info'>
                    <Box classes='text-right mr-3 '>
                      <Text>{user?.name}</Text>
                      <Text>{user?.role ? capitalize(ROLE_OPTIONS[user.role].toLowerCase()) : '-'}</Text>
                    </Box>
                    <Image
                      normalTag
                      classes='h-10 w-10 rounded-full'
                      src={user?.avatar ?? '/images/default/avatar-default.jpeg'}
                      alt='profile'
                    />
                  </Box>
                }
                options={[
                  {
                    label: 'Profile',
                    feature: () => router.push('/admin')
                  },
                  {
                    label: 'Settings',
                    feature: () => router.push('/admin')
                  },
                  {
                    label: 'Logout',
                    feature: () => setShowDialog(true)
                  },
                ]}/>
              {/* --------- end Dropdown profile*/}
            </Box>
          </Box>
        </Row>
      </Box>
    </>
  );
}

export default NavbarAdmin;
