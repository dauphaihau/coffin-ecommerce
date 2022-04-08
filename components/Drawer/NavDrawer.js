import {useState, useEffect} from 'react'
import {XIcon} from "@heroicons/react/solid";
import {useUtil} from "../../context/utilContext";
import {MENU} from "../../utils/menu";
import {Link} from "../index";
import {slugify} from "../../utils/helpers";
import {useRouter} from "next/router";
import fetchCategories from "../../utils/provider/categoryProvider";

const SubNav = ({links, title}) => {

  const [active, setActive] = useState(false)
  if (!links) return null;

  return (
    <>
      <div
        className={`menu-drawer__dropdown`}
        onClick={() => setActive(!active)}
      >
        <p className="p-[10px] text-white group">{title}</p>
        <button className='text-white text-xl'>
          {active ? '-' : '+'}
        </button>
      </div>
      <div className={`menu-drawer__suvlink  ${active && 'block'}`}>
        <ul>
          {
            links.map((link, index) => (
              <li key={index}>
                <Link href={`/categories/${slugify(link)}`}>
                  <p>{link.charAt(0).toUpperCase() + link.slice(1)}</p></Link>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

const NavDrawer = () => {

  const router = useRouter();
  const [categories, setCategories] = useState([])

  const {
    drawerNavToggle,
    closeDrawerModal, drawerNavOpen
  } = useUtil();

  useEffect(() => {
    const initLoad = async () => {
      const categories = await fetchCategories()
      setCategories(categories)
    }
    initLoad()
  }, [])

  useEffect(() => {
    closeDrawerModal()
  }, [router.asPath])

  return (
    <>
      <aside className={`menu-drawer ${drawerNavOpen && 'open'}`}>
        <div className="menu-drawer__container">
          <div className='menu-drawer__title'>
            <h1>Menu</h1>
            <XIcon className='btn-icon' onClick={() => drawerNavToggle()}/>
          </div>
          <div className='border-b'></div>
          <div className="menu-drawer__links">
            {
              MENU.data?.map((item) => {
                if (item.subNav) {
                  return (<SubNav key={item.id} title={item.title} links={categories}/>)
                }
                return (
                  <Link href={item.link} key={item.id} className='mr-4'>
                    <p className="transition duration-200 ease-in-out text-white p-[10px] rounded-lg ">
                      {item.title}
                    </p>
                  </Link>
                )
              })
            }
          </div>
        </div>
      </aside>
    </>
  )
}

export default NavDrawer
