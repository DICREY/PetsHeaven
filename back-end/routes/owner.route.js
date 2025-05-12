// Librarys
const { Router } = require('express')
const { hash } = require('bcrypt')

// Imports
const Owner = require('../services/Owner.services')
const { authenticateJWT, ValidatorRol } = require('../middleware/validator.handler')

// vars
const owner = new Owner()
const Route = Router()

// Middleware 
// Route.use(authenticateJWT)

// Routes
Route.get('/all', ValidatorRol("veterinario"), async (req,res) => {
    try {
        const search = await owner.findAll()
        if (!search.result) return res.status(404).json({ message: "Usuarios no encontrado"})
        res.status(200).json(search)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: "Error interno", err: err })
    }
})


Route.get('/all:by', ValidatorRol("veterinario"), async (req,res) => {
    // Vars 
    const by = req.params.by
    
    try {
        const search = await owner.findAllBy(by)
        if (!search.result) return res.status(404).json({ message: "Usuarios no encontrados"})
        res.status(200).json(search)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: "Error interno", err: err })
    }
})

Route.get('/pet:by', ValidatorRol("veterinario"), async (req,res) => {
    // Vars 
    const by = req.params.by

    try {
        const search = await owner.findAllByPet(by)
        if (!search.result) return res.status(404).json({ message: "Usuario no encontrado" })
        res.status(200).json(search)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: "Error interno", err: err })
    }
})

Route.delete('/delete', ValidatorRol("veterinario"), async (req,res) => {
    // Vars 
    const by = req.body
    
    try {
        // Verifiy if exist
        const search = await owner.findBy(by.doc)

        if (!search.result[0][0]) return res.status(404).json({ message: "Usuario no encontrado" })    

        const deleted = await owner.deleteOwner(by.doc)
        
        if (deleted.deleted) return res.status(200).json(deleted)

        return res.status(500).json({ message: "Error interno" })
    } catch (err) {
        console.log(err)
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: "Error interno", err: err })
    }
})

// Route.get('/all/time:by', async (req,res) => {
//     // Vars 
//     const by = req.params.by
//     const search = await owner.findAllTimeBy(by)

//     // Verifiy if exists
//     if (!search.result) return res.status(404).json({ message: "Usuarios no encontrados"})

//     try {
//         res.status(200).json(search)
//     } catch (err) {
// if(err.status) return res.status(err.status).json(err.message)
//.status(500)         res.json({ message: err })
//     }
// })

// Export 
module.exports = Route