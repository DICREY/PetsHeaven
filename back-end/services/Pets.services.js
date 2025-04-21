// Imports
const DataBase = require('./DataBase')

// Main class 
class Pet {
    // function to register
    async create(data) {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL RegistPets(?,?,?,?,?,?,?,?,?,?,?)"
            const pet = [
                data.nom_mas,
                data.esp_mas,
                data.col_mas,
                data.raz_mas,
                data.ali_mas,
                data.fec_nac_mas,
                data.pes_mas,
                data.doc_usu,
                data.gen_mas,
                data.est_rep_mas,
                data.fot_mas
            ]

            console.log(pet)

            // conect to database
            let database = new DataBase()
            database.conect()

            // Query
            if (database) database.conection.query(proc,pet,err => { 
                if(err) rej(err)
                setTimeout(() => res({
                    message: "Pet Created",
                    create: true
                }),2000)
            })

            // close conection 
        database.conection.end()
        })
    }
    // function to find all
    async findAll() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchPets();"

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

    // function to find all by
    async findAllBy(data,secondData = "") {
        return new Promise((res,rej) => {
            // vars
            const by = data.replace(" ","")
            const secondBy = secondData.replace(" ","")
            const proc = "CALL SearchPetsBy(?,?)"

            // conect to database
            let database = new DataBase()
            database.conect()
            
            if (database) database.conection.query(proc,[by,secondBy],(err,result) => {
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
    // function to find by
    async findBy(data) {
        return new Promise((res,rej) => {
            // vars
            const by = data.replace(":","").replace(" ","")
            const proc = "CALL SearchPetBy(?)"

            // conect to database
            let database = new DataBase()
            database.conect()
            
            if (database) database.conection.query(proc,by,(err,result) => {
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
    
    // function to modify
    async modify(data) {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL ModifyPets(?,?,?,?,?,?,?,?,?,?,?)"
            const moficatedData = [
                data.nom_mas,
                data.esp_mas,
                data.col_mas,
                data.raz_mas,
                data.ali_mas,
                data.fec_nac_mas,
                data.pes_mas,
                data.doc_usu,
                data.gen_mas,
                data.est_rep_mas,
                data.fot_mas
            ]
            console.log(moficatedData)

            // conect to database
            let database = new DataBase()
            database.conect()

            // Query 
            if (database) database.conection.query(proc,moficatedData,err => {
                if(err) rej(err)
                setTimeout(() => res({
                    message: "Pet Modify"
                }),2000)
            })
            
            // close conection 
            database.conection.end()
        })
    }
    
    // function to delete by
    async deleteBy(firstData,secondData = "") {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL DeletePetBy(?,?)"

            // conect to database
            let database = new DataBase()
            database.conect()
            
            if (database) database.conection.query(proc,[firstData,secondData],err => {
                if(err) rej({ message: err })
                setTimeout(() => {
                    res({
                        message: "Pets deleted",
                        deleted: true
                    })
                },2000)
            })

            // close conection 
            database.conection.end()
        })
    }
    // function to find all Medical History by Pet
    async findHistoryBy(data) {
        return new Promise((res,rej) => {
            // vars
            const by = data.replace(":","").replace(" ","")
            const proc = "CALL SearchHistoryBy(?);"

            // conect to database
            let database = new DataBase()
            database.conect()
            
            if (database) database.conection.query(proc,by,(err,result) => {
                if(err) rej({ message: err })
                if(!result[0][0]) rej({
                    message: "Not found",
                    status: 404
                })
                setTimeout(() => {
                    res({
                        message: "History found",
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
module.exports = Pet