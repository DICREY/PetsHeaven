// Librarys 
import React, { useEffect } from "react"
import { useState } from "react"
import { Calendar, FileText, Stethoscope, PawPrint, X, Save, ChevronDown } from "lucide-react"

// Imports 
import { GetData } from "../../Varios/Requests"
import { Notification } from "../../Global/Notifys"
import { searchFilter } from "../../Varios/Util"

// Import styles 
import "../../../styles/InterfazAdmin/FormuariosAdmin/AgendarCita.css"

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

// Component 
export default function AppointmentForm({ onClose, onSubmit, URL = '' }) {
  const [newEvent, setNewEvent] = useState({
    nom_mas: "",
    propietario: "",
    veterinario: "",
    category: "consulta",
    start: new Date().toISOString().slice(0, 16),
    end: new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16),
    description: "",
    mas_cit: null,
  })
  const [lugar, setLugar] = useState("")
  const [ selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [ almcPacientes, setAlmcPacientes] = useState([])
  const [ showDropDown, setShowDropDown ] = useState(false)
  const [ notify, setNotify ] = useState()
  const [formErrors, setFormErrors] = useState({})
  const [ pacientes, setPacientes ] = useState([])
  const [allVet] = useState(mockVeterinarios)

  // Vars 
  const mainUrl = `${URL}/appointment`

  const validatePatientName = (value) => {
    return value.replace(/[0-9]/g, "")
  }

  const filter = (term) => {
    searchFilter(term,pacientes, ["nom_mas", "nom_per", "ape_per"],setAlmcPacientes)
    if (almcPacientes) setShowDropDown(1)
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

  const validateEventFields = (event) => {
    const errors = {}
    if (!event.paciente || !event.mas_cit) {
      errors.paciente = 'Selecciona un paciente válido.'
    }
    if (!event.veterinario) {
      errors.veterinario = 'Selecciona un veterinario.'
    }
    if (!event.start || !event.end) {
      errors.start = 'Selecciona fecha y hora de inicio.'
      errors.end = 'Selecciona fecha y hora de fin.'
    }
    if (!event.category) {
      errors.category = 'Selecciona el tipo de cita.'
    }
    if (!event.lug_ate_cit || event.lug_ate_cit.trim().length < 3) {
      errors.lug_ate_cit = 'El lugar de atención es obligatorio.'
    }
    if (event.description && event.description.length > 255) {
      errors.description = 'La descripción es demasiado larga.'
    }
    return errors
  }

  const handleCreateEvent = async () => {
    const errors = validateEventFields(newEvent)
    setFormErrors(errors)
    if (Object.keys(errors).length > 0) return
    setNotify({
      title: 'Cargando',
      message: 'Por favor, espere mientras se validan los datos.',
      load: true
    })
    const citaData = {
        fec_reg_cit: new Date().toISOString().split('T')[0],
        fec_cit: newEvent.start.split('T')[0],
        hor_ini_cit: newEvent.start.split('T')[1],
        hor_fin_cit: newEvent.end.split('T')[1],
        lug_ate_cit: lugar,
        ser_cit: newEvent.category,
        vet_cit: newEvent.veterinario,
        mas_cit: newEvent.nom_mas,
        estado: 'PENDIENTE'
    }
    try {
        const data = await PostData(`${mainUrl}/register`, citaData)
        setNotify(null)
        console.log(data)
        if (data) {
          setNotify({
            title: 'Cita Agendada',
            message: 'La cita ha sido agendada exitosamente',
            close: setNotify
          })
          if (onClose) {
            onClose()
          }
        }
    } catch (err) {
        setNotify(null)
        const message = errorStatusHandler(err)
        setNotify({
            title: 'Error',
            message: message,
            close: setNotify
        })
        if (err.status === 403) setTimeout(() => {
            Logout()
        }, 2000)
    }
  }

  const fetchpacientes = async () => {
    try {
      const data = await GetData(`${URL}/pet/all`)
      setNotify(null)
      if (data) {
        setPacientes(data)
        setAlmcPacientes(data)
      }
    } catch (err) {
      setNotify(null)
      const message = errorStatusHandler(err)
      setNotify({
          title: 'Error',
          message: message,
          close: setNotify
      })
      if (err.status === 403) setTimeout(() => {
          Logout()
      }, 2000)
    }
  }

  useEffect(() => {
    fetchpacientes()
  },[])

  return (
    <aside className="modal-fondo">
      <aside className="modal-contenido">
        <header className="modal-header">
          <div className="modal-titulo">
            <Calendar size={24} className="modal-icono" />
            <h3>Nueva Cita</h3>
          </div>
          <button className="modal-cerrar" onClick={handleClose}>
            <X className="icon" />
          </button>
        </header>

        <section className="modal-cuerpo">
          <section className="form-layout">
            {/* Información del nom_mas */}
            <section className="seccion">
              <div className="seccion-header">
                <PawPrint className="icon" />
                <h4>Información del nom_mas</h4>
              </div>

              <div className="form-grid">
                <div className="grupo">
                  <label className="etiqueta">Nombre de la Mascota</label>
                  <div className="autocomplete">
                    <input
                      type="text"
                      name="nom_mas"
                      placeholder="Buscar mascota..."
                      defaultValue={newEvent.nom_mas}
                      className="campo"
                      onChange={(e) => {
                        const value = e.target.value
                        const filteredValue = validatePatientName(value)
                        if (filteredValue === value || value.length < newEvent.nom_mas.length) {
                          setNewEvent({ ...newEvent, nom_mas: value })
                          filter(value)
                        }
                      }}
                      onFocus={() => setShowDropDown(1)}
                      onKeyDown={(e) => {
                        if (e.key >= "0" && e.key <= "9") {
                          e.preventDefault()
                        }
                      }}
                    />
                    {showDropDown && (
                      <div className="dropdown">
                        {almcPacientes.map((nom_mas, index) => (
                          <div
                            key={index + 9082}
                            className="dropdown-item"
                            onClick={() => {
                              setNewEvent({
                                ...newEvent,
                                nom_mas: nom_mas.nom_mas,
                                propietario: `${nom_mas.nom_per} ${nom_mas.ape_per}`,
                                mas_cit: nom_mas.id_mas,
                              })
                              setShowDropDown(false)
                            }}
                          >
                            <div className="dropdown-contenido">
                              <div className="dropdown-nombre">{nom_mas.nom_mas}</div>
                              <div className="dropdown-dueno">
                                {nom_mas.nom_per} {nom_mas.ape_per}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {formErrors.nom_mas && <div className="error">{formErrors.nom_mas}</div>}
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
            </section>

            {/* Profesional y Lugar */}
            <div className="seccion">
              <div className="seccion-header">
                <Stethoscope className="icon" />
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
                <Calendar className="icon" />
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
                <FileText className="icon" />
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
          </section>
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
      {notify && (
          <Notification
              {...notify}
          />
      )}
    </aside>
  )
}
