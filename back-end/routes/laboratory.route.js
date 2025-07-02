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
Route.use(Fullinfo([
    'cos_fin_pru_lab','cat_pro','cat_tip_pru','fec_pro_pru_lab','fec_res_pru_lab','doc_vet_rev',
    'obs_mue_pru_lab','res_pru_lab','cod_tip_pru','cos_est_tip_pru','des_tip_pru','fec_mue_pru_lab',
    'id_pro_mas','ins_pre_tip_pru','met_est_tip_pru','tie_est_hrs_tip_pru','par_ref_tip_pru'
]))

Route.post('/register', ValidatorRol("veterinario"), async (req,res) => {
    // Vars 
    const data = req.body
    
    try {   
        const result = await services.createLabTest(data);
        if (result.success) return res.status(201).json(result);
    } catch (err) {
        console.log(err)
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if (err?.status) return res.status(err?.status).json({ message: err?.message });
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.put('/modify', ValidatorRol("veterinario"), async (req, res) => {
    // Vars 
    const data = req.body

    try {            
        const result = await services.modifyLabTest(data)
        if (result?.success) return res.status(201).json(result)
        res.status(400).json({ message: "Error al actualizar la prueba de laboratorio, por favor intente nuevamente" })
    } catch (err) {
        console.log(err)
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if (err?.status) return res.status(err?.status).json({ message: err?.message })
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