import Head from 'next/head'
import {fetchInventory} from "../utils/provider/inventoryProvider";
import {FeaturedProducts, FlashSale, HomeBannerCard, MemberServices} from "../layouts/main/pages/home";

const Home = ({inventoryData = []}) => {

  return (
    <>
      <Head>
        <title>Coffin ECommerce</title>
        <meta name="description" content="Coffin ECommerce Next provides a way to quickly get up and running with a fully configurable ECommerce site using Next.js."/>
        <meta property="og:title" content="Coffin ECommerce" key="title"/>
      </Head>
      <HomeBannerCard link={inventoryData[13]} data={inventoryData[13]}/>
      <FeaturedProducts inventoryData={inventoryData}/>
      <FlashSale/>
      <MemberServices/>
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