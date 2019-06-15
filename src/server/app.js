const express = require('express')
const morgan = require('morgan')
const apiFallback = require('connect-history-api-fallback')
const bodyParser = require('body-parser')
const cors = require('cors')
const crypto = require('crypto')
const { WebClient } = require('@slack/web-api')
const rp = require('request-promise-native')
const methods = require('./methods.json')

const {
  CLIENT_ID,
  CLIENT_SECRET,
  PORT_SERVER,
  PASSWORD,
  SALT,
  CRYPTO_ALGORITHM,
  REDIRECT_URI
} = process.env
const port = PORT_SERVER
const key = crypto.scryptSync(PASSWORD, SALT, 32)
if (!PASSWORD || !SALT) {
  throw new Error('PASSWORD or SALT or both are not found.')
}
if (!CRYPTO_ALGORITHM) {
  throw new Error('No algorithm specified.')
}
const app = express()
app.use(cors())
app.use(morgan('short'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// public
app.use(express.static('dist'))

const middlewareWrapper = f => (req, res, next) => {
  return new Promise(resolve => {
    resolve(f(req, res, next))
  }).catch(next)
}

// api
app.get(
  '/hello',
  middlewareWrapper((req, res) => {
    res.send('hello express')
  })
)
app.get(
  '/oauth',
  middlewareWrapper((req, res) => {
    const { code, state } = req.query
    const options = {
      uri: 'https://slack.com/api/oauth.access',
      qs: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        redirect_uri: REDIRECT_URI
      },
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    }
    rp(options)
      .then(repos => {
        const { access_token } = repos
        res.header('Content-Type', 'text/plain; charset=utf-8')
        const r = encrypt(access_token)
        res.send(
          `次のフレーズをコピーしてください\n\n${JSON.stringify(
            encrypt(access_token)
          )}`
        )
      })
      .catch(err => {
        console.error(err)
        res.status(500).send()
      })
  })
)
app.post(
  '/',
  middlewareWrapper((req, res) => {
    const { cryptedToken, iv, method, options } = req.body
    const access_token = decrypt(cryptedToken, Buffer.from(iv, 'base64'))
    const web = new WebClient(access_token)

    const methodScopes = method.split('.')
    if (
      methodScopes[0] !== 'web' ||
      methods.includes(methodScopes.slice(1).join(''))
    ) {
      res.status(500).json()
    }
    methodScopes[0] = web
    const webAPIMethod = methodScopes.reduce(
      (previous, current) => previous[current]
    )

    webAPIMethod(options)
      .then(response => {
        res.json(response)
      })
      .catch(err => {
        res.status(500).json(err.data || err.message)
      })
  })
)
app.post(
  '/test',
  middlewareWrapper((req, res) => {
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

app.listen(port, () => {
  console.log(`Starting server listening to ${port}`)
})

const decrypt = (cryptedToken, iv) => {
  const decipher = crypto.createDecipheriv(CRYPTO_ALGORITHM, key, iv)
  const r =
    decipher.update(cryptedToken, 'base64', 'utf-8') + decipher.final('utf-8')
  return r
}

const encrypt = accessToken => {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(CRYPTO_ALGORITHM, key, iv)
  const crypted =
    cipher.update(accessToken, 'utf-8', 'base64') + cipher.final('base64')
  const r = { cryptedToken: crypted, iv: iv.toString('base64') }
  return r
}
