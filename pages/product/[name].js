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
import Product from "../../components/Product";

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
      <div className=" sm:py-12 md:flex-row py-4 w-full flex flex-1 flex-col my-0 mx-auto">
        <div className="w-full md:w-1/2 h-120 flex flex-1
        {/*bg-light hover:bg-light-200*/}
        ">
          <div className="py-16 p10 flex flex-1 justify-center items-center">
            <img src={image} alt="Inventory item"/>
          </div>
        </div>
        <div className="pt-2 px-0 ipad:pl-10 pb-8 w-full md:w-1/2">
          <h1 className=" sm:mt-0 mt-2 text-5xl font-light leading-large pb-6">{name}</h1>
          <p className="text-gray-600 leading-7 pb-6">
            <ShowMoreTextToggler text={description}/>
          </p>
          <h2 className="text-4xl font-bold tracking-wide">${salePrice}
            {price
              && <span
                className="absolute ml-[10px] line-through text-gray-400 font-light text-sm md:text-base lg:text-sm xl:text-xl ps-2">
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
        <h1 className='text-2xl font-bold pl-2'>Related Products</h1>
        <div className="flex flex-1 flex-wrap flex-row">
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
  console.log('paths', paths)
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