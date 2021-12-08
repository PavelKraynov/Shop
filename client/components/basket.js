import React from 'react'

import { useSelector } from 'react-redux'
import './basket.css'

import Head from './Head'
import BasketProduct from './basketProduct'


const Basket = () => {
  const { allProductPrice } = useSelector((s) => s.add_products)
  const productsInBasket = useSelector((s) => s.add_products.basketProducts)
  const { currencyOfProduct } = useSelector((store) => store.products)
  const { addProductsList } = useSelector((s) => s.add_products)


  return (
    <div>
      <Head />
      {productsInBasket.map((basketProd) => {
        return (
          <div key={basketProd.id} className="product-in-basket">
            <div>
              <BasketProduct basketProd={basketProd} />
            </div>
            <div>
              Price{' '}
              {(
                (basketProd.price * currencyOfProduct[1]).toFixed(2) *
                addProductsList[basketProd.id]?.amount
              ).toFixed(2)}{' '}
              {''} {currencyOfProduct[0]}
            </div>
          </div>
        )
      })}
      <hr />
      <div className = 'product-in-basket-all-price'>
        all for all product {allProductPrice} {currencyOfProduct[0]}
      </div>
    </div>
  )
}

export default Basket
