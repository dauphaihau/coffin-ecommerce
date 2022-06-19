import {Text} from '../../../core';
import {useAuth} from '../../../context/authContext';
import {Row} from '../../../core/Layout';
import {ROLE_OPTIONS} from '../../../utils/enums';
import {capitalize} from '../../../utils/helpers';
import {MenuDropdown} from '../../../core/Navigation';
import {useRouter} from "next/router";
import ConfirmLogoutDialog from "./Dialog/ConfirmLogout";
import {useState} from "react";

const Navbar = () => {
  const router = useRouter();
  const {user} = useAuth();
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <ConfirmLogoutDialog defaultStatus={showDialog} setShowDialog={setShowDialog}/>
      <header
        className='fixed border-gray-200 laptop:w-[73.8%] desktop:w-4/5 monitor:w-[86.5%] z-30 bg-transparent pb-4'>
        {/*<nav className='border-gray-200 bg-transparent dark:border-gray-700 py-4'>*/}
        <Row wrap='wrap' justify='between' align='center'>
          <Row>
            {/*<MenuIcon className='btn-icon w-10 h-10 mr-4 text-gray-600' onClick={() => {}}/>*/}
            <div className='hidden relative mr-3 md:mr-0 md:block'>
              <Row align='center' classes='absolute inset-y-0 left-0 pl-3 pointer-events-none'>
                <svg className='w-5 h-5 text-gray-500
              dark:text-gray-custom-503
              ' fill='currentColor' viewBox='0 0 20 20'
                     xmlns='http://www.w3.org/2000/svg'>
                  <path fillRule='evenodd'
                        d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                        clipRule='evenodd'/>
                </svg>
              </Row>
              <input type='text' id='email-adress-icon'
                     className='block p-2 pl-10 w-full text-gray-900
                    rounded-lg border border-gray-300 sm:text-sm
                   focus:ring-black focus:border-black
                   dark:bg-black dark:border-gray-custom-502 dark:placeholder-gray-custom-503
                   dark:text-white dark:focus:ring-black dark:focus:border-black'
                     placeholder='Search...'/>
            </div>
          </Row>
          <div className='hidden w-full md:block md:w-auto' id='mobile-menu'>
            <div className='navbar-admin'>
              <div className='navbar-admin__notification'>
                <i className='fa-solid fa-message'/>
                <i className='fa-solid fa-bell'/>
              </div>

              {/*Dropdown profile*/}
              <MenuDropdown
                trigger={
                  <div className='navbar-admin__info'>
                    <div className='text-right mr-3 '>
                      <Text>{user?.name}</Text>
                      <Text>{user?.role ? capitalize(ROLE_OPTIONS[user.role].toLowerCase()) : '-'}</Text>
                    </div>
                    <img
                      className='h-10 w-10 rounded-full'
                      src={user?.avatar}
                      alt='profile'
                    />
                  </div>
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
              {/*end Dropdown profile*/}
            </div>
          </div>
        </Row>
      </header>
    </>
  );
}

export default Navbar;
