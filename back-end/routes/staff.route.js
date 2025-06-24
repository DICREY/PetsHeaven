// Librarys
const { Router } = require('express')
const { hash } = require('bcrypt')

// Imports
const Staff = require('../services/Staff.services')
const { authenticateJWT, ValidatorRol, Fullinfo, authJWTGlobal } = require('../middleware/validator.handler')

// vars
const staff = new Staff()
const Route = Router()

// Middlewares
Route.use(authenticateJWT)
Route.use(authJWTGlobal)
Route.use(ValidatorRol("veterinario"))

// Routes
Route.get('/all', async (req,res) => {
    try {
        // Verifiy if exists
        const search = await staff.findAll()
        if (!search.result[0][0]) res.status(404).json({ message: "Usuarios no encontrado"})

        if (search.result[0][0]) return res.status(200).json(search)

        res.status(500).json({message: 'Error del servidor por favor intentelo mas tarde'})
    } catch (err) {
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if(err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.get('/all/vet', async (req,res) => {
    try {
        // Verifiy if exists
        const search = await staff.findAllVet()
        if (!search.result[0][0]) res.status(404).json({ message: "Usuarios no encontrado"})

        if (search.result[0][0]) return res.status(200).json(search)

        res.status(500).json({message: 'Error del servidor por favor intentelo mas tarde'})
    } catch (err) {
        console.log(err)
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if(err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }   
})


Route.get('/all:by', async (req,res) => {
    // Vars 
    const by = req.params.by
    
    try {
        if (!by) return res.status(400).json({ message: "Petición invalida, faltan datos" })

        // Verifiy if exists
        const search = await staff.findAllBy(by)
        if (!search.result[0][0]) return res.status(404).json({ message: "Usuarios no encontrados"})

        res.status(200).json(search)
    } catch (err) {
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if(err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

Route.get('/by:by', async (req,res) => {
    // Vars 
    const by = req.params.by
    
    try {
        if (!by) return res.status(400).json({ message: "Petición invalida, faltan datos" })

        // Verifiy if exist
        const search = await staff.findBy(by)
        if (!search.result[0][0]) return res.status(404).json({ message: "Usuario no encontrado" })

        res.status(200).json(search)
    } catch (err) {
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if(err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

// Call Middleware for verify the request data
Route.use(ValidatorRol("administrador"))
Route.use(Fullinfo(['cel2_per']))

Route.post('/register', async (req,res) => {
    // Vars 
    const saltRounds = 15
    const body = req.body
    
    try {
        // Verifiy if exist
        const find = await staff.findBy(toString(body.doc_per))
        if (find.result[0][0].nom_per) return res.status(302).json({ message: "Persona ya registrada" })

        const create = await staff.createStaff({hash_pass: await hash(body.cont_per,saltRounds), ...body})
        if(create.created) return res.status(201).json(create)

        res.status(500).json({message: 'Error del servidor por favor intentelo mas tarde'})
    } catch(err) {
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
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
        const find = await staff.findBy(toString(body.numeroDocumento))
        if (!find.result[0][0]) return res.status(404).json({ message: "Usuario no encontrado" })

        const modified = await staff.modify({hash_pass: await hash(body.password,saltRounds), ...body})
        if(modified.modified) return res.status(200).json(modified)

        res.status(500).json({message: 'Error del servidor por favor intentelo mas tarde'})
    } catch (err) {
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if(err.status) return res.status(err.status).json({ message: err.message })
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})
Route.put('/delete', ValidatorRol("administrador"), async (req,res) => {
    // Vars 
    const { body } = req
        
    try {
        // Verifiy if exist
        const find = await staff.findBy(toString(body.doc))
        if (!find.result[0][0]) return res.status(404).json({ message: "Usuario no encontrado" })
            
        const staffDeleted = await staff.delete(body.doc)
        if (staffDeleted.deleted) return res.status(200).json(staffDeleted)

        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde' })
    } catch (err) {
        if(err?.message?.sqlState === '45000') return res.status(500).json({ message: err?.message?.sqlMessage })
        if(err.status) return res.status(err.status).json({message: err.message})
        res.status(500).json({ message: 'Error del servidor por favor intentelo mas tarde', error: err })
    }
})

// Export 
module.exports = Route