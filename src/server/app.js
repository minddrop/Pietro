const express = require('express')
const morgan = require('morgan')
const apiFallback = require('connect-history-api-fallback')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(morgan('short'))
app.use(bodyParser.json())
app.use(express.static('dist'))

app.get('/hello', (req, res) => {
  res.send('hello express')
})
app.get('/oauth', (req, res) => {
  res.send('oauth')
})
app.post('/test', (req, res) => {
  res.send(req.body)
})
app.use(apiFallback({ disableDotRule: true, verbose: true }))
app.get('/index.html', express.static('dist'))

const port = process.env.PORT_SERVER
app.listen(port, () => {
  console.log(`Starting server listening to ${port}`)
})
