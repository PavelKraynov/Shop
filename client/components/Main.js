import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Head from './Head'
import './Main.css'
import CardOfGood from './CardOfGood'
import { AllProductFromServer} from '../redux/reducers/products'


const Main = () => {
  const listOfProducts = useSelector((s) => s.products.allProducts)


  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(AllProductFromServer())
  },[])


  // useEffect(() => {
  //   dispatch(functionOfGettingCurrency())
  // }, [])
  return (
    <div>
      <Head title="Hello" />
      <div className="wrapper-space-of-products">
      {listOfProducts.map((objOfProduct) => {
        const idForKey = Math.random().toString(32).substr(2, 12)
        return (
          <div key={idForKey}>
            <CardOfGood
              title={objOfProduct.title}
              image={objOfProduct.image}
              price={objOfProduct.price}
              id={objOfProduct.id}
              // productCurrency={productCurrency}
            />
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default Main
