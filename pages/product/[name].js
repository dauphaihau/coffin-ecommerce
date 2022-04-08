import {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import Head from 'next/head'

import {Button} from "../../components";
import inventoryForCategory from "../../utils/inventoryForCategory";
import {useAuth} from "../../context/authContext";
import {useUtil} from "../../context/utilContext";
import QuantityPicker from "../../components/Button/QuantityPicker";
import {fetchInventory} from "../../utils/provider/inventoryProvider";
import {slugify} from "../../utils/helpers";
import {ContextProviderComponent, SiteContext} from "../../context/mainContext";
import ShowMoreTextToggler from "../../components/Button/ShowMoreTextToggler";
import Product from "../../components/Card/Product";

const ItemView = (props) => {
  const [relatedProducts, setRelatedProducts] = useState()
  const [numberOfItems, updateNumberOfItems] = useState(1)
  const {product} = props
  const {price, image, name, description, salePrice, id} = product
  const router = useRouter();
  const {context: {addToCart, numberAllOfItemsInCart}} = props
  const {closeDrawerModal} = useUtil();
  const {user, setUser,} = useAuth();

  useEffect(() => {
    loadInit()
  }, [router.asPath])

  // console.log('number-all-of-items-in-cart', numberAllOfItemsInCart)
  // console.log('user', user)

  useEffect(() => {
    setUser({...user, numberAllOfItemsInCart})
  }, [numberAllOfItemsInCart])

  const loadInit = async () => {
    const res = await inventoryForCategory(product.categories[0]);
    setRelatedProducts(res);
    updateNumberOfItems(1);
    closeDrawerModal();
  }

  const addItemToCart = (product) => {
    product["quantity"] = numberOfItems
    addToCart(product)
  }

  const increment = () => {
    updateNumberOfItems(numberOfItems + 1)
  }

  const decrement = () => {
    if (numberOfItems === 1) return
    updateNumberOfItems(numberOfItems - 1)
  }

  return (
    <>
      <Head>
        <title>Coffin ECommerce - {name}</title>
        <meta name="description" content={description}/>
        <meta property="og:title" content={`Coffin ECommerce - ${name}`} key="title"/>
      </Head>

      {/*<Breadcrumb/>*/}
      <div className="py-12 ipad:flex-row py-4 w-full flex flex-1 flex-col my-0 mx-auto">
        <div className="w-full ipad:w-1/2 h-120 flex flex-1">
          <div className="py-16 p10 flex flex-1 justify-center items-center">
            <img src={image} alt="Inventory item"/>
          </div>
        </div>
        <div className="pt-2 px-0 ipad:pl-10 pb-8 w-full ipad:w-1/2">
          <h1 className="mt-0 mt-2 text-2xl mb-3.5
          ipad:text-2xl laptop:text-4xl font-light leading-large ">{name}</h1>
          <ShowMoreTextToggler limit={400} classes='block laptop:hidden text-sm' text={description}/>
          <p className='mt-6 text-gray-600 leading-7 pb-6 hidden laptop:block'>
              {description}
          </p>
          <h2 className="text-xl ipad:text-2xl laptop:text-4xl font-bold tracking-wide relative
          ">${salePrice ? salePrice : price}
            {price && salePrice
              && <span
                className="absolute top-[-3px] ipad:top-[1px] ml-[10px] line-through text-gray-400 font-light
                 text-sm ipad:text-lg lg:text-sm xl:text-xl ps-2">
              ${price}</span>}
          </h2>
          <div className="my-6">
            <QuantityPicker
              increment={increment}
              decrement={decrement}
              numberOfItems={numberOfItems}
            />
          </div>
          <Button onClick={() => addItemToCart(product)}>Add to Cart</Button>
        </div>
      </div>
      <div>
        <h1 className='text-lg ipad:text-2xl font-bold pl-2'>Related Products</h1>
        <div className='grid gap-4 grid-cols-1 ipad:grid-cols-2 laptop:grid-cols-4'>
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
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const inventory = await fetchInventory()
  const paths = inventory.map(item => {
    return {params: {name: slugify(item.name)}}
  })
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({params}) {
  const name = params.name.replace(/-/g, " ")
  const inventory = await fetchInventory()
  const product = inventory.find(item => slugify(item.name) === slugify(name))

  return {
    props: {
      product,
    }
  }
}

function ItemViewWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {context => <ItemView {...props} context={context}/>}
      </SiteContext.Consumer>
    </ContextProviderComponent>
  )
}

export default ItemViewWithContext