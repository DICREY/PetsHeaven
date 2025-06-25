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

Route.get('/all', ValidatorRol("usuario"), async (req,res) => {
    try {
        const serv = await services.findAllVacunas()
        if (!serv.result[0][0]) return res.status(404).json({ message: "Vacunas no encontradas" })
        
        res.status(200).json(serv)
    } catch (err) {
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if (err?.status) return res.status(err?.status).json({ message: err?.message });
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

// Call Middleware for verify the request data
Route.use(Fullinfo(['nom_pro','des_pro','cat_pro']))

Route.post('/register', ValidatorRol("veterinario"), async (req,res) => {
    // Vars 
    const data = req.body
    
    try {   
        const result = await services.registerVacuna(data);
        res.status(201).json({ message: "Vacuna registrada correctamente", result });
    } catch (err) {
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if (err?.status) return res.status(err?.status).json({ message: err?.message });
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.put('/change-state', ValidatorRol("administrador"), async (req, res) => {
    // Vars 
    const data = req.body

    try {            
        const result = await services.ChangeVaccineState(data)
        res.status(201).json(result);
    } catch (err) {
        console.log(err)
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if (err?.status) return res.status(err?.status).json({ message: err?.message });
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

// Exports 
module.exports = Route