import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import banner from "../public/images/contemporary-banner.png";
import {Button, Input} from "../components";
import Textarea from "../components/Input/Textarea";
import Checkbox from "../components/Input/Checkbox";
import {DENOMINATION} from "../utils/settings";
import {ContextProviderComponent, SiteContext} from "../context/mainContext";

import {useState} from "react";

let sectionStyle = {
  width: "100%",
  height: "400px",
  // backgroundImage: `url(${banner})`

  backgroundImage: "url(" + banner + ")" // ES5
};

const stripePromise = loadStripe("xxx-xxx-xxx")

function CheckoutWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {context => (
          <Elements stripe={stripePromise}>
            <Checkout {...props} context={context} />
          </Elements>
        )}
      </SiteContext.Consumer>
    </ContextProviderComponent>
  )
}

const calculateShipping = () => {
  return 0
}

const Checkout = ({context}) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [input, setInput] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    postal_code: "",
    state: "",
  })

  const stripe = useStripe()
  const elements = useElements()

  const onChange = e => {
    setErrorMessage(null)
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const { name, email, street, city, postal_code, state } = input
    const { total, clearCart } = context

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    // Validate input
    if (!street || !city || !postal_code || !state) {
      setErrorMessage("Please fill in the form!")
      return
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement)

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: { name: name },
    })

    if (error) {
      setErrorMessage(error.message)
      return
    }

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

  const { numberOfItemsInCart, cart, total } = context
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
      <div
        className='flex justify-center items-center p-6 h-40 md:p-10 2xl:p-8 relative bg-no-repeat bg-center bg-cover rounded-lg'
        style={{backgroundImage: `url(https://www.comparethecoffin.com/wp-content/uploads/2020/12/contemporary-banner.jpg?id=14266)`}}
      >
         <span className='text-4xl text-white font-light'>
            Checkout
         </span>
      </div>
      <div className='mt-12 grid grid-cols-2 gap-x-12'>
        <div className="">
          <h1 className='font-bold text-2xl mb-8'>Shipping Address</h1>
          <div>
            <div className="grid grid-cols-2 gap-x-4">
              <Input label='First Name *'/>
              <Input label='Last Name *'/>
            </div>
            <Input label='Address *'/>
            <div className="grid grid-cols-2 gap-x-4">
              <Input label='Phone/Mobile *'/>
              <Input label='Email *'/>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <Input label='City/Town *'/>
              <Input label='Postcode *'/>
            </div>
            <Checkbox label='Save this information for next time'/>
            <Textarea
              label='Order Notes (Optional)'
              rows={5}
              className='mb-6'
              placeholder='Notes about your order, e.g. special notes for delivery'
            />
            <Button title='Place Order'/>
          </div>
        </div>
        <div className="">
          <h1 className='font-bold text-2xl'>Your Order</h1>

          {cartEmpty ? (
            <h3>No items in cart.</h3>
          ) : (
            <div className="flex flex-col">
              <div className="">
                {cart.map((item, index) => {
                  return (
                    <div className="border-b py-10" key={index}>
                      <div className="flex items-center">
                        <img
                          className="w-20 m-0"
                          src={item.image}
                          alt={item.name}
                        />
                        <p className="m-0 pl-10 text-gray-600">
                          {item.name}
                        </p>
                        <div className="flex flex-1 justify-end">
                          <p className="m-0 pl-10 text-gray-900 font-semibold">
                            {DENOMINATION + item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutWithContext;
