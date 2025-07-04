// Imports
const DataBase = require('./DataBase')
const People = require('./People.services')

// Main class
class Owner extends People{
    // constructor
    constructor(args) {
        super(args)
        this.database = new DataBase()
        this.args = args
    }

    // function to find all
    async findAllOwner() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchOwners();"

            // conect to database
            this.database = new DataBase()
            this.database.conect()

            if (this.database) this.database.conection.query(proc,(err,result) => {
                if(err) {
                    rej({ message: err})
                } else if(!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Owner found",
                        result: result[0]
                    })
                }, 500)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    // function to find all by
    async findAllByOwner(data) {
        return new Promise((res,rej) => {
            // vars
            const by = data?.replace(":","").replace(" ","")
            const proc = "CALL SearchOwnersBy(?);"
            
            // conect to database
            this.database = new DataBase()
            this.database.conect()

            if (this.database) this.database.conection.query(proc,by,(err,result) => {
                if(err) {
                    rej({ message: err})
                } else if(!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Owner found",
                        result: result[0]
                    })
                }, 500)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    // function to find by
    async findByOwner(data) {
        return new Promise((res,rej) => {
            // vars
            const by = data.replace(":","").replace(" ","")
            const proc = "CALL SearchOwnerBy(?);"
            
            // conect to database
            this.database = new DataBase()
            this.database.conect()

            if (this.database) this.database.conection.query(proc,by,(err,result) => {
                if(err) {
                    rej({ message: err})
                } else if(!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Owner found",
                        result: result[0]
                    })
                }, 500)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    // function to find by
    async findAllByPetOwner(data) {
        return new Promise((res,rej) => {
            // vars
            const by = data.replace(":","").replace(" ","")
            const proc = "CALL SearchOwnersByPet(?);"

            // conect to database
            this.database = new DataBase()
            this.database.conect()

            if (this.database) this.database.conection.query(proc,by,(err,result) => {
                if(err) {
                    rej({ message: err})
                } else if(!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Owner found",
                        result: result[0]
                    })
                }, 500)
            })

            // close conection 
            this.database.conection.end()
        })
    }
    
    // function to delete
    async deleteOwnerOwner(data = "") {
        return new Promise((res,rej) => {
            // data 
            const by = data.replace(":","").replace(" ","")
            const procedure = "CALL DeleteOwner(?);"

            // conect to database
            this.database = new DataBase()
            this.database.conect()

            // call procedure
            if (this.database) this.database.conection.query(procedure,by,err => {
                if(err) rej({message: err})
                setTimeout(() => res({
                    message: "Owner Deleted",
                    deleted: true
                }),1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }
}

// Export
module.exports = Owner