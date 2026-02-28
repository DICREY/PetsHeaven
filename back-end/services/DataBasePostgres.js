// Librarys 
const { Pool } = require('pg')
require('dotenv').config()

class DataBasePostgres {
    constructor() {
        this.pool = new Pool({
            user: process.env.USER_DB || "postgres.lwpajidigrwrthvfsrhd",
            host: process.env.HOST_DB || "aws-1-us-east-2.pooler.supabase.com",
            database: process.env.NAME_DB || "postgres",
            password: process.env.PASSWORD_DB || "PetsHeaven2025#",
            port: process.env.PORT_DB
        })
    }

    // Conect function
    async connect() {
        try {
            await this.pool.connect();
            // console.log('PostgreSQL Connect');
        } catch (err) {
            console.error(err)
            console.error(err.stack);
        }
    }

    async query(queryText, params) {
        try {
            const res = await this.pool.query(queryText, params);
            return res.rows;
        } catch (err) {
            if (err?.stack) throw err.stack
            throw err;
        }
    }

    async disconnect() {
        try {
            await this.pool.end();
            // console.log('PostgreSQL Disconnect');
        } catch (err) {
            // console.error('Error al desconectar', err.stack);
        }
    }

}

// Exports 
module.exports = DataBasePostgres