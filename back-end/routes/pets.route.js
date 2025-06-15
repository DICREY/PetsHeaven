// Librarys
const { Router } = require('express')

// Imports
const Pet = require('../services/Pets.services')
const { authenticateJWT, ValidatorRol, Fullinfo, authJWTGlobal } = require('../middleware/validator.handler')

// vars
const pet = new Pet()
const Route = Router()

// Middleware 
Route.use(authenticateJWT)
Route.use(authJWTGlobal)

// Routes 
Route.get('/all', ValidatorRol("veterinario"), async (req,res) => {
    try {
        const pets = await pet.findAll()
        if (!pets.result[0][0]) return res.status(404).json({ message: "Mascotas no encontradas" })

        res.status(200).json(pets)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }

})

Route.get('/all:by', ValidatorRol("usuario"),async (req,res) => {
    // Vars
    const by = req.params.by
    
    try {
        if (!by) return res.status(400).json({ message: "Petición invalida, faltan datos"})

        const pets = await pet.findBy(by)
        if (!pets.result[0][0]) return res.status(404).json({message: "mascotas no encontradas"})

        res.status(200).json(pets)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }

})

// Call Middleware for verify the request data
Route.use(Fullinfo)

Route.post('/register', ValidatorRol("veterinario"), async (req,res) => {
    // Vars
    const { body } = req
    
    try{
        // Verify if exist
        const find = await pet.findAllBy(body.nom_mas,body.doc_per)
        if (find.result[0][0]) return res.status(409).json({message: "La mascota ya existe"})

        const created = await pet.create(body)
        if (created.create) return res.status(201).json(created)

        res.status(500).json({message: "Error interno"})
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }
})

Route.put('/modify', ValidatorRol("usuario"), async (req,res) => {
    // Vars 
    const body = req.body
    
    try {
        // Verify if exist
        const find = await pet.findAllBy(body.doc_per,body.nom_mas)
        if (!find.result[0][0]) return res.status(404).json({message: "Mascota no encontrada"})

        const petMod = await pet.modify(body)
        if(petMod.modify) return res.status(200).json(petMod)

        return res.status(500).json({message: "Error interno"})
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }
})

Route.post('/history', ValidatorRol("veterinario") ,async (req,res) => {
    // Vars 
    const body = req.body
    
    try {
        // Verify if exist
        const findPet = await pet.findAllBy(body.secondData, body.firstData)
        if (!findPet.result) return res.status(404).json({message: "Mascota no encontrada"})

        const pets = await pet.findHistoryBy(body.firstData, body.secondData)
        if(pets) return res.status(200).json(pets)

        return res.status(404).json({message: "Historial no encontrado"})
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }
})

Route.delete('/delete', ValidatorRol("administrador") ,async (req,res) => {
    // Vars 
    const body = req.body

    try {
        // Verify if exist
        const find = await pet.findAllBy(body.doc_per,body.nom_mas)
        if (!find.result[0][0]) return res.status(404).json({message: "Mascota no encontrada"})

        const petDeleted = await pet.deleteBy(body.doc_per,body.nom_mas)
        if (petDeleted.deleted) return res.status(200).json(petDeleted)

        res.status(500).json({message: "Error interno"})
        
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }
})

// Export 
module.exports = Route