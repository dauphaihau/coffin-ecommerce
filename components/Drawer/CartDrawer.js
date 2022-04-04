import Link from 'next/link'
import {useState, useEffect} from 'react'
import {XCircleIcon, XIcon} from "@heroicons/react/solid";

import {useUtil} from "../../context/utilContext";
import {ContextProviderComponent, SiteContext} from "../../context/mainContext";
import QuantityPicker from "../Button/QuantityPicker";
import {DENOMINATION} from "../../utils/settings";
import {slugify} from "../../utils/helpers";
import Button from "../Button/Button";
import {useAuth} from "../../context/authContext";

const CartDrawer = ({context}) => {

  const [renderClientSideComponent, setRenderClientSideComponent] = useState(false)
  const {drawerOpen, drawerToggle,} = useUtil();
  const {user, setUser} = useAuth();

  useEffect(() => {
    setRenderClientSideComponent(true)
  }, [])

  const {
    numberOfItemsInCart,
    numberAllOfItemsInCart,
    cart, removeFromCart, total, setItemQuantity
  } = context

  useEffect(() => {
    setUser({...user, numberAllOfItemsInCart})
  }, [numberAllOfItemsInCart])

  const cartEmpty = numberOfItemsInCart === Number(0)

  function increment(item) {
    item.quantity = item.quantity + 1
    setItemQuantity(item)
  }

  function decrement(item) {
    if (item.quantity === 1) return removeFromCart(item);
    item.quantity = item.quantity - 1
    setItemQuantity(item)
  }

  if (!renderClientSideComponent) return null

  return (
    <>
      <aside className={`drawer ${drawerOpen && 'open'}`}>
        <div className="flex flex-col w-full py-4 px-5 laptop:px-8 laptop:p-8">
          <div className='flex justify-between items-center border-b'>
            <h1 className="text-2xl font-black py-4 ">Shopping cart</h1>
            <XIcon
              width={30} height={30}
              className='text-black cursor-pointer
                 bg-transparent hover:bg-gray-200 hover:text-gray-900
                  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center
                  dark:hover:bg-gray-800 dark:hover:text-white
                  '
              onClick={() => drawerToggle()}
            />
          </div>
          {
            cartEmpty
              ? (<div className='h-[540px] laptop:h-[780px]'>
                  <img src="/images/empty.png" className='h-auto' alt="empty"/>
                </div>)
              : (
                <div className="flex flex-col h-[540px] laptop:h-[780px] overflow-x-hidden">
                  <div>
                    {
                      cart.map((item) => {
                        return (
                          <div className="border-t py-10" key={item.id}>
                            <div className="flex">
                              <div className='relative group bg-light rounded-lg p-1 cursor-pointer '
                                   onClick={() => removeFromCart(item)}
                              >
                                <img className="h-28 m-0" width={440} src={item.image} alt={item.name}/>
                                <div className='
                                   transform duration-200 ease-in-out
                                   absolute group-hover:block hidden
                                   inset-0
                                   w-full h-full
                                   hover:bg-black
                                   opacity-20 rounded-lg
                              '>
                                  <XCircleIcon className='h-20 w-10 text-white !opacity-1 absolute z-10 right-[33%] top-[16%]'/>
                                </div>
                              </div>
                              <div className='ml-4 w-[65%]'>
                                <Link href={`/product/${slugify(item.name)}`}>
                                  <a aria-label={item.name}>
                                    <p className="m-0 text-gray-600 w-80 text-smaller">
                                      {item.name}
                                    </p>
                                  </a>
                                </Link>
                                <p className='text-gray-500 py-2 text-smaller'>
                                  Unit price: {DENOMINATION + item.price}
                                </p>
                                <div className='flex justify-between'>
                                  <QuantityPicker
                                    theme='black'
                                    numberOfItems={item.quantity}
                                    increment={() => increment(item)}
                                    decrement={() => decrement(item)}
                                  />
                                  <p className="m-0 pt-3 text-gray-900 tracking-wider">
                                    {DENOMINATION + item.price * item.quantity}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
          }
          <Button className='mt-3'>
            <Link href="/checkout">
              <a aria-label="Check out" className='block' onClick={() => drawerToggle()}>
                <div className="cursor-pointer flex justify-between text-base ">
                  <p className="text-white text-base mr-2">Proceed to check out</p>
                  <p className="text-white text-base border-l pl-4">{DENOMINATION + total}</p>
                </div>
              </a>
            </Link>
          </Button>
        </div>
      </aside>
    </>
  )
}

function CartWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {context => <CartDrawer {...props} context={context}/>}
      </SiteContext.Consumer>
    </ContextProviderComponent>
  )
}

export default CartWithContext