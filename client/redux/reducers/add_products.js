const ADD_PRODUCTS = 'ADD_PRODUCTS'
const ADD_PRODUCTS_TO_BASKET = 'ADD_PRODUCTS_TO_BASKET'
const initialState = {
  addProductsList: {},
  allAmount: 0,
  allProductPrice: 0,
  busketProducts:[]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCTS: {
      return {
        ...state,
        addProductsList: action.payLoad,
        allAmount: state.allAmount + 1,
        allProductPrice: state.allProductPrice + action.payLoad.allProductPrice
      }
    }
    case ADD_PRODUCTS_TO_BASKET: {
      return {
        ...state,
        busketProducts: action.busketProducts
      }
    }
    default:
      return state
  }
}

export function addProducts(id, resultPrice) {
  return (dispatch, getState) => {
    const { addProductsList } = getState().add_products
    const totalAmount =
      typeof addProductsList[id] === 'undefined' ? 1 : addProductsList[id].amount + 1
    return dispatch({
      type: ADD_PRODUCTS,
      payLoad: {
        ...addProductsList,
        allProductPrice: resultPrice,
        [id]: { id, amount: totalAmount }
      }
    })
  }
}

export function addToBusketFunc(id) {
  return (dispatch, getState) => {
    const storeId = getState().products.allProduct.id
    const filterAdd = storeId.filter((it) => {
      if (it.indexOf(id) > 0) {
        return dispatch({ type: ADD_PRODUCTS_TO_BASKET, busketProducts: filterAdd })
      }
      return null
    })
  }
}
