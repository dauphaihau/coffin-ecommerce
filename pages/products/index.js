import Head from "next/head";
import {useEffect, useState} from "react";

import {fetchInventory} from "../../utils/provider/inventoryProvider";
import {slugify} from "../../utils/helpers";
import {useFilterContext} from "../../context/filterContext";
import {useUIController} from "../../context/UIControllerContext";
import {Button} from "../../components/Button";
import {Product, ProductListView} from "../../components/Card";
import {Filters, Sorter} from "../../components";

const ProductsPage = ({categories = []}) => {

  const {gridView, filtered_products: products} = useFilterContext()
  const [state, setState] = useState(9)
  const {dispatch, setCategories} = useUIController();

  useEffect(() => {
    setCategories(categories)
  }, [])

  useEffect(() => {
    setState(9)
  }, [products])

  const renderProductList = () => {
    if (gridView) {
      return (
        <div className='grid gap-4 grid-cols-1 ipad:grid-cols-2 laptop:grid-cols-3'>
          {
            products?.map((item, index) => (
                <Product
                  key={index}
                  // link={`${router.asPath}/product/${slugify(item.name)}`}

                  link={`/product/${slugify(item.name)}`}
                  title={item.name}
                  price={item.price}
                  imageSrc={item.image}
                />
              )
            ).slice(0, state)
          }
        </div>
      )
    }
    return (
      <div className='grid grid-cols-1'>
        {
          products?.map((item, index) => (
            <ProductListView
              key={index}
              // link={`${router.asPath}/product/${slugify(item.name)}`}
              link={`/product/${slugify(item.name)}`}
              title={item.name}
              description={item.description}
              price={item.price}
              imageSrc={item.image}
            />
          )).slice(0, state)
        }
      </div>
    )
  }

  return (
    <>
      <div className='hidden laptop:block'>
        <Head>
          <title>Coffin ECommerce - All Index</title>
          <meta name="description" content='Coffin ECommerce - All categories'/>
          <meta property="og:title" content="Coffin ECommerce - All Index" key="title"/>
        </Head>
        <div className='grid grid-cols-5 min-h-full'>
          <Filters categories={categories} launchSticky={products.length > 6}/>
          <div className="w-full col-span-4">
            <div className="mb-6 flex justify-between">
              <h1 className="text-3xl laptop:text-xl font-light">{products.length} results found</h1>
              <Sorter/>
            </div>
            {products.length < 1
              ? <p>Sorry, no products matched your search...</p>
              : <>
                {renderProductList()}
                {products.length > 9 &&
                  <div className='flex justify-center mt-8'>
                    {products.length > state &&
                      <Button onClick={() => setState(state + 6)}>Load more</Button>}
                  </div>
                }
              </>
            }
          </div>
        </div>
      </div>

      {/*Mobile - Ipad version*/}
      <div className='laptop:hidden'>
        <div className='mb-4 flex justify-between gap-x-8'>
          <Button
            classes='py-[7px] w-fit bg-white text-black border-[1px] border-[#d2d5da] font-bold'
            onClick={() => dispatch({type: 'OPEN_FILTER_DRAWER'})}
          >
            <i className="fa-solid fa-sliders mr-2"/>
            Filter</Button>
          <Sorter/>
        </div>
        {products.length < 1
          ? <p className='mt-12'>Sorry, no products matched your search...</p>
          : <>
            <div className='grid gap-4 grid-cols-2 ipad:grid-cols-2'>
              {
                products?.map((item, index) => (
                    <Product
                      key={index}
                      // link={`${router.asPath}/product/${slugify(item.name)}`}
                      link={`/product/${slugify(item.name)}`}
                      title={item.name}
                      price={item.price}
                      imageSrc={item.image}
                    />
                  )
                ).slice(0, state)
              }
            </div>
          </>}
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