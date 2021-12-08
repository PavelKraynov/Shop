import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { addProducts, addToBusketFunc, deletedProdFunc } from '../redux/reducers/add_products'


const BasketProduct = (props) => {

  const { currencyOfProduct } = useSelector((store) => store.products)
  const { addProductsList } = useSelector((s) => s.add_products)
  const dispatch = useDispatch()

    const onClick = () => {
      dispatch(addProducts(props.basketProd.id, props.basketProd.price))
      dispatch(addToBusketFunc(props.basketProd.id))
    }

    const deletedProdClick = () => {
      dispatch(deletedProdFunc(props.basketProd.id, props.basketProd.price))
    }
  return (
    <div className="card">
      <div className="card__row">
        <div className="card__image">
          <img src={props.basketProd.image} alt="product" />
        </div>
        <div>
          <div className="card__title">title{props.basketProd.title}</div>
          <div className="card__price">Price {props.basketProd.price.toFixed(2)}</div>
          <div className="card__currency">{currencyOfProduct[0]}</div>
          <div className="card__product-amount">{addProductsList[props.basketProd.id]?.amount}</div>
          <button type="button" className="button-add-product" onClick={onClick}>
            Add
          </button>
          {'   '}
          <button onClick={deletedProdClick}
          type="button" className="button-add-product">
            -
          </button>
        </div>
      </div>
    </div>
  )
}

export default BasketProduct
