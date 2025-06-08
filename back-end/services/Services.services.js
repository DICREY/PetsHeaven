// Imports
const DataBase = require('./DataBase')

// Main class 
class Services {
    // constructor
    constructor(...args) {
        this.database = new DataBase()
        this.args = args
    }

    // function to find all
    async findAll() {
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
                        message: "Services found",
                        result: result
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }
    // function to find all
    async findAllBy(data) {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchServicesBy(?);"

            // conect to database
            this.database = new DataBase()
            this.database.conect()

            if (this.database) this.database.conection.query(proc,[data],(err,result) => {
                if(err) rej({ message: err })
                if(!result || !result[0][0]) rej({
                    message: "Not found",
                    status: 404
                })
                setTimeout(() => {
                    res({
                        message: "Services found",
                        result: result
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    // function to find all the services
    async FindCategories() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchServicesCat();"

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
                        message: "Services found",
                        result: result
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }
}

module.exports = Services