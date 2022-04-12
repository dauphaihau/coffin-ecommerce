import React, {createContext, Component} from 'react'
// import {toast} from "react-toastify";
import {STORAGE_KEY} from "../utils/constant";
import {calculateTotal, sumAllProduct} from "../utils/helpers";
import {toast} from "react-hot-toast";

const initialState = {
  cart: [],
  numberOfItemsInCart: 0,
  numberAllOfItemsInCart: 0,
  total: 0,
}

const CartContext = createContext(initialState)

class CartProvider extends Component {

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const storageState = window.localStorage.getItem(STORAGE_KEY)
      if (!storageState) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
      }
    }
  }

  setItemQuantity = (item) => {
    const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    const {cart} = storageState
    const index = cart.findIndex(cartItem => cartItem.id === item.id)
    cart[index].quantity = item.quantity

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      cart, numberOfItemsInCart: cart.length,
      numberAllOfItemsInCart: sumAllProduct(cart),
      total: calculateTotal(cart)
    }))
    this.forceUpdate()
  }

  addToCart = (item) => {
    const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    const {cart} = storageState
    if (cart.length) {
      const index = cart.findIndex(cartItem => cartItem.id === item.id)
      if (index >= Number(0)) {
        cart[index].quantity = cart[index].quantity + item.quantity
      } else {
        cart.push(item)
      }
    } else {
      cart.push(item)
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      cart, numberOfItemsInCart: cart.length,
      numberAllOfItemsInCart: sumAllProduct(cart),
      total: calculateTotal(cart)
    }))
    toast.success('Added item to cart')
    this.forceUpdate()
  }

  removeFromCart = (item) => {
    const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    let {cart} = storageState
    cart = cart.filter(c => c.id !== item.id)

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      cart,
      numberAllOfItemsInCart: sumAllProduct(cart),
      numberOfItemsInCart: cart.length,
      total: calculateTotal(cart)
    }))
    this.forceUpdate()
  }

  clearCart = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
    this.forceUpdate()
  }

  render() {
    let state = initialState
    if (typeof window !== 'undefined') {
      const storageState = window.localStorage.getItem(STORAGE_KEY)
      if (storageState) {
        state = JSON.parse(storageState)
      }
    }

    return (
      <CartContext.Provider value={{
        ...state,
        addToCart: this.addToCart,
        clearCart: this.clearCart,
        removeFromCart: this.removeFromCart,
        setItemQuantity: this.setItemQuantity
      }}>
        {this.props.children}
      </CartContext.Provider>
    )
  }
}

export {CartContext, CartProvider}