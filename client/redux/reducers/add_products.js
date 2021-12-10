const ADD_PRODUCTS = 'ADD_PRODUCTS'

const DELETED_AMOUNT_PRODUCTS_TO_BASKET = 'DELETED_AMOUNT_PRODUCTS_TO_BASKET'
const DELETED_PRODUCTS = 'DELETED_PRODUCTS'


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
        allAmount: state.allAmount -1 ,
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
    const { addProductsList } = getState().add_products
    const totalAmount = typeof addProductsList[id] === 'undefined' ? 1 : addProductsList[id].amount += 1

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

export function deletedProdFunc(id) {
  return (dispatch, getState) => {
    const { addProductsList, allAmount } = getState().add_products
    const productsList = getState().products.allProducts
    const dellAmount = { ...addProductsList, [id]: { amount: addProductsList[id]?.amount - 1 } }

    const { price } = productsList[id]
    console.log('allAmount', allAmount)
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
