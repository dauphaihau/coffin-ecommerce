import {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import Head from 'next/head'

import inventoryForCategory from "../../utils/inventoryForCategory";
import {useAuth} from "../../context/authContext";
import {useUIController} from "../../context/UIControllerContext";
import {fetchInventory} from "../../utils/provider/inventoryProvider";
import {slugify} from "../../utils/helpers";
import {CartProvider, CartContext} from "../../context/cartContext";
import {Button, QuantityPicker, ShowMoreTextToggler} from "../../components/Button";
import {Product as ProductCard} from "../../components/Card";
import {Image} from "../../components";
import Text from "../../components/Text";

const Product = (props) => {
  const [relatedProducts, setRelatedProducts] = useState()
  const [numberOfItems, updateNumberOfItems] = useState(1)
  const {product} = props
  const {price, image, name, description, salePrice, id, quantity} = product
  const router = useRouter();
  const {context: {addToCart, numberAllOfItemsInCart}} = props
  const {closeDrawerModal} = useUIController();
  const {user, setUser} = useAuth();

  useEffect(() => {
    const loadInit = async () => {
      const res = await inventoryForCategory(product.categories[0]);
      setRelatedProducts(res);
      updateNumberOfItems(1);
      closeDrawerModal();
    }
    loadInit()
  }, [router.asPath])

  useEffect(() => {
    setUser({...user, numberAllOfItemsInCart})
  }, [numberAllOfItemsInCart])

  const addItemToCart = (product) => {
    product["quantity"] = numberOfItems
    addToCart(product)
  }

  const increment = () => {
    // if (numberOfItems === quantity) return ;
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
      <div className="py-12 ipad:flex-row w-full flex  flex-col my-0 mx-auto">
        <div className="w-full ipad:w-1/2 h-120 flex ">
          <div className="py-16 p-10 flex-center flex-1">
            <Image
              src={image} alt='product'
              classesSize=' w-[300px] laptop:w-[500px] h-[300px] laptop:h-[500px]'
            />
          </div>
        </div>
        <div className="pt-2 px-0 ipad:pl-10 pb-8 w-full ipad:w-1/2">
          <Text h1 sx='2xl' md='2xl' lg='4xl' weight='light' classes='mt-2 mb-3.5'>{name}</Text>
          <ShowMoreTextToggler limit={400} classes='block laptop:hidden text-sm' text={description}/>
          <Text color='gray-600' classes='my-6 leading-7 hidden laptop:block'>{description}</Text>
          <Text sx='2xl' md='3xl' lg='4xl' weight='bold' classes='relative tracking-wide'>
            ${salePrice ? salePrice : price}
            {
              price
              && salePrice
              && (
                <Text
                  span sx='base' md='base' color='gray-400' weight='light'
                  classes="absolute top-[-1%] ipad:top-[1px] ml-[10px] line-through">
                  ${price}
                </Text>
              )
            }
          </Text>
          <div className="my-6">
            <QuantityPicker
              theme='white'
              bordered
              increment={increment}
              decrement={decrement}
              numberOfItems={numberOfItems}
            />
            {/*<Text  classes='mt-3'>Available: {quantity}</Text>*/}
        </div>
          <Button onClick={() => addItemToCart(product)}>Add to Cart</Button>
        </div>
      </div>

      <div>
        <Text sx='lg' md='2xl' weight='bold' classes='ml-2 mb-4'>Related Products</Text>
        <div className='grid gap-4 grid-cols-1 ipad:grid-cols-2 laptop:grid-cols-4'>
          {
            relatedProducts?.filter(p => p.id !== id).map((item, index) => {
              return (
                <ProductCard
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

function ProductWithContext(props) {
  return (
    <CartProvider>
      <CartContext.Consumer>
        {context => <Product {...props} context={context}/>}
      </CartContext.Consumer>
    </CartProvider>
  )
}

export default ProductWithContext