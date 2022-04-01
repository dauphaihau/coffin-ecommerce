import Link from 'next/link'
import {useState, useEffect} from 'react'
import {XIcon, ArrowNarrowRightIcon} from "@heroicons/react/outline";

import {useUtil} from "../../context/utilContext";
import {ContextProviderComponent, SiteContext} from "../../context/mainContext";
import QuantityPicker from "../QuantityPicker";
import {DENOMINATION} from "../../utils/settings";
import {slugify} from "../../utils/helpers";
import Button from "../Button";

const CartDrawer = ({context}) => {
  const [renderClientSideComponent, setRenderClientSideComponent] = useState(false)

  const {drawerOpen, drawerToggle} = useUtil();

  useEffect(() => {
    setRenderClientSideComponent(true)
  }, [])

  const {
    numberOfItemsInCart, cart, removeFromCart, total, setItemQuantity
  } = context

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
      {/*<CartLink/>*/}
      <aside className={`drawer ${drawerOpen && 'open'}`}>
        <div className="flex flex-col w-full p-8">
          <h1 className="text-2xl font-black py-4 border-b">Shopping cart</h1>
          {
            cartEmpty
              ? (<h3>No items in cart.</h3>)
              : (
                <div className="flex flex-col h-[780px] overflow-y-auto">
                  <div>
                    {
                      cart.map((item) => {
                        return (
                          <div className="border-b py-10" key={item.id}>
                            <div className="flex">
                              <Link href={`/product/${slugify(item.name)}`}>
                                <a aria-label={item.name} className='bg-light rounded-lg'>
                                  <img className=" h-20 m-0" width={440} src={item.image} alt={item.name}
                                  onClick={() => removeFromCart(item)}
                                  />
                                </a>
                              </Link>
                              <div className='ml-4'>
                                <Link href={`/product/${slugify(item.name)}`}>
                                  <a aria-label={item.name}>
                                    <p className=" m-0 text-gray-600 w-80">
                                      {item.name}
                                    </p>
                                  </a>
                                </Link>
                                <p className='text-gray-500 py-2'>Unit price: {DENOMINATION + item.price} </p>
                                <QuantityPicker
                                  theme='black'
                                  numberOfItems={item.quantity}
                                  increment={() => increment(item)}
                                  decrement={() => decrement(item)}
                                />
                                <div className="flex flex-1 justify-end">
                                  <p className="m-0 pl-10 text-gray-900 tracking-wider">
                                    {DENOMINATION + item.price * item.quantity}
                                  </p>
                                </div>
                              </div>
                              {/*<div*/}
                              {/*  role="button" onClick={() => removeFromCart(item)}*/}
                              {/*  className="m-0 ml-10 text-gray-900 text-s cursor-pointer">*/}
                              {/*  <XIcon width={35}/>*/}
                              {/*</div>*/}
                            </div>
                            <div className="flex items-center flex md:hidden">
                              <Link href={`/product/${slugify(item.name)}`}>
                                <a>
                                  <img className="w-32 m-0" src={item.image} alt={item.name}/>
                                </a>
                              </Link>
                              <div>
                                <Link href={`/product/${slugify(item.name)}`}>
                                  <a aria-label={item.name}>
                                    <p className=" m-0 pl-6 text-gray-600 text-base">
                                      {item.name}
                                    </p>
                                  </a>
                                </Link>
                                <div className="ml-6 mt-4 mb-2">
                                  <QuantityPicker
                                    hideQuantityLabel
                                    numberOfitems={item.quantity}
                                    increment={() => increment(item)}
                                    decrement={() => decrement(item)}
                                  />
                                </div>
                                <div className="flex flex-1">
                                  <p className="text-lg m-0 pl-6 pt-4 text-gray-900 tracking-wider">
                                    {DENOMINATION + item.price}
                                  </p>
                                </div>
                              </div>
                              <div
                                role="button" onClick={() => removeFromCart(item)}
                                className="m-0 ml-10 text-gray-900 text-s cursor-pointer mr-2">
                                <XIcon width={35}/>
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
                <div className="cursor-pointer flex justify-between ">
                  <p className="text-white text-sm mr-2">Proceed to check out</p>
                  <p className="text-white border-l pl-4">{DENOMINATION + total}</p>
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