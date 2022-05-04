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
import {useAuth} from "../context/authContext";
import {CartProvider, CartContext} from "../context/cartContext";
import getStripejs from "../utils/get-stripejs";
import StepperCheckout from "../layouts/main/pages/checkout/StepperCheckout";
import {Helmet} from "../layouts/admin/common/Helmet";
// import {StepperCheckout} from "../core/Navigation/Stepper";

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

  const {numberOfItemsInCart, cart, total, removeFromCart, setItemQuantity} = context
  const cartEmpty = numberOfItemsInCart === Number(0)

  if (orderCompleted) {
    return (
      <div>
        <h3>Thanks! Your order has been successfully processed.</h3>
      </div>
    )
  }

  const dataBreadcrumb = [
    {path: "/", name: "Home", firstLink: true},
    {path: "/products", name: "Products"},
    {path: "", name: "Checkout", lastLink: true}
  ];


  return (
    <>
      <Helmet title='Checkout' dataBreadcrumb={dataBreadcrumb}>
        {/*<Text h1 sx='3xl' weight='bold' classes='mb-8'>Checkout</Text>*/}
        <StepperCheckout context={context}/>
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
      </Helmet>
    </>
  );
}

export default CheckoutWithContext;
