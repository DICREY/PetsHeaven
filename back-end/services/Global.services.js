// Imports
const DataBase = require('./DataBasePostgres')

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

    format = (datas = [], subKey = '', headers = [],keylist = "---", keySublist = ";") => {
        const results = datas.map(data => {
            const list = data[subKey]?.split(keylist)
                .map(item => {
                    const subList = item.split(keySublist)
                    return this.headerI(headers, subList)
                })
            return {
                ...data,
                [subKey]: list
            }
        })
        return results
    }

    iterar = (datas = [], key = '',splitKey = '---') => {
        return datas.map(data => {
            const value = data[key];
            const arr = typeof value === 'string'
                ? value.split(splitKey).map(item => item.trim()).filter(item => item.length > 0)
                : [];
            return { ...data, [key]: arr };
        });
    }

    // sacar el objeto del oobjeto padre y convertirlo en el nuevo objeto padre y darle headers a cada elemento
    mapPostgressResult = ( datas = [], headers = [], key = '', keysplit = "---" ) => {
        const mapData = datas.map(data => data[key].replace('(','').replace(')',''))
        const results = mapData.map(data => {
            const list = data?.split(keysplit)
            const formatList = this.headerI(headers, list)
            return {
                ...formatList
            }
        })
        return results
    }

    async login() {
        return new Promise((res, rej) => {
            // vars
            const proc = "SELECT Login(?);"
            const by = this.args[0].replace(" ", "")

            // conect to database
            this.database = new DataBase()
            this.database.connect()

            if (this.database) {
                try {
                    let result = this.database.query(proc, by)
                    if (!result || !result[0][0]) {
                        rej({
                            message: "Not found",
                            status: 404
                        })
                    } else setTimeout(() => {
                        res({
                            message: "Authorized",
                            result: result
                        })
                    }, 500)
                } catch (err) {
                    rej({ message: err })
                }
            }

            // close conection 
            this.database.disconnect()
        })
    }

    // Change Password
    async changePassword() {
        return new Promise((res, rej) => {
            // vars
            const proc = "SELECT ChangePassword(?,?);"
            const email = this.args[0].trim()
            const password = this.args[1].trim()
            const args = [email, password]

            // conect to database
            this.database = new DataBase()
            this.database.connect()


            if (this.database) {
                try {
                    let result = this.database.query(proc, args)
                    setTimeout(() => {
                        res({
                            message: "Changed",
                            success: 1
                        })
                    }, 500)
                } catch (err) {
                    rej({ message: err })
                }
            }

            // close conection 
            this.database.disconnect()
        })
    }

    async GetAdminStats() {
        return new Promise((res, rej) => {
            // vars
            const proc = "SELECT GetAdminStats();"
            // const by = this.args[0].replace(" ","")

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
                        message: "Found info",
                        result: result['0'][0]
                    })
                }, 500)
            })

            // close conection 
            this.database.disconnect()
        })
    }

    async GetStaffStats() {
        return new Promise((res, rej) => {
            // vars
            const proc = "SELECT GetStaffStats(?);"
            const by = this.args[0].replace(" ", "")

            // conect to database
            this.database = new DataBase()
            this.database.connect()

            if (this.database) {
                try {
                    let result = this.database.query(proc, by)
                    if (!result || !result[0][0]) {
                        rej({
                            message: "Not found",
                            status: 404
                        })
                    } else setTimeout(() => {
                        res({
                            message: "Found info",
                            result: result[0][0]
                        })
                    }, 500)
                } catch (err) {
                    rej({ message: err })
                }
            }

            // close conection 
            this.database.disconnect()
        })
    }

    async GetOwnStats() {
        return new Promise((res, rej) => {
            // vars
            const proc = "SELECT GetOwnStats(?);"
            const by = this.args[0].replace(" ", "")

            // conect to database
            this.database = new DataBase()
            this.database.connect()

            if (this.database) this.database.query(proc, by, (err, result) => {
                if (err) {
                    rej({ message: err })
                } else if (!result || !result[0][0]) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    res({
                        message: "Found info",
                        result: result[0][0]
                    })
                }, 500)
            })

            // close conection 
            this.database.disconnect()
        })
    }

    async GetFrequentPets() {
        return new Promise((resolve, reject) => {
            const db = new DataBase()
            db.connect()
            db.conection.query('CALL pets_heaven.frequentPets()', (err, results) => {
                db.conection.end()
                if (err) return reject(err)
                // El resultado de un CALL es un array de arrays, el primero es el result set
                resolve({
                    message: "Found info",
                    result: results[0]
                })
            })
        })
    }

}

// Export
module.exports = Global