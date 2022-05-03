import Head from "next/head";
import {fetchInventory} from "../../utils/provider/inventoryProvider";
import {slugify, titleIfy} from "../../utils/helpers";
import {CategoryCard} from "../../core/Card";
import {Grid} from "../../core";
import Text from "../../core/Text";

const Categories = ({categories = []}) => {
  return (
    <>
      <Head>
        <title>Coffin ECommerce - All Index</title>
        <meta name="description" content='Coffin ECommerce - All categories'/>
        <meta property="og:title" content="Coffin ECommerce - All Index" key="title"/>
      </Head>
      <div className="w-full">
        <div className="pt-4 pt-0 laptop:pt-10 pb-8">
          <Text h1 sx='3xl' lg='5xl' weight='light'>All categories</Text>
        </div>
        <div className="flex-center">
          <Grid sx={1} md={2} lg={3} gap={4}>
            {
              categories.map((category, index) => (
                <CategoryCard
                  key={index}
                  imageSrc={category.image}
                  subtitle={`${category.itemCount} items`}
                  title={titleIfy(category.name)}
                  link={`/categories/${slugify(category.name)}`}
                />
              ))
            }
          </Grid>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const inventory = await fetchInventory()
  const inventoryCategories = inventory.reduce((acc, next) => {
    const categories = next.categories
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
      categories: inventoryCategories
    }
  }
}

export default Categories;