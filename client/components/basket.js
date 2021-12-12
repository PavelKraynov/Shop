import React from 'react'

import { useSelector } from 'react-redux'
import './basket.css'

import Head from './Head'
import BasketProduct from './basketProduct'


const Basket = () => {
  const { allProductPrice } = useSelector((s) => s.add_products)
  const { addProductsList } = useSelector((s) => s.add_products)
  const { currencyOfProduct } = useSelector((store) => store.products)

 const allPrice = (allProductPrice * currencyOfProduct[1]).toFixed(2)
  return (
    <div>
      <Head />
      <BasketProduct data={Object.keys(addProductsList)} />
      <hr />
      <div className="product-in-basket-all-price">
        all for all product {allPrice} {currencyOfProduct[0]}
      </div>
    </div>
  )
}

export default Basket
