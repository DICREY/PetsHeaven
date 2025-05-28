// Librarys
const jwt = require('jsonwebtoken')
const { compare } = require('bcrypt')
const { Router } = require('express')
const { hash } = require('bcrypt')

// Imports
const Global = require('../services/Global.services')
const People = require('../services/People.services')
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
                img: user.fot_roles.split(',')[0]
            },
            secret,
            { expiresIn: '8h' }
        )
        res.status(200).json({ token: token })

    } catch (err) {
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

Route.post('/cookie',(req, res) => {
    try {
        // Vars
        const expirationDate = new Date()
        const { body } = req
        const cookieName = body.name
        const cookieValue = body.value

        if (!cookieName && !cookieValue) return res.status(400).json({ message: 'Datos no proporcionados' })

        if (req.signedCookies[cookieName]) return res.status(409).json({ message: 'Cookie ya existe' })
        
        expirationDate.setDate(expirationDate.getDate() + 30)
        
        res.cookie(cookieName, cookieValue, {
            expires: expirationDate, // Fecha exacta de expiración
            maxAge: 30 * 24 * 60 * 60 * 1000, // Alternativa en milisegundos (30 días)
            httpOnly: true, // Seguridad: solo accesible por HTTP
            secure: true, // HTTPS en producción
            sameSite: 'strict', // Política de same-site
            domain: 'localhost', // Dominio donde es válida (opcional)
            signed: true,
            // path: '/' // Ruta donde es válida (opcional)
        })
        
        res.status(200).json({ message: 'Cookie configurada. Expira en 30 dias' })
    } catch (err) {
        console.log(err)
        if(err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: err })
    }
})

Route.get('/check-cookie', (req, res) => {
    const cookieValue = req.signedCookies.CookiePetsHeaven
    
    if (cookieValue) {
        res.status(200).json({ message: `Valor de la cookie: ${cookieValue}` })
    } else {
        res.status(404).json({ message: 'No se encontró la cookie' })
    }
})

// Export 
module.exports = Route