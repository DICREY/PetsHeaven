// librarys
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

// Imports 
const { errorHandler } = require('./middleware/error.handler')
const { validatorHeaders } = require('./middleware/validator.handler')
const { corsOptions, limiter } = require('./middleware/varios.handler')
const { routerApi } = require('./server/router')

// vars
const app = express()
app.set('trust proxy', 1)
const port = process.env.PORT
const secret = process.env.JWT_SECRET

// desativar header extra 
app.disable('x-powered-by')

// middlewares
app.use(express.json({ limit: '1mb' }))
app.use(cors(corsOptions))
app.use(cookieParser(secret))
app.use(validatorHeaders)
app.use(limiter)

// Routes
routerApi(app)

app.use(errorHandler)

app.listen(port,'0.0.0.0',() => console.log('Host is: http://localhost:' + port))