import { CURRENCY_OF_PRODUCT, SORT_BY } from '../reducers/products'
import { LOG_UPDATE } from '../reducers/log'
import { ADD_PRODUCTS, ADD_PRODUCTS_IN_BUSKET, DEL_ALL_POSITION } from '../reducers/add_products'

const logging = () => {
  return (store) => {
    const { dispatch, getState } = store
    const { logList } = getState().log
    console.log(logList)
    return (next) => {
      return (action) => {
        const formDate = () => {
          const date = new Date().toLocaleDateString()
          const time = new Date().toLocaleTimeString().slice(0, -3)
          const timeData = `${date} ${time}`
          return timeData
        }
        const sendLogsToServer = (someData) => {
            return fetch('/api/v1/logs', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ someData: [...someData] })
            })
        }
        switch (action.type) {
          case '@@router/LOCATION_CHANGE':
            {
              const url = action.payload.location.pathname
              const data = `${formDate()}: to "${url}" page`
              sendLogsToServer(data)
              console.log(sendLogsToServer(data).then(res => console.log(res)))
              dispatch(
                {
                  type: LOG_UPDATE,
                  log: data
                }

              )
            }
            break
          case CURRENCY_OF_PRODUCT:
            {
              const { currencyOfProduct } = getState().products
              const currency = currencyOfProduct[0]
              const newCurrency = action.payload.currencyValue
              const data = `${formDate()}: change currency from ${currency} to ${newCurrency[0]}`
              dispatch({
                type: LOG_UPDATE,
                log: data
              })
            }
            break
          case SORT_BY:
            {
              const sortName = action.objProd.sortType
              const data =`${formDate()}: change sort by ${sortName}`
               dispatch({
                 type: LOG_UPDATE,
                 log: data
               })
            }
            break
          case ADD_PRODUCTS:
            {
              const productTitle = action.payLoad.title
              const data = `${formDate()}: add product to busket ${productTitle}`
              dispatch({
                type: LOG_UPDATE,
                log: data
              })
            }
            break
          case ADD_PRODUCTS_IN_BUSKET:
            {
              const productTitle = action.payLoad.title
              const data = `${formDate()}: add product in busket ${productTitle}`
              dispatch({
                type: LOG_UPDATE,
                log: data
              })
            }
            break
          case DEL_ALL_POSITION:
            {
              const delAllPosition = action.title
              const data = `${formDate()}: delete all product ${delAllPosition}`
              dispatch({
                type: LOG_UPDATE,
                log: data
              })
            }
            break

          default:
            return next(action)
        }
        return next(action)
      }
    }
  }
}
export default logging()
