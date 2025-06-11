// Librarys
const { Router } = require('express')
const { hash } = require('bcrypt')

// Imports
const Staff = require('../services/Staff.services')
const { authenticateJWT, ValidatorRol } = require('../middleware/validator.handler')

// vars
const staff = new Staff()
const Route = Router()

// Middleware 
Route.use(authenticateJWT)

// Routes
Route.get('/all', ValidatorRol("administrador"), async (req,res) => {
    try {
        // Verifiy if exists
        const search = await staff.findAll()
        if (!search.result[0][0]) res.status(404).json({ message: "Usuarios no encontrado"})

        if (search.result[0][0]) return res.status(200).json(search)

        res.status(500).json({message: "Error interno"})
    } catch (err) {
        if(err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: err })
    }
})

Route.get('/all/vet', ValidatorRol("administrador"), async (req,res) => {
    try {
        // Verifiy if exists
        const search = await staff.findAllVet()
        if (!search.result[0][0]) res.status(404).json({ message: "Usuarios no encontrado"})

        if (search.result[0][0]) return res.status(200).json(search)

        res.status(500).json({message: "Error interno"})
    } catch (err) {
        if(err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: err })
    }   
})

Route.get('/all:by', ValidatorRol("administrador"), async (req,res) => {
    // Vars 
    const by = req.params.by
    
    try {
        if (!by) return res.status(400).json({ message: "Petición no valida"})

        // Verifiy if exists
        const search = await staff.findAllBy(by)
        if (!search.result[0][0]) return res.status(404).json({ message: "Usuarios no encontrados"})

        res.status(200).json(search)
    } catch (err) {
        if(err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: err })
    }
})

Route.get('/by:by', ValidatorRol("administrador"), async (req,res) => {
    // Vars 
    const by = req.params.by
    
    try {
        if (!by) return res.status(400).json({ message: "Petición no valida"})

        // Verifiy if exist
        const search = await staff.findBy(by)
        if (!search.result[0][0]) return res.status(404).json({ message: "Usuario no encontrado" })

        res.status(200).json(search)
    } catch (err) {
        if(err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: err })
    }
})

Route.post('/register', ValidatorRol("administrador"), async (req,res) => {
    // Vars 
    const saltRounds = 15
    const body = req.body
    
    try {
        if (!body) return res.status(400).json({ message: "Petición no valida"})

        // Verifiy if exist
        const find = await staff.findBy(toString(body.doc))
        if (find.result[0][0].nom_usu) return res.status(302).json({ message: "Persona ya registrada" })

        const create = await staff.createStaff({hash_pass: await hash(body.cont,saltRounds), ...body})
        if(create.created) return res.status(201).json(create)

        res.status(500).json({message: "Error interno"})
    } catch(err) {
        if(err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: "Error interno", error: err })
    }
})

Route.put('/modify', ValidatorRol("administrador"), async (req,res) => {
    // Vars 
    const { body } = req
    const saltRounds = 15
    console.log(body)
        
    try {
        if (!body) return res.status(400).json({ message: "Petición no valida"})

        // Verifiy if exist
        const find = await staff.findBy(toString(body.numeroDocumento))
        if (!find.result[0][0]) return res.status(404).json({ message: "Usuario no encontrado" })

        const modified = await staff.modify({hash_pass: await hash(body.password,saltRounds), ...body})
        if(modified.modified) return res.status(200).json(modified)

        res.status(500).json({message: "Error interno"})
    } catch (err) {
        if(err.status) return res.status(err.status).json({ message: err.message })
        res.status(500).json({ message: err })
    }
})
Route.delete('/delete', ValidatorRol("administrador"), async (req,res) => {
    // Vars 
    const { body } = req
        
    try {
        if (!body) return res.status(400).json({ message: "Petición no valida"})

        // Verifiy if exist
        const find = await staff.findBy(toString(body.doc))
        if (!find.result[0][0]) return res.status(404).json({ message: "Usuario no encontrado" })
            
        const staffDeleted = await staff.delete(body.doc)
        if (staffDeleted.deleted) return res.status(200).json(staffDeleted)

        res.status(500).json({ message: "Error interno" })
    } catch (err) {
        if(err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: err })
    }
})

// Export 
module.exports = Route