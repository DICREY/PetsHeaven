// Librarys 
const rateLimit = require('express-rate-limit')

const corsOptions = {
    origin:'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-api-key', 'Authorization','User','Roles'],
    credentials: true
}

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    message: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde'
})

const limiterLog = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde'
})

module.exports = { corsOptions, limiter, limiterLog }