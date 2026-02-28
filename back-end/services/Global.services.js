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

    format = (datas = [], subKey = '', headers = [], keylist = "---", keySublist = ";") => {
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

    iterar = (datas = [], key = '', splitKey = '---') => {
        return datas.map(data => {
            const value = data[key];
            const arr = typeof value === 'string'
                ? value.split(splitKey).map(item => item.trim()).filter(item => item.length > 0)
                : [];
            return { ...data, [key]: arr };
        });
    }

    // sacar el objeto del oobjeto padre y convertirlo en el nuevo objeto padre y darle headers a cada elemento
    mapPostgressResult = (datas = [], headers = [], key = '', keysplit = "---") => {
        const mapData = datas?.map(data => data[key].replace('(', '').replace(')', ''))
        const results = mapData?.map(data => {
            const list = data?.split(keysplit)
            const formatList = this.headerI(headers, list)
            return {
                ...formatList
            }
        })
        return results
    }

    mapPostgressResultOne = (datas = [], headers = [], key = '', keysplit = "---") => {
        const list = datas[key]?.split(keysplit)
        const formatList = this.headerI(headers, list)
        return formatList
    }

    async login() {
        return new Promise((res, rej) => {
            // vars
            const proc = "SELECT login($1);"
            const by = this.args[0].replace(" ", "")

            // conect to database
            this.database = new DataBase()
            this.database.connect()

            let customQuery = async () => {
                try {
                    let result = await this.database.query(proc,[by])
                    if (!result || !result?.[0]) {
                        rej({
                            message: "Not found",
                            status: 404
                        })
                    } else setTimeout(() => {
                        const mapData = this.mapPostgressResultOne(
                            result?.[0],
                            [
                                'nom_per',
                                'ape_per',
                                'doc_per',
                                'cont_per',
                                'fot_per',
                                'roles'
                            ],
                            'login',
                            ','
                        )
                        res({
                            message: "Authorized",
                            result: mapData
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

    // Change Password
    async changePassword() {
        return new Promise((res, rej) => {
            // vars
            const proc = "SELECT changepassword($1,$2);"
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
            const proc = "SELECT getadminstats();"
            // const by = this.args[0].replace(" ","")

            // conect to database
            this.database = new DataBase()
            this.database.connect()

            if (this.database) this.database.query(proc, (err, result) => {
                if (err) {
                    rej({ message: err })
                } else if (!result) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    const mapData = this.mapPostgressResultOne(
                        result?.[0],
                        [
                            'vet',
                            'pets',
                            'appoint',
                            'emergency'
                        ],
                        'getadminstats',
                        ','
                    )
                    res({
                        message: "Found info",
                        result: mapData
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
            const proc = "SELECT getstaffstats($1);"
            const by = this.args[0].replace(" ", "")

            // conect to database
            this.database = new DataBase()
            this.database.connect()

            if (this.database) {
                try {
                    let result = this.database.query(proc, by)
                    if (!result) {
                        rej({
                            message: "Not found",
                            status: 404
                        })
                    } else setTimeout(() => {
                        const mapData = this.mapPostgressResultOne(
                            result?.[0],
                            [
                                'vets',
                                'cirugy',
                                'emergency',
                                'consulta'
                            ],
                            'getstaffstats',
                            ','
                        )
                        res({
                            message: "Found info",
                            result: mapData
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
            const proc = "SELECT getownstats($1);"
            const by = this.args[0].replace(" ", "")

            // conect to database
            this.database = new DataBase()
            this.database.connect()

            if (this.database) this.database.query(proc, by, (err, result) => {
                if (err) {
                    rej({ message: err })
                } else if (!result) {
                    rej({
                        message: "Not found",
                        status: 404
                    })
                } else setTimeout(() => {
                    const mapData = this.mapPostgressResultOne(
                        result?.[0],
                        [
                            'pets',
                            'appoint',
                            'consultas'
                        ],
                        'getownstats',
                        ','
                    )
                    res({
                        message: "Found info",
                        result: mapData
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
            db.conection.query('SELECT frequentpets()', (err, results) => {
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