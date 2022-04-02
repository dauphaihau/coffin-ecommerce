import Link from 'next/link'
import {useState, useEffect} from 'react'
import {XCircleIcon, XIcon} from "@heroicons/react/solid";

import {useUtil} from "../../context/utilContext";
import {ContextProviderComponent, SiteContext} from "../../context/mainContext";
import QuantityPicker from "../QuantityPicker";
import {DENOMINATION} from "../../utils/settings";
import {slugify} from "../../utils/helpers";
import Button from "../Button";

const CartDrawer = ({context}) => {

  const [renderClientSideComponent, setRenderClientSideComponent] = useState(false)
  const {drawerOpen, drawerToggle, user, setUser} = useUtil();

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
    if (item.quantity === 1) return
    item.quantity = item.quantity - 1
    setItemQuantity(item)
  }

  if (!renderClientSideComponent) return null

  return (
    <>
      <aside className={`drawer ${drawerOpen && 'open'}`}>
        <div className="flex flex-col w-full p-8">
          <div className='flex justify-between items-center'>
            <h1 className="text-2xl font-black py-4 border-b">Shopping cart</h1>
            <XIcon width={30} height={30}
                className='text-black
                 bg-transparent hover:bg-gray-200 hover:text-gray-900
                  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center
                  dark:hover:bg-gray-800 dark:hover:text-white'
                   onClick={() => drawerToggle()}
            />
          </div>
          {
            cartEmpty
              ? (
                <div className='h-[780px]'>
                  <img src="/images/empty.png" h alt=""/>
                </div>
              )
              : (
                <div className="flex flex-col h-[780px] overflow-x-hidden">
                  <div>
                    {
                      cart.map((item) => {
                        return (
                          <div className="border-t py-10" key={item.id}>
                            <div className="flex">
                              <div className='
                              cursor-pointer
                                         relative bg-light rounded-lg p-1
                              '

                                   onClick={() => removeFromCart(item)}
                              >
                                <img className="h-28 m-0" width={440} src={item.image} alt={item.name}/>
                                <div className='
                                    absolute
                                   top-0 left-0 z-10
                                   w-full h-full
                                   hover:bg-gradient-to-t from-black

                                   rounded-lg
                              '>
                                  <XCircleIcon className='hidden hover:block h-20 w-2' width={50}/>
                                </div>
                              </div>


                              {/*<Link href={`/product/${slugify(item.name)}`}>*/}
                              {/*  <a aria-label={item.name} className='bg-light rounded-lg p-1*/}


                              {/*           relative*/}
                              {/*     before:absolute before:top-0 before:left-0 before:z-10*/}
                              {/*     before:w-full before:h-full*/}
                              {/*     hover:before:bg-gradient-to-t from-black*/}
                              {/*     before:rounded-2xl*/}
                              {/*    '*/}

                              {/*     onClick={() => removeFromCart(item)}*/}
                              {/*  >*/}
                              {/*    <img className="h-28 m-0" width={440} src={item.image} alt={item.name}/>*/}
                              {/*  </a>*/}
                              {/*</Link>*/}
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