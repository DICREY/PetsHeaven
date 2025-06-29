// Librarys
const { Router } = require('express')

// Imports
const Services = require('../services/Services.services')
const vaccineRoute = require('./vaccine.route')
const { authenticateJWT, ValidatorRol, Fullinfo, authJWTGlobal } = require('../middleware/validator.handler')

// vars
const services = new Services()
const Route = Router()

// Middleware 
Route.use(authenticateJWT)
Route.use(authJWTGlobal)

// Vaccine Routes 
Route.use('/vaccine',vaccineRoute)

// Routes 
Route.get('/all', ValidatorRol("usuario"), async (req,res) => {
    try {
        const serv = await services.findAll()
        if (!serv.result[0][0]) return res.status(404).json({ message: "Servicios no encontrados" })

        res.status(200).json(serv)
    } catch (err) {
        console.log(err)
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.get('/all/:by', ValidatorRol("usuario"), async (req,res) => {
    const { by } = req.params
    try {
        if (!by) return res.status(400).json({ message: "Petición invalida, faltan datos" })

        const serv = await services.findAllBy(by)
        if (!serv.result[0][0]) return res.status(404).json({ message: "Servicios no encontrados" })

        res.status(200).json(serv)
    } catch (err) {
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})


Route.get('/cirs', ValidatorRol("usuario"), async (req,res) => {
    try {
        const serv = await services.findCirugies()
        if (!serv.result) return res.status(404).json({ message: "Cirugias no encontradas" })

        res.status(200).json(serv)
    } catch (err) {
        console.log(err)
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.get('/esthetic', ValidatorRol("usuario"), async (req,res) => {
    try {
        const serv = await services.findEsthetic()
        if (!serv.result) return res.status(404).json({ message: "Estéticas no encontradas" })

        res.status(200).json(serv)
    } catch (err) {
        console.log(err)
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.get('/laboratory', ValidatorRol("usuario"), async (req,res) => {
    try {
        const serv = await services.findLaboratoryTests()
        if (!serv.result) return res.status(404).json({ message: "Laboratory tests not found" })

        res.status(200).json(serv)
    } catch (err) {
        console.log(err)
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

// Call Middleware for verify the request data
Route.use(Fullinfo(['empty']))

Route.put('/AblOrDis', ValidatorRol("veterinario"), async (req, res) => {
    // Vars 
    const data = req.body
    try {
        const cancelled = await services.AbleOrDesableService(data)
        if (cancelled.success) return res.status(200).json(cancelled)
        
        res.status(500).json({ message: "No se pudo deshabilitar el servicio" })
    } catch (err) {
        console.log(err)
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if (err.status) return res.status(err.status).json({ message: err.message })
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.post('/register/cir', ValidatorRol("administrador"), async (req, res) => {
    const data = req.body
    try {
        const result = await services.registerCirugia(data);
        res.status(201).json({ message: "Cirugía registrada correctamente", result });
    } catch (err) {
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if (err.status) return res.status(err.status).json({ message: err.message });
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})


// Exports 
module.exports = Route