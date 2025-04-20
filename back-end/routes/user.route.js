// Librarys
const { Router } = require('express')
const { hash } = require('bcrypt')

// Imports
const User = require('../services/Users.services')
const { authenticateJWT, ValidatorRol } = require('../middleware/validator.handler')

// vars
const user = new User()
const Route = Router()

// Middleware 
Route.use(authenticateJWT)

// Routes
Route.get('/all', ValidatorRol("administrador"), async (req,res) => {
    const search = await user.findAll()

    // Verifiy if exists
    if (!search.result) res.status(404).json({ message: "Usuarios no encontrado"})

    try {
        res.status(200).json(search)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }
})

Route.get('/all/all', ValidatorRol("administrador"), async (req,res) => {
    const search = await user.findAllUsers()

    // Verifiy if exists
    if (!search.result) res.status(404).json({ message: "Usuarios no encontrado"})

    try {
        res.status(200).json(search)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }
})

Route.get('/all:by', ValidatorRol("administrador"), async (req,res) => {
    // Vars 
    const by = req.params.by
    const search = await user.findAllBy(by)

    // Verifiy if exists
    if (!search.result) res.status(404).json({ message: "Usuarios no encontrados"})

    try {
        res.status(200).json(search)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }
})

Route.get('/by:by', ValidatorRol("administrador"), async (req,res) => {
    // Vars 
    const by = req.params.by
    const search = await user.findBy(by)

    // Verifiy if exist
    if (!search.result) res.status(404).json({ message: "Usuario no encontrado" })

    try {
        res.status(200).json(search)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }
})

Route.post('/register', async (req,res) => {
    // Vars 
    const saltRounds = 15
    const body = req.body
    
    // Verifiy if exist
    const find = await user.findBy(toString(body.numeroDocumento))
    if (find.result[0][0].nom_usu) res.status(302).json({ message: "Usuario ya existe" })
        
    try {
        const create = await user.create({hash_pass: await hash(body.password,saltRounds), ...body})
        res.status(201).json(create)
    } catch(err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }
})

Route.put('/modify', ValidatorRol("administrador"), async (req,res) => {
    // Vars 
    const { body } = req
    const saltRounds = 15
        
    // Verifiy if exist
    const find = await user.findBy(toString(body.numeroDocumento))
    if (!find.result) res.status(404).json({ message: "Usuario no encontrado" })

    try {
        const modified = await user.modify({hash_pass: await hash(body.password,saltRounds), ...body})
        res.status(200).json(modified)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }
})

Route.get('/owner/all', ValidatorRol("veterinario"), async (req,res) => {
    // Vars 
    const search = await user.findOwner()

    // Verifiy if exist
    if (!search.result) res.status(404).json({ message: "Owners no encontrados" })

    try {
        res.status(200).json(search)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }
})

// Route.get('/all/time:by', async (req,res) => {
//     // Vars 
//     const by = req.params.by
//     const search = await user.findAllTimeBy(by)

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