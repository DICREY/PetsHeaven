// Librarys 
const mysql = require('mysql')
require('dotenv').config();

class DataBase {
    constructor() {
        this.conection = this.createConnection()
    }
    
    // Create conection function
    createConnection() {
        return mysql.createConnection({
            host: process.env.HOST_DB || "localhost",
            database: process.env.NAME_DB || "pets_heaven",
            user: process.env.USER_DB || "root",
            password:process.env.PASSWORD_DB || "",
            port: process.env.PORT_DB || 3306
        })
    }

    // Conect function
    conect = () => {
        this.conection.connect((err) => {
            if (err) {
                // throw Error(err)
                console.log(err)
                return
            }
            return true
        })
    }
}


// Exports 
module.exports = DataBase