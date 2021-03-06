import { useAuth } from "../../../../../context/authContext";
import { useUIController } from "../../../../../context/UIControllerContext";
import { Button } from "../../../../../core/Button";
import { Box, Col, Grid, Row } from "../../../../../core/Layout";
import { Text } from "../../../../../core";
import { formatPrice } from "../../../../../utils/helpers";

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
      <Box classes='col-span-2 ipad:col-span-4'>
        <Box>
          <Col>
            <Box classes='p-6 shadow-lg border border-gray-100 rounded-xl mb-6 w-full '>
              <Box classes='mb-2 '>
                <Text span classes='laptop:text-base text-gray-800' weight='bold'>Sir Tran</Text>
                <Text span classes='ml-1 mr-2 text-sm text-gray-500'>(Home) </Text>
                <Text span classes='badge-gray'>Default</Text>
              </Box>
              <Text classes='mb-2'>19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</Text>
              <Col justify='between' gap={2} classes='ipad:gap-0 flex-col ipad:flex-row'>
                <Text classes='text-gray-500'>365-374-4961</Text>
                <Button size='sm' onClick={() => setSteps(3)}>Deliver to this Address</Button>
              </Col>
            </Box>
            <Box classes='p-6 shadow-lg border border-gray-100 rounded-xl mb-6 w-full'>
              <Box classes='mb-2'>
                <Text span classes='laptop:text-base text-gray-800' weight='bold'>Death man</Text>
                <Text span classes='ml-1 mr-2 text-sm text-gray-500'>(Official)</Text>
              </Box>
              <Text classes='mb-2'>19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</Text>
              <Col justify='between' gap={2} classes='ipad:gap-0 flex-col ipad:flex-row'>
                <Text classes='text-gray-500'>365-374-4961</Text>
                <Button size='sm' onClick={() => setSteps(3)}>Deliver to this Address</Button>
              </Col>
            </Box>
          </Col>
        </Box>
        <Row justify='between' classes='mt-6'>
          <Button light classes='font-bold px-0' onClick={() => setSteps(1)}>
            <i className="fa-solid fa-angle-left mr-4"/>Back
          </Button>
          <Button
            light classes='font-bold px-0'
            onClick={() => dispatch({type: 'OPEN_ADDRESS_MODAL'})}
          >
            + Add new address
          </Button>
        </Row>
      </Box>
      <Box classes='col-span-2'>
        <Box classes='border border-gray-100 shadow-lg p-6 rounded-xl w-full font-light'>
          <Text weight='bold' sx='xl' classes='mb-3'>Order Summary</Text>
          <Row justify='between' classes='py-2'>
            <Text>Sub Total</Text>
            <Text>{formatPrice(user.priceTotal)}</Text>
          </Row>
          <Row justify='between' classes='py-2'>
            <Text>Discount</Text>
            <Text>{user.priceTotal !== total ? '-11%' : '-'}</Text>
          </Row>
          <Row justify='between' classes='py-2'>
            <Text>Shipping</Text>
            <Text>Free</Text>
          </Row>
          <Row justify='between' classes='py-4 border-t'>
            <Text weight='bold'>Total</Text>
            <Box classes='text-right font-light'>
              <Text weight='bold'>{formatPrice(user.priceTotal)}</Text>
              <Text classes='text-sm'>(VAT included if applicable)</Text>
            </Box>
          </Row>
        </Box>
      </Box>
    </Grid>
  );
};

export default SecondStepCheckout