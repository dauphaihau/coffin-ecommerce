import {Grid, Text} from "../../index";
import {Button} from "../../Button";
import {formatPrice} from "../../../utils/helpers";
import {Input} from "../../Input";
import {Stack} from "../../Layout";
import {useUIController} from "../../../context/UIControllerContext";

const SecondTabCheckout = () => {

  const {openAddressDrawer, addressModalToggle, drawerToggle, ...state} = useUIController();

  return (
    <Grid lg={6} gapx={8}>
      <div className='col-span-4'>
        <div>
          <div className=''>
            <div className='p-6 shadow-xl border rounded-xl mb-6 w-full '>
              <div className='mb-2'>
                <Text span lg='base' color='gray-800' weight='bold'>Sir Tran</Text>
                <Text span color='gray-500' classes='ml-1 mr-2 text-sm'>(Home) </Text>
                <Text span classes='badge-gray'>Default</Text>
              </div>
              <Text classes='mb-2'>19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</Text>
              <Stack>
                <Text color='gray-500'>365-374-4961</Text>
                <Button size='sm'>Deliver to this Address</Button>
              </Stack>
            </div>
            <div className='p-6 shadow-xl border rounded-xl mb-6 w-full'>
              <div className='mb-2'>
                <Text span lg='base' color='gray-800' weight='bold'>Death man</Text>
                <Text span color='gray-500' classes='ml-1 mr-2 text-sm'>(Official)</Text>
              </div>
              <Text classes='mb-2'>19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</Text>
              <Stack>
                <Text color='gray-500'>365-374-4961</Text>
                <Button size='sm'>Deliver to this Address</Button>
              </Stack>
            </div>
          </div>
        </div>
        <Stack classes='mt-6 '>
          <Button light classes='font-bold px-0'>
            <i className="fa-solid fa-angle-left mr-4"/>Back
          </Button>
          <Button
            light classes='font-bold px-0'
            onClick={() => addressModalToggle()}
          >
            + Add new address
          </Button>
        </Stack>
      </div>

      <div className='col-span-2'>
        <div className=' border shadow-2xl p-6 rounded-xl w-full'>
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
              <Text lg='xs' classes='italic'>(VAT included if applicable)</Text>
            </div>
          </div>
        </div>
      </div>


    </Grid>
  );
};

export default SecondTabCheckout