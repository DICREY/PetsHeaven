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
    try {
        if (!name || !value) return res.status(400).json({ message: "Petición invalida, faltan datos"})

        res.cookie( name, value, cookiesOptions)
        res.status(201).json({ message: 'Cookie creada' })
    } catch (err) {
        if (err.status) return res.status(err.status).json({ message: err.message })
        res.status(500).json({ message: err })
    }

})

Route.post('/check-cookie',(req, res) => {
    const { name } = req.body
    try {
        if (!name) return res.status(400).json({ message: "Petición invalida, faltan datos"})

        const cookie = req.signedCookies[name] || req.cookies[name]
    
        if (!cookie) return res.status(404).json({ message: 'Cookie no encontrada' })
        
        return res.status(200).json({ data: cookie })
    } catch (err) {
        if (err.status) return res.status(err.status).json({ message: err.message })
        res.status(500).json({ message: err })
    }
})

Route.post('/clear-cookies', (req, res) => {
    try {
        res.clearCookie('__cred', cookiesOptions)
        res.clearCookie('__nit', cookiesOptions)
        res.clearCookie('__user', cookiesOptions)
        res.clearCookie('__userName', cookiesOptions)
    
        return res.status(200).json({ message: 'Cookies eliminadas' })
    } catch (err) {
        if (err.status) return res.status(err.status).json({ message: err.message })
        res.status(500).json({ message: err })
    }
})

// Export 
module.exports = Route