import { useState, useEffect } from 'react'

import { useUIController } from '../../../../context/UIControllerContext';
import { CartProvider, CartContext } from '../../../../context/cartContext';
import { DENOMINATION } from '../../../../utils/enums';
import { slugify } from '../../../../utils/helpers';
import { useAuth } from '../../../../context/authContext';
import { Image, Text } from '../../../../core';
import { Button, QuantityPicker } from '../../../../core/Button';
import Drawer from '../../../../core/Navigation/Drawer';
import { Link } from '../../../../core/Next';
import { Col, Row } from '../../../../core/Layout';

const CartDrawer = ({context}) => {

  const [renderClientSideComponent, setRenderClientSideComponent] = useState(false)
  const {openCartDrawer, closeDrawerModal} = useUIController();
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
      <Drawer isOpen={openCartDrawer}>
        <Drawer.Title title='Your Cart'/>
        <Drawer.Content>
          {
            cartEmpty
              ? (
                <Col align='center' justify='center' classes='h-full text-center'>
                  <Image src='/images/empty.png' classesSize='h-88 w-88' alt='empty'/>
                  <Text weight='bold' classes='text-xl mb-8'>Your cart is empty.</Text>
                </Col>
              )
              : (
                <div className='flex flex-col h-full overflow-x-hidden'>
                  <div>
                    {
                      cart.map((item) => {
                        return (
                          <Row classes='border-b  py-4' key={item.id}>
                            <div className='relative group bg-light rounded-lg p-1 cursor-pointer '
                                 onClick={() => removeFromCart(item)}
                            >
                              <Image classesSize='h-24 w-24 ipad:h-28 ipad:w-28 m-0' src={item.image} alt={item.name}/>
                              <div className='
                                   transform duration-200 ease-in-out
                                   absolute group-hover:block hidden
                                   inset-0
                                   w-full h-full
                                   hover:bg-black
                                   opacity-20 rounded-lg
                              '>
                                <i className='fa-solid fa-circle-xmark text-3xl h-20 w-10 text-white
                                  !opacity-1 absolute z-10 right-[30%] top-[32%]'/>
                              </div>
                            </div>
                            <div className='ml-4 w-[64%]'>
                              <Link href={`/product/${slugify(item.name)}`}>
                                <Text classes='text-gray-600 text-sm m-0 w-80'>{item.name}</Text>
                              </Link>
                              <Text classes='text-gray-500 text-sm my-2'>
                                Unit price: {DENOMINATION + item.price.toLocaleString()}
                              </Text>
                              <div className='flex justify-between'>
                                <QuantityPicker
                                  // size='sx'
                                  theme='black'
                                  numberOfItems={item.quantity}
                                  increment={() => increment(item)}
                                  decrement={() => decrement(item)}
                                />
                                <Text classes='text-gray-900 m-0 pt-3 tracking-wider'>
                                  {DENOMINATION + (item.price * item.quantity).toLocaleString()}
                                </Text>
                              </div>
                            </div>
                          </Row>
                        )
                      })
                    }
                  </div>
                </div>
              )
          }
        </Drawer.Content>
        <Drawer.Footer>
          <Link href='/checkout'>
            <Button size='lg' width='full' onClick={() => closeDrawerModal()}>
              <div className='cursor-pointer flex justify-between text-base '>
                <Text classes='text-white text-base mr-2'>Proceed to check out</Text>
                <Text classes='text-white text-base border-l pl-4'>{DENOMINATION + total.toLocaleString()}</Text>
              </div>
            </Button>
          </Link>
        </Drawer.Footer>
      </Drawer>
    </>
  )
}

function CartWithContext(props) {
  return (
    <CartProvider>
      <CartContext.Consumer>
        {context => <CartDrawer {...props} context={context}/>}
      </CartContext.Consumer>
    </CartProvider>
  )
}

export default CartWithContext