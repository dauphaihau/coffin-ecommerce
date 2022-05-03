import {toast} from "react-hot-toast";

import {Text} from "../../index";
import {Button} from "../../Button";
import {Grid, Stack} from "../../Layout";
import RadioGroupCustom from "../../Input/RadioGroup";
import {deliveryOpts, paymentOpts} from "../../../assets/data/options";
import {useAuth} from "../../../context/authContext";
import {formatPrice} from "../../../utils/helpers";

const ThirdStepCheckout = (props) => {
  // const [orderCompleted, setOrderCompleted] = useState(false)

  const handleSubmitDelivery = () => {
  }

  const handleSubmitPayment = () => {
  }

  const {setStep, total, clearCart} = props;
  const {user, setUser} = useAuth();

  function setSteps(step) {
    setStep(step)
  }

  function updateCart(res) {
    setUser({...user, ...res})
  }

  return (
    <Grid lg={6} gapx={8}>
      <div className='col-span-4'>
        <div className='p-6 shadow border rounded-xl mb-6 w-full'>
          <Text weight='bold' sx='xl' classes='mb-3'>Delivery options</Text>
          <RadioGroupCustom direction='row' options={deliveryOpts} onChange={(e) => updateCart({delivery: e.value})}/>
        </div>
        <div className='p-6 shadow border rounded-xl w-full'>
          <Text weight='bold' sx='xl' classes='mb-3'>Payment options</Text>
          <RadioGroupCustom direction='row' options={paymentOpts} onChange={(e) => updateCart({payment: e.value})}/>
        </div>
        <Button light classes='font-bold px-0 mt-4' onClick={() => setSteps(2)}>
          <i className="fa-solid fa-angle-left mr-4"/>Back
        </Button>
      </div>
      <div className='col-span-2'>
        <div className='p-6 shadow-xl border rounded-xl mb-6 w-full'>
          <Text weight='bold' sx='xl' classes='mb-3'>Billing Address</Text>
          <Text classes='mb-2' weight='bold'>Sir Tran</Text>
          <Text classes='mb-2'>19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</Text>
          <Text color='gray-500'>365-374-4961</Text>
        </div>
        <div className='border border-gray-custom-50 shadow-2xl p-6 rounded-xl w-full font-light'>
          <Text weight='bold' sx='xl' classes='mb-3'>Order Summary</Text>
          <Stack classes='py-2'>
            <Text>{formatPrice(user.delivery === 'fastDelivery' ? user.priceTotal + 2 : user.priceTotal)}</Text>
          </Stack>
          <Stack classes='py-2'>
            <Text>Discount</Text>
            <Text>{user.priceTotal !== total ? '-11%' : '-'}</Text>
          </Stack>
          <Stack classes='py-2'>
            <Text>Shipping</Text>
            <Text>{user.delivery !== 'fastDelivery' ? 'Free' : '$2'}</Text>
          </Stack>
          <Stack classes='py-4 border-t'>
            <Text weight='bold'>Total</Text>
            <div className='text-right font-light'>
              <Text
                weight='bold'>{formatPrice(user.delivery === 'fastDelivery' ? user.priceTotal + 2 : user.priceTotal)}</Text>
              <Text sx='sm'>(VAT included if applicable)</Text>
            </div>
          </Stack>
        </div>
        {
          user.payment === 'cash'
            ? <Button
              classes='mt-4 font-bold' width='full' shadow size='lg'
              onClick={() => {
                clearCart();
                toast.success('Order success');
                setTimeout(() => {
                  window.location.href = '/'
                }, 4000)
              }}>Complete Order</Button>
            : <form action="/api/checkout_sessions" method="POST">
              <section>
                <Button classes='mt-4 font-bold' width='full' shadow size='lg'>Complete Order</Button>
              </section>
            </form>
        }
      </div>
    </Grid>
  );
}

export default ThirdStepCheckout;
