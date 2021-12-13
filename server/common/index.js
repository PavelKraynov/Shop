const { readFile } = require('fs').promises

export function sortProductList(arrayOfAllProducts, sortType, direction) {
  switch (sortType) {
    case 'name': {
      arrayOfAllProducts.sort((a, b) => {
        if (direction) {
          return a.title.localeCompare(b.title)
        }
        return b.title.localeCompare(a.title)
      })
      break
    }
    case 'price': {
      arrayOfAllProducts.sort((a, b) => {
        if (direction) {
          return a.price - b.price
        }
        return b.price - a.price
      })
      break
    }
    default:
      return arrayOfAllProducts
  }
  return arrayOfAllProducts
}

export const getProductList = () => {
  return readFile(`${__dirname}/../goods.json`, { encoding: 'utf8' })
    .then((goods) => JSON.parse(goods))
    .catch((err) => err)
}

export const rates = {
  urlValue: 'https://api.exchangerate.host/latest?base=USD&symbols=USD,EUR,CAD',
  mokRates: {
    CAD: 1.270862,
    EUR: 0.885676,
    USD: 1
  }
}
