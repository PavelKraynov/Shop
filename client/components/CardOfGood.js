import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { addProducts } from '../redux/reducers/add_products'
import './CardOfGood.css'



const CardOfGood = ({ title, image, price, id}) => {

  const { currencyOfProduct } = useSelector((store) => store.products)
  const { addProductsList } = useSelector((s) => s.add_products)
  const dispatch = useDispatch()

  const resultPrice = (price * currencyOfProduct[1]).toFixed(2)

const onClick = () => {
  dispatch(addProducts(id, price))
}
    return (
      <div className="card">
        <div className="card__row">
          <div className="card__image">
            <img src={image} alt="product" />
          </div>
          <div>
            <div className="card__price">Price {resultPrice}</div>
            <div className="card__currency">{currencyOfProduct[0]}</div>
            <div className="card__title">{title}</div>
            <div className="card__product-amount">product-amount</div>
            <button onClick={onClick} type="button" className="button-add-product">
              Add
            </button>
            {'   '}
            {addProductsList[id]?.amount}
          </div>
        </div>
      </div>
    )
}
export default CardOfGood
