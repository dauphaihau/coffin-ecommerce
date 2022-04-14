import {fetchInventory} from "../../utils/provider/inventoryProvider";
import Head from "next/head";
import {slugify, titleIfy} from "../../utils/helpers";
import Grid from "../../components/Grid";
import {CategoryCard} from "../../components/Card";

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
          <h1 className="text-3xl laptop:text-5xl font-light">All categories</h1>
        </div>
        <div className="flex flex-col items-center">
          <div className='grid gap-4 grid-cols-1 ipad:grid-cols-2 laptop:grid-cols-3'>
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
          </div>
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