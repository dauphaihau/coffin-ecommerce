import {useState, useEffect} from 'react'
import {XCircleIcon, XIcon} from "@heroicons/react/solid";
import {useUtil} from "../../context/utilContext";
import {ContextProviderComponent, SiteContext} from "../../context/mainContext";
import {MENU} from "../../utils/menu";
import {Link} from "../index";
import {slugify} from "../../utils/helpers";
import {useRouter} from "next/router";

const CategoriesDrawer = ({context, categories}) => {

  const [active, setActive] = useState(false)

  const {
    drawerCategoriesOpen, drawerCategoriesToggle,
    closeDrawerModal
  } = useUtil();
  const router = useRouter();

  useEffect(() => {
    closeDrawerModal()
  }, [router.pathname])

  return (
    <>
      <aside className={`categories-drawer ${drawerCategoriesOpen && 'open'}`}>
        <div className="categories-drawer__container">
          <div className='categories-drawer__title'>
            <h1>Menu</h1>
            <XIcon className='btn-close' onClick={() => drawerCategoriesToggle()}/>
          </div>
          <div className="categories-drawer__links">
            {MENU.data?.map((item) => {
              if (item.subNav) {
                return (
                  <div className={`categories-drawer__dropdown`}
                       // onClick={() => setActive(!active)}
                       key={item.id}>
                    <Link href={item.link}>
                    <p className="p-[10px] text-white group">{item.title}</p>
                    </Link>
                    {/*<div className={ `categories-drawer__suvlink ${active && 'block'}`}>*/}
                    {/*  <ul>*/}
                    {/*    {*/}
                    {/*      categories.map((category, index) => (*/}
                    {/*        <li key={index}>*/}
                    {/*          <Link href={`/categories/${slugify(category)}`}>*/}
                    {/*            <p className="item-content__title  py-4 px-4">*/}
                    {/*              {category.charAt(0).toUpperCase() + category.slice(1)}*/}
                    {/*            </p>*/}
                    {/*          </Link>*/}
                    {/*        </li>*/}
                    {/*      ))*/}
                    {/*    }*/}
                    {/*  </ul>*/}
                    {/*</div>*/}
                  </div>
                )
              }
              return (
                <Link href={item.link} key={item.id} className='mr-4'>
                  <p className="transition duration-200 ease-in-out
                  text-white p-[10px] rounded-lg ">
                    {item.title}
                  </p>
                </Link>
              )
            })}
          </div>

          {/*<Button className='pb-[13px] laptop:py-4 mt-3' onClick={() => drawerToggle()}>*/}
          {/*  <Link href="/checkout">*/}
          {/*    <div className="cursor-pointer flex justify-between text-base ">*/}
          {/*      <p className="text-white text-base mr-2">Proceed to check out</p>*/}
          {/*      <p className="text-white text-base border-l pl-4">{DENOMINATION + total.toLocaleString()}</p>*/}
          {/*    </div>*/}
          {/*  </Link>*/}
          {/*</Button>*/}
        </div>
      </aside>
    </>
  )
}

function CategoriesWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {context => <CategoriesDrawer {...props} context={context}/>}
      </SiteContext.Consumer>
    </ContextProviderComponent>
  )
}

export default CategoriesWithContext
