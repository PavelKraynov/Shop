import express from 'express'
import path from 'path'
import cors from 'cors'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import axios from 'axios'
import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

import { sortProductList, getProductList, rates } from './common'


require('colors')

let Root
try {
  // eslint-disable-next-line import/no-unresolved
  Root = require('../dist/assets/js/ssr/root.bundle').default
} catch {
  console.log('SSR not found. Please run "yarn run build:ssr"'.red)
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  express.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))



server.get('/api/v1/goods', async (req, res) => {
  const allGoods = await getProductList()
  res.send(allGoods.slice(0, 50))
})



server.post('/api/v1/sort', async(req, res) => {
  const arrayOfAllProducts = await getProductList()
  const { sortType, direction } = req.body
  const sortArray = sortProductList(arrayOfAllProducts, sortType, direction)
  res.send(sortArray.slice(0, 50))
})



let ratesNumber = 0
const msAtHour = 1000 * 60 * 60
let currency = {}

server.get('/api/v1/currency', async(req, res) => {
  let currencyDate = +new Date()
  if ((ratesNumber + msAtHour ) <= currencyDate) {
    ratesNumber = currencyDate

    currency = await axios(rates.urlValue)
      .then((result) => {
       return result.data
      })
      .catch(() => console.log('need to fix', rates.mokRates))
  }
  res.json({ currency })
})

let logs = []

server.get('/api/v1/logs', (req, res) => {
  res.json(logs)
})

server.post('/api/v1/logs', (req, res) => {
   logs  = req.body.logs
   res.json(logs)
})

server.use('/api/goods', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
