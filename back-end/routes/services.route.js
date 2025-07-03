// Librarys
const { Router } = require('express')

// Imports
const Services = require('../services/Services.services')
const vaccineRoute = require('./vaccine.route')
const laboratoryRoute = require('./laboratory.route')
const { authenticateJWT, ValidatorRol, Fullinfo, authJWTGlobal } = require('../middleware/validator.handler')

// vars
const services = new Services()
const Route = Router()

// Middleware 
Route.use(authenticateJWT)
Route.use(authJWTGlobal)

// Vaccine Routes 
Route.use('/vaccine',vaccineRoute)
Route.use('/laboratory',laboratoryRoute)

// Routes 
Route.get('/all', ValidatorRol("usuario"), async (req,res) => {
    try {
        const serv = await services.findAll()
        if (!serv.result) return res.status(404).json({ message: "Servicios no encontrados" })

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
        if (!serv.result) return res.status(404).json({ message: "Servicios no encontrados" })

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

// Call Middleware for verify the request data
Route.use(Fullinfo(['slug','tec_des_tip_ser', 'des_cat','req','req_equ_esp','proc_ser','pre_ser','img_cat','dur_min_tip_ser','des_tip_ser','des_pro_ser','pre_act_ser','des_cat','cos_est_ser', 'cat_pro']))

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

Route.post('/register', ValidatorRol("veterinario"), async (req, res) => {
    const data = req.body
    try {
        const result = await services.create(data);
        if (!result.success) return res.status(400).json({ message: "No se pudo registrar el servicio" });
        res.status(201).json({ message: "Servicio registrado correctamente", success: 1 });
    } catch (err) {
        console.log(err)
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if (err.status) return res.status(err.status).json({ message: err.message });
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.put('/modify', ValidatorRol("veterinario"), async (req, res) => {
    const data = req.body
    try {
        const result = await services.modify(data);
        if (!result.success) return res.status(400).json({ message: "No se pudo modificar el servicio" });
        res.status(200).json(result);
    } catch (err) {
        console.log(err)
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if (err.status) return res.status(err.status).json({ message: err.message });
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

const consultRoute = require('./consult.route')
Route.use('/api/consult', consultRoute)

// Exports 
module.exports = Route