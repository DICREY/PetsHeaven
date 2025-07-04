// Imports
const DataBase = require('./DataBase')

// Main class
class Appointment {
    // constructor
    constructor(...args) {
        this.database = new DataBase()
        this.args = args
    }

    // Get all the appointments 
    async findAppointments() {
        return new Promise((res,rej)=> {
            const procedure = "CALL SearchAllAppointments()"

            // conect to database
            this.database = new DataBase()
            this.database.conect()
        
            if (this.database) this.database.conection.query(procedure, (err,result) =>{
                if(err) {
                    rej({ message: err})
                } else if(!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Appointments found",
                        result: result[0]
                    })
                }, 500)
            })
            this.database.conection.end()
        }) 
    }

    // Get all the appointments by User
    async findAppointmentsByUser(data) {
        return new Promise((res,rej)=> {
            const procedure = "CALL SearchAppointmentsByUser(?)"
            const by = data.replace(":","").replace(" ","")

            // conect to database
            this.database = new DataBase()
            this.database.conect()
        
            if (this.database) this.database.conection.query(procedure, by, (err,result) =>{
                if(err) {
                    rej({ message: err})
                } else if(!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Appointments found",
                        result: result[0]
                    })
                }, 500)
            })
            this.database.conection.end()
        }) 
    }

    // Get all the appointments by Pet
    async findAppointmentsByPet(data) {
        return new Promise((res,rej)=> {
            const procedure = "CALL SearchAppointmentsByPet(?,?)"
            const info = [
                data?.nom_mas?.trim(),
                data?.doc_per?.trim()
            ]

            // conect to database
            this.database = new DataBase()
            this.database.conect()
        
            if (this.database) this.database.conection.query(procedure, info, (err,result) =>{
                if(err) {
                    rej({ message: err})
                } else if(!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Appointments found",
                        result: result[0]
                    })
                }, 500)
            })
            this.database.conection.end()
        }) 
    }

    // Get all the appointments by Pet
    async findAppointmentsByPetCompleted(data) {
        return new Promise((res,rej)=> {
            const procedure = "CALL SearchAllAppointmentsByPetCompleted(?,?)"
            const info = [
                data?.nom_mas?.trim(),
                data?.doc_per?.trim()
            ]

            // conect to database
            this.database = new DataBase()
            this.database.conect()
        
            if (this.database) this.database.conection.query(procedure, info, (err,result) =>{
                if(err) {
                    rej({ message: err})
                } else if(!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Appointments found",
                        result: result[0]
                    })
                }, 500)
            })
            this.database.conection.end()
        }) 
    }
    // Get all the appointments by Pet vaccines
    async findAppointmentsByPetVaccine(data) {
        return new Promise((res,rej)=> {
            const procedure = "CALL SearchAllAppointmentsByPetVacc(?,?)"
            const info = [
                data?.nom_mas?.trim(),
                data?.doc_per?.trim()
            ]

            // conect to database
            this.database = new DataBase()
            this.database.conect()
        
            if (this.database) this.database.conection.query(procedure, info, (err,result) =>{
                if(err) {
                    rej({ message: err})
                } else if(!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Appointments found",
                        result: result[0]
                    })
                }, 500)
            })
            this.database.conection.end()
        }) 
    }
    // Get all the appointments by Pet Consult
    async findAppointmentsByPetConsult(data) {
        return new Promise((res,rej)=> {
            const procedure = "CALL SearchAllAppointmentsByPetConsult(?,?)"
            const info = [
                data?.nom_mas?.trim(),
                data?.doc_per?.trim()
            ]

            // conect to database
            this.database = new DataBase()
            this.database.conect()
        
            if (this.database) this.database.conection.query(procedure, info, (err,result) =>{
                if(err) {
                    rej({ message: err})
                } else if(!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Appointments found",
                        result: result[0]
                    })
                }, 500)
            })
            this.database.conection.end()
        }) 
    }

    // Get all the ConsultingRooms
    async findConsultingRooms() {
        return new Promise((res,rej)=> {
            const procedure = "CALL SearchConsultingRooms()"

            // conect to database
            this.database = new DataBase()
            this.database.conect()
        
            if (this.database) this.database.conection.query(procedure, (err,result) =>{
                if(err) {
                    rej({ message: err})
                } else if(!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Appointments found",
                        result: result[0]
                    })
                }, 500)
            })
            this.database.conection.end()
        }) 
    }

    async registAppointment(data) {
        return new Promise((res, rej) => {
            const procedure = "CALL RegistAppointment(?,?,?,?,?,?,?,?)"
            const params = [
                data.fec_cit,
                data.hor_ini_cit,
                data.hor_fin_cit,
                data.lug_ate_cit,
                data.mot_cit,
                data.ser_cit,
                data.vet_cit,
                data.mas_cit,
            ]

            this.database = new DataBase()
            this.database.conect()

            if (this.database) this.database.conection.query(procedure, params, (err) => {
                this.database.conection.end()
                if (err) rej({ message: err })
                setTimeout(() => {
                    res({
                        message: "Appointment registered",
                        success: 1
                    })
                }, 500)
            })

        })
    }

    async modifyAppointment(data) {
        return new Promise((res, rej) => {
            const procedure = "CALL UpdateAppointmentDate(?,?,?,?,?,?)"
            const params = [
                data.id_cit,         
                data.mas_cit,        
                data.fec_cit,        
                data.hor_ini_cit,    
                data.hor_fin_cit,    
                data.lug_ate_cit
            ]

            this.database = new DataBase()
            this.database.conect()

            if (this.database) this.database.conection.query(procedure, params, (err) => {
                if (err) rej({ message: err })
                setTimeout(() => {
                    res({
                        message: "Appointment updated",
                        success: 1
                    })
                }, 500)
            })

            this.database.conection.end()
        })
    }

    async disableAppointment(data) {
        return new Promise((res, rej) => {
            const procedure = "CALL CancelAppointment(?,?)"
            const params = [
                data.id_cit,   
                data.mas_cit   
            ]

            this.database = new DataBase()
            this.database.conect()

            if (this.database) this.database.conection.query(procedure, params, (err) => {
                if (err) rej({ message: err })
                setTimeout(() => {
                    res({
                        message: "Appointment cancelled",
                        success: 1
                    })
                }, 500)
            })

            this.database.conection.end()
        })
    }
}

module.exports = Appointment