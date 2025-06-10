// Librarys
const { Router } = require('express')

// Imports
const { cookiesOptions } = require('../middleware/varios.handler')
const { authenticateJWT } = require('../middleware/validator.handler')

// Vars
const Route = Router()

// Middlewares
Route.use(authenticateJWT)

// Routes
Route.post('/cookie',(req, res) => {
    const { name, value } = req.body
    
    res.cookie( name, value, cookiesOptions)

    res.status(201).json({ message: 'Cookie creada' })
})

Route.post('/check-cookie',(req, res) => {
    const { name } = req.body
    const cookie = req.signedCookies[name] || req.cookies[name]

    if (!cookie) return res.status(404).json({ message: 'Cookie no encontrada' })
    
    return res.status(200).json({ data: cookie })
})

Route.post('/clear-cookies', (req, res) => {
    res.clearCookie('__cred', cookiesOptions)
    res.clearCookie('__nit', cookiesOptions)
    res.clearCookie('__user', cookiesOptions)
    res.clearCookie('__userName', cookiesOptions)

    return res.status(200).json({ message: 'Cookies eliminadas' })
})

// Export 
module.exports = Route