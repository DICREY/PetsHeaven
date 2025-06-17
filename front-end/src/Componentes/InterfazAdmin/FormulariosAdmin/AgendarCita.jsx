import React from "react"
import { useState } from "react"
import { Calendar, FileText, Stethoscope, PawPrint, X, Save, ChevronDown } from "lucide-react"
import "../../../styles/InterfazAdmin/FormuariosAdmin/AgendarCita.css"

const mockPacientes = [
  { id_mas: 1, nom_mas: "Max", nom_per: "Juan", ape_per: "Pérez" },
  { id_mas: 2, nom_mas: "Luna", nom_per: "María", ape_per: "García" },
  { id_mas: 3, nom_mas: "Rocky", nom_per: "Carlos", ape_per: "López" },
  { id_mas: 4, nom_mas: "Bella", nom_per: "Ana", ape_per: "Martín" },
]

const mockVeterinarios = [
  { doc_per: "12345678", nom_per: "Dr. Ana", ape_per: "Martínez", roles: "Veterinario" },
  { doc_per: "87654321", nom_per: "Dr. Luis", ape_per: "Rodríguez", roles: "Veterinario" },
  { doc_per: "11223344", nom_per: "Dra. Carmen", ape_per: "Silva", roles: "Veterinario" },
]

const consultorios = [
  { id: 1, nombre: "Consultorio 1" },
  { id: 2, nombre: "Consultorio 2" },
  { id: 3, nombre: "Consultorio 3" },
  { id: 4, nombre: "Sala de Cirugía" },
  { id: 5, nombre: "Sala de Emergencias" },
]

