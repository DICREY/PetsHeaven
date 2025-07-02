import React from "react"
import { useState } from "react"
import { X, Save, Calendar, User, Stethoscope, Clock } from "lucide-react"
import "../../styles/InterfazCliente/FormularioEditarCitas.css"

const FormularioEditarCitaDetallado = ({ cita, onGuardar, onCerrar }) => {
  const [formData, setFormData] = useState({
    paciente: cita.mascota || "",
    propietario: cita.propietario || "María González",
    telefono: cita.telefono || "+34 612 345 678",
    veterinario: cita.veterinario || "",
    fecha: cita.fecha || "",
    horaInicio: cita.hora || "",
    horaFin: cita.horaFin || "",
    tipo: cita.tipo || cita.servicio || "",
    consultorio: cita.consultorio || "Consultorio 1",
    descripcion: cita.descripcion || cita.motivo || "",
  })

  const veterinarios = ["Dr. Pérez", "Dra. López", "Dr. Martín", "Dra. García", "Dr. Rodríguez"]

  const tiposCita = ["Consulta general", "Vacuna", "Emergencia", "Cirugía", "Revisión", "Desparasitación"]

  const consultorios = ["Consultorio 1", "Consultorio 2", "Consultorio 3", "Sala de Cirugía", "Sala de Emergencias"]

  const horasDisponibles = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ]

  const manejarCambio = (campo, valor) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }))
  }

  const manejarGuardar = (e) => {
    e.preventDefault()
    onGuardar({ ...cita, ...formData })
  }

  const obtenerFechaMinima = () => {
    const hoy = new Date()
    return hoy.toISOString().split("T")[0]
  }

  return (
    <div className="overlay-editar-cita-detallado">
      <div className="modal-editar-cita-detallado">
        <div className="header-editar-cita-detallado">
          <div className="titulo-header-detallado">
            <Calendar size={24} color="#00BCD4" />
            <h3 className="titulo-editar-cita-detallado">Editar Cita</h3>
          </div>
          <button className="boton-cerrar-detallado" onClick={onCerrar}>
            <X size={20} />
          </button>
        </div>

        <form className="formulario-editar-cita-detallado" onSubmit={manejarGuardar}>
          <div className="seccion-informacion-detallado">
            <div className="columna-izquierda-detallado">
              <div className="header-seccion-detallado">
                <User size={20} color="#00BCD4" />
                <h4 className="titulo-seccion-detallado">Información del Paciente</h4>
              </div>

              <div className="campo-detallado">
                <label className="label-detallado">Paciente:</label>
                <input
                  type="text"
                  className="input-detallado"
                  value={formData.paciente}
                  onChange={(e) => manejarCambio("paciente", e.target.value)}
                  placeholder="Nombre de la mascota"
                />
              </div>

              <div className="campo-detallado">
                <label className="label-detallado">Propietario:</label>
                <input
                  type="text"
                  className="input-detallado"
                  value={formData.propietario}
                  onChange={(e) => manejarCambio("propietario", e.target.value)}
                  placeholder="Nombre del propietario"
                />
              </div>

              <div className="campo-detallado">
                <label className="label-detallado">Teléfono:</label>
                <input
                  type="tel"
                  className="input-detallado"
                  value={formData.telefono}
                  onChange={(e) => manejarCambio("telefono", e.target.value)}
                  placeholder="+34 600 000 000"
                />
              </div>

              <div className="campo-detallado">
                <label className="label-detallado">Tipo:</label>
                <select
                  className="select-detallado"
                  value={formData.tipo}
                  onChange={(e) => manejarCambio("tipo", e.target.value)}
                >
                  <option value="">Selecciona un tipo</option>
                  {tiposCita.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="columna-derecha-detallado">
              <div className="header-seccion-detallado">
                <Stethoscope size={20} color="#00BCD4" />
                <h4 className="titulo-seccion-detallado">Profesional y Lugar</h4>
              </div>

              <div className="campo-detallado">
                <label className="label-detallado">Veterinario:</label>
                <select
                  className="select-detallado"
                  value={formData.veterinario}
                  onChange={(e) => manejarCambio("veterinario", e.target.value)}
                >
                  <option value="">Selecciona un veterinario</option>
                  {veterinarios.map((vet) => (
                    <option key={vet} value={vet}>
                      {vet}
                    </option>
                  ))}
                </select>
              </div>

              <div className="campo-detallado">
                <label className="label-detallado">Consultorio:</label>
                <select
                  className="select-detallado"
                  value={formData.consultorio}
                  onChange={(e) => manejarCambio("consultorio", e.target.value)}
                >
                  <option value="">Seleccionar consultorio</option>
                  {consultorios.map((consultorio) => (
                    <option key={consultorio} value={consultorio}>
                      {consultorio}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="seccion-fecha-hora-detallado">
            <div className="header-seccion-detallado">
              <Clock size={20} color="#00BCD4" />
              <h4 className="titulo-seccion-detallado">Fecha y Horario</h4>
            </div>

            <div className="campos-fecha-hora-detallado">
              <div className="campo-detallado">
                <label className="label-detallado">Fecha:</label>
                <input
                  type="date"
                  className="input-detallado"
                  value={formData.fecha}
                  min={obtenerFechaMinima()}
                  onChange={(e) => manejarCambio("fecha", e.target.value)}
                />
              </div>

              <div className="campo-detallado">
                <label className="label-detallado">Hora Inicio:</label>
                <select
                  className="select-detallado"
                  value={formData.horaInicio}
                  onChange={(e) => manejarCambio("horaInicio", e.target.value)}
                >
                  <option value="">Seleccionar hora</option>
                  {horasDisponibles.map((hora) => (
                    <option key={hora} value={hora}>
                      {hora}
                    </option>
                  ))}
                </select>
              </div>

              <div className="campo-detallado">
                <label className="label-detallado">Hora Fin:</label>
                <select
                  className="select-detallado"
                  value={formData.horaFin}
                  onChange={(e) => manejarCambio("horaFin", e.target.value)}
                >
                  <option value="">Seleccionar hora</option>
                  {horasDisponibles.map((hora) => (
                    <option key={hora} value={hora}>
                      {hora}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="campo-descripcion-detallado">
            <label className="label-detallado">Descripción:</label>
            <textarea
              className="textarea-detallado"
              value={formData.descripcion}
              onChange={(e) => manejarCambio("descripcion", e.target.value)}
              placeholder="Descripción de la cita o motivo de consulta..."
              rows="4"
            />
          </div>

          <div className="botones-detallado">
            <button type="button" className="boton-cancelar-detallado" onClick={onCerrar}>
              <X size={16} />
              Cancelar
            </button>
            <button type="submit" className="boton-guardar-detallado">
              <Save size={16} />
              Guardar Cita
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormularioEditarCitaDetallado
