// Imports
const DataBase = require('./DataBase')
const Global = require('./Global.services')

// Main class 
class Services {
    // constructor
    constructor(...args) {
        this.database = new DataBase()
        this.args = args
        this.global = new Global()
    }

    // function to find all
    async findAll() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchServices()"

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
                        message: "Services found",
                        result: result
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }
    // function to find all
    async findAllBy(data) {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchServicesBy(?)"

            // conect to database
            this.database = new DataBase()
            this.database.conect()

            if (this.database) this.database.conection.query(proc,[data],(err,result) => {
                if(err) rej({ message: err })
                if(!result || !result[0][0]) rej({
                    message: "Not found",
                    status: 404
                })
                setTimeout(() => {
                    res({
                        message: "Services found",
                        result: result
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    async findBy(data) {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchService(?)"

            // conect to database
            this.database = new DataBase()
            this.database.conect()
            
            if (this.database) this.database.conection.query(proc,[data],(err,result) => {
                if(err) rej({ message: err })
                if(!result || !result[0][0]) rej({
                    message: "Not found",
                    status: 404
                })
                setTimeout(() => {
                    res({
                        message: "Pets found",
                        result: result
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    // function to find all the services
    async FindCategories() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchServicesCat()"

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
                        message: "Services found",
                        result: result
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    async findCirugies() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchServicesBy('Cirugia')"

            // conect to database
            this.database = new DataBase()
            this.database.conect()
            
            if (this.database) this.database.conection.query(proc,(err,result) => {
                if(err) rej({ message: err })
                if(!result || !result[0][0]) rej({
                    message: "Not found",
                    status: 404
                })
                const resOne = this.global.format(
                    result[0],
                    'proc_ser',
                    ['nom_pro','des_pro','cat_pro','niv_rie_pro','dur_min_pro','pro_pro','con_esp_pro']
                )
                setTimeout(() => {
                    res({
                        message: "Cirugies found",
                        result: resOne
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    async findEsthetic() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchServicesBy('Estetica');"

            // conect to database
            this.database = new DataBase()
            this.database.conect()
            
            if (this.database) this.database.conection.query(proc,(err,result) => {
                if(err) rej({ message: err })
                if(!result || !result[0][0]) rej({
                    message: "Not found",
                    status: 404
                })
                const resOne = this.global.format(
                    result[0],
                    'proc_ser',
                    ['nom_pro','des_pro','cat_pro','niv_rie_pro','dur_min_pro','pro_pro','con_esp_pro']
                )
                setTimeout(() => {
                    res({
                        message: "Cirugies found",
                        result: resOne
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    // function to find laboratory tests
    async findLaboratoryTests() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL GetLaboratoryTests();"

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
                        message: "Laboratory tests found",
                        result: result[0]
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    async registerCirugia(data) {
        return new Promise((res, rej) => {
            const proc = "CALL RegisterCirugia(?,?,?,?,?,?,?,?,?,?)"
            const params = [
                data.cat_ser,
                data.nom_ser,
                data.pre_ser,
                data.des_ser,
                data.sta_ser,
                data.tec_des_ser,
                data.des_cir,
                data.res_cir,
                data.com_cir,
                data.obv_cir
            ]

            this.database = new DataBase()
            this.database.conect()

            if (this.database) this.database.conection.query(proc, params, (err, result) => {
                if (err) return rej({ message: err })
                setTimeout(() => {
                    res({
                        message: "Cirugía registrada correctamente",
                        result: result
                    })
                }, 500)
            })

            this.database.conection.end()
        })
    }

    async findAllVacunas() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchVacunas()"

            // conect to database
            this.database = new DataBase()
            this.database.conect()

            if (this.database) this.database.conection.query(proc,(err,result) => {
                if(err) rej({ message: err })
                if(!result || !result[0]) rej({
                    message: "Not found",
                    status: 404
                })
                setTimeout(() => {
                    res({
                        message: "Vacunas found",
                        result: result
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    async AbleOrDesableService(data) {
        return new Promise((res,rej) => {
            // vars
            const params = [
                data.id,
                data.nom_cat
            ]

            const proc = "CALL AbleOrDesableService(?,?)"

            // conect to database
            this.database = new DataBase()
            this.database.conect()

            if (this.database) this.database.conection.query(proc,params,(err) => {
                this.database.conection.end()

                if(err) rej({ message: err })
                setTimeout(() => {
                    res({
                        message: "Servicio Deshabilitado",
                        success: true
                    })
                },1000)
            })

            // close conection 
        })
    }

    async registerVacuna(data) {
        return new Promise((res, rej) => {
            const proc = "CALL RegisterVacuna(?,?,?,?,?,?,?,?,?,?,?,?,?)"
            const params = [
                data.nom_vac,
                data.efe_sec_vac,
                data.cat_vac,
                data.dos_rec_vac,
                data.lot_vac,
                data.fec_ven_vac,
                data.fec_cre_vac,
                data.fre_vac,
                data.des_vac,
                data.pre_vac,
                data.nom_pro,
                data.des_pro || '',
                data.nom_cat || 'Vacunacion' // Default category if not provided
            ]

            this.database = new DataBase()
            this.database.conect()

            if (this.database) this.database.conection.query(proc, params, (err, result) => {
                if (err) return rej({ message: err })
                setTimeout(() => {
                    res({
                        message: "Cirugía registrada correctamente",
                        result: result
                    })
                }, 500)
            })

            // close conection
            this.database.conection.end()
        })
    }

    async ChangeVaccineState(data) {
        return new Promise((res,rej) => {
            // vars
            const params = [
                data.id,
                data.nom_vac,
                data.nom_cat,
                data.nom_pro
            ]

            const proc = "CALL ChangeVaccineState(?,?,?,?)"

            // conect to database
            this.database = new DataBase()
            this.database.conect()

            if (this.database) this.database.conection.query(proc,params,(err) => {

                if(err) rej({ message: err })
                setTimeout(() => {
                    res({
                        message: "Servicio Deshabilitado",
                        change: 1
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    async updateVaccineAndProcedure(data) {
        return new Promise((res, rej) => {
            const proc = "CALL UpdateVaccineAndProcedure(?,?,?,?,?,?,?,?,?,?,?,?,?)"
            const params = [
                data.id_vac,
                data.nom_vac,
                data.efe_sec_vac,
                data.cat_vac,
                data.dos_rec_vac,
                data.lot_vac,
                data.fec_ven_vac,
                data.fec_cre_vac,
                data.fre_vac,
                data.des_vac,
                data.pre_vac,
                data.nom_pro,
                data.des_pro || ''
            ]

            this.database = new DataBase()
            this.database.conect()

            if (this.database) this.database.conection.query(proc, params, (err) => {
                if (err) return rej({ message: err })
                setTimeout(() => {
                    res({
                        message: "Vacuna y procedimiento actualizados correctamente",
                        success: true
                    })
                }, 500)
            })

            // close conection
            this.database.conection.end()
        })
    }
}

module.exports = Services