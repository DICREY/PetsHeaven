const DataBase = require('./DataBase')

class Consult {
    async registerConsult(data) {
        return new Promise((res, rej) => {
            const proc = "CALL RegistConsult(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @mensaje, @id_consulta, @id_cita)";
            const params = [
                data.fecha_cita,
                data.hora_inicio,
                data.hora_fin,
                data.motivo_cita,
                data.id_consultorio,
                data.id_servicio,
                data.id_veterinario,
                data.id_mascota,
                data.peso,
                data.temperatura,
                data.diagnostico,
                data.medicamentos,
                data.motivo_consulta,
                data.nombre_tratamiento,
                data.descripcion_tratamiento,
                data.prueba_laboratorio,
                data.resultado_laboratorio,
                data.referencia_laboratorio,
                data.p_mensaje,
                data.p_id_consulta,
                data.p_id_cita
            ]

            this.database = new DataBase()
            this.database.conect()

            if (this.database) this.database.conection.query(proc, params, (err, result) => {
                this.database.conection.end()
                if (err) return rej({ message: err })
                // Los OUT params están en result[0][0] si el SP los retorna con SELECT
                res({
                    message: result[0]?.[0]?.p_mensaje || "Consulta registrada",
                    id_consulta: result[0]?.[0]?.p_id_consulta,
                    id_cita: result[0]?.[0]?.p_id_cita,
                    success: 1
                })
            })
        })
    }
}

module.exports = Consult