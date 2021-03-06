import {toast} from 'react-hot-toast';
import {Text} from '../../../../../core';
import RadioGroupCustom from '../../../../../core/Input/RadioGroup';
import {deliveryOpts, paymentOpts} from '../../../../../assets/data/options';
import {Button} from '../../../../../core/Button';
import {Box, Grid, Row} from '../../../../../core/Layout';
import {useAuth} from '../../../../../context/authContext';
import {formatPrice} from '../../../../../utils/helpers';

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
    console.log('res', res)
    setUser({...user, ...res})
  }

  console.log('user', user)

  return (
    <Grid lg={6} gapx={8}>
      <Box classes='col-span-2 ipad:col-span-4'>
        <Box classes='p-6 shadow border rounded-xl mb-6 w-full'>
          <Text weight='bold' sx='xl' classes='mb-3'>Delivery options</Text>
          <RadioGroupCustom
            options={deliveryOpts}
            onChange={(e) => updateCart({delivery: e.value})}
          />
        </Box>
        <Box classes='p-6 shadow border rounded-xl w-full'>
          <Text weight='bold' sx='xl' classes='mb-3'>Payment options</Text>
          <RadioGroupCustom
            directionClasses='flex-col ipad:flex-row'
            options={paymentOpts}
            onChange={(e) => updateCart({payment: e.value})}
          />
        </Box>
        <Button light classes='font-bold px-0 mt-4' onClick={() => setSteps(2)}>
          <i className='fa-solid fa-angle-left mr-4'/>Back
        </Button>
      </Box>
      <Box classes='col-span-2'>
        <Box classes='p-6 shadow-xl border rounded-xl mb-6 w-full'>
          <Text weight='bold' sx='xl' classes='mb-3'>Billing Address</Text>
          <Text classes='mb-2' weight='bold'>Sir Tran</Text>
          <Text classes='mb-2'>19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</Text>
          <Text color='gray-500'>365-374-4961</Text>
        </Box>
        <Box classes='border border-gray-custom-50 shadow-2xl p-6 rounded-xl w-full font-light'>
          <Text weight='bold' sx='xl' classes='mb-3'>Order Summary</Text>
          <Row justify='between' classes='py-2'>
            <Text>{formatPrice(user.delivery === 'fastDelivery' ? user.priceTotal + 2 : user.priceTotal)}</Text>
          </Row>
          <Row justify='between' classes='py-2'>
            <Text>Discount</Text>
            <Text>{user.priceTotal !== total ? '-11%' : '-'}</Text>
          </Row>
          <Row justify='between' classes='py-2'>
            <Text>Shipping</Text>
            <Text>{user.delivery !== 'fastDelivery' ? 'Free' : '$2'}</Text>
          </Row>
          <Row justify='between' classes='py-4 border-t'>
            <Text weight='bold'>Total</Text>
            <Box classes='text-right font-light'>
              <Text
                weight='bold'>{formatPrice(user.delivery === 'fastDelivery' ? user.priceTotal + 2 : user.priceTotal)}</Text>
              <Text sx='sm'>(VAT included if applicable)</Text>
            </Box>
          </Row>
        </Box>
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
            : <form action='/api/checkout_sessions' method='POST'>
              <section>
                <Button
                  type='submit'
                  classes='mt-4 font-bold' width='full' shadow size='lg'>Complete Order</Button>
              </section>
            </form>
        }
      </Box>
    </Grid>
  );
}

export default ThirdStepCheckout;
