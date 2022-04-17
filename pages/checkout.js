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
import {Button, QuantityPicker} from "../components/Button";
import {Checkbox, Input, Textarea} from "../components/Input";
import {Grid, Text, Tooltip} from "../components";
import {BannerCard} from "../components/Card";
import moment from "moment/moment";
import {Table} from "../components/Table";
import {Tab} from "@headlessui/react";
import {FirstTabCheckout, SecondTabCheckout, ThirdTabCheckout} from "../components/Navigation/Tabs";

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

  const [activeTab, setActiveTab] = useState(1);

  const {user, setUser} = useAuth();

  const stripe = useStripe()
  const elements = useElements()


  const tabsContent = [
    {
      id: 1,
      heading: 'Cart',
      line: false,
      content: () => <FirstTabCheckout handleTabClick={handleTabClick}/>,
    },
    {
      id: 2,
      heading: 'Billing & address',
      content: () => <SecondTabCheckout/>
    },
    {
      id: 3,
      heading: 'Payment',
      content: () => <ThirdTabCheckout/>
    },
  ];

  const [currentTab, setCurrentTab] = useState(tabsContent[0]);

  function handleTabClick(currentTab) {
    setActiveTab(currentTab);
    const currentTabContent = tabsContent.filter(item => item.id === currentTab);
    setCurrentTab(currentTabContent[0]);
  }

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

  const {numberOfItemsInCart, cart, total, removeFromCart, setItemQuantity} = context
  const cartEmpty = numberOfItemsInCart === Number(0)

  if (orderCompleted) {
    return (
      <div>
        <h3>Thanks! Your order has been successfully processed.</h3>
      </div>
    )
  }

  return (
    <>
      {/*<BannerCard srcImg={banner} title='Checkout'/>*/}
      <Text h1 sx='3xl' weight='bold' classes='mb-8'>Checkout</Text>
      <div className='tabs'>
        <div className='tabs__tab'>
          {tabsContent.map(item => {
            if (!item.line) {
              return (
                  <div className='border-none text-center' key={item.id}
                       onClick={() => handleTabClick(item.id)}>
                    <button className={`tabLink mb-4 ${activeTab === item.id && 'is-selected'}`}/>
                    <Text sx='sm' color='[#738a88]' classes={`animate hover:text-gray-600 
                    ${activeTab === item.id ? '!text-black' : ''} `}>
                      {item.heading}
                    </Text>
                  </div>
              )
            }
            return (

                <div className='border-none text-center' key={item.id}
                     onClick={() => handleTabClick(item.id)}>
                  <button className={`tabLink ${activeTab === item.id && 'is-selected'}`}/>
                  <p className={`text-sm text-[#7e8a88] 
                transition-all duration-300 ease-in-out hover:text-gray-600 
                    ${activeTab === item.id ? '!text-black' : ''} `}>
                    {item.heading}
                  </p>
                </div>
            )
          })}
        </div>
        <div className="p-[20px]">
          {currentTab.content().type(tabsContent)}
        </div>
      </div>


      {/*<Grid md={2} gapx={12} classes='mt-12'>*/}
      {/*<div className='mb-12'>*/}
      {/*  <Text h1 sx='2xl' weight='bold' classes='mb-8'>Shipping Address</Text>*/}
      {/*  <form onSubmit={handleSubmit(onSubmit)}>*/}
      {/*    <Grid md={1} lg={2} gapx={4}>*/}
      {/*      <Input label='First Name *' name='firstName' register={register} errors={errors}/>*/}
      {/*      <Input label='Last Name *' name='lastName' register={register} errors={errors}/>*/}
      {/*    </Grid>*/}
      {/*    <Input label='Address *' name='address' register={register} errors={errors}/>*/}
      {/*    <Grid md={1} lg={2} gapx={4}>*/}
      {/*      <Input label='Phone/Mobile *' name='phoneNumber' register={register} errors={errors}/>*/}
      {/*      <Input label='Email ' name='email' register={register} errors={errors}/>*/}
      {/*    </Grid>*/}
      {/*    <Grid md={1} lg={2} gapx={4}>*/}
      {/*      <Input label='City/Town *' name='city' register={register} errors={errors}/>*/}
      {/*      <Input label='Postcode *' name='postcode' register={register} errors={errors}/>*/}
      {/*    </Grid>*/}
      {/*    <Checkbox label='Save this information for next time'/>*/}
      {/*    <Textarea*/}
      {/*      register={register} errors={errors}*/}
      {/*      label='Order Notes (Optional)'*/}
      {/*      name='note'*/}
      {/*      rows={5}*/}
      {/*      className='mb-6'*/}
      {/*      placeholder='Notes about your order, e.g. special notes for delivery'*/}
      {/*    />*/}



      {/*    <div className="flex gap-x-4">*/}
      {/*      <Button*/}
      {/*        classes='w-fit'*/}
      {/*        onClick={() => {*/}
      {/*        localStorage.removeItem('COFFIN_ECOMMERCE');*/}
      {/*        setUser({...user, numberAllOfItemsInCart: 0})*/}
      {/*      }}*/}
      {/*      >*/}
      {/*        Place Order</Button>*/}
      {/*      <form action="/api/checkout_sessions" className='w-1/2' method="POST">*/}
      {/*        <section>*/}
      {/*          <Button type="submit" role="link">Pay with card</Button>*/}
      {/*        </section>*/}
      {/*      </form>*/}
      {/*    </div>*/}
      {/*  </form>*/}
      {/*</div>*/}

      {/*</Grid>*/}
    </>
  );
}

export default CheckoutWithContext;
