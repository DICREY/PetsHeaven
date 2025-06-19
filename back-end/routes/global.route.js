// Librarys
const jwt = require('jsonwebtoken')
const { compare } = require('bcrypt')
const { Router } = require('express')
const { hash } = require('bcrypt')

// Imports
const Global = require('../services/Global.services')
const Services = require('../services/Services.services')
const People = require('../services/People.services')
const { limiterLog, cookiesOptionsLog } = require('../middleware/varios.handler')
const { Fullinfo, ValidatorRol, authJWTGlobal } = require('../middleware/validator.handler')

// Env vars
const secret = process.env.JWT_SECRET

// vars
const Route = Router()

// Routes
Route.post('/check', async (req,res) => {
    // Vars
    const { key } = req.body
    
    try {
        if (key !== secret) return res.status(401).json({ message: 'No tienes autorización' })

        const token = jwt.sign(
            { front: 'PetsHeaven' },
            secret,
            { expiresIn: '24h' }
        )

        res.cookie('__token', token, cookiesOptionsLog)
        res.status(200).json({ checked: 1 })
    } catch (err) {
        if (err.status) return res.status(err.status).json({ message: err.message })

        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.get('/owners', async (req,res) => {
    // Vars
    const people = new People()

    try {
        const search = await people.findAll()
        if (!search.result) return res.status(404).json({ message: "Propietarios no encontrado"})

        res.status(200).json(search)
    } catch (err) {
        if(err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

// Call Middleware for verify the token
Route.use(authJWTGlobal)

Route.get('/services', async (req,res) => {
    // Vars
    const service = new Services()
    try {
        const services = await service.FindCategories()

        // Verify if exist 
        if (!services.result) res.status(404).json({ message: "servicios no encontrados" })

        res.status(200).json(services)
    } catch (err) {
        console.log(err)
        if (err.status) return res.status(err.status).json({ message: err.message })
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.get('/info/general', ValidatorRol('administrador'), async (req,res) => {
    // Vars
    const info = new Global()
    try {
        const inf = await info.GetAdminStats()

        // Verify if exist 
        if (!inf.result) res.status(404).json({ message: "Información no encontrada" })

        res.status(200).json(inf)
    } catch (err) {
        if (err.status) return res.status(err.status).json({ message: err.message })
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.post('/stats/staff', ValidatorRol('veterinario'), async (req,res) => {
    // Vars
    const { by } = req.body
    
    try {
        if (!by) return res.status(400).json({ message: "Petición invalida, faltan datos"})

        const info = new Global(by)
        const inf = await info.GetStaffStats()

        // Verify if exist 
        if (!inf.result) res.status(404).json({ message: "Información no encontrada" })

        res.status(200).json(inf)
    } catch (err) {
        console.log(err)
        if (err.status) return res.status(err.status).json({ message: err.message })
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

// Call Middleware for verify the request data
Route.use(Fullinfo(['cel2_per']))

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
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.post('/login', limiterLog, async (req,res) => {
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

        if (!coincide) return res.status(401).json({ message: 'Credenciales inválidas' })
        const cred = jwt.sign(
            {   
                names: user.nom_per,
                lastNames: user.ape_per,
                roles: user.roles,
                doc: user.doc_per,
                img: user.fot_per
            },
            secret,
            { expiresIn: '8h' }
        )

        res.cookie('__cred', cred, cookiesOptionsLog)
        res.cookie('__nit', secret, cookiesOptionsLog)

        if (user.roles) res.cookie('__user', user.roles, cookiesOptionsLog)
        if (user.nom_per && user.ape_per) res.cookie('__userName', `${user.nom_per} ${user.ape_per}`, cookiesOptionsLog)

        res.status(200).json({ __cred: cred })
    } catch (err) {
        if (err.status) return res.status(err.status).json({ message: err.message })

        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

// Export 
module.exports = Route