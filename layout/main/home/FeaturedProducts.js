import {Grid, Text} from "../../../core";
import {ProductCard} from "./index";
import {slugify} from "../../../utils/helpers";

const FeaturedProducts = ({inventoryData}) => {
    return (
      <div className='my-12'>
        <Text h1 classes='text-3xl mb-4'> Featured Products</Text>
        <Grid md='2' gapx='4'>
          <div className='hidden laptop:block'>
            <ProductCard
              full
              imageSrc={inventoryData[1].image}
              title={inventoryData[1].name}
              subtitle={inventoryData[1].categories[0]}
              link={`/product/${slugify(inventoryData[1].name)}`}
              description={inventoryData[1].description}
              price={inventoryData[1].price}
              salePrice={inventoryData[1].salePrice}
            />
          </div>
          <div>
            <Grid md='2' gap='4'>
              <ProductCard
                imageSrc={inventoryData[7].image}
                title={inventoryData[7].name}
                subtitle={inventoryData[7].categories[0]}
                link={`/product/${slugify(inventoryData[7].name)}`}
                description={inventoryData[7].description}
                price={inventoryData[7].price}
                salePrice={inventoryData[7].salePrice}
              />
              <ProductCard
                imageSrc={inventoryData[3].image}
                title={inventoryData[3].name}
                subtitle={inventoryData[3].categories[0]}
                link={`/product/${slugify(inventoryData[3].name)}`}
                description={inventoryData[3].description}
                price={inventoryData[3].price}
                salePrice={inventoryData[3].salePrice}
              />
            </Grid>
            <Grid md='2' gap='4' classes='mt-4'>
              <ProductCard
                imageSrc={inventoryData[9].image}
                title={inventoryData[9].name}
                subtitle={inventoryData[9].categories[0]}
                link={`/product/${slugify(inventoryData[9].name)}`}
                description={inventoryData[9].description}
                price={inventoryData[9].price}
                salePrice={inventoryData[9].salePrice}
              />
              <ProductCard
                imageSrc={inventoryData[10].image}
                title={inventoryData[10].name}
                subtitle={inventoryData[10].categories[0]}
                link={`/product/${slugify(inventoryData[10].name)}`}
                description={inventoryData[10].description}
                price={inventoryData[10].price}
                salePrice={inventoryData[10].salePrice}
              />
            </Grid>
          </div>
        </Grid>
      </div>
    );
}

export default FeaturedProducts;