export default function AppointmentForm({ onClose, onSubmit }) {
  const [newEvent, setNewEvent] = useState({
    paciente: "",
    propietario: "",
    veterinario: "",
    category: "consulta",
    start: new Date().toISOString().slice(0, 16),
    end: new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16),
    description: "",
    mas_cit: null,
  })
  const [lugar, setLugar] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [filteredPacientes, setFilteredPacientes] = useState([])
  const [showPacientesDropdown, setShowPacientesDropdown] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [allPacientes] = useState(mockPacientes)
  const [allVet] = useState(mockVeterinarios)

  const validatePatientName = (value) => {
    return value.replace(/[0-9]/g, "")
  }

  const searchFilter = (value, data, fields, setFiltered) => {
    if (!value) {
      setFiltered([])
      return
    }
    const filtered = data.filter((item) =>
      fields.some((field) => item[field]?.toLowerCase().includes(value.toLowerCase())),
    )
    setFiltered(filtered)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDateChange = (e) => {
    const newDate = e.target.value
    setSelectedDate(newDate)
    setNewEvent((prev) => ({
      ...prev,
      start: `${newDate}T${prev.start.split("T")[1]}`,
      end: `${newDate}T${prev.end.split("T")[1]}`,
    }))
  }

  const handleCreateEvent = () => {
    const appointmentData = { ...newEvent, lugar }
    console.log("Creando cita:", appointmentData)

    if (onSubmit) {
      onSubmit(appointmentData)
    }

    if (onClose) {
      onClose()
    }
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "consulta":
        return <Stethoscope size={16} />
      case "vacuna":
        return <PawPrint size={16} />
      case "emergencia":
        return <FileText size={16} />
      default:
        return <Stethoscope size={16} />
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "consulta":
        return "tipo-consulta"
      case "vacuna":
        return "tipo-vacuna"
      case "emergencia":
        return "tipo-emergencia"
      default:
        return "tipo-consulta"
    }
  }

  return (
    <aside className="modal-fondo">
      <aside className="modal-contenido">
        <header className="modal-header">
          <div className="modal-titulo">
            <Calendar size={24} className="modal-icono" />
            <h3>Nueva Cita</h3>
          </div>
          <button className="modal-cerrar" onClick={handleClose}>
            <X size={20} />
          </button>
        </header>

        <section className="modal-cuerpo">
          <div className="form-layout">
            {/* Información del Paciente */}
            <div className="seccion">
              <div className="seccion-header">
                <PawPrint size={20} />
                <h4>Información del Paciente</h4>
              </div>

              <div className="form-grid">
                <div className="grupo">
                  <label className="etiqueta">Nombre de la Mascota</label>
                  <div className="autocomplete">
                    <input
                      type="text"
                      name="paciente"
                      placeholder="Buscar mascota..."
                      value={newEvent.paciente}
                      className="campo"
                      onChange={(e) => {
                        const value = e.target.value
                        const filteredValue = validatePatientName(value)
                        if (filteredValue === value || value.length < newEvent.paciente.length) {
                          setNewEvent({ ...newEvent, paciente: value })
                          searchFilter(value, allPacientes, ["nom_mas", "nom_per", "ape_per"], setFilteredPacientes)
                          setShowPacientesDropdown(value.length > 0)
                        }
                      }}
                      onFocus={() => setShowPacientesDropdown(newEvent.paciente.length > 0)}
                      onKeyDown={(e) => {
                        if (e.key >= "0" && e.key <= "9") {
                          e.preventDefault()
                        }
                      }}
                    />
                    {showPacientesDropdown && filteredPacientes.length > 0 && (
                      <div className="dropdown">
                        {filteredPacientes.map((paciente) => (
                          <div
                            key={paciente.id_mas}
                            className="dropdown-item"
                            onClick={() => {
                              setNewEvent({
                                ...newEvent,
                                paciente: paciente.nom_mas,
                                propietario: `${paciente.nom_per} ${paciente.ape_per}`,
                                mas_cit: paciente.id_mas,
                              })
                              setShowPacientesDropdown(false)
                            }}
                          >
                            <div className="dropdown-contenido">
                              <div className="dropdown-nombre">{paciente.nom_mas}</div>
                              <div className="dropdown-dueno">
                                {paciente.nom_per} {paciente.ape_per}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {formErrors.paciente && <div className="error">{formErrors.paciente}</div>}
                </div>

                <div className="grupo">
                  <label className="etiqueta">Propietario</label>
                  <input
                    type="text"
                    name="propietario"
                    placeholder="Nombre del propietario"
                    value={newEvent.propietario}
                    onChange={handleInputChange}
                    className="campo"
                  />
                </div>

                <div className="grupo">
                  <label className="etiqueta">Tipo de Cita</label>
                  <div className="select-wrapper">
                    <select
                      name="category"
                      value={newEvent.category}
                      onChange={handleInputChange}
                      className={`select ${getCategoryColor(newEvent.category)}`}
                    >
                      <option value="consulta">Consulta general</option>
                      <option value="vacuna">Vacuna</option>
                      <option value="emergencia">Emergencia</option>
                    </select>
                    <ChevronDown size={16} className="select-icono" />
                  </div>
                  {formErrors.category && <div className="error">{formErrors.category}</div>}
                </div>
              </div>
            </div>

            {/* Profesional y Lugar */}
            <div className="seccion">
              <div className="seccion-header">
                <Stethoscope size={20} />
                <h4>Profesional y Lugar</h4>
              </div>

              <div className="form-grid">
                <div className="grupo">
                  <label className="etiqueta">Veterinario</label>
                  <div className="select-wrapper">
                    <select
                      name="veterinario"
                      onChange={handleInputChange}
                      value={newEvent.veterinario || ""}
                      className="select"
                      required
                    >
                      <option value="" disabled>
                        Selecciona un veterinario
                      </option>
                      {allVet?.map(
                        (vet) =>
                          vet.roles.split(", ").includes("Veterinario") && (
                            <option key={vet.doc_per} value={vet.doc_per}>
                              {vet.nom_per} {vet.ape_per}
                            </option>
                          ),
                      )}
                    </select>
                    <ChevronDown size={16} className="select-icono" />
                  </div>
                  {formErrors.veterinario && <div className="error">{formErrors.veterinario}</div>}
                </div>

                <div className="grupo">
                  <label className="etiqueta">Consultorio</label>
                  <div className="select-wrapper">
                    <select name="lugar" value={lugar} onChange={(e) => setLugar(e.target.value)} className="select">
                      <option value="" disabled>
                        Seleccionar consultorio
                      </option>
                      {consultorios.map((consultorio) => (
                        <option key={consultorio.id} value={consultorio.nombre}>
                          {consultorio.nombre}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="select-icono" />
                  </div>
                  {formErrors.lug_ate_cit && <div className="error">{formErrors.lug_ate_cit}</div>}
                </div>
              </div>
            </div>

            {/* Fecha y Horario */}
            <div className="seccion ancho-completo">
              <div className="seccion-header">
                <Calendar size={20} />
                <h4>Fecha y Horario</h4>
              </div>

              <div className="fecha-hora">
                <div className="fecha-seccion">
                  <div className="grupo">
                    <label className="etiqueta">Fecha de la Cita</label>
                    <input type="date" value={selectedDate} onChange={handleDateChange} className="fecha-input" />
                  </div>
                </div>

                <div className="hora-seccion">
                  <div className="hora-inputs">
                    <div className="grupo">
                      <label className="etiqueta">Hora de Inicio</label>
                      <input
                        type="time"
                        name="start"
                        value={newEvent.start.split("T")[1].substring(0, 5)}
                        onChange={(e) => {
                          const time = e.target.value
                          setNewEvent({
                            ...newEvent,
                            start: `${selectedDate}T${time}:00`,
                          })
                        }}
                        className="hora-input"
                      />
                    </div>

                    <div className="separador-ci">
                      <div className="separador-linea"></div>
                      <span className="separador-texto">hasta</span>
                      <div className="separador-linea"></div>
                    </div>

                    <div className="grupo">
                      <label className="etiqueta">Hora de Fin</label>
                      <input
                        type="time"
                        name="end"
                        value={newEvent.end.split("T")[1].substring(0, 5)}
                        onChange={(e) => {
                          const time = e.target.value
                          setNewEvent({
                            ...newEvent,
                            end: `${selectedDate}T${time}:00`,
                          })
                        }}
                        className="hora-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="seccion ancho-completo">
              <div className="seccion-header">
                <FileText size={20} />
                <h4>Descripción y Observaciones</h4>
              </div>

              <div className="grupo">
                <textarea
                  name="description"
                  placeholder="Describe el motivo de la cita, síntomas, observaciones especiales..."
                  value={newEvent.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="textarea"
                />
                {formErrors.description && <div className="error">{formErrors.description}</div>}
              </div>
            </div>
          </div>
        </section>

        <div className="modal-footer">
          <button className="boton boton-cancelar" onClick={handleClose}>
            <X size={16} />
            Cancelar
          </button>
          <button className="boton boton-confirmar" onClick={handleCreateEvent}>
            <Save size={16} />
            Crear Cita
          </button>
        </div>
      </aside>
    </aside>
  )
}
