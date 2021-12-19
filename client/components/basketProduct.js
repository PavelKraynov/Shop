import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import TrRowProduct from './tr-row'

const BasketProduct = ({ data }) => {
 const { sort, sortType } = useSelector(s => s.products)

  function sortProductList(array) {
    switch (sortType) {
      case 'name': {
        array.sort((a, b) => {
          if (!sort.name) {
            return a.title.localeCompare(b.title)
          }
          return b.title.localeCompare(a.title)
        })
        break
      }
      case 'price': {
        array.sort((a, b) => {
          if (!sort.price) {
            return a.price - b.price
          }
          return b.price - a.price
        })
        break
      }
      default:
        return array
    }
    return array

  }
  // console.log('fun', sortProductList())
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
          {sortProductList(data).map((it, index) => (
            <Fragment key={it.id}>
              <TrRowProduct id={it.id} index={index} />
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BasketProduct
