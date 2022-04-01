import {useState, useEffect} from 'react'
import {ContextProviderComponent, SiteContext} from '../context/mainContext'
import {ShoppingBagIcon, UserIcon} from "@heroicons/react/outline";
import Link from "next/link"
import {Button} from "./index";
import {useUtil} from "../context/utilContext";
// import { colors } from '../theme'
// const { primary } = colors

function CartLink(props) {
  const [renderClientSideComponent, setRenderClientSideComponent] = useState(false)
  const {drawerToggle, modalToggle} = useUtil();

  useEffect(() => {
    setRenderClientSideComponent(true)
  }, [])

  let {context: {numberOfItemsInCart = 0}} = props

  return (
    <div>
      <div className="sm:top-53 right-[44px] top-40 flex">
        <button onClick={() => drawerToggle()}>
          <div className="flex flex-1 justify-end relative">
            <ShoppingBagIcon width={35} height={30}/>
            {
              renderClientSideComponent && numberOfItemsInCart > Number(0) && (
                <div className='absolute inset-0 left-4  bg-black w-5 rounded-2xl h-5 text-[13px]'>
                  <span className='text-white left-[6px] absolute'>{numberOfItemsInCart}</span></div>
              )
            }
          </div>
        </button>
        <div className='ml-4 cursor-pointer'>
          <UserIcon width={35} height={30} onClick={() => modalToggle()}/>
        </div>
      </div>
    </div>
  )
}

function CartLinkWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {context => <CartLink {...props} context={context}/>}
      </SiteContext.Consumer>
    </ContextProviderComponent>
  )
}

export default CartLinkWithContext