// Librarys
const { Router } = require('express')

// Imports
const Services = require('../services/Services.services')
const { authenticateJWT, ValidatorRol, Fullinfo, authJWTGlobal } = require('../middleware/validator.handler')

// vars
const services = new Services()
const Route = Router()

// Middleware 
Route.use(authenticateJWT)
Route.use(authJWTGlobal)

// Routes 
Route.get('/all', ValidatorRol("usuario"), async (req,res) => {
    try {
        const serv = await services.findAll()
        if (!serv.result[0][0]) return res.status(404).json({ message: "Servicios no encontrados" })

        res.status(200).json(serv)
    } catch (err) {
        console.log(err)
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
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.get('/vacs', ValidatorRol("usuario"), async (req,res) => {
    try {
        const serv = await services.findAllVacunas()
        if (!serv.result[0][0]) return res.status(404).json({ message: "Vacunas no encontradas" })
        
        res.status(200).json(serv)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.get('/cirs', ValidatorRol("usuario"), async (req,res) => {
    try {
        const serv = await services.findCirugies()
        if (!serv.result[0][0]) return res.status(404).json({ message: "Cirugias no encontradas" })

        res.status(200).json(serv)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

// Call Middleware for verify the request data
Route.use(Fullinfo(['empty']))

Route.put('/AblOrDis', ValidatorRol("administrador"), async (req, res) => {
    // Vars 
    const { data } = req.body
    try {
        const find = await services.findBy(data.id_ser)
        if (!find.result[0][0]) return res.status(404).json({ message: "Servicio no encontrado" })
        
        const cancelled = await services.AbleOrDesableService(data)
        if (cancelled.result) return res.status(200).json(cancelled)

        res.status(500).json({ message: "No se pudo deshabilitar la cirugia" })
    } catch (err) {
        console.log(err)
        if (err.status) return res.status(err.status).json({ message: err.message })
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.post('/register/cir', ValidatorRol("administrador"), async (req, res) => {
    const data = req.body
    try {
        if (!data) return res.status(400).json({ message: "Petición no valida"})

        const result = await services.registerCirugia(data);
        res.status(201).json({ message: "Cirugía registrada correctamente", result });
    } catch (err) {
        if (err.status) return res.status(err.status).json({ message: err.message });
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})


Route.post('/register/vac', ValidatorRol("administrador"), async (req, res) => {
    const data = req.body
    
    try {
        if (!data) return res.status(400).json({ message: "Petición no valida"})
            
            const result = await services.registerVacuna(data);
            res.status(201).json({ message: "Vacuna registrada correctamente", result });
        } catch (err) {
            if (err.status) return res.status(err.status).json({ message: err.message });
            res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
            console.log(err.message)
        }
})


// Exports 
module.exports = Route