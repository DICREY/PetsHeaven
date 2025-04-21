// librarys
const express = require('express')
const cors = require('cors')
require('dotenv').config()

// Imports 
const { validatorHeaders } = require('./middleware/validator.handler')
const { routerApi } = require('./server/router')
const { corsOptions, limiter } = require('./middleware/varios.handler')

// vars
const app = express()
const port = process.env.PORT || 3000

// desativar header extra 
app.disable('x-powered-by')

// middlewares
app.use(express.json())
app.use(cors(corsOptions))
app.use(validatorHeaders)
app.use(limiter)

// Routes
routerApi(app)


app.listen(port,() => console.log('Host is: http://localhost:' + port))