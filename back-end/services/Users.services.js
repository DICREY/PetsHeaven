// Imports
const DataBase = require('./DataBase')

// Main class
class User{
    // function to find all
    async findAll() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchPeoples();"

            // conect to database
            let database = new DataBase()
            database.conect()

            if (database) database.conection.query(proc,(err,result) => {
                if(err) {
                    rej({ message: err })
                } else setTimeout(() => {
                    res({
                        message: "Users found",
                        result: result
                    })
                },2000)
            })

            // close conection 
            database.conection.end()
        })
    }

    // function to find all by
    async findAllBy(data) {
        return new Promise((res,rej) => {
            // vars
            const by = data.replace(":","")
            const proc = "CALL SearchPeoplesBy(?);"

            // conect to database
            let database = new DataBase()
            database.conect()

            if (database) database.conection.query(proc,by,(err,result) => {
                if(err) {
                    rej({ message: err })
                } else setTimeout(() => {
                    res({
                        message: "Users found",
                        result: result
                    })
                },2000)
            })

            // close conection 
            database.conection.end()
        })
    }

    // function to find by
    async findBy(data) {
        return new Promise((res,rej) => {
            // vars
            const by = data.replace(":","")
            const proc = "CALL SearchPeopleBy(?);"

            // conect to database
            let database = new DataBase()
            database.conect()

            if (database) database.conection.query(proc,by,(err,result) => {
                if(err) {
                    rej({ message: err })
                } else setTimeout(() => {
                    res({
                        message: "User found",
                        result: result
                    })
                },2000)
            })

            // close conection 
            database.conection.end()
        })
    }
    
    // function to register
    async create(data) {
        return new Promise((res,rej) => {
            // data 
            const newUser = [
                data.nombres,
                data.apellidos,
                data.fechaNacimiento,
                data.tipoDocumento,
                data.numeroDocumento,
                data.direccion,
                data.celular,
                data.celular2,
                data.email,
                data.password,
                data.genero
            ]
            console.log(newUser)
            let procedure = "CALL RegistPeoples(?,?,?,?,?,?,?,?,?,?,?);"

            // conect to database
            let database = new DataBase()
            database.conect()
            
            // call procedure
            if (database) database.conection.query(procedure,newUser,err => { 
                if(err) {
                    rej(err) 
                } else setTimeout(() => res({
                    message: "User Created",
                    ...data
                }),2000)
            })
            
            // close conection 
            database.conection.end()
        })
    }
    // function to modify
    async modify(data) {
        return new Promise((res,rej) => {
            // data 
            const newUser = [
                data.nombres,
                data.apellidos,
                data.fechaNacimiento,
                data.tipoDocumento,
                data.numeroDocumento,
                data.direccion,
                data.celular,
                data.celular2,
                data.email,
                data.password,
                data.genero
            ]
            console.log(newUser)
            let procedure = "CALL ModifyPeople(?,?,?,?,?,?,?,?,?,?,?);"

            // conect to database
            let conection = conect()

            // call procedure
            if (conection) conection.query(procedure,newUser,err => { 
                if(err) {
                    rej(err) 
                } else setTimeout(() => res({
                    message: "User Modify",
                    ...data
                }),2000)
            })

            // close conection 
            conection.end()
        })
    }
}

// Export
module.exports = User