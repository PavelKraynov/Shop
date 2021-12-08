const ADD_PRODUCTS = 'ADD_PRODUCTS'

const DELETED_PRODUCTS_TO_BASKET = 'DELETED_PRODUCTS_TO_BASKET'

const initialState = {
  addProductsList: {},
  allAmount: 0,
  allProductPrice: 0,
  basketProducts: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCTS: {
      return {
        ...state,
        addProductsList: action.payLoad.addProductsList,
        allAmount: state.allAmount + 1,
        allProductPrice: state.allProductPrice + action.payLoad.price
      }
    }

    case DELETED_PRODUCTS_TO_BASKET: {
      return {
        ...state,
        addProductsList: action.dellProducts,
        allAmount: state.allAmount - 1,
        allProductPrice: state.allProductPrice - action.dellProducts.allProductPrice
      }
    }
    default:
      return state
  }
}

export function addProducts(id) {
  return (dispatch, getState) => {
    const productsList = getState().products.allProducts
    const { addProductsList } = getState().add_products
    const totalAmount = typeof addProductsList[id] === 'undefined' ? 1 : addProductsList[id].amount + 1
      const { price } = productsList[id]
      console.log(price)
    return dispatch({
      type: ADD_PRODUCTS,
      payLoad: {
        addProductsList: {
          ...addProductsList,
          [id]: { amount: totalAmount }
        },
        price
      }
    })
  }
}

export function deletedProdFunc(idProdDel, delPrice) {
  return (dispatch, getState) => {
    const { addProductsList } = getState().add_products
    // const { amountProduct } = getState().add_products.addProductsList[idProdDel].amount
    console.log(Object.entries(addProductsList))
    console.log(idProdDel, delPrice)
    const dellAmount = Object.entries(addProductsList).reduce(
      (acc, rec) => {
        if (rec[1].id === idProdDel) {
          return {
            ...acc,
            [idProdDel]: {

              amount: addProductsList[idProdDel].amount - 1
            }
          }
        }
        return acc
      },
      { addProductsList }
    )
    return dispatch({
      type: DELETED_PRODUCTS_TO_BASKET,
      dellProducts: dellAmount
    })
  }
}
