// Imports
const DataBase = require('./DataBase')

// Main class 
class Global {
    // function to find all the services
    async SearchServices() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchServices();"

            // conect to database
            let database = new DataBase()
            database.conect()

            if (database) database.conection.query(proc,(err,result) => {
                if(err) rej({ message: err })
                if(!result[0][0]) rej({
                    message: "Not found",
                    status: 404
                })
                setTimeout(() => {
                    res({
                        message: "Pets found",
                        result: result
                    })
                },2000)
            })

            // close conection 
            database.conection.end()
        })
    }
    async login(primaryData) {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL Login(?);"

            // conect to database
            let database = new DataBase()
            database.conect()

            if (database) database.conection.query(proc,primaryData,(err,result) => {
                if(err) rej({ message: err }) 
                if(!result[0][0]) rej({
                    message: "Not found",
                    status: 404
                })
                setTimeout(() => {
                    res({
                        message: "Authorized",
                        result: result
                    })
                },2000)
            })

            // close conection 
            database.conection.end()
        })
    }
}

// Export
module.exports = Global