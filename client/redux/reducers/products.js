import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const CURRENCY_OF_PRODUCT = 'CURRENCY_OF_PRODUCT'
const SORT_BY = 'SORT_BY'
const REPLACE_SORT = 'REPLACE_SORT'

const initialState = {
  sortType : '',
  loaded: false,
  allProducts: {},
  currencyOfProduct: ['USD', 1],
  sort: {
    name: true,
    price: true
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      return {
        ...state,
        allProducts: action.objProd.reduceObj,
        loaded: action.objProd.load,
      }
    }
    case CURRENCY_OF_PRODUCT: {
      return {
        ...state,
        currencyOfProduct: action.currencyValue
      }
    }
    case SORT_BY: {
      return {
        ...state,
        allProducts: action.objProd.reduceObj,
        sortType: action.objProd.sortType
      }
    }
    case REPLACE_SORT: {
      return {
        ...state,
        sort: action.sort,
      }
    }
    default:
      return state
  }
}

export function AllProductFromServer() {
  return (dispatch) => {
    return axios('/api/v1/goods')
      .then((result) => result.data)
      .then((products) => {
        return products.reduce((acc, rec) => {
          acc[rec.id] = rec
          return acc
        }, {})
      })
      .then((reduceObj) =>
        dispatch({
          type: GET_PRODUCTS,
          objProd: { reduceObj, load : true }
        })
      )
  }
}

export function functionOfGettingCurrency(money) {
  return (dispatch) => {
    return axios('/api/v1/currency')
      .then((resultRates) => {
        return resultRates.data.currency.rates
      })
      .then((dataResultValues) => {
        const result = Object.entries(dataResultValues).reduce((acc, rec) => {
          if (rec.indexOf(money) > -1) {
            return rec
          }
          return acc
        }, [])
        return result
      })
      .then((valuesKey) => dispatch({ type: CURRENCY_OF_PRODUCT, currencyValue: valuesKey }))
  }
}

export function sortFunction(sortType, direction) {
  return (dispatch) => {
    return fetch('/api/v1/sort', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sortType, direction })
    })
      .then((result) => result.json())
      .then((products) => {
        return products.reduce((acc, rec) => {
          acc[rec.id] = rec
          return acc
        }, {})
      })
      .then((reduceObj) =>
        dispatch({
          type: SORT_BY,
          objProd: {reduceObj, sortType}
        })
      )
  }
}

export function buttonSortArrow(replace){
  return (dispatch, getState) => {
    const { sort } = getState().products
    if (replace === 'name') {
      return dispatch({
        type: REPLACE_SORT,
        sort: { ...sort, name: !sort.name }
      })
    }
    if (replace === 'price') {
      return dispatch({
        type: REPLACE_SORT,
        sort: { ...sort, price: !sort.price }
      })
    }
    return sort
  }
}
