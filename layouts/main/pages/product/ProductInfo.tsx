import Text from "../../../../core/Text";
import {Button, QuantityPicker, ShowMoreTextToggler} from "../../../../core/Button";
import {Box, Col, Row} from "../../../../core/Layout";
import {Image} from "../../../../core";

interface ProductProps {
  product: {
    name: string,
    title: string,
    image: string,
    salePrice: number,
    description: string,
    price: number,
  },
  decrement: () => {},
  numberOfItems: () => {},
  addItemToCart: (product) => {},
  increment: () => {},
}

const ProductInfo = (props: ProductProps) => {
  const {product, decrement, addItemToCart, numberOfItems, increment} = props;
  const {name, description, salePrice, price, image} = product;

  return (
    <Col classes="py-12 ipad:flex-row w-full my-0 mx-auto">
      {/*<Col classes="w-full ipad:w-1/2 h-120 flex py-16 p-10 flex-center flex-1">*/}
      <Box classes="w-full ipad:w-1/2 h-120 flex  py-16 p-10 flex-center flex-1">
        <Image
          src={image} alt='product'
          classesSize=' w-[300px] laptop:w-[500px] h-[300px] laptop:h-[500px]'
        />
      </Box>
      <Col classes="pt-2 px-0 ipad:pl-10 pb-8 w-full ipad:w-1/2">
        <Text h1 sx='2xl' md='2xl' lg='4xl' weight='light' classes='mt-2 mb-3.5'>{name}</Text>
        <Row align='center' classes="sm:items-center sm:flex mb-2">
          <Row classes="flex -ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20"
                 fill="currentColor">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20"
                 fill="currentColor">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20"
                 fill="currentColor">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20"
                 fill="currentColor">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-200" viewBox="0 0 20 20"
                 fill="currentColor">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </Row>
          <Text weight='medium' classes="mt-2 sm:ml-4 sm:mt-0">11 reviews</Text>
        </Row>
        <ShowMoreTextToggler limit={400} classes='block laptop:hidden text-sm' text={description}/>
        <Text color='gray-600' classes='my-6 leading-7 hidden laptop:block'>{description}</Text>
        <Text sx='2xl' md='3xl' lg='4xl' weight='bold' classes='relative tracking-wide'>
          ${salePrice ? salePrice : price}
          {
            price
            && salePrice
            && (
              <Text
                span sx='base' md='base' color='gray-400' weight='light'
                classes="absolute top-[-1%] ipad:top-[1px] ml-[10px] line-through">
                ${price}
              </Text>
            )
          }
        </Text>
        <Box classes="my-6">
          <QuantityPicker
            theme='white'
            bordered
            increment={increment}
            decrement={decrement}
            numberOfItems={numberOfItems}
          />
          {/*<Text  classes='mt-3'>Available: {quantity}</Text>*/}
        </Box>
        <Button size='lg' onClick={() => addItemToCart(product)}>Add to Cart</Button>
      </Col>
    </Col>
  )
}
export default ProductInfo