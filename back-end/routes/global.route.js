// Librarys
const jwt = require('jsonwebtoken')
const { compare } = require('bcrypt')
const { Router } = require('express')
const { hash } = require('bcrypt')

// Imports
const Global = require('../services/Global.services')
const People = require('../services/People.services')
const { limiterLog, cookiesOptions, cookiesOptionsLog } = require('../middleware/varios.handler')
const { authenticateJWT } = require('../middleware/validator.handler')

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
            },
            secret,
            { expiresIn: '8h' }
        )
        const tokenInfo = jwt.sign(
            { 
                names: user.nom_per,
                lastNames: user.ape_per,
                roles: user.roles,
                img: user.fot_roles.split(',')[0]
            },
            secret,
            { expiresIn: '8h' }
        )

        res.cookie('token', token, cookiesOptions)

        if (user.roles.includes('Administrador')) res.cookie('Nikola', 'Que miras', cookiesOptions)

        if (user.roles.includes('Veterinario')) res.cookie('Marie', 'Que miras', cookiesOptions)

        res.status(200).json({ token: tokenInfo })
        

    } catch (err) {
        console.log(err)
        if (err.status) return res.status(err.status).json({ message: err.message })

        res.status(500).json({ message: err })
    }
})

Route.post('/register', async (req,res) => {
    // Vars 
    const user = new People()
    const saltRounds = 15
    const body = req.body
    
    try {
        // Verifiy if exist
        const find = await user.findBy(toString(body.numeroDocumento))
        if (find.result[0][0].nom_per) res.status(302).json({ message: "Usuario ya existe" })

        const create = await user.create({hash_pass: await hash(body.password,saltRounds), ...body})
        res.status(201).json(create)
    } catch(err) {
        if(err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: err })
    }
})

Route.get('/cookie', authenticateJWT,(req, res) => {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 30)
})

// Export 
module.exports = Route