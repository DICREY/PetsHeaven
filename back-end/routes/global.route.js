// Librarys
const jwt = require('jsonwebtoken')
const { compare } = require('bcrypt')
const { Router } = require('express')

// Imports
const Global = require('../services/Global.services')
const { limiterLog } = require('../middleware/varios.handler')

// Env vars
const secret = process.env.JWT_SECRET

// vars
const Route = Router()

// Routes
Route.get('/services', async (req,res) => {
    // Vars
    const global = new Global()
    const services = await global.SearchServices()

    // Verify if exist 
    if (!services.result) res.status(404).json({ message: "servicios no encontrados" })

    try {
        res.status(200).json(services)
    } catch (err) {
        if (err.status) return res.status(err.status).json({ message: err.message })
        res.status(500).json({ message: err })
    }
})

Route.post('/login',limiterLog, async (req,res) => {
    // Vars
    const { firstData, secondData } = req.body
    const global = new Global(firstData)
    
    try {
        // Search in database
        let log = await global.login()
        let user = await log.result[0][0]

        if(!user) return res.status(404).json({ message: 'Usuario no encontrado' })
        // Verify
        const coincide = await compare(secondData, user.cont_per)

        if (!coincide) {
            return res.status(401).json({ message: 'Credenciales inválidas' })
        }
        const token = jwt.sign(
            { 
                names: user.nom_per,
                lastNames: user.ape_per,
                roles: user.roles,
                fotos: user.fot_roles
            },
            secret,
            { expiresIn: '2h' }
        )
        res.status(200).json({ token: token })

    } catch (err) {
        if (err.status) return res.status(err.status).json({ message: err.message })

        res.status(500).json({ message: err })
    }
})

// Export 
module.exports = Route