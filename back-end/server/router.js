// Librarys 
const express = require('express')

// Imports 
const globalRoute = require('../routes/global.route')
const cookieRoute = require('../routes/cookie.route')
const peopleRoute = require('../routes/people.route')
const staffRoute = require('../routes/staff.route')
const ownerRoute = require('../routes/owner.route')
const petRoute = require('../routes/pets.route')
const appointmentRoute = require('../routes/appointment.route')
const serviceRoute = require('../routes/services.route')

// function to Define routers
function routerApi(app) {
    // Router
    const router = express.Router()

    // Main router
    app.use('/',router)

    // Routes
    router.use('/global',globalRoute)
    router.use('/cookie',cookieRoute)
    router.use('/people',peopleRoute)
    router.use('/staff',staffRoute)
    router.use('/owner',ownerRoute)
    router.use('/pet',petRoute)
    router.use('/appointment',appointmentRoute)
    router.use('/service',serviceRoute)
}

// Export Router
module.exports = { routerApi }