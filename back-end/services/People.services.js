// Imports
const DataBase = require('./DataBase')

// Main class
class People {
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
                if(err) {
                    rej({ message: err})
                } else if(!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Peoples founds",
                        result: result[0]
                    })
                }, 500)
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
                if(err) {
                    rej({ message: err})
                } else if(!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Peoples founds",
                        result: result[0]
                    })
                }, 500)
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
                if(err) {
                    rej({ message: err})
                } else if(!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Peoples founds",
                        result: result[0]
                    })
                }, 500)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    // function to find by
    async findBy(data) {
        return new Promise((res,rej) => {
            // vars
            const by = data?.replace(":","").replace(" ","")
            const proc = "CALL SearchPeopleBy(?);"

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
                        message: "People found",
                        result: result[0]
                    })
                }, 500)
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
                data.nom_per,
                data.ape_per,
                data.fec_nac_per,
                data.tip_doc_per,
                data.doc_per,
                data.dir_per,
                data.cel_per,
                data.cel2_per,
                data.email_per,
                data.hash_pass,
                data.gen_per,
                data.img_per,
            ]
            let procedure = "CALL RegistPeoples(?,?,?,?,?,?,?,?,?,?,?,?);"

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

    // function to register assign rol
    async AssignRol(data) {
        return new Promise((res,rej) => {
            // data 
            const newUser = data.rol_per === '1'?[
                data.doc_per,
                data.esp_vet,
                data.hor_vet,
                data.num_tar_vet,
                data.fot_tar_vet || "no-registrado",
            ]:[ data.doc_per ]
            
            const procedure = data.rol_per === '1'? "CALL AssignRolAdmin(?);"
            :"CALL AssignRolStaff(?,?,?,?,?);"

            // conect to database
            this.database = new DataBase()
            this.database.conect()
            
            // call procedure
            if (this.database) this.database.conection.query(procedure,newUser,err=> {
                if(err) rej(err) 
                setTimeout(() => res({
                    message: "Rol assigned",
                    assigned: 1
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
                data.nom_per,
                data.ape_per,
                data.fec_nac_per,
                data.doc_per,
                data.dir_per,
                data.cel_per,
                data.cel2_per,
                data.email_per,
                data.gen_per,
                data.img_per
            ]
            const procedure = "CALL ModifyPeople(?,?,?,?,?,?,?,?,?,?);"

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
}

// Export
module.exports = People