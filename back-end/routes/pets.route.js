// Librarys
const { Router } = require('express')

// Imports
const Pet = require('../services/Pets.services')
const { authenticateJWT, ValidatorRol } = require('../middleware/validator.handler')

// vars
const pet = new Pet()
const Route = Router()

// Middleware 
Route.use(authenticateJWT)

// Routes 
Route.get('/all', ValidatorRol("veterinario"), async (req,res) => {
    // Vars 
    const pets = await pet.findAll()
    if (!pets.result) res.status(404).json({ message: "Mascotas no encontradas" })

    try {
        res.status(200).json(pets)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }

})

Route.get('/all:by', ValidatorRol("usuario"),async (req,res) => {
    // Vars
    const by = req.params.by
    
    const pets = await pet.findBy(by)
    if (!pets.result[0][0]) res.status(404).json({message: "mascotas no encontradas"})

    try {
        res.status(200).json(pets)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }

})

Route.post('/register', ValidatorRol("veterinario"), async (req,res) => {
    // Vars
    const { body } = req

    // Verify if exist
    // const find = pet.findAllBy(toString(body.name))
    // const findPet = await find.result[0][0]

    // if (findPet) {
    //     return res.status(404).json({message: "La mascota ya existe"})
    // }
    console.log(body)

    try{
        const created = await pet.create(body)
        if (created.create) {
            return res.status(201).json(created)
        }
        res.status(500).json({message: "Error interno"})
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }
})

Route.put('/modify', ValidatorRol("usuario"), async (req,res) => {
    // Vars 
    const body = req.body

    // Verify if exist
    const find = await pet.findAllBy(body.doc_usu,body.nom_mas)
    const findOne = await find.result[0][0]

    if (!findOne) {
        return res.status(404).json({message: "Mascota no encontrada"})
    }

    try {
        const petMod = await pet.modify(body)
        res.status(200).json(petMod)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }
})

Route.get('/history:by', ValidatorRol("veterinario") ,async (req,res) => {
    // Vars 
    const by = req.params.by

    // Verify if exist
    const find = pet.findAllBy(toString(body.user))
    if (!find.result) res.status(404).json({message: "Mascota no encontrada"})

    try {
        const pets = await pet.findHistoryBy(toString(by))
        res.status(200).json(pets)
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }
})

Route.delete('/delete', ValidatorRol("administrador") ,async (req,res) => {
    // Vars 
    const body = req.body

    // Verify if exist
    const find = await pet.findAllBy(body.doc_usu,body.nom_mas)
    const findOne = await find.result[0][0]

    if (!findOne) {
        return res.status(404).json({message: "Mascota no encontrada"})
    }

    try {
        const petDeleted = await pet.deleteBy(body.doc_usu,body.nom_mas)
        if (petDeleted.deleted){
            return res.status(200).json(petDeleted)
        }
        return res.status(500).json({message: "Error interno"})
        
    } catch (err) {
        if(err.status) return res.status(err.status).json(err.message)
        res.status(500).json({ message: err })
    }
})

// Export 
module.exports = Route