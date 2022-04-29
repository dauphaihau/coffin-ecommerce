import {useEffect, useState} from "react";
import {MENU} from "../../../utils/menu";
import {slugify} from "../../../utils/helpers";
import NavControl from "./NavControl";
import {Link} from "../../../components";
import {MenuIcon} from "@heroicons/react/solid";
import {useUIController} from "../../../context/UIControllerContext";

const Navbar = ({categories}) => {
  const [shadowHeader, setShadowHeader] = useState(false)
  const {dispatch} = useUIController();

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 15) {
        setShadowHeader(true)
      } else {
        setShadowHeader(false)
      }
    }
    window.addEventListener('scroll', scrollListener)
    return () => {
      window.removeEventListener("scroll", scrollListener)
    }
  }, [])

  return (
    <nav className={`navbar ${shadowHeader && 'shadow-2xl'}`}>
      <div className="navbar__container">
        <div className='navbar-left'>
          <MenuIcon
            className='cursor-pointer w-[30px] h-[30px] laptop:hidden'
            onClick={() => dispatch({type: 'OPEN_NAV_DRAWER'})}
          />
          <Link href="/pages" className="navbar-left__logo hidden laptop:block">
            <img
              src="/images/logo.png"
              alt="logo"
              className='w-full ipad:h-[50px]'
            />
          </Link>
          <div className="navbar-left__links">
            <div className="navbar-links">
              {MENU.navbar?.map((item) => {
                if (item.subNav) {
                  return (
                    <div className='navbar-links__item group' key={item.id}>
                      <Link href={item.link}>
                        <p className="item-title">{item.title}</p>
                      </Link>
                      <div className='item-content group-hover:block '>
                        <ul>
                          {
                            categories.map((category, index) => (
                              <li key={index}>
                                <Link href={`/categories/${slugify(category)}`}>
                                  <p className="item-content__title
                                        hover:text-gray-500 py-4 px-4
                                        ">
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                  </p>
                                </Link>
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    </div>
                  )
                }
                return (
                  <Link href={item.link} key={item.id} className='mr-4'>
                    <p className="transition duration-200 ease-in-out p-[10px] hover:bg-gray-200 rounded-lg ">
                      {item.title}
                    </p>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
        <NavControl/>
      </div>
    </nav>
  );
}

export default Navbar;