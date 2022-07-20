import {useState} from "react";
import {useRouter} from "next/router";

import {Image, Text} from '../../../core';
import {useAuth} from '../../../context/authContext';
import {Box, Row} from '../../../core/Layout';
import {ROLE_OPTIONS} from '../../../utils/enums';
import {capitalize} from '../../../utils/helpers';
import {MenuDropdown} from '../../../core/Navigation';
import ConfirmLogoutDialog from "./Dialog/ConfirmLogout";
import {MenuIcon} from "@heroicons/react/solid";
import useScrollPosition from "../../../utils/hooks/useScrollPosition";
import {useDarkMode} from "usehooks-ts";
import {KBarToggleButton} from "./Kbar";

const NavbarAdmin = ({setMinimizeSidebar, minimizeSidebar}) => {
  const router = useRouter();
  const {user} = useAuth();
  const [showDialog, setShowDialog] = useState(false)
  const scrollPositionY = useScrollPosition();
  const {isDarkMode} = useDarkMode()

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
              className='btn-icon collapse-sidebar'
              onClick={() => setMinimizeSidebar(!minimizeSidebar)}
            />
            <KBarToggleButton/>
          </Row>
          <Box classes='right-side'>
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
