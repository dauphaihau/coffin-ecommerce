import Text from '../../../../core/Text';
import {Box, Col, Grid, Row} from '../../../../core/Layout';
import {Divider, Image} from '../../../../core';
import Pagination from '../../../../core/Table/Pagination';

const CustomerReview = () => {

  return (
    <Col>
      <Text sx='lg' md='2xl' weight='bold' classes=' mb-4'>Customer Reviews</Text>
      <Row align='center'>
        <Text sx='3xl' weight='medium'>3.8<Text span classes='sr-only'> Average review score </Text>
        </Text>
        <Col classes='ml-4'>
          <Row classes='-ml-1'>
            <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-yellow-400' viewBox='0 0 20 20'
                 fill='currentColor'>
              <path
                d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
            </svg>
            <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-yellow-400' viewBox='0 0 20 20'
                 fill='currentColor'>
              <path
                d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
            </svg>
            <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-yellow-400' viewBox='0 0 20 20'
                 fill='currentColor'>
              <path
                d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
            </svg>
            <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-yellow-400' viewBox='0 0 20 20'
                 fill='currentColor'>
              <path
                d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
            </svg>
            <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-gray-200' viewBox='0 0 20 20'
                 fill='currentColor'>
              <path
                d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
            </svg>
          </Row>

          <p className='mt-0.5 text-xs text-gray-500'>Based on 48 reviews</p>
        </Col>
      </Row>
      <Grid sx={1} lg={1} classes='mt-8 gap-x-16 gap-y-12'>
        <Divider classes='border-gray-custom-500'/>

        <Box blockquote>
          <Grid sx={1} lg={6} xl={7}>
            <Row classes='col-span-1 ipad:mb-4 laptop:mb-0'>
              <img
                className='h-10 w-10 rounded-full mr-3'
                src={`https://i.pravatar.cc/300?img=3`}
                alt='profile'
              />
              <Col>
                <div className='flex -ml-1'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-yellow-400' viewBox='0 0 20 20'
                       fill='currentColor'>
                    <path
                      d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                  </svg>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-yellow-400' viewBox='0 0 20 20'
                       fill='currentColor'>
                    <path
                      d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                  </svg>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-yellow-400' viewBox='0 0 20 20'
                       fill='currentColor'>
                    <path
                      d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                  </svg>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-yellow-400' viewBox='0 0 20 20'
                       fill='currentColor'>
                    <path
                      d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                  </svg>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-gray-200' viewBox='0 0 20 20'
                       fill='currentColor'>
                    <path
                      d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                  </svg>
                </div>
                <footer className='mt-2'>
                  <Text classes='text-xs text-gray-500'>John Doe</Text>
                  <Text classes='text-xs text-gray-500'>12th January, 2024</Text>
                </footer>
              </Col>
            </Row>
            <Col classes='laptop:col-span-5 desktop:col-span-6'>
              <Text sx='lg' lg='2xl' classes='mt-2 text-gray-custom-503 font-base  sm:mt-0'>The best thing money can
                buy!</Text>
              <Text classes='mt-2 text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
                possimus
                fuga dolor rerum dicta, ipsum laboriosam est totam iusto alias incidunt cum tempore aliquid aliquam
                error
                quisquam ipsam asperiores! Iste?</Text>
            </Col>
          </Grid>
        </Box>

        <Divider classes='border-gray-custom-500'/>
        <Box blockquote>
          <Grid sx={1} lg={6} xl={7}>
            <Row classes='col-span-1 ipad:mb-4 laptop:mb-0'>
              <Image
                normalTag
                classesSize='h-10 w-10 mr-3'
                classes='h-10 w-10 rounded-full mr-3'
                src={`https://i.pravatar.cc/300?img=10`}
                alt='profile'
              />
              <Col>
                <Row classes='-ml-1'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-yellow-400' viewBox='0 0 20 20'
                       fill='currentColor'>
                    <path
                      d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                  </svg>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-yellow-400' viewBox='0 0 20 20'
                       fill='currentColor'>
                    <path
                      d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                  </svg>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-yellow-400' viewBox='0 0 20 20'
                       fill='currentColor'>
                    <path
                      d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                  </svg>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-yellow-400' viewBox='0 0 20 20'
                       fill='currentColor'>
                    <path
                      d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                  </svg>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-gray-200' viewBox='0 0 20 20'
                       fill='currentColor'>
                    <path
                      d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                  </svg>
                </Row>
                <Box classes='mt-2'>
                  <Text classes='text-xs text-gray-500'>John Doe</Text>
                  <Text classes='text-xs text-gray-500'>12th January, 2024</Text>
                </Box>
              </Col>
            </Row>
            <Col classes='laptop:col-span-5 desktop:col-span-6'>
              <Text sx='lg' lg='2xl' classes='mt-2 text-gray-custom-503 font-base  sm:mt-0'>Not for tall people. Not
                worth the investment</Text>
              <Text classes='mt-2 text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
                possimus
                fuga dolor rerum dicta, ipsum laboriosam est totam iusto alias incidunt cum tempore aliquid aliquam
                error
                quisquam ipsam asperiores! Iste?</Text>
            </Col>
          </Grid>
          <Grid sx={1} lg={6} xl={7} classes='mt-6 rounded-lg bg-gray-custom-52 p-4 laptop:pl-0'>
            <Row classes='col-span-1 laptop:pl-4'>
              <Text classes='h-10 w-10 flex-center text-white bg-black rounded-full mr-3'>D</Text>
              <Box classes='mt-2'>
                <Text classes='text-xs text-gray-500'>Drop</Text>
                <Text classes='text-xs text-gray-500'>12th January, 2024</Text>
              </Box>
            </Row>
            <Box classes='laptop:col-span-5 desktop:col-span-6 mt-3 laptop:mt-0'>
              <Text classes='mt-2 text-gray-700'>
                Hey there - thanks for your review, though we're sorry to hear about the assembly experience you had. We
                pride ourselves on simple, quick assembly, and would love to hear more about your experience so we can
                do better in the future. If you're open to sharing, the team can be reached at support@drop.com. Thank
                you!
              </Text>
            </Box>
          </Grid>
        </Box>
        <Divider classes='border-gray-custom-500'/>
        <Box blockquote>
          <Grid sx={1} lg={6} xl={7}>
            <Row classes='col-span-1 ipad:mb-4 laptop:mb-0'>
              <img
                className='h-10 w-10 rounded-full mr-3'
                src={`https://i.pravatar.cc/300?img=4`}
                alt='profile'
              />
              <Col>
                <div className='flex -ml-1'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-yellow-400' viewBox='0 0 20 20'
                       fill='currentColor'>
                    <path
                      d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                  </svg>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-yellow-400' viewBox='0 0 20 20'
                       fill='currentColor'>
                    <path
                      d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                  </svg>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-yellow-400' viewBox='0 0 20 20'
                       fill='currentColor'>
                    <path
                      d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                  </svg>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-yellow-400' viewBox='0 0 20 20'
                       fill='currentColor'>
                    <path
                      d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                  </svg>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-gray-200' viewBox='0 0 20 20'
                       fill='currentColor'>
                    <path
                      d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                  </svg>
                </div>
                <footer className='mt-2'>
                  <Text classes='text-xs text-gray-500'>John Doe</Text>
                  <Text classes='text-xs text-gray-500'>12th January, 2024</Text>
                </footer>
              </Col>
            </Row>
            <Col classes='laptop:col-span-5 desktop:col-span-6'>
              <div className=''></div>
              <Text sx='lg' lg='2xl' classes='mt-2 text-gray-custom-503 font-base sm:mt-0'>Great quality, and looks
                great</Text>
              <Text classes='mt-2 text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
                possimus
                fuga dolor rerum dicta, ipsum laboriosam est
                error
                quisquam ipsam asperiores! Iste?</Text>
            </Col>
          </Grid>
          <Grid sx={1} lg={6} xl={7} classes='mt-6 rounded-lg bg-gray-custom-52 p-4 laptop:pl-0'>
            <Row classes='col-span-1 laptop:pl-4'>
              <Text classes='h-10 w-10 flex-center text-white bg-black rounded-full mr-3'>D</Text>
              <Box classes='mt-2'>
                <Text classes='text-xs text-gray-500'>Drop</Text>
                <Text classes='text-xs text-gray-500'>12th January, 2024</Text>
              </Box>
            </Row>
            <Box classes='laptop:col-span-5 desktop:col-span-6 mt-3 laptop:mt-0'>
              <Text classes=' text-gray-700'>
                Hi there! Thanks for your feedback, though we're sorry to hear that you're not finding the coffin as
                comfortable as you'd have hoped! Regarding the comfort, the cushions will soften with a bit of use, so
                after a few movie nights, they'll start to break-in. That said, if you have any concerns in the coming
                weeks or months, please don't hesitate to contact our Customer Experience Team at support@drop.com.
                Our goal is always to ensure that you are happy with your coffin, now and later!
              </Text>
            </Box>
          </Grid>
        </Box>
        <Divider classes='border-gray-custom-500'/>

        <Box blockquote>
          <Grid sx={1} lg={6} xl={7}>
            <Row classes='col-span-1 ipad:mb-4 laptop:mb-0'>
              <img
                className='h-10 w-10 rounded-full mr-3'
                src={`https://i.pravatar.cc/300?img=7`}
                alt='profile'
              />
              <Col>
                <div className='flex -ml-1'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-yellow-400' viewBox='0 0 20 20'
                       fill='currentColor'>
                    <path
                      d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                  </svg>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-yellow-400' viewBox='0 0 20 20'
                       fill='currentColor'>
                    <path
                      d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                  </svg>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-yellow-400' viewBox='0 0 20 20'
                       fill='currentColor'>
                    <path
                      d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                  </svg>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-yellow-400' viewBox='0 0 20 20'
                       fill='currentColor'>
                    <path
                      d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                  </svg>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-gray-200' viewBox='0 0 20 20'
                       fill='currentColor'>
                    <path
                      d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                  </svg>
                </div>
                <footer className='mt-2'>
                  <Text classes='text-xs text-gray-500'>John Doe</Text>
                  <Text classes='text-xs text-gray-500'>12th January, 2024</Text>
                </footer>
              </Col>
            </Row>
            <Col classes='laptop:col-span-5 desktop:col-span-6'>
              <div className=''></div>
              <Text sx='lg' lg='2xl' classes='mt-2 text-gray-custom-503 font-base  sm:mt-0'>High quality, comfy, and
                beautiful!</Text>
              <Text classes='mt-2 text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
                possimus
                fuga dolor rerum dicta, ipsum laboriosam est totam iusto alias incidunt cum tempore aliquid aliquam
                error
                quisquam ipsam asperiores! Iste?</Text>
            </Col>
          </Grid>
        </Box>

        <Pagination
          // rowsPerPageOptions={[3, 5, 7]}
          // setRowsPerPage={handleRowsPerPageChange}
          // setRowsPerPage={setRowsPerPage}
          rowsPerPageFromProps={20}
          rowsPerPage={4}
          currentPage={1}
          rowsChecked={4}
          // @ts-ignore
          totalNumberOfRows={20}
          quantityRows={20}
          // onPageChange={page => setCurrentPage(page)}
          onPageChange={() => {
          }}
        />
      </Grid>
    </Col>
  )
}

export default CustomerReview