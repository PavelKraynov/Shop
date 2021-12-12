import React, { Fragment } from 'react'
import TrRowProduct from './tr-row'

const BasketProduct = ({ data }) => {
  return (
    <div className="product-table-wrapper">
      <table className="product-table-wrapper__table">
        <thead className="product-table-wrapper__thead">
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Price </th>
            <th>Remove</th>
            <th>Amount</th>
            <th>Add Product</th>
            <th>Remove All</th>
          </tr>
        </thead>
        <tbody>
          {data.map((id, index) => (
            <Fragment key={id}>
              <TrRowProduct id={id} index={index} />
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BasketProduct
