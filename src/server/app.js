const express = require('express')
const morgan = require('morgan')
const apiFallback = require('connect-history-api-fallback')

const app = express()
app.use(morgan('combined'))
app.use(express.static('dist'))
app.use(apiFallback({ disableDotRule: true, verbose: true }))

app.get('/hello', (req, res) => {
  res.send('hello express')
})
app.get('/index.html', express.static('dist'))
app.get('/oauth', (req, res) => {
  res.send('oauth')
})
const port = process.env.PORT_SERVER
app.listen(port, () => {
  console.log(`Starting server listening to ${port}`)
})
