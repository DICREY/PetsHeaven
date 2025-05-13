// Imports
const DataBase = require('./DataBase')

// Main class
class User {
    // constructor
    constructor(...args) {
        this.database = new DataBase()
        this.args = args
    }

    // function to find all
    async findAll() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchPeoples();"

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
                        message: "Users found",
                        result: result
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }
    // function to find all
    async findAllUsers() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchAllPeoples();"

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
                        message: "Users found",
                        result: result
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    // function to find all by
    async findAllBy(data) {
        return new Promise((res,rej) => {
            // vars
            const by = data.replace(":","").replace(" ","")
            const proc = "CALL SearchPeoplesBy(?);"

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
                        message: "Users found",
                        result: result
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    // function to find by
    async findBy(data) {
        return new Promise((res,rej) => {
            // vars
            const by = data.replace(":","").replace(" ","")
            const proc = "CALL SearchPeopleBy(?);"

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
                        message: "User found",
                        result: result
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
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
                data.hash_pass,
                data.genero
            ]
            let procedure = "CALL RegistPeoples(?,?,?,?,?,?,?,?,?,?,?);"

            // conect to database
            this.database = new DataBase()
            this.database.conect()
            
            // call procedure
            if (this.database) this.database.conection.query(procedure,newUser,err => { 
                if(err) rej(err) 
                setTimeout(() => res({
                    message: "User Created",
                    created: 1
                }),1000)
            })
            
            // close conection 
            this.database.conection.end()
        })
    }

    // function to register
    async createPersonal(data) {
        return new Promise((res,rej) => {
            // data 
            const newUser = [
                data.nombres,
                data.apellidos,
                data.fec_nac_usu,
                data.tipDoc,
                data.doc,
                data.direccion,
                data.cel,
                data.cel2 || "no-registrado",
                data.email,
                data.hash_pass,
                data.genero,
                data.rol,
                data.esp,
                data.numTargPro,
                data.fot_tar_vet || "no-registrado",
                data.fot_vet || "no-registrado"
            ]

            console.log(newUser)
            
            let procedure = "CALL RegistPersonal(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"

            // conect to database
            this.database = new DataBase()
            this.database.conect()
            
            // call procedure
            if (this.database) this.database.conection.query(procedure,newUser,err=> {
                if(err) rej(err) 
                setTimeout(() => res({
                    message: "User Created",
                    created: 1
                }),1000)
            })
            
            // close conection 
            this.database.conection.end()
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
                data.hash_pass,
                data.genero
            ]
            const procedure = "CALL ModifyPeople(?,?,?,?,?,?,?,?,?,?,?);"

            // conect to database
            this.database = new DataBase()
            this.database.conect()

            // call procedure
            if (this.database) this.database.conection.query(procedure,newUser,err => { 
                if(err) rej(err) 
                setTimeout(() => res({
                    message: "User Modify",
                    modified: 1,
                }),1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    // function to delete
    async delete(data) {
        return new Promise((res,rej) => {
            // data 
            const procedure = "CALL DeletePeople(?);"

            // conect to database
            const conection = conect()

            // call procedure
            if (conection) conection.query(procedure,data,err => { 
                if(err) rej(err) 
                setTimeout(() => res({
                    message: "User Deleted",
                    deleted: 1
                }),1000)
            })

            // close conection 
            conection.end()
        })
    }    


    // async findAllTimeBy(data) {
    //     return new Promise((res,rej) => {
    //         // vars
    //         const by = data.replace(":","").replace(" ","")
    //         const proc = "CALL SearchPeoplesBy(?);"

    //         // conect to database
            // this.database = new DataBase()
    //         this.database.conect()

    //         if (this.database) this.database.conection.query(proc,by,(err,result) => {
            //    rej({ message: err })
        //     if(!result || !result[0][0]) rej({
        //             message: "Not found",
        //             status: 404
        //         })
                // setTimeout(() => {
    //                 res({
    //                     message: "Users found",
    //                     result: result
    //                 })
    //             },1000)
    //         })

    //         // close conection 
    //         this.database.conection.end()
    //     })
    // }
}

// Export
module.exports = User