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
Route.use(authenticateJWT)

// Routes
Route.get('/all', ValidatorRol("veterinario"), async (req,res) => {
    const search = await owner.findAll()

    // Verifiy if exists
    if (!search.result) res.status(404).json({ message: "Usuarios no encontrado"})

    try {
        res.status(200).json(search)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }
})


Route.get('/all:by', ValidatorRol("veterinario"), async (req,res) => {
    // Vars 
    const by = req.params.by
    const search = await owner.findAllBy(by)

    // Verifiy if exists
    if (!search.result) res.status(404).json({ message: "Usuarios no encontrados"})

    try {
        res.status(200).json(search)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }
})

Route.get('/pet:by', ValidatorRol("veterinario"), async (req,res) => {
    // Vars 
    const by = req.params.by
    const search = await owner.findAllByPet(by)

    // Verifiy if exist
    if (!search.result) res.status(404).json({ message: "Usuario no encontrado" })

    try {
        res.status(200).json(search)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }
})

Route.delete('/delete', ValidatorRol("veterinario"), async (req,res) => {
    // Vars 
    const by = req.body.by
    const search = await owner.findAllBy(by)

    // Verifiy if exist
    if (!search.result[0][0]) res.status(404).json({ message: "Usuario no encontrado" })

    try {
        const deleted = await owner.deleteOwner(by)
        if (deleted.deleted) return res.status(200).json(deleted.message)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }
})

// Route.get('/all/time:by', async (req,res) => {
//     // Vars 
//     const by = req.params.by
//     const search = await owner.findAllTimeBy(by)

//     // Verifiy if exists
//     if (!search.result) res.status(404).json({ message: "Usuarios no encontrados"})

//     try {
//         res.status(200).json(search)
//     } catch (err) {
// if(err.status) return res.status(err.status).json(err.message)
//.status(500)         res.json({ message: err })
//     }
// })

// Export 
module.exports = Route