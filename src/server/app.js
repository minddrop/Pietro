const express = require('express')
const morgan = require('morgan')
const apiFallback = require('connect-history-api-fallback')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(morgan('short'))
app.use(bodyParser.json())

// public
app.use(express.static('dist'))

const middleWrapper = f => (req, res, next) => {
  return new Promise(resolve => {
    resolve(f(req, res, next))
  }).catch(next)
}

// api
app.get(
  '/hello',
  middleWrapper((req, res) => {
    res.send('hello express')
  })
)
app.get(
  '/oauth',
  middleWrapper((req, res) => {
    res.send('oauth')
  })
)
app.post(
  '/test',
  middleWrapper((req, res) => {
    res.send(req.body)
  })
)

// fallback
app.use(apiFallback({ disableDotRule: true, verbose: true }))

// vue
app.get('/index.html', express.static('dist'))

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const port = process.env.PORT_SERVER
app.listen(port, () => {
  console.log(`Starting server listening to ${port}`)
})
