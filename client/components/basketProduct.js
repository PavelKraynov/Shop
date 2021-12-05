import React from 'react'

const BasketProduct = () => {
  return (
    <div className="card">
      <div className="card__row">
        <div className="card__image">
          {/* <img  alt="product" /> */}
        </div>
        <div>
          <div className="card__title">title</div>
          <div className="card__price">Price </div>
          <div className="card__currency">currency</div>
          <div className="card__product-amount">product-amount</div>
          <button
            type="button"
            className="button-add-product"
          >
            Add
          </button>
          {'   '}
          <button
            type="button"
            className="button-add-product"
          >
            -
          </button>
        </div>
      </div>
    </div>
  )
}

export default BasketProduct
