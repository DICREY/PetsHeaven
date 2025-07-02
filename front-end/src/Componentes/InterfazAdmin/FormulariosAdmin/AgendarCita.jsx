// Librarys 
import React, { useEffect } from "react"
import { useState } from "react"
import { Calendar, FileText, Stethoscope, PawPrint, X, Save, ChevronDown } from "lucide-react"

// Imports 
import { GetData, PostData } from "../../Varios/Requests"
import { Notification } from "../../Global/Notifys"
import { errorStatusHandler, formatDate, searchFilter } from "../../Varios/Util"

// Import styles 
import "../../../styles/InterfazAdmin/FormuariosAdmin/AgendarCita.css"
import { toDatetimeLocal } from "../../../Utils/Utils"

// Component 
export default function AppointmentForm({ onClose, date, URL = '', sended}) {
  const [lugar, setLugar] = useState("")
  const [ selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [ almcPacientes, setAlmcPacientes] = useState([])
  const [ showDropDown, setShowDropDown ] = useState(false)
  const [ notify, setNotify ] = useState()
  const [formErrors, setFormErrors] = useState({})
  const [ pacientes, setPacientes ] = useState([])
  const [ almcAppoint, setAlmcAppoint ] = useState([])
  const [ almcVet, setAlmcVet ] = useState([])
  const [ almcConsultingRooms, setAlmcConsultingRooms ] = useState([])
  const [newEvent, setNewEvent] = useState({
    nom_mas: "",
    propietario: "",
    veterinario: "",
    category: "",
    fecCit: date? date: selectedDate,
    start: new Date().toISOString().slice(0, 16),
    end: new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16),
    description: "",
    mas_cit: null,
  })

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
    const newValue = e.target.value
    setSelectedDate(newValue)
    setNewEvent((prev) => ({
      ...prev,
      fecCit: newValue,
    }))
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  const getCategoryIcon = (category) => {
    let icon
    switch (category) {
      case "Consulta General":
        icon = <Stethoscope className="icon" />
        break
      case "Vacunacion":
        icon = <PawPrint className="icon" />
        break
      case "Emergencias 24h":
        icon = <FileText className="icon" />
        break
      default:
        icon = <Stethoscope className="icon" />
        break
    }
    return icon
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
    if (!event.nom_mas) {
      errors.nom_mas = 'Selecciona un paciente válido.'
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
    if (!event.lugar || event.lugar.trim().length < 3) {
      errors.lugar = 'El lugar de atención es obligatorio.'
    }
    if (event.description && event.description.length > 255) {
      errors.description = 'La descripción es demasiado larga.'
    }
    return errors
  }

  const handleCreateEvent = async () => {
    setFormErrors(null)
    const errors = validateEventFields(newEvent)
    setFormErrors(errors)
    setNotify({
      title: 'Cargando',
      message: 'Por favor, espere mientras se validan los datos.',
      load: true
    })
    const citaData = {
      fec_reg_cit: new Date().toISOString().split('T')[0],
      fec_cit: newEvent.fecCit,
      hor_ini_cit: newEvent.start,
      hor_fin_cit: newEvent.end,
      lug_ate_cit: lugar,
      mot_cit: newEvent.description,
      ser_cit: newEvent.category,
      vet_cit: newEvent.veterinario,
      mas_cit: newEvent.mas_cit
    }
    try {
        const data = await PostData(`${mainUrl}/register`, citaData)
        setNotify(null)
        if (data) {
          setNotify({
            title: 'Cita Agendada',
            message: 'La cita ha sido agendada exitosamente',
            close: setNotify
          })
          sended ? sended() : null
          setTimeout(() => {if (onClose) onClose()}, 2000)
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

  const GetVet = async () => {
    try {
      const data = await GetData(`${URL}/staff/all/vet`)
      setNotify(null)
      if (data) {
        setAlmcVet(data)
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

  const GetAppointmentCat = async () => {
    try {
      const data = await GetData(`${URL}/global/services`)
      setNotify(null)
      if (data) {
        setAlmcAppoint(data)
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

  const GetConsultingRooms = async () => {
    try {
      const data = await GetData(`${mainUrl}/consulting-rooms`)
      setNotify(null)
      if (data) {
        setAlmcConsultingRooms(data)
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
    GetVet()
    GetAppointmentCat()
    GetConsultingRooms()
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
            {/* Información del paciente */}
            <section className="seccion">
              <div className="seccion-header">
                <PawPrint className="icon" />
                <h4>Información del Paciente</h4>
              </div>

              <section className="form-grid">
                <div className="grupo">
                  <label className="etiqueta">Nombre de la Mascota</label>
                  <div className="autocomplete">
                    <input
                      type="text"
                      name="nom_mas"
                      placeholder="Buscar mascota..."
                      value={newEvent.nom_mas || ''}
                      className="campo"
                      onChange={(e) => {
                        const value = e.target.value
                        const filteredValue = validatePatientName(value)
                        if (filteredValue === value || value.length < newEvent.nom_mas.length) {
                          setNewEvent({ ...newEvent, nom_mas: value, mas_cit: null }) // Limpia el ID si el usuario escribe
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
                    disabled={true}
                  />
                </div>

                <div className="grupo">
                  <label className="etiqueta">Tipo de Cita</label>
                  <div className="select-wrapper">
                    <select
                      name="category"
                      value={newEvent.category || ""}
                      onChange={handleInputChange}
                      className={`select ${getCategoryColor(newEvent.category)}`}
                    >
                      <option value="" disabled>
                        Selecciona una cita
                      </option>
                      {almcAppoint?.map((app, index) => (
                        <option key={index} value={app.nom_cat}>
                          {app.nom_cat}
                          {/* {getCategoryIcon(app.nom_cat)} */}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="select-icono icon" />
                  </div>
                  {formErrors.category && <div className="error">{formErrors.category}</div>}
                </div>
              </section>
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
                      {almcVet?.map( vet => (
                        <option key={vet.doc_per} value={vet.doc_per}>
                          {vet.nom_per} {vet.ape_per} ({vet.esp_vet})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="select-icono icon" />
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
                      {almcConsultingRooms.map((consultorio) => (
                        <option key={consultorio.id_con} value={consultorio.cod_con}>
                          {consultorio.nom_con} ({consultorio.cod_con})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="select-icono icon" />
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
                    <input
                      name="fecCit"
                      type="date" value={date ? date : selectedDate}
                      disabled={date?1:0}
                      onChange={handleDateChange} 
                      className="fecha-input" 
                      min={formatDate(new Date())}
                    />
                  </div>
                </div>

                <div className="hora-seccion">
                  <div className="hora-inputs">
                    <div className="grupo">
                      <label className="etiqueta">Hora de Inicio</label>
                      <input
                        type="time"
                        name="start"
                        value={newEvent.start?.split("T")[1]}
                        onChange={handleInputChange}
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
                        value={toDatetimeLocal(newEvent.end)?.split("T")[1]}
                        onChange={handleInputChange}
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
            <X className="icon" />
            Cancelar
          </button>
          <button className="boton boton-confirmar" onClick={handleCreateEvent}>
            <Save className="icon" />
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
