import {useState, useEffect} from 'react'
import {useUIController} from "../../../../context/UIControllerContext";
import {MENU} from "../../../../utils/menu";
import {Link} from "../../../../core";
import {slugify} from "../../../../utils/helpers";
import {useRouter} from "next/router";
import fetchCategories from "../../../../utils/provider/categoryProvider";
import Drawer from "../../../../core/Navigation/Drawer";

const SubNav = ({links, title}) => {

  const [active, setActive] = useState(false)
  if (!links) return null;

  return (
    <>
      <div
        className={`drawer__dropdown`}
        onClick={() => setActive(!active)}
      >
        <p className="p-[10px] text-white group">{title}</p>
        <button className='text-white text-xl px-[0.7rem]'>
          {active ? '-' : '+'}
        </button>
      </div>
      <div className={`drawer__suvlink  ${active && 'block'}`}>
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
  const {closeDrawerModal, openNavDrawer} = useUIController();

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
      <Drawer
        theme='black' isOpen={openNavDrawer}
        classes='
        w-4/5 ipad:w-[300px] left-0 translate-x-[-100%]
        laptop:hidden
        '>
        <Drawer.Title title='Menu'/>
        <Drawer.Content>
          <div className="drawer__links">
            {
              MENU.navbar?.map((item) => {
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
        </Drawer.Content>
      </Drawer>
    </>
  )
}

export default NavDrawer
