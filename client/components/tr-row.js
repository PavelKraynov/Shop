import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { addProducts, deletedProdFunc } from '../redux/reducers/add_products'

const TrRowProduct = ({ id, index }) => {
  const dispatch = useDispatch()
  const { currencyOfProduct, allProducts } = useSelector((store) => store.products)
  const { addProductsList } = useSelector((s) => s.add_products)
  const price = (allProducts[id].price * currencyOfProduct[1]).toFixed(2)
  const addProductButtonClick = () => {
    dispatch(addProducts(id))
  }

  const deletedProdClick = () => {
   return dispatch(deletedProdFunc(id))
  }

  return (
    <tr >
      <th>{index +1}</th>
      <th>
        <img className='tr-img-product' src={allProducts[id].image} alt="product" />
      </th>
      <th>title{allProducts[id].title}</th>
      <th>
        {price} {' '} {currencyOfProduct[0]}
      </th>
      <th>
        <button onClick={deletedProdClick} type="button" className="button-add-product">
          {' '}
          -
        </button>
      </th>
      <th>{addProductsList[id]?.amount}</th>
      <th>
        <button type="button" className="button-add-product" onClick={addProductButtonClick}>
          Add
        </button>
      </th>
    </tr>
  )
}

export default TrRowProduct