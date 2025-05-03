// Imports
const DataBase = require('./DataBase')

// Main class
class Owner{
    // function to find all
    async findAll() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchOwners();"

            // conect to database
            const database = new DataBase()
            database.conect()

            if (database) database.conection.query(proc,(err,result) => {
                if(err) rej({ message: err })
                if(!result[0][0]) rej({
                    message: "Not found",
                    status: 404
                })
                setTimeout(() => {
                    res({
                        message: "Owners found",
                        result: result
                    })
                },1000)
            })

            // close conection 
            database.conection.end()
        })
    }

    // function to find all by
    async findAllBy(data) {
        return new Promise((res,rej) => {
            // vars
            const by = data.replace(":","").replace(" ","")
            const proc = "CALL SearchOwnersBy(?);"
            
            // conect to database
            const database = new DataBase()
            database.conect()

            if (database) database.conection.query(proc,by,(err,result) => {
                if(err) rej({ message: err })
                if(!result[0][0]) rej({
                    message: "Not found",
                    status: 404
                })
                setTimeout(() => {
                    res({
                        message: "Owners found",
                        result: result
                    })
                },1000)
            })

            // close conection 
            database.conection.end()
        })
    }

    // function to find by
    async findBy(data) {
        return new Promise((res,rej) => {
            // vars
            const by = data.replace(":","").replace(" ","")
            const proc = "CALL SearchOwnerBy(?);"
            
            // conect to database
            const database = new DataBase()
            database.conect()

            if (database) database.conection.query(proc,by,(err,result) => {
                if(err) rej({ message: err })
                if(!result[0][0]) rej({
                    message: "Not found",
                    status: 404
                })
                setTimeout(() => {
                    res({
                        message: "Owners found",
                        result: result
                    })
                },1000)
            })

            // close conection 
            database.conection.end()
        })
    }

    // function to find by
    async findAllByPet(data) {
        return new Promise((res,rej) => {
            // vars
            const by = data.replace(":","").replace(" ","")
            const proc = "CALL SearchOwnersByPet(?);"

            // conect to database
            const database = new DataBase()
            database.conect()

            if (database) database.conection.query(proc,by,(err,result) => {
                if(err) rej({ message: err })
                if(!result[0][0]) rej({
                    message: "Not found",
                    status: 404
                })
                setTimeout(() => {
                    res({
                        message: "Owner found",
                        result: result
                    })
                },1000)
            })

            // close conection 
            database.conection.end()
        })
    }
    
    // function to delete
    async deleteOwner(data = "") {
        return new Promise((res,rej) => {
            // data 
            const by = data.replace(":","").replace(" ","")
            const procedure = "CALL DeleteOwner(?);"

            // conect to database
            const database = new DataBase()
            database.conect()

            // call procedure
            if (database) database.conection.query(procedure,by,err => {
                if(err) rej({message: err})
                setTimeout(() => res({
                    message: "Owner Deleted",
                    deleted: true
                }),1000)
            })

            // close conection 
            database.conection.end()
        })
    }
}

// Export
module.exports = Owner