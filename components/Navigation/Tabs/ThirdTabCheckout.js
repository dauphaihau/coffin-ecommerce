import {Text} from "../../index";
import {Button} from "../../Button";
import {Grid} from "../../Layout";
import RadioGroupCustom from "../../Input/RadioGroup";
import {deliveryOpts, paymentOpts} from "../../../assets/data/options";

const ThirdTabCheckout = () => {

  // const [orderCompleted, setOrderCompleted] = useState(false)
  //
  // if (orderCompleted) {
  //   return (
  //     <div>
  //       <h3>Thanks! Your order has been successfully processed.</h3>
  //     </div>
  //   )
  // }
  //

  return (
    <Grid lg={6} gapx={8}>
      <div className='col-span-4'>
        <div className='p-6 shadow border rounded-xl mb-6 w-full'>
          <Text weight='bold' sx='xl' classes='mb-3'>Delivery options</Text>
          <RadioGroupCustom direction='row' options={deliveryOpts} onChange={(e) => console.log(e)}/>
        </div>
        <div className='p-6 shadow border rounded-xl mb-6 w-full'>
          <Text weight='bold' sx='xl' classes='mb-3'>Delivery options</Text>
          <RadioGroupCustom direction='row' options={paymentOpts} onChange={(e) => console.log(e)}/>
        </div>
      </div>
      <div className='col-span-2'>
        <div className='p-6 shadow-xl border rounded-xl mb-6 w-full'>
          <Text weight='bold' sx='xl' classes='mb-3'>Billing Address</Text>
          <Text classes='mb-2' weight='bold'>Sir Tran</Text>
          <Text classes='mb-2'>19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</Text>
          <Text color='gray-500'>365-374-4961</Text>
        </div>
        <div className='border shadow-2xl p-6 rounded-xl w-full'>
          <Text weight='bold' sx='xl' classes='mb-3'>Order Summary</Text>
          <div className='flex justify-between py-4 font-light'>
            <Text>Sub Total</Text>
            <Text>$1010100</Text>
            {/*<Text>{formatPrice(total)}</Text>*/}
          </div>
          <div className='flex justify-between py-4 font-light'>
            <Text>Discount</Text>
            {/*<Text>{discount ? '-11%' : '-'}</Text>*/}
            <Text>-11%</Text>
          </div>
          <div className='flex justify-between py-4 font-light'>
            <Text>Shipping</Text>
            <Text>Free</Text>
          </div>
          <div className='flex justify-between border-t py-4'>
            <Text weight='bold'>Total</Text>
            <div className='text-right font-light'>
              {/*<Text weight='bold'>{formatPrice(discount)}</Text>*/}
              <Text>$1010100</Text>
              <Text lg='xs'>(VAT included if applicable)</Text>
            </div>
          </div>
        </div>
        <form action="/api/checkout_sessions" method="POST">
          <section>
            <Button classes='mt-4 font-bold' width='full' shadow size='xl'>Complete Order</Button>
          </section>
        </form>
      </div>
    </Grid>
  );
}

export default ThirdTabCheckout;
