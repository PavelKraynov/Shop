import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Head from './Head'
import './Main.css'
import CardOfGood from './CardOfGood'
import { AllProductFromServer} from '../redux/reducers/products'


const Main = () => {
  const { allProducts } = useSelector((s) => s.products)



  const dispatch = useDispatch()
  useEffect(()=> {
   dispatch(AllProductFromServer())
    localStorage.setItem('locale-started', new Date())
  },[])

  return (
    <div>
      <Head  />
      <div className="wrapper-space-of-products">
        {Object.values(allProducts).map((objOfProduct) => {
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
