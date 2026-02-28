// Librarys 
const rateLimit = require('express-rate-limit')
const origin = process.env.ORIGIN
const isProduction = process.env.NOVE_ENV === 'production'

const corsOptions = {
    origin: [ , "https://petsheavenfront.onrender.com" , "http://localhost:5174", origin],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-api-key', 'User'],
    credentials: true
}

const limiter = rateLimit({
    windowMs: 3 * 60 * 1000,        // 5 minutes
    max: 1000,                       // Limit each IP to 500 requests per windowMs
    message: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde'
})

const limiterLog = rateLimit({
    // limit login attempts
    windowMs: 20 * 1000,                // 20 segundos
    limit: 3,                         // Limit each IP to 3 login requests per windowMs
    message: 'Demasiadas intentos fallidos, por favor intenta de nuevo más tarde'
})

const cookiesOptions = {
    maxAge: 30 * 24 * 60 * 60 * 1000, // Alternativa en milisegundos (30 días)
    httpOnly: true, // Seguridad: solo accesible por HTTP
    secure: true, // HTTPS en producción
    sameSite: 'none', // Política de same-site
    // signed: true,
    // domain: 'https://petsheaven-id95.onrender.com',
    // path: '/', // Ruta donde es válida (opcional)
    // priority: medium'',
    // encode:
} 
module.exports = { corsOptions, limiter, limiterLog, cookiesOptions }