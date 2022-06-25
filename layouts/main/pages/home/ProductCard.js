import {Image, Link} from '../../../../core/Next';
import {useEffect, useRef} from 'react';
import {Box, Col, Row} from '../../../../core/Layout';
import {Text} from '../../../../core';
// import HoverEffect from 'hover-effect';

const ProductCard = (props) => {

  const {
    imageSrc,
    title,
    price, salePrice,
    description, link, full, imageHover
  } = props;

  // const container = useRef();
  // useEffect(() => {
  //   // console.log(container.current);
  //
  //   new HoverEffect({
  //     parent: container.current,
  //     intensity: 0.4,
  //     image1: '/images/products/cremation-urn5.png',
  //     image2: '/images/products/coffin14.png',
  //     displacementImage:
  //            '/images/hover-effect/distortion.jpeg',
  //          // 'https://cdn.rawgit.com/robin-dela/hover-effect/b6c6fd26/images/stripe1mul.png?raw=true',
  //     //     'https://raw.githubusercontent.com/robin-dela/hover-effect/master/images/fluid.jpg',
  //   });
  // }, [container]);

  return (
    <Box classes='lg:mb-0 bg-gray-custom-50 p-4 laptop:p-6 hover:bg-light-200 rounded-lg h-full'>
      <Link href={link}>
        {
          salePrice
            ? <Text span classes='
                  bg-black text-white text-sm font-medium mr-2
                  px-2.5 py-1 rounded
                '>
              {(((price - salePrice) / price) * 100).toFixed()}%
            </Text>
            : <Box classes='h-5'/>
        }
        <Box>

          <Col justify='center' align='center'
            // ref={container}
          >
            <Image normalTag
                   src={imageSrc} alt={title}
                   classes={`w-[15rem] m-auto ${full && '!w-[70%] h-[42rem] desktop:h-[40rem]'} `}
            />
            {/*{*/}
            {/*  imageHover ?*/}
            {/*    <img alt={title} src={imageSrc} className='w-3/5'*/}
            {/*         onMouseOver={event => event.currentTarget.src = imageHover}*/}
            {/*         onMouseOut={event => event.currentTarget.src = imageSrc}*/}
            {/*    />*/}
            {/*    : <img alt={title} src={imageSrc} className='w-3/5'/>*/}
            {/*}*/}
          </Col>
          <Col justify='between' classes='mt-0 laptop:mt-6 desktop:flex-row'>
            <Box>
              <Text classes='text-xl lg:text-lg font-semibold'>{title.slice(0, 23)}</Text>
              <Text classes='text-gray-600'>
                {description?.length > 25 ?
                  <Text span>{description.slice(0, 25)}...</Text> : <Text span>{description}</Text>
                }
              </Text>
            </Box>
            <Box classes='text-right'>
              {salePrice ?
                <Row classes='flex-row-reverse desktop:flex-col'>
                  <Text classes='ml-[10px] line-through text-gray-700 text-sm
                          ipad:text-base laptop:text-base ps-2'
                  >
                    ${price}
                  </Text>
                  <Text classes='text-xl font-bold tracking-wide'>
                    ${salePrice}
                  </Text>
                </Row>
                :
                <Text classes='text-xl font-bold tracking-wide'>
                  ${price}
                </Text>
              }
            </Box>
          </Col>
        </Box>
      </Link>
    </Box>
  )
}

export default ProductCard;
