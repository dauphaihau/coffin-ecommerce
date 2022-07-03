import {useEffect, useState} from 'react'
import {useRouter} from "next/router";

import inventoryForCategory from "../../utils/inventoryForCategory";
import {useAuth} from "../../context/authContext";
import {useUIController} from "../../context/UIControllerContext";
import {fetchInventory} from "../../utils/provider/inventoryProvider";
import {slugify} from "../../utils/helpers";
import {CartProvider, CartContext} from "../../context/cartContext";
import {CustomerReview, ProductFaq, ProductInfo, ProductRelated} from "../../layouts/main/pages/product";

const ProductPage = (props) => {
  const router = useRouter();
  const [relatedProducts, setRelatedProducts] = useState()
  const [numberOfItems, updateNumberOfItems] = useState(1)
  const {product} = props
  const {id} = product
  const {context: {addToCart, numberAllOfItemsInCart, setItemQuantity}} = props
  const {closeDrawerModal, dispatch} = useUIController();
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
    addToCart(product);
    dispatch({type: 'OPEN_CART_DRAWER'})
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
      {/*<Breadcrumb/>*/}
      <ProductInfo
        product={product} increment={increment}
        decrement={decrement}
        numberOfItems={numberOfItems}
        addItemToCart={addItemToCart}
      />
      <ProductRelated relatedProducts={relatedProducts} id={id}/>
      <ProductFaq/>
      <CustomerReview/>
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
        {context => <ProductPage {...props} context={context}/>}
      </CartContext.Consumer>
    </CartProvider>
  )
}

export default ProductWithContext