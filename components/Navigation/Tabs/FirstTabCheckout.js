import {useState} from "react";

import {Grid, Link, Text, Tooltip} from "../../index";
import {DENOMINATION} from "../../../utils/constant";
import {Button, QuantityPicker} from "../../Button";
import {CartContext, CartProvider} from "../../../context/cartContext";
import {Elements} from "@stripe/react-stripe-js";
import {useAuth} from "../../../context/authContext";
import {formatPrice} from "../../../utils/helpers";
import {Input} from "../../Input";
import {Table} from "../../Table";
import {Stack} from "../../Layout";

const FirstTabCheckout = (props) => {
  const {context} = props
  // console.log('props', props)
  const {cart, total, removeFromCart, setItemQuantity} = context
  const [discount, setDiscount] = useState(total)
  const {user} = useAuth();
  // console.log('cart', cart)

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
      id: 'quantity', title: 'Quantity', render: (row) => (
        <QuantityPicker
          theme='white'
          numberOfItems={row.quantity}
          increment={() => increment(row)}
          decrement={() => decrement(row)}
        />
      )
    },
    {
      id: 'totalPrice', title: 'Total Price',
      render: (row) => (<Text>{DENOMINATION + (row.price * row.quantity).toLocaleString()}</Text>)
    },
    {
      id: '', title: '', align: 'text-center',
      render: (row) => <>
        <Tooltip title='Delete'>
          {/*<button onClick={() => {*/}
          {/*  removeFromCart(row);*/}
          {/*  // setDiscount(0);*/}
          {/*}}>*/}
            <i className="fa-solid fa-trash-can text-xl w-full cursor-pointer"/>
          {/*</button>*/}
        </Tooltip>
      </>
    },
  ];

  function increment(item) {
    item.quantity = item.quantity + 1
    setItemQuantity(item)
  }

  function decrement(item) {
    if (item.quantity === 1) return removeFromCart(item);
    item.quantity = item.quantity - 1
    setItemQuantity(item)
  }

  const dataBreadcrumb = [
    {path: "/admin", name: "Dashboard", firstLink: true},
    {path: "/admin/users", name: "Users"},
    {path: "", name: "List", lastLink: true}
  ];

  return (
    <Grid lg={6} gapx={8}>
      <div className='col-span-4'>
        {/*<Text weight='bold' lg='xl' classes='mb-1'>Your Order ({user.numberAllOfItemsInCart} item)</Text>*/}
        <Table
          columns={columns}
          itemsPerPage={6}
          rows={cart}
          hidePagination
        />

        <Link href='/products'>
          <Button classes='mt-6 px-0 font-bold' light>
            <i className="fa-solid fa-angle-left mr-3"/>
            Continue Shopping
          </Button>
        </Link>
      </div>
      <div className='col-span-2'>
        <div className='border shadow-2xl p-6 rounded-xl w-full font-light'>
          <Text weight='bold' sx='xl' classes='mb-3'>Order Summary</Text>
          <Stack classes='py-2'>
            <Text>Sub Total</Text>
            <Text>{formatPrice(total)}</Text>
          </Stack>
          <Stack classes='py-2'>
            <Text>Discount</Text>
            <Text>{discount ? '-11%' : '-'}</Text>
          </Stack>
          <Stack classes='py-2'>
            <Text>Shipping</Text>
            <Text>Free</Text>
          </Stack>
          <Stack classes='py-4 border-t'>
            <Text weight='bold'>Total</Text>
            <div className='text-right font-light'>
              <Text weight='bold'>{formatPrice(discount)}</Text>
              <Text sx='sm'>(VAT included if applicable)</Text>
            </div>
          </Stack>
          <div className='relative'>
            <Input name='discount' value='DISCOUNT11' classes='!p-6 font-bold'/>
            <Button light classes='absolute top-[5px] right-[10px]
               transition font-bold duration-300 ease-in-out text-sm
               hover:bg-gray-200 p-2 px-3 rounded-xl'
                    onClick={() => setDiscount(total * 0.89)}
            >Apply
            </Button>
          </div>
        </div>
        <Button classes='mt-4' width='full' shadow size='xl'>Check out</Button>
      </div>
    </Grid>
  );
};

function FirstTabCheckoutWithContext(props) {
  return (
    <CartProvider>
      <CartContext.Consumer>
        {context => (
          // <Elements stripe={stripePromise}>
          <FirstTabCheckout {...props} context={context}/>
          // </Elements>
        )}
      </CartContext.Consumer>
    </CartProvider>
  )
}

export default FirstTabCheckoutWithContext