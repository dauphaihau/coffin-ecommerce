import {useEffect, useState} from "react";
import {Elements} from "@stripe/react-stripe-js";
import {CartProvider, CartContext} from "../../../../../context/cartContext";
import {Button, QuantityPicker} from "../../../../../core/Button";
import {Grid, Row} from "../../../../../core/Layout";
import {Link, Text, Tooltip} from "../../../../../core";
import {Input} from "../../../../../core/Input";
import {useAuth} from "../../../../../context/authContext";
import {DENOMINATION} from "../../../../../utils/enums";
import {formatPrice} from "../../../../../utils/helpers";
import Table from "../../../../../core/Table";

const FirstStepCheckout = (props) => {
  const {setStep} = props;
  const {
    cart, total, removeFromCart,
    setItemQuantity, numberAllOfItemsInCart,
  } = props.context

  const [discounted, setDiscounted] = useState(0)
  const {user, setUser} = useAuth();

  useEffect(() => {
    setUser({...user, priceTotal: !discounted ? total : discounted, numberAllOfItemsInCart})

  }, [discounted, numberAllOfItemsInCart])


  const columns = [
    {
      id: 'name', title: 'Product',
      render: (row) => (
        <div className='flex items-center'>
          <div className='rounded-lg '>
            <img src={row.image} className='h-9 w-9 rounded-md ' alt='avatar'/>
          </div>
          <p className='ml-4 text-sm font-bold'>{row.name}</p>
        </div>
      )
    },
    {
      id: 'price', title: 'Price',
      render: (row) => (<Text>{DENOMINATION + row.price.toLocaleString()}</Text>)
    },
    {
      id: 'quantity', title: 'Quantity', align: 'center',render: (row) => (
        <QuantityPicker
          theme='white'
          numberOfItems={row.quantity}
          increment={() => increment(row)}
          decrement={() => decrement(row)}
        />
      )
    },
    {
      id: 'totalPrice', title: 'Total Price', align: 'center',
      render: (row) => (<Text>{DENOMINATION + (row.price * row.quantity).toLocaleString()}</Text>)
    },
    {
      id: '', title: '', align: 'center',
      render: (row) => <>
        <Tooltip title='Delete' classes='right-[-13px]'>
          <i className="fa-solid fa-trash-can text-xl w-full cursor-pointer"
             onClick={() => {
               removeFromCart(row);
               // setDiscounted(0);
             }}
          />
        </Tooltip>
      </>
    },
  ];

  function increment(item) {
    item.quantity = item.quantity + 1
    setItemQuantity(item)
    if (discounted) {
      setDiscounted(total * 0.89)
    }
  }

  function decrement(item) {
    if (item.quantity === 1) return removeFromCart(item);
    item.quantity = item.quantity - 1
    setItemQuantity(item)
    if (discounted) {
      setDiscounted(total * 0.89)
    }
  }

  function setSteps(step) {
    setStep(step)
  }

  return (
    <Grid lg={6} gapx={8}>
      <div className='ipad:col-span-4'>
        {/*<Text weight='bold' lg='xl' classes='mb-1'>Your Order ({user.numberAllOfItemsInCart} item)</Text>*/}
        <Table
          columns={columns}
          rowsPerPage={4}
          rows={cart}
        />
        <Link href='/products'>
          <Button classes='mt-6 px-0 font-bold' light>
            <i className="fa-solid fa-angle-left mr-3"/>
            Continue Shopping
          </Button>
        </Link>
      </div>
      <div className='ipad:col-span-2 mt-6 ipad:mt-0'>
        <div className='border border-gray-custom-50 shadow-xl p-6 rounded-xl w-full font-light'>
          <Text weight='bold' sx='xl' classes='mb-3'>Order Summary</Text>
          <Row justify='between' classes='py-2'>
            <Text>Sub Total</Text>
            <Text>{formatPrice(total)}</Text>
          </Row>
          <Row justify='between' classes='py-2'>
            <Text>Discount</Text>
            <Text>{discounted ? '-11%' : '-'}</Text>
          </Row>
          <Row justify='between' classes='py-2'>
            <Text>Shipping</Text>
            <Text>Free</Text>
          </Row>
          <Row justify='between' classes='py-4 border-t'>
            <Text weight='bold'>Total</Text>
            <div className='text-right font-light'>
              {/*<Text weight='bold'>{formatPrice(discounted)}</Text>*/}
              <Text weight='bold'>{formatPrice(!discounted ? total : discounted)}</Text>
              <Text sx='sm'>(VAT included if applicable)</Text>
            </div>
          </Row>
          <div className='relative'>
            <Input name='discounted' defaultValue='DISCOUNT11' classes='!p-6 font-bold'/>
            {
              !discounted
                ? <Button light classes='absolute top-[5px] right-[10px]
                     transition font-bold duration-300 ease-in-out text-sm
                     hover:bg-gray-200 p-2 px-3 rounded-xl'
                          onClick={() => setDiscounted(total * 0.89)}
                >Apply
                </Button>
                : <Button light classes='absolute top-[5px] right-[10px]
                   transition font-bold duration-300 ease-in-out text-sm
                   hover:bg-gray-200 p-2 px-3 rounded-xl'
                          onClick={() => setDiscounted(0)}
                >Cancel
                </Button>
            }
          </div>
        </div>
        <Button
          classes='mt-4 font-bold'
          disabled={!numberAllOfItemsInCart && true}
          width='full' shadow size='lg'
          onClick={() => setSteps(2)}
        >Check out</Button>
      </div>
    </Grid>
  );
};

function FirstStepCheckoutWithContext(props) {
  return (
    <CartProvider>
      <CartContext.Consumer>
        {context => (
          // <Elements stripe={stripePromise}>
          <FirstStepCheckout {...props} context={context}/>
          // </Elements>
        )}
      </CartContext.Consumer>
    </CartProvider>
  )
}

export default FirstStepCheckoutWithContext