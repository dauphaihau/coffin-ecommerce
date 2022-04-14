import {useEffect, useState} from "react";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import * as Yup from "yup";

import {DENOMINATION} from "../utils/constant";
import banner from "../public/images/banners/checkout.jpg";
import {useAuth} from "../context/authContext";
import {CartProvider, CartContext} from "../context/cartContext";
import getStripejs from "../utils/get-stripejs";
import {Button} from "../components/Button";
import {Checkbox, Input, Textarea} from "../components/Input";
import {Grid} from "../components";

const stripePromise = getStripejs();

function CheckoutWithContext(props) {
  return (
    <CartProvider>
      <CartContext.Consumer>
        {context => (
          <Elements stripe={stripePromise}>
            <Checkout {...props} context={context}/>
          </Elements>
        )}
      </CartContext.Consumer>
    </CartProvider>
  )
}

const calculateShipping = () => {
  return 0
}

const Checkout = ({context}) => {
  const [isPayOnline, setIsPayOnline] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)
  const {user, setUser} = useAuth();

  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('First name is required'),
    address: Yup.string().required('Address is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Email is invalid')
  });

  const formOptions = {resolver: yupResolver(validationSchema)};
  const {register, handleSubmit, reset, formState, setError} = useForm(formOptions);
  const {errors} = formState;

  const onSubmit = async (values) => {
    console.log('values', values)
    return setOrderCompleted(true)

    const {name, email, street, city, postal_code, state} = values
    const {total, clearCart} = context

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // Modal submission until Stripe.js has loaded.
      return
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement)

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {name: name},
    })

    const order = {
      email,
      amount: total,
      address: state, // should this be {street, city, postal_code, state} ?
      payment_method_id: paymentMethod.id,
      receipt_email: "customer@example.com",
      id: uuid(),
    }
    // TODO call API
    setOrderCompleted(true)
    clearCart()
  }

  const {numberOfItemsInCart, cart, total} = context
  const cartEmpty = numberOfItemsInCart === Number(0)

  if (orderCompleted) {
    return (
      <div>
        <h3>Thanks! Your order has been successfully processed.</h3>
      </div>
    )
  }

  return (
    <div>
      <BannerCard srcImg={banner} title='Checkout'/>
      <Grid md={2} gapx={12} css='mt-12'>
        <div className='mb-12'>
          <h1 className='font-bold text-2xl mb-8'>Shipping Address</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid md={1} lg={2} gapx={4}>
              <Input label='First Name *' name='firstName' register={register} errors={errors}/>
              <Input label='Last Name *' name='lastName' register={register} errors={errors}/>
            </Grid>
            <Input label='Address *' name='address' register={register} errors={errors}/>
            <Grid md={1} lg={2} gapx={4}>
              <Input label='Phone/Mobile *' name='phoneNumber' register={register} errors={errors}/>
              <Input label='Email ' name='email' register={register} errors={errors}/>
            </Grid>
            <Grid md={1} lg={2} gapx={4}>
              <Input label='City/Town *' name='city' register={register} errors={errors}/>
              <Input label='Postcode *' name='postcode' register={register} errors={errors}/>
            </Grid>
            <Checkbox label='Save this information for next time'/>
            <Textarea
              label='Order Notes (Optional)'
              rows={5}
              className='mb-6'
              placeholder='Notes about your order, e.g. special notes for delivery'
            />
            <div className="flex gap-x-4">
              <Button onClick={() => {
                localStorage.removeItem('COFFIN_ECOMMERCE');
                setUser({...user, numberAllOfItemsInCart: 0})
              }}
              >
                Place Order</Button>
              <form action="/api/checkout_sessions" method="POST">
                <section>
                  <Button type="submit" role="link">Pay with card</Button>
                </section>
              </form>
            </div>
          </form>
        </div>
        <div>
          <h1 className='font-bold text-2xl mb-8'>Your Order</h1>
          {cartEmpty ? (
            <h3>No items in cart.</h3>
          ) : (
            <div className="flex flex-col w-full">
              <div className='flex justify-between bg-light-200 p-4 rounded-lg'>
                <p>Product</p>
                <p>Subtotal</p>
              </div>
              <div>
                {cart.map((item, index) => {
                  return (
                    <div className="border-b py-6 laptop:px-4" key={index}>
                      <div className="flex items-center">
                        <div aria-label={item.name} className='bg-light rounded-lg p-1'>
                          <img className="h-28 m-0 w-28" src={item.image} alt={item.name}/>
                        </div>
                        <p className="m-0 pl-[9px] ipad:pl-10 text-gray-600">
                          {item.name}
                        </p>
                        <div className="flex flex-1 justify-end">
                          <p className="m-0 pl-0 ipad:pl-10 text-gray-900">
                            {DENOMINATION + item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className='flex justify-between px-4 py-4 border-b font-bold'>
                <p>Shipping</p>
                <p>Free</p>
              </div>
              <div className='flex justify-between px-4 py-4 font-bold'>
                <p>Total</p>
                <p>${total}</p>
              </div>
            </div>
          )}
        </div>
      </Grid>
    </div>
  );
}

export default CheckoutWithContext;
