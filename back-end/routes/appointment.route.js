// Librarys
const { Router } = require('express')

// Imports
const Appointment = require('../services/Appointment.services')
const { authenticateJWT, ValidatorRol } = require('../middleware/validator.handler')

// vars
const appoin = new Appointment()
const Route = Router()

// Middleware 
Route.use(authenticateJWT)

// Routes
Route.get('/general', ValidatorRol("administrador"), async (req,res) => {
    try {
        const search = await appoin.findAppointments()

        if (!search.result) res.status(404).json({ message: "Citas no encontradas"})

        res.status(200).json(search)
    } catch (err) {
        if (err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({message: err})
    }
})

Route.post('/register', ValidatorRol("administrador"), async (req, res) => {
    try {
        const created = await appoin.registAppointment(req.body)
        if (created.result) return res.status(201).json(created)
        res.status(500).json({ message: "No se pudo registrar la cita" })
    } catch (err) {
        if (err.status) return res.status(err.status).json({ message: err.message })
        res.status(500).json({ message: err })
    }
})

Route.put('/modify', ValidatorRol("administrador"), async (req, res) => {
    try {
        const updated = await appoin.modifyAppointment(req.body)
        if (updated.result) return res.status(200).json(updated)
        res.status(500).json({ message: "No se pudo modificar la cita" })
    } catch (err) {
        if (err.status) return res.status(err.status).json({ message: err.message })
        res.status(500).json({ message: err })
    }
})

Route.put('/cancel', ValidatorRol("administrador"), async (req, res) => {
    try {
        const cancelled = await appoin.disableAppointment(req.body)
        if (cancelled.result) return res.status(200).json(cancelled)
        res.status(500).json({ message: "No se pudo cancelar la cita" })
    } catch (err) {
        if (err.status) return res.status(err.status).json({ message: err.message })
        res.status(500).json({ message: err })
    }
})

// Export 
module.exports = Route