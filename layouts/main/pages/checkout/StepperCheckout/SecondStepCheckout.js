import {useAuth} from "../../../../../context/authContext";
import {useUIController} from "../../../../../context/UIControllerContext";
import {Button} from "../../../../../core/Button";
import {Grid, Stack} from "../../../../../core/Layout";
import {Text} from "../../../../../core";
import {formatPrice} from "../../../../../utils/helpers";

const SecondStepCheckout = (props) => {

  const {dispatch} = useUIController()
  const {user, setUser} = useAuth();
  const {setStep, total} = props;

  function setSteps(step) {
    if (step === 3) {
      setUser({...user, delivery: 'slowDelivery', payment: 'card'})
    }
    setStep(step)
  }

  return (
    <Grid lg={6} gapx={8}>
      <div className='col-span-4'>
        <div>
          <div className=''>
            <div className='p-6 shadow-lg border border-gray-100 rounded-xl mb-6 w-full '>
              <div className='mb-2'>
                <Text span lg='base' color='gray-800' weight='bold'>Sir Tran</Text>
                <Text span color='gray-500' classes='ml-1 mr-2 text-sm'>(Home) </Text>
                <Text span classes='badge-gray'>Default</Text>
              </div>
              <Text classes='mb-2'>19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</Text>
              <Stack>
                <Text color='gray-500'>365-374-4961</Text>
                <Button size='sm' onClick={() => setSteps(3) }>Deliver to this Address</Button>
              </Stack>
            </div>
            <div className='p-6 shadow-lg border border-gray-100 rounded-xl mb-6 w-full'>
              <div className='mb-2'>
                <Text span lg='base' color='gray-800' weight='bold'>Death man</Text>
                <Text span color='gray-500' classes='ml-1 mr-2 text-sm'>(Official)</Text>
              </div>
              <Text classes='mb-2'>19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</Text>
              <Stack>
                <Text color='gray-500'>365-374-4961</Text>
                <Button size='sm' onClick={() => setSteps(3) }>Deliver to this Address</Button>
              </Stack>
            </div>
          </div>
        </div>
        <Stack classes='mt-6'>
          <Button light classes='font-bold px-0' onClick={() => setSteps(1)}>
            <i className="fa-solid fa-angle-left mr-4"/>Back
          </Button>
          <Button
            light classes='font-bold px-0'
            onClick={() => dispatch({type: 'OPEN_ADDRESS_MODAL'})}
          >
            + Add new address
          </Button>
        </Stack>
      </div>
      <div className='col-span-2'>
        <div className='border border-gray-100 shadow-lg p-6 rounded-xl w-full font-light'>
          <Text weight='bold' sx='xl' classes='mb-3'>Order Summary</Text>
          <Stack classes='py-2'>
            <Text>Sub Total</Text>
            <Text>{formatPrice(user.priceTotal)}</Text>
          </Stack>
          <Stack classes='py-2'>
            <Text>Discount</Text>
            <Text>{user.priceTotal !== total ? '-11%' : '-'}</Text>
          </Stack>
          <Stack classes='py-2'>
            <Text>Shipping</Text>
            <Text>Free</Text>
          </Stack>
          <Stack classes='py-4 border-t'>
            <Text weight='bold'>Total</Text>
            <div className='text-right font-light'>
              <Text weight='bold'>{formatPrice(user.priceTotal)}</Text>
              <Text sx='sm'>(VAT included if applicable)</Text>
            </div>
          </Stack>
        </div>
      </div>
    </Grid>
  );
};

export default SecondStepCheckout