// librarys
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config()

// Imports 
const { validatorHeaders } = require('./middleware/validator.handler')
const { routerApi } = require('./server/router')
const { corsOptions, limiter } = require('./middleware/varios.handler')

// vars
const app = express()
const port = process.env.PORT

// desativar header extra 
app.disable('x-powered-by')

// middlewares
app.use(bodyParser.json({ limit: '1mb' }));
app.use(express.json())
app.use(cors(corsOptions))
app.use(validatorHeaders)
app.use(limiter)

// Routes
routerApi(app)


app.listen(port,'0.0.0.0',() => console.log('Host is: http://localhost:' + port))