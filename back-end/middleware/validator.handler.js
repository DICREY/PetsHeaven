// Librarys
const jwt = require('jsonwebtoken')

// Env vars
const secret = process.env.JWT_SECRET

// Handle Validations middlewares
function validatorHeaders(req, res, next) {
    // Headers
    const apiKey = req.signedCookies ? req.signedCookies.__nit : req.headers['x-api-key']
    const contentType = req.headers['accept']
    const userAgent = req.headers['user-agent']
    const user = req.signedCookies ? req.signedCookies.__userName : 'Unknow User'

    // Validation
    if (!apiKey || apiKey !== secret) {
        return res.status(498).json({ message: 'Usuario no autorizado' })
    }
    if (!contentType) {
        return res.status(400).json({ message: 'Contenido invalido' })
    }
    if (!userAgent || !user) {
        return res.status(401).json({ message: 'Usuario no autorizado' })
    }

    // Next to
    next()
}

// Middleware de validación
function authenticateJWT(req, res, next) {
    const cred = req.signedCookies?.__cred

    if (!cred) return res.status(403).json({ message: 'Credenciales no proporcionadas' })

    jwt.verify(cred, secret, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Sesión inválida o expirada' })

        req.user = decoded // Almacena datos del usuario en la request
        next()
    })
}

function authJWTGlobal(req, res, next) {
    const token = req.signedCookies?.__token

    if (!token) return res.status(403).json({ message: 'Token no proporcionado' })

    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token inválido o expirado' })

        req.user = decoded // Almacena datos del usuario en la request
        next()
    })
}

function ValidatorRol(requireRol = '') {
    return (req, res, next) => {
        const rolesHeader = req.signedCookies?.__user

        // Verificación más robusta del header
        if (!rolesHeader || typeof rolesHeader !== 'string') {
            return res.status(401).json({ message: 'Roles perdidos o invalidos' })
        }

        const roles = rolesHeader.split(',').map(role => role.trim())

        // Comparación case-insensitive
        const isAdmin = roles.some(role => role.toLowerCase() === requireRol.toLowerCase())

        // Manejo de acceso
        if (!isAdmin) return res.status(401).json({ message: 'Usuario no autorizado' })

        next()
    }
}

function Fullinfo(optionalFields = []) {
    return (req, res, next) => {
        // Vars 
        const data = req.body

        // Verifica si el body está vacío
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: "Petición vacía, no se enviaron datos" })
        }

        // Busca campos vacíos por defecto
        for (const [key, value] of Object.entries(data)) {
            if (optionalFields.includes(key)) continue
            if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
                return res.status(400).json({ message: "A la petición le faltan datos" })
            }
        }

        next()
    }
}

// export middleware 
module.exports = { validatorHeaders, ValidatorRol, authenticateJWT, Fullinfo, authJWTGlobal }