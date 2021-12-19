import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { addProductsInBusket, deletedProdFunc, deletedProdPosition } from '../redux/reducers/add_products'



const TrRowProduct = ({ id, index }) => {
  const dispatch = useDispatch()
  const { currencyOfProduct } = useSelector((store) => store.products)
  const { addProductsList } = useSelector((s) => s.add_products)
  const price = (addProductsList[id].price * currencyOfProduct[1]).toFixed(2)
  const addProductButtonClick = () => {
    dispatch(addProductsInBusket(id))
  }

  const deletedProdClick = () => {
   return dispatch(deletedProdFunc(id))
  }
   const deletedAllPosition = () => {
     return dispatch(deletedProdPosition(id))
   }

  return (
    <tr>
      <th>{index + 1}</th>
      <th>
        <img className="tr-img-product" src={addProductsList[id].image} alt="product" />
      </th>
      <th>{addProductsList[id].title}</th>
      <th>
        {price} {currencyOfProduct[0]}
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
      <th>
        <button type="button" className="button-add-product" onClick={deletedAllPosition}>
          delete
        </button>
      </th>
    </tr>
  )
}

export default TrRowProduct