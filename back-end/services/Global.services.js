// Imports
const DataBase = require('./DataBase')

// Main class 
class Global {
    // constructor
    constructor(...args) {
        this.database
        this.args = args
    }

    // function to find all the services
    async SearchServices() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchServices();"

            // conect to database
            this.database = new DataBase()
            this.database.conect()

            if (this.database) this.database.conection.query(proc,(err,result) => {
                if(err) rej({ message: err })
                if(!result || !result[0][0]) rej({
                    message: "Not found",
                    status: 404
                })
                setTimeout(() => {
                    res({
                        message: "Pets found",
                        result: result
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }
    async login() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL Login(?);"
            const by = this.args[0].replace(" ","")

            // conect to database
            this.database = new DataBase()
            this.database.conect()

            if (this.database) this.database.conection.query(proc,by,(err,result) => {
                if(err) rej({ message: err }) 
                if(!result || !result[0][0]) rej({
                    message: "Not found",
                    status: 404
                })
                setTimeout(() => {
                    res({
                        message: "Authorized",
                        result: result
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    // Get all the appointments 
    async findAppointments() {
        return new Promise((res,rej)=> {
            const procedure = "CALL SearchAllApointments();"

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
}

// Export
module.exports = Global