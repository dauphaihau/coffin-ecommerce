import {useEffect, useState} from "react";
import Link from "next/link";
import {MENU} from "../../constants/menu";
import {slugify} from "../../utils/helpers";
import NavControl from "../NavControl";

const Navbar = ({categories}) => {

  const [shadowHeader, setShadowHeader] = useState(false)

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
          <div className="navbar-left__logo">
            <Link href="/">
              <a aria-label="Home">
                <img
                  src="/images/logo.png"
                  alt="logo" width="100" height="100"
                  className='relative left-[-31px] top-[-17px] ipad:left-0 laptop:top-[-1px]'
                />
              </a>
            </Link>
          </div>
          <div className="navbar-left__links">
            <div className="navbar-links">
              {MENU.data?.map((item) => {
                if (item.subNav) {
                  return (
                    <Link href={item.link} key={item.id}>
                      <div className='navbar-links__item group'>
                        <p className="item-title">{item.title}</p>
                        <div className='item-content group-hover:block'>
                          <ul>
                            {
                              categories.map((category, index) => (
                                <li>
                                  <Link
                                    href={`/category/${slugify(category)}`}
                                    key={index}
                                  >
                                    <a aria-label={category}>
                                      <p className="item-content__title
                                        hover:text-gray-500 py-4 px-4
                                        ">
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                      </p>
                                    </a>
                                  </Link>
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </Link>
                  )
                }
                return (
                  <Link href={item.link} key={item.id}>
                    <a aria-label={item.title} className='mr-4'>
                      <p className="transition duration-200 ease-in-out p-[10px] hover:bg-gray-200 rounded-lg ">
                        {item.title}
                      </p>
                    </a>
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