import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import './Head.css'

import { functionOfGettingCurrency, sortFunction } from '../redux/reducers/products'

const Head = () => {

  const dispatch = useDispatch()

  const { allAmount, allProductPrice } = useSelector((s) => s.add_products)
  const { currencyOfProduct } = useSelector((store) => store.products)
const allPrice = (allProductPrice * currencyOfProduct[1]).toFixed(2)

const [toggled, setToggled] = useState({
  name: true,
  price: true
})

const moneyValue = ['USD', 'EUR', 'CAD']

const onClickButtonForCurrencyPrice = (money) => {
 return dispatch(functionOfGettingCurrency(money))
}


const clickSortByNameOrPrice = (sortType )=> {
  if (sortType === 'name') {
    setToggled((prev) => ({ ...prev, name: !prev.name }))
    console.log(toggled)
    return dispatch(sortFunction(sortType, toggled.name))
  }
  if (sortType === 'price') {
    setToggled((prev) => ({ ...prev, price: !prev.price }))
    console.log(toggled)
    return dispatch(sortFunction(sortType, toggled.price))
  }
  return console.log('error code')
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
          onClick={() => clickSortByNameOrPrice('price')}
          className="head-wrapper__sort-button"
          id="sort-price"
          type="button"
        >
          Sort-price<span>{toggled.price ? '⇑' : '⇓'}</span>
        </button>
        <button
          onClick={() => clickSortByNameOrPrice('name')}
          className="head-wrapper__sort-button"
          id="sort-name"
          type="button"
        >
          Sort-name<span>{toggled.name ? '⇑' : '⇓'}</span>
        </button>
      </div>
      <div className="head-wrapper__price-with-button">
        amount: {allAmount} All price: {allPrice} {currencyOfProduct[0]}
        <Link className="head-wrapper__basket-button" to="/basket">
          <span id="order-count">basket</span>
        </Link>
      </div>
    </div>
  )
  }

export default React.memo(Head)
