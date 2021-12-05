import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'

import products from './products'
import add_products from './add_products'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    products,
    add_products
  })

export default createRootReducer
