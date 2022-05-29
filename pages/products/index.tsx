import Head from "next/head";
import {useEffect, useState} from "react";

import {fetchInventory} from "../../utils/provider/inventoryProvider";
import {slugify} from "../../utils/helpers";
import {useFilterContext} from "../../context/filterContext";
import {useUIController} from "../../context/UIControllerContext";
import {Button} from "../../core/Button";
import {Filters, ProductListView, Sorter} from "../../layouts/main/pages/products";
import {Text} from "../../core";
import {Grid, Row} from "../../core/Layout";
import {uiControllerActionsType} from "../../store/reducers/uiControllerReducer";
import Product from "../../layouts/main/common/Product";

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
        <Grid gap={4} sx={1} md={2} lg={3}>
          {
            products?.map((item: any, index) => (
                <Product
                  key={index}
                  // link={`${router.asPath}/product/${slugify(item.name)}`}
                  link={`/product/${slugify(item.name)}`}
                  title={item.name}
                  price={item.price}
                  imageSrc={item.image}
                  imageHover={item?.image2}
                />
              )
            ).slice(0, state)
          }
        </Grid>
      )
    }
    return (
      <Grid sx={1}>
        {
          products?.map((item: any, index) => (
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
      </Grid>
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
        <Grid sx={5} classes='min-h-full'>
          <Filters categories={categories} quantityProd={products.length}/>
          <div className="w-full col-span-4">
            <Row justify='between' classes="mb-6">
              <Text h1 classes="text-3xl laptop:text-xl font-light">{products.length} results found</Text>
              <Sorter/>
            </Row>
            {products.length < 1
              ? <Text>Sorry, no products matched your search...</Text>
              : <>
                {renderProductList()}
                {products.length > 9 &&
                  <Row justify='center' classes='mt-8'>
                    {products.length > state &&
                      <Button variant='gray' onClick={() => setState(state + 6)}>Load more</Button>}
                  </Row>
                }
              </>
            }
          </div>
        </Grid>
      </div>
      {/*Mobile - Ipad version*/}
      <div className='laptop:hidden'>
        <div className='mb-4 flex justify-between gap-x-8'>
          <Button
            classes='py-[7px] w-fit bg-white text-black border-[1px] border-[#d2d5da]'
            onClick={() => dispatch({type: uiControllerActionsType.OPEN_FILTER_DRAWER})}
          >
            <i className="fa-solid fa-sliders mr-2"/>
            Filter</Button>
          <Sorter/>
        </div>
        {products.length < 1
          ? <Text classes='mt-12'>Sorry, no products matched your search...</Text>
          : <>
            <Grid sx={2} md={2} gap={4}>
            {/*<div className='grid gap-4 grid-cols-2 ipad:grid-cols-2'>*/}
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
            </Grid>
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