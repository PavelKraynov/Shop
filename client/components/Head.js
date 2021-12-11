import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import './Head.css'

import { functionOfGettingCurrency, functionSort } from '../redux/reducers/products'

const Head = () => {



  const dispatch = useDispatch()

  const { allAmount , allProductPrice} = useSelector((s) => s.add_products)
  const { currencyOfProduct, order } = useSelector((store) => store.products)


const moneyValue = ['USD', 'EUR', 'CAD']

const onClickButtonForCurrencyPrice = (money) => {
 return dispatch(functionOfGettingCurrency(money))
}


const clickSortByPriceOrName = (price, orderSorted ) => {
  return dispatch(functionSort(price, orderSorted * -1))
}
  return (
    <div className="head-wrapper">
      <div className="head-wrapper__shop">
        <Link to="/">Shop</Link>
      </div>
      <div className="head-wrapper__exchange">
        {moneyValue.map((it) => {
          return (
            <button
              key={it}
              type="button"
              className="head-wrapper__exchange-button"
              onClick={() => onClickButtonForCurrencyPrice(it)}
            >
              {it}
            </button>
          )
        })}
      </div>
      <div className="head-wrapper__sort">
        <button
          onClick={() => clickSortByPriceOrName('price', order)}
          className="head-wrapper__sort-button"
          id="sort-price"
          type="button"
        >
          Sort-price
        </button>
        <button
          onClick={() => clickSortByPriceOrName('name', order)}
          className="head-wrapper__sort-button"
          id="sort-name"
          type="button"
        >
          Sort-name
        </button>
      </div>
      <div className="head-wrapper__price-with-button">
        amount: {allAmount} All price: {(allProductPrice * currencyOfProduct[1]).toFixed(2)}{' '}
        {currencyOfProduct[0]}
        <Link className="head-wrapper__basket-button" to="/basket">
          <span id="order-count">basket</span>
        </Link>
      </div>
    </div>
  )
  }

export default React.memo(Head)
