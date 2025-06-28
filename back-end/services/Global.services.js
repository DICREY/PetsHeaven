// Imports
const DataBase = require('./DataBase')

// Main class 
class Global {
    // constructor
    constructor(...args) {
        this.database
        this.args = args
    }

    headerI = (headers = [], data = []) => {
        const result = {}
        headers.forEach((header, index) => {
            result[header] = data[index] !== undefined ? data[index] : null;
        })
        return result
    }

    format = (datas = [], subKey = '', headers = []) => {
        const results = datas.map(data => {
            const list = data[subKey]?.split("---")
            .map(item => {
                const subList = item.split(";")
                return this.headerI(headers,subList)
            })
            return {
                ...data,
                [subKey]: list
            }
        })
        return results
    }

    iterar = (datas = [], key = '') => {
        return datas.map(data => {
            const value = data[key];
            const arr = typeof value === 'string'
                ? value.split('---').map(item => item.trim()).filter(item => item.length > 0)
                : [];
            return { ...data, [key]: arr };
        });
    }

    async login() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL Login(?);"
            const by = this.args[0].replace(" ","")

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
                        message: "Authorized",
                        result: result
                    })
                },200)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    // Change Password
    async changePassword() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL ChangePassword(?,?);"
            const email = this.args[0].trim()
            const password = this.args[1].trim()
            const args = [ email, password ]

            // conect to database
            this.database = new DataBase()
            this.database.conect()

            if (this.database) this.database.conection.query(proc,args,(err) => {
                if(err) rej({ message: err }) 
                setTimeout(() => {
                    res({
                        message: "Changed",
                        success: 1
                    })
                },200)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    async GetAdminStats() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL GetAdminStats();"
            // const by = this.args[0].replace(" ","")

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
                        message: "Found info",
                        result: result['0'][0]
                    })
                },200)
            })

            // close conection 
            this.database.conection.end()
        })
    }

    async GetStaffStats() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL GetStaffStats(?);"
            const by = this.args[0].replace(" ","")

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
                        message: "Found info",
                        result: result[0][0]
                    })
                },200)
            })

            // close conection 
            this.database.conection.end()
        })
    }

}

// Export
module.exports = Global