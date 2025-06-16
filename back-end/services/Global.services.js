// Imports
const DataBase = require('./DataBase')

// Main class 
class Global {
    // constructor
    constructor(...args) {
        this.database
        this.args = args
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
                },200)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    async GetDataAdmin() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL GetDataAdmin();"
            // const by = this.args[0].replace(" ","")

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
                        message: "Found info",
                        result: result['0']
                    })
                },200)
            })

            // close conection 
            this.database.conection.end()
        })
    }

}

// Export
module.exports = Global