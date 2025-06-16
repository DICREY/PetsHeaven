// Librarys
const { Router } = require('express')
const { hash } = require('bcrypt')

// Imports
const People = require('../services/People.services')
const { authenticateJWT, ValidatorRol, Fullinfo, authJWTGlobal } = require('../middleware/validator.handler')

// vars
const people = new People()
const Route = Router()

// Middleware 
Route.use(authenticateJWT)
Route.use(authJWTGlobal)
Route.use(ValidatorRol("administrador"))

// Routes
Route.get('/all', async (req,res) => {
    try {
        const search = await people.findAll()
        if (!search.result) return res.status(404).json({ message: "Usuarios no encontrado"})

        res.status(200).json(search)
    } catch (err) {
        if(err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.get('/all:by', async (req,res) => {
    // Vars 
    const by = req.params.by
    
    try {
        if (!by) return res.status(400).json({ message: "Petición invalida, faltan datos"})
            
        // Verifiy if exists
        const search = await people.findAllBy(by)
        if (!search.result) res.status(404).json({ message: "Usuarios no encontrados"})

        res.status(200).json(search)
    } catch (err) {
        if(err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.get('/by:by', async (req,res) => {
    // Vars 
    const by = req.params.by
    
    try {
        if (!by) return res.status(400).json({ message: "Petición invalida, faltan datos"})

        // Verifiy if exist
        const search = await people.findBy(by)
        if (!search.result) res.status(404).json({ message: "Usuario no encontrado" })

        res.status(200).json(search)
    } catch (err) {
        if(err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

// Call Middleware for verify the request data
Route.use(Fullinfo(['cel2_per']))

Route.post('/register', async (req,res) => {
    // Vars 
    const saltRounds = 15
    const body = req.body
    
    try {
        // Verifiy if exist
        const find = await people.findBy(toString(body.doc_per))
        if (find.result[0][0].nom_per) res.status(302).json({ message: "Usuario ya existe" })

        const create = await people.create({ hash_pass: await hash(body.pas_per,saltRounds), ...body })
        res.status(201).json(create)

    } catch(err) {
        if(err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.put('/modify', async (req,res) => {
    // Vars 
    const { body } = req
    const saltRounds = 15
        
    try {
        // Verifiy if exist
        const find = await people.findBy(body.doc_per)
        if (!find.result) res.status(404).json({ message: "Usuario no encontrado" })

        const passwd = body.cont_per.length < 50? await hash(body.cont_per,saltRounds): String(body.cont_per)

        const modified = await passwd?
            await people.modify({ hash_pass: passwd,...body })
            :res.status(400).json({ message: "Petición no valida"})

        if (modified.modified) return res.status(200).json(modified)
    } catch (err) {
        if(err.status) return res.status(err.status).json({ message: err.message })

        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})
Route.delete('/delete', async (req,res) => {
    // Vars 
    const { body } = req
    console.log(body)
        
    try {
        // Verifiy if exist
        const find = await people.findBy(toString(body.doc_per))
        if (!find.result) res.status(404).json({ message: "Usuario no encontrado" })

        const peopleDeleted = await people.delete(body.doc_per)
        if (peopleDeleted.deleted) return res.status(200).json(peopleDeleted)

        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde' })
    } catch (err) {
        if(err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

// Export 
module.exports = Route