// Imports
const DataBase = require('./DataBasePostgres')
const Global = require('./Global.services')

// Main class 
class Services {
    // constructor
    constructor(...args) {
        this.database = new DataBase()
        this.args = args
        this.global = new Global()
    }

    // function to create a new service
    async create(data) {
        return new Promise((res, rej) => {
            const proc = "SELECT RegisterService(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            const params = [
                data.nom_cat,
                data.slug,
                data.img_cat,
                data.des_cat,
                data.col_hex,
                data.nom_tip_ser,
                data.des_tip_ser,
                data.tec_des_cat,
                Number(data.dur_min_tip_ser) || 0,
                data.req_equ_esp,
                data.nom_ser,
                Number(data.pre_ser) || 0,
                data.des_ser,
                Number(data.pre_act_ser) || 0,
                Number(data.cos_est_ser) || 0,
                data.sta_ser,
                data.req,
                data.nom_pro,
                data.des_pro,
                data.niv_rie_pro,
                data.dur_min_pro,
                data.pro_pro,
                data.con_esp_pro
            ]

            this.database = new DataBase()
            this.database.connect()

            if (this.database) this.database.query(proc, params, (err) => {
                if (err) return rej({ message: err })
                setTimeout(() => {
                    res({
                        message: "Servicio registrada correctamente",
                        success: 1
                    })
                }, 1000)
            })

            this.database.disconnect()
        })
    }

    // function to update a service
    async modify(data) {
        return new Promise((res, rej) => {
            const proc = "SELECT UpdateService(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            const params = [
                data.nom_cat,
                data.slug,
                data.img_cat,
                data.des_cat,
                data.col_hex,
                data.nom_tip_ser,
                data.des_tip_ser,
                data.tec_des_cat,
                Number(data.dur_min_tip_ser) || 0,
                data.req_equ_esp,
                data.nom_ser,
                Number(data.pre_ser) || 0,
                data.des_ser,
                Number(data.pre_act_ser) || 0,
                Number(data.cos_est_ser) || 0,
                data.sta_ser,
                data.req,
                data.nom_pro,
                data.des_pro,
                data.niv_rie_pro,
                data.dur_min_pro,
                data.pro_pro,
                data.con_esp_pro
            ]
            console.log(params)

            this.database = new DataBase()
            this.database.connect()

            if (this.database) this.database.query(proc, params, (err) => {
                if (err) return rej({ message: err })
                setTimeout(() => {
                    res({
                        message: "Servicio modificado correctamente",
                        success: 1
                    })
                }, 1000)
            })

            this.database.disconnect()
        })
    }

    // function to create a new service
    async createLabTest(data) {
        return new Promise((res, rej) => {
            const date = new Date()
            const proc = "SELECT RegisterLabTest(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            const params = [
                data.cod_ord_pru_lab,
                data.nom_mas,
                data.doc_vet_sol,
                data.nom_tip_pru,
                data.cod_tip_pru,
                data.cat_tip_pru,
                data.des_tip_pru,
                data.met_est_tip_pru,
                Number(data.tie_est_hrs_tip_pru) || 0,
                Number(data.cos_est_tip_pru) || 0,
                data.ins_pre_tip_pru,
                data.par_ref_tip_pru,
                data.nom_pro,
                data.des_pro,
                data.cat_pro,
                data.niv_rie_pro,
                Number(data.dur_min_pro) || 0,
                data.pro_pro,
                data.con_esp_pro,
                data.nom_ser,
                data.fec_sol_pru_lab || date,
                data.fec_mue_pru_lab || date,
                data.fec_pro_pru_lab || date,
                data.fec_res_pru_lab || date,
                data.est_pru_lab,
                data.pri_pru_lab,
                data.obs_mue_pru_lab,
                Number(data.cos_fin_pru_lab) || 0,
                data.res_pru_lab,
                data.doc_vet_rev,
            ]

            this.database = new DataBase()
            this.database.connect()

            if (this.database) this.database.query(proc, params, (err) => {
                if (err) return rej({ message: err })
                setTimeout(() => {
                    res({
                        message: "Prueba de laboratorio registrada correctamente",
                        success: 1
                    })
                }, 1000)
            })

            this.database.disconnect()
        })
    }

    // function to update a lab test
    async modifyLabTest(data) {
        return new Promise((res, rej) => {
            const date = new Date()
            const proc = "SELECT ModifyLabTest(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            const params = [
                data.cod_ord_pru_lab,
                data.nom_mas,
                data.doc_vet_sol,
                data.nom_tip_pru,
                data.cod_tip_pru,
                data.cat_tip_pru,
                data.des_tip_pru,
                data.met_est_tip_pru,
                Number(data.tie_est_hrs_tip_pru) || 0,
                Number(data.cos_est_tip_pru) || 0,
                data.ins_pre_tip_pru,
                data.par_ref_tip_pru,
                data.nom_pro,
                data.des_pro,
                data.cat_pro,
                data.niv_rie_pro,
                Number(data.dur_min_pro) || 0,
                data.pro_pro,
                data.con_esp_pro,
                data.nom_ser,
                data.fec_sol_pru_lab || date,
                data.fec_mue_pru_lab || date,
                data.fec_pro_pru_lab || date,
                data.fec_res_pru_lab || date,
                data.est_pru_lab,
                data.pri_pru_lab,
                data.obs_mue_pru_lab,
                Number(data.cos_fin_pru_lab) || 0,
                data.res_pru_lab,
                data.doc_vet_rev,
            ]

            this.database = new DataBase()
            this.database.connect()

            if (this.database) this.database.query(proc, params, (err) => {
                if (err) return rej({ message: err })
                setTimeout(() => {
                    res({
                        message: "Prueba de laboratorio actualizada correctamente",
                        success: 1
                    })
                }, 1000)
            })

            this.database.disconnect()
        })
    }

    // function to find all
    async findAll() {
        return new Promise((res, rej) => {
            // vars
            const proc = "SELECT SearchServices()"

            // conect to database
            this.database = new DataBase()
            this.database.connect()

            if (this.database) this.database.query(proc, (err, result) => {
                if (err) {
                    rej({ message: err })
                } else if (!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Services found",
                        result: result
                    })
                }, 500)
            })

            // close conection 
            this.database.disconnect()
        })
    }
    // function to find all
    async findAllBy(data) {
        return new Promise((res, rej) => {
            // vars
            const proc = "SELECT SearchServicesBy(?)"

            // conect to database
            this.database = new DataBase()
            this.database.connect()

            if (this.database) this.database.query(proc, [data], (err, result) => {
                if (err) {
                    rej({ message: err })
                } else if (!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Services found",
                        result: result
                    })
                }, 500)
            })

            // close conection 
            this.database.disconnect()
        })
    }

    async findBy(data) {
        return new Promise((res, rej) => {
            // vars
            const proc = "SELECT SearchService(?)"

            // conect to database
            this.database = new DataBase()
            this.database.connect()

            if (this.database) this.database.query(proc, [data], (err, result) => {
                if (err) {
                    rej({ message: err })
                } else if (!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Services found",
                        result: result
                    })
                }, 500)
            })

            // close conection 
            this.database.disconnect()
        })
    }

    // function to find all the services
    async FindCategories() {
        return new Promise((res, rej) => {
            // vars
            const proc = "SELECT search_services_cat()"

            // conect to database
            this.database = new DataBase()
            this.database.connect()

            let customQuery = async () => {
                try {
                    let result = await this.database.query(proc)
                    console.log(result)
                    if (!result || !result?.[0]) {
                        rej({
                            message: "Not found",
                            status: 404
                        })
                    } else setTimeout(() => {
                        // 4,Laboratorio,"Pruebas diagnósticas y análisis clínicos",https://example.com/img/laboratorio.jpg)'
                        const mapResult = this.global.format(result,'search_services_cat',[
                            'id_cat','nom_cat','tec_des_cat','img_cat'
                        ],',')
                        console.log(mapResult)
                        console.log(result)
                        res({
                            message: "Services found",
                            result: mapResult
                        })
                    }, 500)
                } catch (err) {
                    rej({ message: err })
                }
            }
            customQuery()

            // close conection 
            this.database.disconnect()
        })
    }

    // function to find all the services
    async FindTypeServices() {
        return new Promise((res, rej) => {
            // vars
            const proc = "SELECT SearchServicesType()"

            // conect to database
            this.database = new DataBase()
            this.database.connect()

            if (this.database) this.database.query(proc, (err, result) => {
                if (err) {
                    rej({ message: err })
                } else if (!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Services found",
                        result: result[0]
                    })
                }, 500)
            })

            // close conection 
            this.database.disconnect()
        })
    }

    // function to find all the procedimientos
    async FindProcedures() {
        return new Promise((res, rej) => {
            // vars
            const proc = "SELECT SearchProcedures()"

            // conect to database
            this.database = new DataBase()
            this.database.connect()

            if (this.database) this.database.query(proc, (err, result) => {
                if (err) {
                    rej({ message: err })
                } else if (!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Services found",
                        result: result[0]
                    })
                }, 500)
            })

            // close conection 
            this.database.disconnect()
        })
    }

    // function to find all the tests types
    async FindTestType() {
        return new Promise((res, rej) => {
            // vars
            const proc = "SELECT GetTestTypes()"

            // conect to database
            this.database = new DataBase()
            this.database.connect()

            if (this.database) this.database.query(proc, (err, result) => {
                if (err) {
                    rej({ message: err })
                } else if (!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Services found",
                        result: result
                    })
                }, 500)
            })

            // close conection 
            this.database.disconnect()
        })
    }

    async findCirugies() {
        return new Promise((res, rej) => {
            // vars
            const proc = "SELECT SearchServicesBy('Cirugia')"

            // conect to database
            this.database = new DataBase()
            this.database.connect()

            if (this.database) this.database.query(proc, (err, result) => {
                if (err) {
                    rej({ message: err })
                } else if (!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else {
                    const resOne = this.global.format(
                        result[0],
                        'proc_ser',
                        ['nom_pro', 'des_pro', 'cat_pro', 'niv_rie_pro', 'dur_min_pro', 'pro_pro', 'con_esp_pro']
                    )
                    setTimeout(() => {
                        res({
                            message: "Cirugies found",
                            result: resOne
                        })
                    }, 500)
                }
            })

            // close conection 
            this.database.disconnect()
        })
    }

    async findEsthetic() {
        return new Promise((res, rej) => {
            // vars
            const proc = "SELECT SearchServicesBy('Estetica');"

            // conect to database
            this.database = new DataBase()
            this.database.connect()

            if (this.database) this.database.query(proc, (err, result) => {
                if (err) {
                    rej({ message: err })
                } else if (!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else {
                    const resOne = this.global.format(
                        result[0],
                        'proc_ser',
                        ['nom_pro', 'des_pro', 'cat_pro', 'niv_rie_pro', 'dur_min_pro', 'pro_pro', 'con_esp_pro']
                    )
                    setTimeout(() => {
                        res({
                            message: "Cirugies found",
                            result: resOne
                        })
                    }, 500)
                }
            })

            // close conection 
            this.database.disconnect()
        })
    }

    // function to find laboratory tests
    async findLaboratoryTests() {
        return new Promise((res, rej) => {
            // vars
            const proc = "SELECT GetLaboratoryTests();"

            // conect to database
            this.database = new DataBase()
            this.database.connect()

            if (this.database) this.database.query(proc, (err, result) => {
                if (err) {
                    rej({ message: err })
                } else if (!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else {
                    const resOne = this.global.format(
                        result[0],
                        'proc_ser',
                        ['nom_pro', 'des_pro', 'cat_pro', 'niv_rie_pro', 'dur_min_pro', 'pro_pro', 'con_esp_pro']
                    )
                    setTimeout(() => {
                        res({
                            message: "Cirugies found",
                            result: resOne
                        })
                    }, 500)
                }
            })

            // close conection 
            this.database.disconnect()
        })
    }

    async findAllVacunas() {
        return new Promise((res, rej) => {
            // vars
            const proc = "SELECT SearchVacunas()"

            // conect to database
            this.database = new DataBase()
            this.database.connect()

            if (this.database) this.database.query(proc, (err, result) => {
                if (err) {
                    rej({ message: err })
                } else if (!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Vacunas found",
                        result: result
                    })
                }, 500)
            })

            // close conection 
            this.database.disconnect()
        })
    }

    async AbleOrDesableService(data) {
        return new Promise((res, rej) => {
            // vars
            const params = [
                data.id,
                data.nom_cat
            ]

            const proc = "SELECT AbleOrDesableService(?,?)"

            // conect to database
            this.database = new DataBase()
            this.database.connect()

            if (this.database) this.database.query(proc, params, (err) => {
                this.database.disconnect()

                if (err) rej({ message: err })
                setTimeout(() => {
                    res({
                        message: "Servicio Deshabilitado",
                        success: true
                    })
                }, 1000)
            })

            // close conection 
        })
    }

    async registerVacuna(data) {
        return new Promise((res, rej) => {
            const proc = "SELECT RegisterVacuna(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            const params = [
                data.nom_vac,
                data.efe_sec_vac,
                data.cat_vac,
                data.dos_rec_cac_vac,
                data.dos_rec_adu_vac,
                data.dos_rec_adu_jov_vac,
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
            this.database.connect()

            if (this.database) this.database.query(proc, params, (err, result) => {
                if (err) return rej({ message: err })
                setTimeout(() => {
                    res({
                        message: "Cirugía registrada correctamente",
                        result: result
                    })
                }, 1000)
            })

            // close conection
            this.database.disconnect()
        })
    }

    async ChangeVaccineState(data) {
        return new Promise((res, rej) => {
            // vars
            const params = [
                data.id,
                data.nom_vac,
                data.nom_cat,
                data.nom_pro
            ]

            const proc = "SELECT ChangeVaccineState(?,?,?,?)"

            // conect to database
            this.database = new DataBase()
            this.database.connect()

            if (this.database) this.database.query(proc, params, (err) => {

                if (err) rej({ message: err })
                setTimeout(() => {
                    res({
                        message: "Servicio Deshabilitado",
                        change: 1
                    })
                }, 1000)
            })

            // close conection 
            this.database.disconnect()
        })
    }

    async updateVaccineAndProcedure(data) {
        return new Promise((res, rej) => {
            const proc = "SELECT UpdateVaccineAndProcedure(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            const params = [
                data.id_vac,
                data.nom_vac,
                data.efe_sec_vac,
                data.cat_vac,
                data.dos_rec_cac_vac,
                data.dos_rec_adu_vac,
                data.dos_rec_adu_jov_vac,
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
            this.database.connect()

            if (this.database) this.database.query(proc, params, (err) => {
                if (err) return rej({ message: err })
                setTimeout(() => {
                    res({
                        message: "Vacuna y procedimiento actualizados correctamente",
                        success: true
                    })
                }, 1000)
            })

            // close conection
            this.database.disconnect()
        })
    }
}

module.exports = Services