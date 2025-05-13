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
    
    const search = await appoin.findAppointments()

    if (!search.result) res.status(404).json({ message: "Citas no encontradas"})
    
    try {
        res.status(200).json(search)
    } catch (err) {
        if (err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({message: err})
    }
})