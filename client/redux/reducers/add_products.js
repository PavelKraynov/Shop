export const ADD_PRODUCTS = '@add_products/ADD_PRODUCTS'

export const ADD_PRODUCTS_IN_BUSKET = '@add_products/ADD_PRODUCTS_IN_BUSKET'

const DELETED_AMOUNT_PRODUCTS_TO_BASKET = '@add_products/DELETED_AMOUNT_PRODUCTS_TO_BASKET'
const DELETED_PRODUCTS = '@add_products/DELETED_PRODUCTS'
export const DEL_ALL_POSITION = '@add_products/DEL_ALL_POSITION'


const initialState = {
  addProductsList: {},
  allAmount: 0,
  allProductPrice: 0,
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
    case ADD_PRODUCTS_IN_BUSKET: {
      return {
        ...state,
        addProductsList: action.payLoad.addProductsList,
        allAmount: state.allAmount + 1,
        allProductPrice: state.allProductPrice + action.payLoad.price
      }
    }

    case DELETED_AMOUNT_PRODUCTS_TO_BASKET: {
      return {
        ...state,
        addProductsList: action.dellProductsAmount.dellAmount,
        allAmount: state.allAmount - 1,
        allProductPrice: state.allProductPrice - action.dellProductsAmount.price
      }
    }
    case DELETED_PRODUCTS: {
      return {
        ...state,
        addProductsList: action.addProductsList,
        allAmount: state.allAmount - 1,
        allProductPrice: state.allProductPrice - action.price
      }
    }
    case DEL_ALL_POSITION: {
      return {
        ...state,
        addProductsList: action.addProductsList,
        allAmount: state.allAmount - action.amount,
        allProductPrice: state.allProductPrice - action.price
      }
    }
    default:
      return state
  }
}

export function addProducts(id) {
  return (dispatch, getState) => {
    const productsList = getState().products.allProducts
    const { price, title } = productsList[id]
    const { addProductsList } = getState().add_products
    const totalAmount = typeof addProductsList[id] === 'undefined' ? 1 : addProductsList[id].amount += 1

    return dispatch({
      type: ADD_PRODUCTS,
      payLoad: {
        addProductsList: {
          ...addProductsList,
          [id]: { ...productsList[id], amount: totalAmount }
        },
        price,
        title
      }
    })
  }
}


export function addProductsInBusket(id) {
  return (dispatch, getState) => {
    const { addProductsList } = getState().add_products
    const { price, title} = addProductsList[id]
    const totalAmount =
      typeof addProductsList[id] === 'undefined' ? 1 : (addProductsList[id].amount += 1)

    return dispatch({
      type: ADD_PRODUCTS_IN_BUSKET,
      payLoad: {
        addProductsList: {
          ...addProductsList,
          [id]: { ...addProductsList[id], amount: totalAmount }
        },
        price,
        title
      }
    })
  }
}

export function deletedProdFunc(id) {
  return (dispatch, getState) => {
    const { addProductsList } = getState().add_products
    const dellAmount = { ...addProductsList, [id]: { ...addProductsList[id], amount: addProductsList[id]?.amount - 1 } }

    const { price } = addProductsList[id]
    if (dellAmount[id].amount >= 1){
      return dispatch({
        type: DELETED_AMOUNT_PRODUCTS_TO_BASKET,
        dellProductsAmount: {
          dellAmount,
          price
        }
      })

    }
    return (
      delete addProductsList[id],
      dispatch({
        type: DELETED_PRODUCTS,
        addProductsList: {...addProductsList},
        price
      })
    )
  }
}

export function deletedProdPosition(id) {
  return (dispatch, getState) => {
    const { addProductsList } = getState().add_products
    const { amount, price, title } = getState().add_products.addProductsList[id]
    return (
      delete addProductsList[id],
      dispatch({
        type: DEL_ALL_POSITION,
        addProductsList,
        amount,
        price: price* amount,
        title
      })
    )
  }
}
