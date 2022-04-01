import Head from 'next/head'
import {Center, Footer, Tag, Showcase, Button} from '../components'
import {titleIfy, slugify} from '../utils/helpers'
import {fetchInventory} from "../utils/provider/inventoryProvider";
import ProductCard from "../components/hero/ProductCard";
import CategoryCard from "../components/hero/CategoryCard";
import {useRouter} from "next/router";

const Home = ({inventoryData = [], categories: categoryData = []}) => {
  const router = useRouter()
  const inventory = inventoryData.slice(0, 4)
  const categories = categoryData.slice(0, 2)

  return (
    <>
      <div className="w-full">
        <Head>
          <title>Coffin ECommerce</title>
          <meta name="description"
                content="Coffin ECommerce Next provides a way to quickly get up and running with a fully configurable ECommerce site using Next.js."/>
          <meta property="og:title" content="Coffin ECommerce" key="title"/>
        </Head>
        <div className="bg-gray-100 p-6 pb-10 smpb-6 flex lg:flex-row flex-col rounded-lg">
          <div className="pt-4 pl-2 sm:pt-12 sm:pl-12 flex flex-col">
            <div className="border-l border-gray-900 px-3 pt-1 mb-10">
              <p className="text-xs tracking-wider m-0 leading-tight">COFFIN</p>
              <p className="text-xs tracking-wider m-0 leading-tight">2022</p>
            </div>
            {/*<Center*/}
            {/*  price="200"*/}
            {/*  title={inventory[2].name}*/}
            {/*  link={`/product/${slugify(inventory[2].name)}`}*/}
            {/*/>*/}
            <div>
              <p className="text-4xl xl:text-5xl font-bold tracking-widest leading-none">
                White Chased Solid
                {/*{inventory[2].name}*/}
              </p>
              <p className="py-6 tracking-wide">FROM <span>$2000</span></p>
              <Button onClick={() => router.push(`/product/${slugify(inventory[2].name)}`)}>Shop Now</Button>
            </div>
            <div className="flex flex-1 flex-col justify-end pb-10 mt-4">
              <p className="font-light text-xs tracking-tight m-0 leading-tight mb-2">Design by</p>
              <p className="text-xxs font-semibold tracking-tight m-0 leading-tight">Unknown</p>
            </div>
          </div>
          <div className="flex flex-1 justify-center items-center relative">
            {/*<Showcase*/}
            {/*  imageSrc={inventory[2].image}*/}
            {/*/>*/}
            <div className="z-10">
              <img src={inventory[2].image} className="w-[23rem]" alt="Showcase item"/>
            </div>
            {/*<div className="absolute*/}
            {/*  w-48 h-48 sm:w-72 sm:h-72 xl:w-88 xl:h-88*/}
            {/*  bg-white z-0 rounded-full" />*/}
          </div>
        </div>
      </div>
      <div className=" lg:my-8 lg:grid-cols-2 grid-cols-1 grid gap-4 my-4">
        <CategoryCard
          imageSrc={categories[0].image}
          subtitle={`${categories[0].itemCount} items`}
          title={titleIfy(categories[0].name)}
          link={`/category/${slugify(categories[0].name)}`}
        />
        <CategoryCard
          imageSrc={categories[1].image}
          subtitle={`${categories[1].itemCount} items`}
          title={titleIfy(categories[1].name)}
          link={`/category/${slugify(categories[1].name)}`}
        />
      </div>

      <h1 className='text-3xl mb-4'> Featured Products</h1>
      <div className='grid grid-cols-2 gap-x-4'>
        <div>
          <ProductCard
            imageSrc={inventory[2].image}
            title={inventory[2].name}
            subtitle={inventory[2].categories[0]}
            link={`/product/${slugify(inventory[2].name)}`}
          />
        </div>
        <div>
          <div className="grid grid-cols-2 gap-x-4">
            <ProductCard
              imageSrc={inventory[2].image}
              title={inventory[2].name}
              subtitle={inventory[2].categories[0]}
              link={`/product/${slugify(inventory[2].name)}`}
            />
            <ProductCard
              imageSrc={inventory[2].image}
              title={inventory[2].name}
              subtitle={inventory[2].categories[0]}
              link={`/product/${slugify(inventory[2].name)}`}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-4 mt-4">
            <ProductCard
              imageSrc={inventory[2].image}
              title={inventory[2].name}
              subtitle={inventory[2].categories[0]}
              link={`/product/${slugify(inventory[2].name)}`}
            />
            <ProductCard
              imageSrc={inventory[2].image}
              title={inventory[2].name}
              subtitle={inventory[2].categories[0]}
              link={`/product/${slugify(inventory[2].name)}`}
            />
          </div>
        </div>
      </div>


      <div
        className="my-8 md:my-12 lg:my-16 xl:my-20 3xl:my-24 pb-5 lg:pb-3.5 2xl:pb-5 pt-3 lg:pt-1.5 2xl:pt-2 3xl:pt-3 text-center">
        <div className="max-w-md mx-auto mb-4 md:mb-5 xl:mb-8 2xl:mb-10 3xl:mb-12">
          <h3
            className="text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 font-bold mb-2 md:mb-3 lg:mb-3.5">
            Talk To A Real Person
          </h3>
          <p className="text-body text-xs md:text-sm leading-6 md:leading-7">Are you on the fence?
            Have a question? Need a recommendation? Member Services is always here to help. Send us a message.</p>
        </div>
        <div className='mb-2.5 md:mb-0 xl:mb-2 2xl:mb-4 3xl:mb-6 md:px-20 lg:px-40 xl:px-0 flex justify-center'>
          <img src="/images/people.png" width={700} alt="people"/>
        </div>
        <Button>Chat With Member Services</Button>
      </div>

      {/*<div className="pt-10 pb-6 flex flex-col items-center">*/}
      {/*  <h2 className="text-4xl mb-3">Trending Now</h2>*/}
      {/*  <p className="text-gray-600 text-sm">Find the perfect piece or accessory to finish off your favorite room in the*/}
      {/*    house.</p>*/}
      {/*</div>*/}
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