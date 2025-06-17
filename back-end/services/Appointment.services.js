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
            const procedure = "CALL SearchAllAppointments();"

            // conect to database
            this.database = new DataBase()
            this.database.conect()
        
            if (this.database) this.database.conection.query(procedure, (err,result) =>{
                if(err) rej({ message: err})
                if(!result || !result[0][0]) rej({
                    message: "Not found",
                    status: 404
                })
                setTimeout(() =>{
                    res({
                        message: "Appointments found",
                        result: result
                    })
                }, 1000)
            })
            this.database.conection.end()
        }) 
    }

    // Get all the appointments by User
    async findAppointmentsByUser(data) {
        return new Promise((res,rej)=> {
            const procedure = "CALL SearchAppointmentsByUser(?);"
            const by = data.replace(":","").replace(" ","")

            // conect to database
            this.database = new DataBase()
            this.database.conect()
        
            if (this.database) this.database.conection.query(procedure, by, (err,result) =>{
                if(err) rej({ message: err})
                if(!result || !result[0][0]) rej({
                    message: "Not found",
                    status: 404
                })
                setTimeout(() =>{
                    res({
                        message: "Appointments found",
                        result: result
                    })
                }, 1000)
            })
            this.database.conection.end()
        }) 
    }

    async registAppointment(data) {
        return new Promise((res, rej) => {
            const procedure = "CALL RegistAppointment(?,?,?,?,?,?,?,?,?)";
            const params = [
                data.fec_reg_cit,   
                data.fec_cit,       
                data.hor_ini_cit,   
                data.hor_fin_cit,   
                data.lug_ate_cit,   
                data.ser_cit,       
                data.vet_cit,       
                data.mas_cit,       
                data.estado         
            ];

            this.database = new DataBase();
            this.database.conect();

            if (this.database) this.database.conection.query(procedure, params, (err, result) => {
                this.database.conection.end();
                if (err) rej({ message: err });
                setTimeout(() => {
                    res({
                        message: "Appointment registered",
                        result: result
                    });
                }, 500);
            });

        });
    }

    async modifyAppointment(data) {
        return new Promise((res, rej) => {
            const procedure = "CALL UpdateAppointmentDate(?,?,?,?,?,?)";
            const params = [
                data.id_cit,         
                data.mas_cit,        
                data.fec_cit,        
                data.hor_ini_cit,    
                data.hor_fin_cit,    
                data.lug_ate_cit
            ];

            this.database = new DataBase();
            this.database.conect();

            if (this.database) this.database.conection.query(procedure, params, (err, result) => {
                if (err) rej({ message: err });
                setTimeout(() => {
                    res({
                        message: "Appointment updated",
                        result: result
                    });
                }, 500);
            });

            this.database.conection.end();
        });
    }

    async disableAppointment(data) {
        return new Promise((res, rej) => {
            const procedure = "CALL CancelAppointment(?,?)";
            const params = [
                data.id_cit,   
                data.mas_cit   
            ];

            this.database = new DataBase();
            this.database.conect();

            if (this.database) this.database.conection.query(procedure, params, (err, result) => {
                if (err) rej({ message: err });
                setTimeout(() => {
                    res({
                        message: "Appointment cancelled",
                        result: result
                    });
                }, 500);
            });

            this.database.conection.end();
        });
    }
    
}

module.exports = Appointment