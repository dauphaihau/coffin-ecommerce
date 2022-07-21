import Text from "../../../../core/Text";
import {Col, Grid} from "../../../../core/Layout";
import Product from "../../common/Product";
import {slugify} from "../../../../utils/helpers";

interface RelatedProductProps {
  id: number,
  relatedProducts: {
    name: string,
    price: number,
    id: number,
    image: string,
  }[]
}

const RelatedProduct = (props: RelatedProductProps) => {
  const {relatedProducts, id} = props;

  return (
    <Col classes='my-10'>
      <Text weight='bold' classes='text-lg ipad:text-2xl ml-2 mb-4'>Related Products</Text>
      <Grid gap={4} sx={1} md={2} lg={4}>
        {
          relatedProducts?.filter(p => p.id !== id).map((item, index) => {
            return (
              <Product
                key={index}
                link={`/product/${slugify(item.name)}`}
                title={item.name}
                price={item.price}
                imageSrc={item.image}
              />
            )
          }).slice(0, 4)
        }
      </Grid>
    </Col>
  )
}
export default RelatedProduct