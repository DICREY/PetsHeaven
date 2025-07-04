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
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
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
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if (err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

// Call Middleware for verify the request data
Route.use(Fullinfo(['cel2_per']))

Route.post('/by', ValidatorRol("usuario"), async (req,res) => {
    // Vars 
    const { by } = req.body

    try {
        const search = await appoin.findAppointmentsByUser(by)

        if (!search.result) res.status(404).json({ message: "Citas no encontradas"})

        res.status(200).json(search)
    } catch (err) {
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if (err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.post('/pet', ValidatorRol("usuario"), async (req,res) => {
    // Vars 
    const data = req.body

    try {
        const search = await appoin.findAppointmentsByPet(data)

        if (!search.result) res.status(404).json({ message: "Citas no encontradas"})

        res.status(200).json(search)
    } catch (err) {
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if (err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.post('/pet/all', ValidatorRol("veterinario"), async (req,res) => {
    // Vars 
    const data = req.body

    try {
        const search = await appoin.findAllAppointmentsByPet(data)

        if (!search.result) res.status(404).json({ message: "Citas no encontradas"})

        res.status(200).json(search)
    } catch (err) {
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if (err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.post('/pet/completed', ValidatorRol("veterinario"), async (req,res) => {
    // Vars 
    const data = req.body

    try {
        const search = await appoin.findAppointmentsByPetCompleted(data)

        if (!search.result) res.status(404).json({ message: "Citas no encontradas"})

        res.status(200).json(search)
    } catch (err) {
        console.log(err)
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if (err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.post('/pet/vaccine', ValidatorRol("usuario"), async (req,res) => {
    // Vars 
    const data = req.body

    try {
        const search = await appoin.findAppointmentsByPetVaccine(data)

        if (!search.result) res.status(404).json({ message: "Citas no encontradas"})

        res.status(200).json(search)
    } catch (err) {
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if (err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})
Route.post('/pet/consult', ValidatorRol("usuario"), async (req,res) => {
    // Vars 
    const data = req.body

    try {
        const search = await appoin.findAppointmentsByPetConsult(data)

        if (!search.result) res.status(404).json({ message: "Citas no encontradas"})

        res.status(200).json(search)
    } catch (err) {
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if (err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.post('/register', ValidatorRol("usuario"), async (req, res) => {
    // Vars 
    const data = req.body
    
    try {
        const created = await appoin.registAppointment(data)
        if (created.success) return res.status(201).json(created)

        res.status(500).json({ message: "No se pudo registrar la cita" })
    } catch (err) {
        console.log(err)
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if (err.status) return res.status(err.status).json({ message: err.message })
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.put('/modify', ValidatorRol("veterinario"), async (req, res) => {
    // Vars 
    const data = req.body

    try {
        const updated = await appoin.modifyAppointment(data)
        if (updated.success) return res.status(200).json(updated)

        res.status(500).json({ message: "No se pudo modificar la cita" })
    } catch (err) {
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if (err.status) return res.status(err.status).json({ message: err.message })
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.put('/cancel', ValidatorRol("veterinario"), async (req, res) => {
    // Vars 
    const data = req.body

    try {
        const cancelled = await appoin.disableAppointment(data)
        if (cancelled.success) return res.status(200).json(cancelled)

        res.status(500).json({ message: "No se pudo cancelar la cita" })
    } catch (err) {
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if (err.status) return res.status(err.status).json({ message: err.message })
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

// Export 
module.exports = Route