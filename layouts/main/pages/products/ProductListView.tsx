import {DENOMINATION} from "../../../../utils/constant";
import {Image, Link, Text} from "../../../../core";
import {Col, Row} from "../../../../core/Layout";

interface ProductListViewProps {
  link: string,
  title: string,
  imageSrc: string,
  description: string,
  price: number,
}

const ProductListView = (props: ProductListViewProps) => {
  const {link, title, imageSrc, price, description} = props;

  return (
    <Row classes='w-full ipad:w-1/2 mb-8 laptop:w-full'>
      <Link href={link}>
        <Col justify='center' align='center' classes='h-full w-[300px] rounded-lg bg-light hover:bg-light-200'>
          <Image src={imageSrc} alt={title} classesSize='w-3/5 w-[200px] h-[200px]'/>
        </Col>
      </Link>
      <Col classes='text-left pl-4'>
        <Link href={link}>
          <Text sx='sx' lg='xl' weight='semibold' classes="mb-1">{title}</Text>
        </Link>
        <Text sx='sm' lg='lg' classes="text-gray-700 mb-4">{`${DENOMINATION}${price.toLocaleString()}`}</Text>
        <Text classes='text-gray-600 leading-7 pb-2'>
          {description.slice(0, 400)}...
        </Text>
        <Link href={link} className="inline-flex items-center
          text-sm font-medium text-center
          text-black hover:underline
          rounded-lg focus:outline-none">
          View detail
        </Link>
      </Col>
    </Row>
  )
}

export default ProductListView
