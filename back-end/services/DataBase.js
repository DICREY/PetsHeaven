// Librarys 
const mysql = require('mysql')
// const postgres = require('postgress')
require('dotenv').config()

class DataBase {
    constructor() {
        this.conection = this.createConnection()
    }
    
    // Create conection function
    createConnection() {
        return mysql.createConnection({
            host: process.env.HOST_DB || "aws-1-us-east-2.pooler.supabase.com", 
            database: process.env.NAME_DB || "postgres",
            user: process.env.USER_DB || "postgres.lwpajidigrwrthvfsrhd",
            password:process.env.PASSWORD_DB || "PetsHeaven2025#",
            port: process.env.PORT_DB || 5432
        })
    }

    // Conect function
    conect = () => {
        this.conection.connect((err) => {
            if (err) {
                // throw Error(err)
                console.log(err)
                return null
            }
            return 1
        })
    }
}

// Exports 
module.exports = DataBase