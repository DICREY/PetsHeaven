// Imports
const DataBase = require('./DataBase')
const People = require('./People.services')

// Main class
class Staff extends People {
    // constructor
    constructor(args) {
        super(args)
        this.database = new DataBase()
        this.args = args
    }

    // function to register
    async createStaff(data) {
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
            
            let procedure = "CALL RegistStaff(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"

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

    // function to find all vet
    async findAllVet() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchPeoplesVet();"

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
}

module.exports = Staff