// Imports
const DataBase = require('./DataBase')

// Main class 
class Services {
    // constructor
    constructor(...args) {
        this.database = new DataBase()
        this.args = args
    }

    // function to find all
    async findAll() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchServices();"

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
            const proc = "CALL SearchServicesBy(?);"

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
            const proc = "CALL SearchServicesCat();"

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
            const proc = "CALL SearchCirugias()"

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
                        result: result
                    })
                },1000)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    async registerCirugia(data) {
        return new Promise((res, rej) => {
            const proc = "CALL RegisterCirugia(?,?,?,?,?,?,?,?,?,?);";
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
            ];

            this.database = new DataBase();
            this.database.conect();

            if (this.database) this.database.conection.query(proc, params, (err, result) => {
                if (err) return rej({ message: err });
                setTimeout(() => {
                    res({
                        message: "Cirugía registrada correctamente",
                        result: result
                    });
                }, 500);
            });

            this.database.conection.end();
        });
    }

    async findAllVacunas() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchVacunas();"

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
                data.id_ser,
                data.or
            ]

            const proc = "CALL AbleOrDesableService(?,?);"

            // conect to database
            this.database = new DataBase()
            this.database.conect()

            if (this.database) this.database.conection.query(proc,params,(err,result) => {
                console.log(result)
                this.database.conection.end()

                if(err) rej({ message: err })
                setTimeout(() => {
                    res({
                        message: "Servicio Deshabilitado",
                        result: result
                    })
                },1000)
            })

            // close conection 
        })
    }
}

module.exports = Services