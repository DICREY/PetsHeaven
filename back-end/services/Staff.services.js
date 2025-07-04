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
                data.nom_per,
                data.ape_per,
                data.fec_nac_per,
                data.tip_doc_per,
                data.doc_per,
                data.dir_per,
                data.cel_per,
                data.cel2_per || "no-registrado",
                data.email_per,
                data.hash_pass,
                data.gen_per,
                data.esp_per,
                data.num_tar_per,
                data.fot_tar_vet || "no-registrado",
                data.fot_vet || "no-registrado"
            ]
            
            const procedure = data.rol_per === 'Veterinario'?
            "CALL RegistStaff(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
            :"CALL RegistAdmin(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"

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
                if(err) {
                    rej({ message: err})
                } else if(!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Staffs found",
                        result: result[0]
                    })
                }, 500)
            })

            // close conection 
            this.database.conection.end()
        })
    }
}

module.exports = Staff