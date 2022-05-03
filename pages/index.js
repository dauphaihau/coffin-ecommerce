import Head from 'next/head'
import {slugify} from '../utils/helpers'
import {fetchInventory} from "../utils/provider/inventoryProvider";
import {HomeBannerCard} from "../core/Card";
import {Button} from "../core/Button";
import {Grid, Text} from "../core";
import {Stack} from "../core/Layout";
import {ProductCard} from "../layout/main/home";

const Home = ({inventoryData = []}) => {

  return (
    <>
      <Head>
        <title>Coffin ECommerce</title>
        <meta name="description"
              content="Coffin ECommerce Next provides a way to quickly get up and running with a fully configurable ECommerce site using Next.js."/>
        <meta property="og:title" content="Coffin ECommerce" key="title"/>
      </Head>
      <HomeBannerCard link={inventoryData[13]} data={inventoryData[13]}/>
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
      <div>
        <Stack>
          <Text>
            Flash sale
          </Text>

        </Stack>
      </div>
      <div
        className="my-8 ipad:my-12 laptop:my-16 desktop:my-20 3xl:my-24 pb-5 laptop:pb-3.5 2xl:pb-5 pt-3 laptop:pt-1.5 2xl:pt-2 3xl:pt-3 text-center">
        <div className="max-w-md mx-auto mb-4 ipad:mb-5 desktop:mb-8 2xl:mb-10 3xl:mb-12">
          <h3
            className="text-heading text-lg ipad:text-xl laptop:text-2xl 2xl:text-3xl desktop:leading-10 font-bold mb-2 ipad:mb-3 laptop:mb-3.5">
            Talk To A Real Person
          </h3>
          <p className="text-body text-xs ipad:text-sm leading-6 ipad:leading-7">Are you on the fence?
            Have a question? Need a recommendation? Member Services is always here to help. Send us a message.</p>
        </div>
        <div
          className='mb-2.5 ipad:mb-0 desktop:mb-2 2xl:mb-4 3xl:mb-6 ipad:px-20 laptop:px-40 desktop:px-0 flex justify-center'>
          <img src="/images/people.png" width={700} alt="people"/>
        </div>
        <div className='px-6 laptop:px-0'>
          <Button>Chat With Member Services</Button>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const inventory = await fetchInventory()

  const inventoryCategorized = inventory.reduce((acc, next) => {
    const categories = next.categories;
    categories.forEach(c => {
      const index = acc.findIndex(item => item.name === c)
      if (index !== -1) {
        const item = acc[index]
        item.itemCount = item.itemCount + 1
        acc[index] = item
      } else {
        const item = {
          name: c,
          image: next.image,
          itemCount: 1
        }
        acc.push(item)
      }
    })
    return acc
  }, [])

  return {
    props: {
      inventoryData: inventory,
      categories: inventoryCategorized
    }
  }
}

export default Home