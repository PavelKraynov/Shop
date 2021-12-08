import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import './Head.css'

import { functionOfGettingCurrency, functionSortByPrice } from '../redux/reducers/products'

const Head = () => {



  const dispatch = useDispatch()

  const { allAmount , allProductPrice} = useSelector((s) => s.add_products)
  const { currencyOfProduct } = useSelector((store) => store.products)
const onClickButtonForCurrencyPrice = (money) => {
 return dispatch(functionOfGettingCurrency(money))
}


const clickSortByPrice = () => {
  return dispatch(functionSortByPrice())
}
  return (
    <div className="head-wrapper">
      <div className="head-wrapper__shop">
        <Link to="/">Shop</Link>
      </div>
      <div className="head-wrapper__exchange">
        <div className="head-wrapper__exchange-button">
          <button onClick={() => onClickButtonForCurrencyPrice('USD')} type="button">
            USD
          </button>
        </div>
        <div className="head-wrapper__exchange-button">
          <button onClick={() => onClickButtonForCurrencyPrice('EUR')} type="button">
            EUR
          </button>
        </div>
        <div className="head-wrapper__exchange-button">
          <button onClick={() => onClickButtonForCurrencyPrice('CAD')} type="button">
            CAD
          </button>
        </div>
      </div>
      <div className="head-wrapper__sort">
        <button
          onClick={clickSortByPrice}
          className="head-wrapper__sort-button"
          id="sort-price"
          type="button"
        >
          Sort-price
        </button>
        <button className="head-wrapper__sort-button" id="sort-name" type="button">
          Sort-name
        </button>
      </div>
      <div>
        amount: {allAmount} All price: {(allProductPrice * currencyOfProduct[1]).toFixed(2)} {' '}
        {currencyOfProduct[0]}
        <Link to="/basket">
          <span className="head-wrapper__basket" id="order-count">
            basket
          </span>
        </Link>
      </div>
    </div>
  )
  }

export default React.memo(Head)
