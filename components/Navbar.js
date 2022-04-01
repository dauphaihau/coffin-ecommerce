import Link from "next/link";
import Image from "next/image";
import {slugify} from "../utils/helpers";
import {UserIcon} from "@heroicons/react/outline";
import CartLink from "./CartLink";
import {useEffect, useState} from "react";

const navigation = [
  {name: 'Home', href: '/trang-ca-nhan'},
  {name: 'News', href: '/'},
  {
    name: 'About us', href: '/dang-nhap', logout: () => {
    }
  },
]

const Navbar = ({categories}) => {

  const [shadowHeader, setShadowHeader] = useState(false)

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
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
    <nav>
      <div
        className={`z-40 h-[96px] px-6 bg-white ${shadowHeader ? 'shadow-2xl' : ''} fixed w-full `}
      >
        <div className="mobile:px-12 sm:flex-row
        {/*sm:pt-12 */}
        sm:pb-6
        desktop:px-0 px-4
        {/*pt-8*/}
         flex flex-col items-center justify-between">
          <div className="sm:mr-16 max-w-48 sm:max-w-none">
            <Link href="/">
              <a aria-label="Home">
                <img src="/images/logo.png" alt="logo" width="100" height="100"
                     className='relative top-[-1px]'
                />
                {/*COFFIN SHOP*/}
              </a>
            </Link>
          </div>
          <div className="flex flex-wrap mt-1 ml-[-22rem]">
            <Link href="/">
              <a aria-label="Home" className='mr-4'>
                <p className="
                       p-[10px] hover:bg-gray-200 transition duration-200 ease-in-out rounded-xl
                  sm:mr-8 sm:mb-0 mb-4 text-left text-smaller">
                  Home
                </p>
              </a>
            </Link>
            {
              categories.map((category, index) => (
                <Link
                  href={`/category/${slugify(category)}`}
                  key={index}
                >
                  <a aria-label={category}>
                    <p className="
                       p-[10px] hover:bg-gray-200 transition duration-200 ease-in-out rounded-md
                       sm:mr-8 sm:mb-0 mb-4 text-left text-smaller mr-4">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </p>
                  </a>
                </Link>
              ))
            }
            <Link href="/categories">
              <a aria-label="All categories">
                <p className="
                       p-[10px] hover:bg-gray-200 transition duration-200 ease-in-out rounded-xl
                   sm:mr-8 sm:mb-0 mb-4 text-left text-smaller mr-4">
                  All
                </p>
              </a>
            </Link>
          </div>
          <CartLink/>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;