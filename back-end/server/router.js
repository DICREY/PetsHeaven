// Librarys 
const express = require('express')

// Imports 
const globalRoute = require('../routes/global.route')
const userRoute = require('../routes/user.route')
const ownerRoute = require('../routes/owner.route')
const petRoute = require('../routes/pets.route')
const appointmentRoute = require('../routes/appointment.route')

// function to Define routers
function routerApi(app) {
    // Router
    const router = express.Router()

    // Main router
    app.use('/',router)

    router.use('/global',globalRoute)
    router.use('/owner',ownerRoute)
    router.use('/user',userRoute)
    router.use('/pet',petRoute)
    router.use('/appointment',appointmentRoute)
}

// Export Router
module.exports = { routerApi }