// Librarys
const { Router } = require('express')
const { hash } = require('bcrypt')

// Imports
const Owner = require('../services/Owner.services')
const { authenticateJWT, ValidatorRol, Fullinfo, authJWTGlobal } = require('../middleware/validator.handler')

// vars
const owner = new Owner()
const Route = Router()

// Middleware 
Route.use(authenticateJWT)
Route.use(authJWTGlobal)

// Routes
Route.get('/all', ValidatorRol("veterinario"), async (req,res) => {
    try {
        const search = await owner.findAllOwner()
        if (!search.result) return res.status(404).json({ message: "Usuarios no encontrado"})
            
        res.status(200).json(search)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', err: err })
    }
})


Route.get('/all:by', ValidatorRol("veterinario"), async (req,res) => {
    // Vars 
    const by = req.params.by
    
    try {
        if (!by) return res.status(400).json({ message: "Petición invalida, faltan datos"})

        const search = await owner.findAllByOwner(by)
        if (!search.result) return res.status(404).json({ message: "Usuarios no encontrados"})

        res.status(200).json(search)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', err: err })
    }
})

Route.get('/pet:by', ValidatorRol("veterinario"), async (req,res) => {
    // Vars 
    const by = req.params.by

    try {
        if (!by) return res.status(400).json({ message: "Petición invalida, faltan datos"})

        const search = await owner.findAllByPetOwner(by)
        if (!search.result) return res.status(404).json({ message: "Usuario no encontrado" })

        res.status(200).json(search)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', err: err })
    }
})

// Call Middleware for verify the request data
Route.use(Fullinfo(['cel2_per']))


Route.put('/modify', ValidatorRol("administrador"), async (req,res) => {
    // Vars 
    const { body } = req
    const saltRounds = 15
    
    try {
        // Verifiy if exist
        const find = await owner.findBy(toString(body.numeroDocumento))
        if (!find.result) return res.status(404).json({ message: "Usuario no encontrado" })

        const modified = await owner.modify({hash_pass: await hash(body.password,saltRounds), ...body})
        if(modified.modified) return res.status(200).json(modified)

        return res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde' })
    } catch (err) {
        if(err.status) return res.status(err.status).json({ message: err.message })
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.put('/delete', ValidatorRol("administrador"), async (req,res) => {
    // Vars 
    const by = req.body
    
    try {
        // Verifiy if exist
        const search = await owner.findByOwner(by.doc)

        if (!search.result[0][0]) return res.status(404).json({ message: "Usuario no encontrado" })    

        const deleted = await owner.deleteOwnerOwner(by.doc)
        
        if (deleted.deleted) return res.status(200).json(deleted)

        return res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde' })
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', err: err })
    }
})

// Export 
module.exports = Route