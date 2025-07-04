const { Router } = require('express')
const Consult = require('../services/Consult.services')
const { authenticateJWT, ValidatorRol } = require('../middleware/validator.handler')

const consult = new Consult()
const Route = Router()

Route.use(authenticateJWT)

// Registrar consulta
Route.post('/register', ValidatorRol("veterinario"), async (req, res) => {
    const data = req.body
    try {
        const result = await consult.registerConsult(data)
        if (!result.success) return res.status(400).json({ message: "No se pudo registrar la consulta" })
        res.status(201).json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error del servidor', error: err })
    }
})

module.exports = Route