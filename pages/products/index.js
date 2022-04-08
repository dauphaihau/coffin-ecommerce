import {fetchInventory} from "../../utils/provider/inventoryProvider";
import Head from "next/head";
import {slugify} from "../../utils/helpers";
import Filters from "../../components/Filters";
import Sorter from "../../components/Sorter";
import {useFilterContext} from "../../context/filterContext";
import Product from "../../components/Card/Product";

const ProductsPage = ({categories = []}) => {

  const {gridView, filtered_products: products} = useFilterContext()

  return (
    <>
      <Head>
        <title>Coffin ECommerce - All Index</title>
        <meta name="description" content='Coffin ECommerce - All categories'/>
        <meta property="og:title" content="Coffin ECommerce - All Index" key="title"/>
      </Head>
      <div className='grid grid-cols-5'>
        <Filters categories={categories}/>
        <div className="w-full col-span-4">
          <div className="mb-6 flex justify-between">
            <h1 className="text-3xl laptop:text-xl font-light">{products.length} results found</h1>
            <Sorter/>
          </div>
          {/*Products list*/}
          <div className={`${gridView ? 'grid gap-4 grid-cols-1 ipad:grid-cols-2 laptop:grid-cols-3' : ''}`}>
            {products.length == 0
              ? <p>sorry</p>
              : products?.map((item, index) => {
                return (
                  <Product
                    key={index}
                    // link={`${router.asPath}/product/${slugify(item.name)}`}
                    link={`/product/${slugify(item.name)}`}
                    title={item.name}
                    price={item.price}
                    imageSrc={item.image}
                  />
                )
              })
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

export default ProductsPage;