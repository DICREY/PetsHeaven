// Imports
const DataBase = require('./DataBase')

// Main class 
class Pet {
    // constructor
    constructor(...args) {
        this.database = new DataBase()
        this.args = args
    }

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
                data.doc_per,
                data.gen_mas,
                data.est_rep_mas,
                data.fot_mas
            ]

            // conect to database
            this.database = new DataBase()
            this.database.conect()

            // Query
            if (this.database) this.database.conection.query(proc,pet,err => { 
                if(err) rej(err)
                setTimeout(() => res({
                    message: "Pet Created",
                    created: true
                }),1000)
            })

            // close conection 
        this.database.conection.end()
        })
    }
    // function to find all
    async findAll() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchPets();"

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
                        message: "Pets found",
                        result: result[0]
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    // function to find all by
    async findAllBy(data,secondData = "") {
        return new Promise((res,rej) => {
            // vars
            const by = data?.replace(" ","")
            const secondBy = secondData?.replace(" ","")
            const proc = "CALL SearchPetsBy(?,?)"

            // conect to database
            this.database = new DataBase()
            this.database.conect()
            
            if (this.database) this.database.conection.query(proc,[by,secondBy],(err,result) => {
                if(err) rej({ message: err })
                // if(!result || !result[0][0]) rej({
                //     message: "Not found",
                //     status: 404
                // })
                setTimeout(() => {
                    res({
                        message: "Pets found",
                        result: result[0]
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
            const proc = "CALL SearchPetBy(?)"

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
                        message: "Pets found",
                        result: result[0]
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
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
                data.doc_per,
                data.gen_mas,
                data.est_rep_mas,
                data.img_mas
            ]

            // conect to database
            this.database = new DataBase()
            this.database.conect()

            // Query 
            if (this.database) this.database.conection.query(proc,moficatedData,err => {
                if(err) rej(err)
                setTimeout(() => res({
                    message: "Pet Modify",
                    modify: true
                }),1000)
            })
            
            // close conection 
            this.database.conection.end()
        })
    }
    
    // function to delete by
    async deleteBy(firstData,secondData = "") {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL DeletePetBy(?,?)"

            // conect to database
            this.database = new DataBase()
            this.database.conect()
            
            if (this.database) this.database.conection.query(proc,[firstData,secondData],err => {
                if(err) rej({ message: err })
                setTimeout(() => {
                    res({
                        message: "Pets deleted",
                        deleted: true
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }
    
    // function to find all Medical History by Pet
    async findHistoryBy(firstData = "",secondData = "") {
        return new Promise((res,rej) => {
            // vars
            const by = firstData.replace(":","").replace(" ","")
            const byTwo = secondData.replace(":","").replace(" ","")
            const proc = "CALL SearchHistoryBy(?,?);"

            // Functions
            const format = (datas) => {
                const results = datas.map(data => {
                    const appoimentList = data?.citas?.split(";").filter(Boolean)
                    .map(item => {
                        const appoiment = item.split("---")
                        return {
                            id_cit: appoiment[0],
                            fec_reg_cit: appoiment[1],
                            fec_cit: appoiment[2],
                            hor_ini_cit: appoiment[3],
                            hor_fin_cit: appoiment[4],
                            mot_cit: appoiment[5],
                            est_cit: appoiment[6],
                            fec_cre_cit: appoiment[7],
                            fec_act_cit: appoiment[8],
                            nom_ser: appoiment[9],
                            pre_ser: appoiment[10],
                            des_ser: appoiment[11],
                            nom_tip_ser: appoiment[12],
                            nom_cat: appoiment[13],
                            img_cat: appoiment[14],
                            nom_per_vet: appoiment[15],
                            ape_per_vet: appoiment[16],
                            especialidad: appoiment[17],
                            nom_cat: appoiment[18],
                            fot_per_vet: appoiment[19]
                        }
                    })
                    return {
                        ...data,
                        citas: appoimentList
                    }
                })
                return results
            }

            // conect to database
            this.database = new DataBase()
            this.database.conect()
            
            if (this.database) this.database.conection.query(proc,[by,byTwo],(err,result) => {
                if(err) rej({ message: err })
                if(!result || !result[0][0]) rej({
                    message: "Not found",
                    status: 404
                })
                if(result) setTimeout(() => {
                    res({
                        message: "History found",
                        result: format(result[0])[0],
                        find: 1
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }
}

// Export
module.exports = Pet