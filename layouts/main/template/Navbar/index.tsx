import {MENU} from '../../../../utils/menu';
import {slugify} from '../../../../utils/helpers';
import CustomerNav from './CustomerNav';
import {Image, Text} from '../../../../core';
import {MenuIcon} from '@heroicons/react/solid';
import {useUIController} from '../../../../context/UIControllerContext';
import {Link} from '../../../../core/Next';
import {Box, List, Row} from '../../../../core/Layout';
import useScrollPosition from "../../../../utils/hooks/useScrollPosition";

const NavbarHomepage = ({categories}) => {
  const {dispatch} = useUIController();
  const scrollPosition = useScrollPosition();

  return (
    <Box nav classes={`navbar-homepage ${scrollPosition > 15 && 'navbar-homepage--mod'}`}>
      <Box classes='navbar-inner'>
        <Row align='center' classes='navbar-inner__leftSide'>
          <MenuIcon
            className='menu-mobile'
            onClick={() => dispatch({type: 'OPEN_NAV_DRAWER'})}
          />
          <Link href='/' classes='logo'>
            <Image
              normalTag src='/images/logo.png' alt='logo'
              classes='w-full ipad:h-[50px]'
            />
          </Link>
          <Box classes='links'>
            <Row classes='mt-1'>
              {MENU.navbar?.map((item) => {
                if (item.subNav) {
                  return (
                    <Box classes='item-subNav group' key={item.id}>
                      <Link href={item.link}>
                        <Text noDarkMode classes='item-subNav__title'>{item.title}</Text>
                      </Link>
                      <Box classes='item-subNav__content group-hover:block '>
                        <List>
                          {
                            categories.map((category, index) => (
                              <List.Item key={index}>
                                <Link href={`/categories/${slugify(category)}`}>
                                  <Text noDarkMode classes='title hover:text-gray-500 py-4 px-4'>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                  </Text>
                                </Link>
                              </List.Item>
                            ))
                          }
                        </List>
                      </Box>
                    </Box>
                  )
                }
                return (
                  <Link href={item.link} key={item.id} classes='item-single'>
                    <Text noDarkMode classes='item-single__title'>
                      {item.title}
                    </Text>
                  </Link>
                )
              })}
            </Row>
          </Box>
        </Row>
        <CustomerNav/>
      </Box>
    </Box>
  );
}

export default NavbarHomepage;