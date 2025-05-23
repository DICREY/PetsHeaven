// Imports
const DataBase = require('./DataBase')

// Main class
class Appointment {
    // constructor
    constructor(...args) {
        this.database = new DataBase()
        this.args = args
    }

    // Get all the appointments 
    async findAppointments() {
        return new Promise((res,rej)=> {
            const procedure = "CALL SearchAllAppointments();"

            // conect to database
            this.database = new DataBase()
            this.database.conect()
        
            if (this.database) this.database.conection.query(procedure, (err,result) =>{
                if(err) rej({ message: err})
                if(!result || !result[0][0]) rej({
                    message: "Not found",
                    status: 404
                })
                setTimeout(() =>{
                    res({
                        message: "Appointments found",
                        result: result
                    })
                }, 1000)
            })
            this.database.conection.end()
        }) 
    }

    // Get all the appointments by User
    async findAppointmentsByUser(data) {
        return new Promise((res,rej)=> {
            const procedure = "CALL SearchAllAppointments(?);"
            const by = data.replace(":","").replace(" ","")

            // conect to database
            this.database = new DataBase()
            this.database.conect()
        
            if (this.database) this.database.conection.query(procedure, by , (err,result) =>{
                if(err) rej({ message: err})
                if(!result || !result[0][0]) rej({
                    message: "Not found",
                    status: 404
                })
                setTimeout(() =>{
                    res({
                        message: "Appointments found",
                        result: result
                    })
                }, 1000)
            })
            this.database.conection.end()
        }) 
    }
}

module.exports = Appointment