// Librarys
const { Router } = require('express')

// Imports
const Appointment = require('../services/Appointment.services')
const { authenticateJWT, ValidatorRol, Fullinfo, authJWTGlobal } = require('../middleware/validator.handler')

// vars
const appoin = new Appointment()
const Route = Router()

// Middleware 
Route.use(authenticateJWT)
Route.use(authJWTGlobal)

// Routes
Route.get('/general', ValidatorRol("administrador"), async (req,res) => {
    try {
        const search = await appoin.findAppointments()

        if (!search.result) res.status(404).json({ message: "Citas no encontradas"})

        res.status(200).json(search)
    } catch (err) {
        if(err.sqlState === '45000') return res.status(500).json({ message: err.sqlMessage })
        if (err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.get('/consulting-rooms', ValidatorRol("veterinario"), async (req,res) => {
    try {
        const search = await appoin.findConsultingRooms()

        if (!search.result) res.status(404).json({ message: "Consultorios no encontrados"})
        res.status(200).json(search)
    } catch (err) {
        if(err.sqlState === '45000') return res.status(500).json({ message: err.sqlMessage })
        if (err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

// Call Middleware for verify the request data
Route.use(Fullinfo(['cel2_per']))

Route.post('/by', ValidatorRol("veterinario"), async (req,res) => {
    // Vars 
    const { by } = req.body

    try {
        const search = await appoin.findAppointmentsByUser(by)

        if (!search.result) res.status(404).json({ message: "Citas no encontradas"})

        res.status(200).json({...search.result})
    } catch (err) {
        if(err.sqlState === '45000') return res.status(500).json({ message: err.sqlMessage })
        if (err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.post('/register', ValidatorRol("veterinario"), async (req, res) => {
    // Vars 
    const data = req.body
    
    try {
        const created = await appoin.registAppointment(data)
        if (created.result) return res.status(201).json(created)

        res.status(500).json({ message: "No se pudo registrar la cita" })

    } catch (err) {
        if(err.sqlState === '45000') return res.status(500).json({ message: err.sqlMessage })
        if (err.status) return res.status(err.status).json({ message: err.message })
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.put('/modify', ValidatorRol("veterinario"), async (req, res) => {
    // Vars 
    const data = req.body

    try {
        const updated = await appoin.modifyAppointment(data)
        if (updated.result) return res.status(200).json(updated)

        res.status(500).json({ message: "No se pudo modificar la cita" })
    } catch (err) {
        if(err.sqlState === '45000') return res.status(500).json({ message: err.sqlMessage })
        if (err.status) return res.status(err.status).json({ message: err.message })
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.put('/cancel', ValidatorRol("veterinario"), async (req, res) => {
    // Vars 
    const data = req.body

    try {
        const cancelled = await appoin.disableAppointment(data)
        if (cancelled.result) return res.status(200).json(cancelled)

        res.status(500).json({ message: "No se pudo cancelar la cita" })
    } catch (err) {
        if(err.sqlState === '45000') return res.status(500).json({ message: err.sqlMessage })
        if (err.status) return res.status(err.status).json({ message: err.message })
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

// Export 
module.exports = Route