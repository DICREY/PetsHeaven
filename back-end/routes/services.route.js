// Librarys
const { Router } = require('express')

// Imports
const Services = require('../services/Services.services')
const { authenticateJWT, ValidatorRol } = require('../middleware/validator.handler')

// vars
const services = new Services()
const Route = Router()

// Middleware 
Route.use(authenticateJWT)

// Routes 
Route.get('/all', ValidatorRol("usuario"), async (req,res) => {
    try {
        const serv = await services.findAll()
        if (!serv.result[0][0]) return res.status(404).json({ message: "Servicios no encontrados" })

        res.status(200).json(serv)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }
})

// Routes 
Route.get('/all/:by', ValidatorRol("usuario"), async (req,res) => {
    try {
        const serv = await services.findAll()
        if (!serv.result[0][0]) return res.status(404).json({ message: "Servicios no encontrados" })

        res.status(200).json(serv)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }
})