// Librarys 
import React, { useState, useRef, useEffect, useContext } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import esLocale from "@fullcalendar/core/locales/es"

// Imports 
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { GetData, PostData, ModifyData } from '../Varios/Requests'
import { errorStatusHandler } from '../Varios/Util'
import { Notification } from '../Global/Notifys'
import { searchFilter } from '../Varios/Util'
import { HeaderAdmin } from '../BarrasNavegacion/HeaderAdmin'

// Import styles 
import "../../styles/InterfazAdmin/GesAgendaGeneral.css"
import Footer from '../Varios/Footer2'
import { ReqFunction } from '../../Utils/Utils'

// Función para unir fecha y hora en formato ISO
function joinDateTime(date, time) {
    const cleanDate = date.split('T')[0]
    return `${cleanDate}T${time}`
}

// Component 
export const GesAgendaGeneral = ({ URL = '' }) => {
    // Dynamic vars 
    const [events, setEvents] = useState([])
    const [notify, setNotify] = useState(null)
    const [currentView, setCurrentView] = useState('dayGridMonth')
    const [showEventModal, setShowEventModal] = useState(false) //Mostrar la descripcion en un pop up de la cita
    const [showCreateModal, setShowCreateModal] = useState(false) //Mostrar el pop up de creacion de Cita
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [selectedDate, setSelectedDate] = useState('')
    const [lugar, setLugar] = useState('Consultorio')
    const calendarRef = useRef(null)
    const [allPacientes, setAllPacientes] = useState([]) // Todos los pacientes
    const [allVet, setAllVet] = useState([]) // Todos los pacientes
    const [filteredPacientes, setFilteredPacientes] = useState([]) // Resultados filtrados
    const [showPacientesDropdown, setShowPacientesDropdown] = useState(false) // Controlar dropdown
    // const [ log, user, roles ] = useContext(AuthContext)
    const [newEvent, setNewEvent] = useState({
        title: '',
        start: '',
        end: '',
        description: '',
        category: 'consulta',
        paciente: '',
        propietario: '',
        veterinario: '',
        lug_ate_cit: 'Consultorio',
        telefono: '',
        estado: 'PENDIENTE',
        mas_cit: ''
    })
    const createModalRef = useRef(null)
    const eventModalRef = useRef(null)
    const [formErrors, setFormErrors] = useState({})

    // Cerrar modal al hacer clic fuera
    useEffect(() => {
        function handleClickOutside(event) {
            if (showCreateModal && createModalRef.current && !createModalRef.current.contains(event.target)) {
                setShowCreateModal(false)
            }
            if (showEventModal && eventModalRef.current && !eventModalRef.current.contains(event.target)) {
                setShowEventModal(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [showCreateModal, showEventModal])


    // Vars 
    const didFetch = useRef(false)
    const mainUrl = `${URL}/appointment`

    // Functions    
    useEffect(() => {
        if (didFetch.current) return
        didFetch.current = true
        fetchAppointments()
    }, [])

    //Dia de hoy
    const today = new Date().toISOString().split('T')[0] // 'YYYY-MM-DD'

    const fetchPacientes = async () => {
        await ReqFunction(
            `${URL}/pet/all`,
            GetData,
            setNotify,
            setAllPacientes
        )
    }
    const fetchVet = async () => {
        await ReqFunction(
            `${URL}/staff/all`,
            GetData,
            setNotify,
            setAllVet
        )
    }

    // Crear citas
    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr)
        fetchPacientes() // Cargar pacientes cuando se abre el modal
        fetchVet() // Cargar veterinarios cuando se abre el modal
        setNewEvent({
            title: '',
            start: `${arg.dateStr}T09:00:00`,
            end: `${arg.dateStr}T10:00:00`,
            description: '',
            category: 'consulta',
            paciente: '',
            propietario: '',
            veterinario: '',
            lug_ate_cit: 'Consultorio',
            telefono: '',
            estado: 'PENDIENTE'
        })
        setShowCreateModal(true)
    }

    // Mostrar detalles de la cita
    const handleEventClick = (info) => {
        setSelectedEvent({
            id: info.event.id,
            title: info.event.title,
            start: info.event.start,
            end: info.event.end,
            ...info.event.extendedProps
        })
        setShowEventModal(true)
    }

    // Crear nueva cita en el backend
    const handleCreateEvent = async () => {
        const errors = validateEventFields(newEvent);
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) return;
        const citaData = {
            fec_reg_cit: new Date().toISOString().split('T')[0],
            fec_cit: newEvent.start.split('T')[0],
            hor_ini_cit: newEvent.start.split('T')[1],
            hor_fin_cit: newEvent.end.split('T')[1],
            lug_ate_cit: lugar,
            ser_cit: newEvent.category,
            vet_cit: newEvent.veterinario,
            mas_cit: newEvent.paciente,
            estado: 'PENDIENTE'
        }
        try {
            await PostData(`${mainUrl}/register`, citaData)
            setShowCreateModal(false)
            fetchAppointments()
        } catch (err) {
            alert('Error al crear la cita')
        }
    }

    // Actualizar cita existente en el backend
    const handleUpdateEvent = async () => {
        const errors = validateEventFields(selectedEvent);
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) return;
        // Verificar fecha
        const eventDate = new Date(selectedEvent.start)
        const today = new Date()
        today.setHours(0, 0, 0, 0) // Eliminar la parte de la hora para comparar solo fechas

        if (eventDate < today) {
            Alert.alert(
                'Fecha inválida',
                'No puedes agendar citas en fechas pasadas',
                [{ text: 'OK' }]
            )
            return
        }
        const citaData = {
            id_cit: selectedEvent.id,
            mas_cit: selectedEvent.mas_cit,
            fec_cit: typeof selectedEvent.start === "string"
                ? selectedEvent.start.split('T')[0]
                : selectedEvent.start.toISOString().split('T')[0],
            hor_ini_cit: typeof selectedEvent.start === "string"
                ? selectedEvent.start.split('T')[1]
                : selectedEvent.start.toISOString().split('T')[1],
            hor_fin_cit: typeof selectedEvent.end === "string"
                ? selectedEvent.end.split('T')[1]
                : selectedEvent.end.toISOString().split('T')[1],
            lug_ate_cit: selectedEvent.lug_ate_cit || "Consultorio"
        }
        try {
            await ModifyData(`${mainUrl}/modify`, citaData)
            setShowEventModal(false)
            fetchAppointments()
        } catch (err) {
            setNotify(null)
            if (err.status) {
                const message = errorStatusHandler(err.status)
                setNotify({
                    title: 'Error',
                    message: `${message}`,
                    close: setNotify
                })
            } else console.log(err)
        }
    }

    // Cancelar cita en el backend
    const handleDeleteEvent = async () => {
        if (!window.confirm(`¿Eliminar la cita "${selectedEvent.title}"?`)) return
        try {
            const citaData = {
                id_cit: selectedEvent.id,
                mas_cit: selectedEvent.mas_cit
            }
            await ModifyData(`${mainUrl}/cancel`, citaData)
            setShowEventModal(false)
            fetchAppointments()
        } catch (err) {
            setNotify(null)
            if (err.status) {
                const message = errorStatusHandler(err.status)
                setNotify({
                    title: 'Error',
                    message: `${message}`,
                    close: setNotify
                })
            } else console.log(err)
        }
    }

    // Manejar cambios en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target
        if (showCreateModal) {
            setNewEvent({ ...newEvent, [name]: value })
        } else {
            setSelectedEvent({ ...selectedEvent, [name]: value })
        }
    }

    const fetchAppointments = async () => {
        setNotify({
            title: 'Cargando',
            message: 'Cargando citas, por favor espere...',
            load: 1
        })
        try {
            let data = await GetData(`${mainUrl}/general`)
            setNotify(null)
            // Normaliza la respuesta a array
            if (data && !Array.isArray(data)) {
                data = [data]
            }
            if (data) {
                const mappedEvents = data.map(event => ({
                    id: event.id_cit,
                    mas_cit: event.mas_cit,
                    title: event.nom_ser,
                    start: joinDateTime(event.fec_cit, event.hor_ini_cit),
                    end: joinDateTime(event.fec_cit, event.hor_fin_cit),
                    description: event.des_ser,
                    category: event.nom_ser || 'vacuna',
                    paciente: event.nom_mas,
                    propietario: `${event.prop_nom_per} ${event.prop_ape_per}`,
                    telefonoProp: event.prop_cel_per,
                    veterinario: `${event.vet_nom_per} ${event.vet_ape_per}`,
                    telefonoVet: event.vet_cel_per,
                    lug_ate_cit: event.lug_ate_cit || 'Consultorio',
                    estado: event.estado,
                    fotoMascota: event.fot_mas
                }))
                setEvents(mappedEvents)
            }
        } catch (err) {
            setNotify(null)
            if (err.status) {
                const message = errorStatusHandler(err.status)
                setNotify({
                    title: 'Error',
                    message: `${message}`,
                    close: setNotify
                })
            } else console.error(err)
        }
    }

    const validatePatientName = (input) => {
        // Expresión regular que solo permite letras, espacios y algunos caracteres especiales comunes en nombres
        return input.replace(/[0-9]/g, '')
    }

    const validateEventFields = (event) => {
        const errors = {};
        if (!event.paciente || !event.mas_cit) {
            errors.paciente = 'Selecciona un paciente válido.';
        }
        if (!event.veterinario) {
            errors.veterinario = 'Selecciona un veterinario.';
        }
        if (!event.start || !event.end) {
            errors.start = 'Selecciona fecha y hora de inicio.';
            errors.end = 'Selecciona fecha y hora de fin.';
        }
        if (!event.category) {
            errors.category = 'Selecciona el tipo de cita.';
        }
        if (!event.lug_ate_cit || event.lug_ate_cit.trim().length < 3) {
            errors.lug_ate_cit = 'El lugar de atención es obligatorio.';
        }
        if (event.description && event.description.length > 255) {
            errors.description = 'La descripción es demasiado larga.';
        }
        return errors;
    };


    return (
        <main className="calendar-container">
            <NavBarAdmin />
            <main className='calendar-container' id='main-container-calendar'>
                <HeaderAdmin openHelp={() => setTabHelp(true)} URL={URL} />

                <FullCalendar
                    // Refencia del calendario, permite acceder a la instancia del componente para manipularlo
                    ref={calendarRef}

                    // Plugins utilizados para habilitar características adicionales en el calendario
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}

                    // Vista inicial del calendario (se puede cambiar dinámicamente)
                    initialView={currentView}

                    // Deshabilita los dias que ya pasaron
                    validRange={{
                        start: today
                    }}

                    // Configuración de la barra de herramientas del encabezado
                    headerToolbar={{
                        start: "customPrev today customNext",
                        center: "title",
                        end: "dayGridMonth dayGridWeek dayGridDay listYear"
                    }}

                    customButtons={{
                        customPrev: {
                            text: '<',
                            click: () => calendarRef.current.getApi().prev()
                        },
                        customNext: {
                            text: '>',
                            click: () => calendarRef.current.getApi().next()
                        }
                    }}

                    events={events}
                    eventClassNames={(event) => [event.event.extendedProps.category]}

                    // Permite la selección de fechas o rangos de fechas
                    selectable={true}

                    // Función que se ejecuta al hacer clic en una fecha
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}

                    // Habilita la edición de los eventos: mover, redimensionar, eliminar
                    editable={false}

                    // Texto que aparece cuando hay más eventos de los que se pueden mostrar en un día
                    moreLinkText={`Ver más`}
                    height="calc(100vh - 120px)"

                    // Muestra una línea indicadora para la hora actual
                    nowIndicator={true}

                    // Configura la hora mínima visible en las vistas basadas en tiempo
                    slotMinTime="06:00:00"

                    // Configura la hora máxima visible en las vistas basadas en tiempo
                    slotMaxTime="24:00:00"

                    // Duración de cada franja horaria en las vistas de tiempo
                    slotDuration="00:30:00" // Cada ranura dura 30 minutos

                    // Configura el idioma del calendario a español
                    locales={[esLocale]}   // Idiomas disponibles
                    locale="es"            // Idioma predeterminado

                    // Formato de la hora para los eventos, en formato de 12 horas
                    eventTimeFormat={{
                        hour: '2-digit',    // Dos dígitos para la hora
                        minute: '2-digit',  // Dos dígitos para los minutos
                        hour12: true        // Usa el formato de 12 horas (AM/PM)
                    }}

                    // Configuración de las horas de negocio (días y horarios en los que el calendario está disponible)
                    businessHours={{
                        daysOfWeek: [1, 2, 3, 4, 5, 6], // Lunes a Sábado
                        startTime: "06:00",              // Comienza a las 6:00 AM
                        endTime: "24:00"                 // Finaliza a las 6:00 PM
                    }}

                    // Permite la interactividad de los eventos (clics, drag-and-drop, etc.)
                    eventInteractive={true}

                    views={{
                        dayGridDay: { dayMaxEvents: false }, // Sin límite de eventos en la vista de día
                        dayGridMonth: { dayMaxEvents: 1 },   // Límite de 2 eventos solo en la vista de mes
                        dayGridWeek: { dayMaxEvents: false } // Limite de eventos deshabilitado en semana
                    }}

                    // Función que personaliza el contenido de los eventos en el calendario
                    eventContent={(eventInfo) => (
                        <aside className={`fc-event-content ${eventInfo.event.extendedProps.category}`}>
                            <div className="fc-event-time">
                                {eventInfo.timeText}  {/* Muestra la hora del evento */}
                            </div>
                            <div className="fc-event-title">
                                {eventInfo.event.title}  {/* Título del evento */}
                            </div>
                            <div className="fc-event-patient">
                                {eventInfo.event.extendedProps.paciente}  {/* Información personalizada del evento */}
                            </div>
                        </aside>
                    )}
                />

                {/* Popup para crear nueva cita */}
                {showCreateModal && (
                    <aside className="modal-overlay">
                        <aside className="modal-content">
                            <header className="modal-header">
                                <h3>Nueva Cita</h3>
                                <button className="modal-close-btn" onClick={() => setShowCreateModal(false)}>
                                    X
                                </button>
                            </header>
                            <section className="modal-body">
                                <div className="form-columns">
                                    <div className="form-column">
                                        <div className="form-group">
                                            <label>Paciente:</label>
                                            <div className="paciente-autocomplete">
                                                <input
                                                    type="text"
                                                    name="paciente"
                                                    value={newEvent.paciente}
                                                    onChange={(e) => {
                                                        const value = e.target.value
                                                        // Filtramos los números antes de actualizar el estado
                                                        const filteredValue = validatePatientName(value)
                                                        if (filteredValue === value || value.length < newEvent.paciente.length) {
                                                            setNewEvent({ ...newEvent, paciente: value })
                                                            searchFilter(
                                                                value,
                                                                allPacientes,
                                                                ['nom_mas', 'nom_per', 'ape_per'], // Campos a buscar
                                                                setFilteredPacientes
                                                            )
                                                            setShowPacientesDropdown(value.length > 0)
                                                        }
                                                    }}
                                                    onFocus={() => setShowPacientesDropdown(newEvent.paciente.length > 0)}
                                                    onKeyDown={(e) => {
                                                        // Bloquear teclas numéricas directamente
                                                        if (e.key >= '0' && e.key <= '9') {
                                                            e.preventDefault()
                                                        }
                                                    }}
                                                />
                                                {showPacientesDropdown && filteredPacientes.length > 0 && (
                                                    <div className="paciente-dropdown">
                                                        {filteredPacientes.map((paciente) => (
                                                            <div
                                                                key={paciente.id_mas}
                                                                className="dropdown-item"
                                                                onClick={() => {
                                                                    setNewEvent({
                                                                        ...newEvent,
                                                                        paciente: paciente.nom_mas,
                                                                        propietario: `${paciente.nom_per} ${paciente.ape_per}`,
                                                                        telefono: paciente.cel_per || '',
                                                                        mas_cit: paciente.id_mas
                                                                    },
                                                                    )
                                                                    setShowPacientesDropdown(false)
                                                                }}
                                                            >
                                                                {paciente.nom_mas} ({paciente.nom_per} {paciente.ape_per})
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            {formErrors.paciente && (
                                                <div className="form-error">{formErrors.paciente}</div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label>Propietario:</label>
                                            <input
                                                type="text"
                                                name="propietario"
                                                value={newEvent.propietario}
                                                onChange={handleInputChange}
                                                disabled
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Veterinario:</label>
                                            <select
                                                name="veterinario"
                                                onChange={handleInputChange}
                                                value={newEvent.veterinario || ''}
                                                required
                                            >
                                                <option value="" disabled selected>Selecciona un veterinario</option>
                                                {allVet?.map((i) =>
                                                    i.roles.split(', ').includes('Veterinario') && (
                                                        <option key={i.doc_per} value={i.doc_per}>
                                                            {i.nom_per} {i.ape_per} (Veterinario)
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                            {formErrors.veterinario && (
                                                <div className="form-error">{formErrors.veterinario}</div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label>Teléfono:</label>
                                            <input
                                                type="text"
                                                name="telefono"
                                                value={newEvent.telefono}
                                                onChange={handleInputChange}
                                                disabled
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Tipo:</label>
                                            <select
                                                name="category"
                                                value={newEvent.category}
                                                onChange={handleInputChange}
                                            >
                                                <option value="consulta">Consulta general</option>
                                                <option value="vacuna">Vacuna</option>
                                                <option value="emergencia">Emergencia</option>
                                            </select>
                                            {formErrors.category && (
                                                <div className="form-error">{formErrors.category}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-column">
                                        <div className="form-group">
                                            <label>Fecha:</label>
                                            <input
                                                type="date"
                                                value={selectedDate}
                                                disabled
                                            />
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Hora Inicio:</label>
                                                <input
                                                    type="time"
                                                    name="start"
                                                    value={newEvent.start.split('T')[1].substring(0, 5)}
                                                    onChange={(e) => {
                                                        const time = e.target.value
                                                        setNewEvent({
                                                            ...newEvent,
                                                            start: `${selectedDate}T${time}:00`
                                                        })
                                                    }}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Hora Fin:</label>
                                                <input
                                                    type="time"
                                                    name="end"
                                                    value={newEvent.end.split('T')[1].substring(0, 5)}
                                                    onChange={(e) => {
                                                        const time = e.target.value
                                                        setNewEvent({
                                                            ...newEvent,
                                                            end: `${selectedDate}T${time}:00`
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Lugar de atención:</label>
                                            <input
                                                type="text"
                                                name="lugar"
                                                value={lugar}
                                                onChange={e => setLugar(e.target.value)}
                                            />
                                            {formErrors.lug_ate_cit && (
                                                <div className="form-error">{formErrors.lug_ate_cit}</div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label>Descripción:</label>
                                            <textarea
                                                name="description"
                                                value={newEvent.description}
                                                onChange={handleInputChange}
                                            />
                                            {formErrors.description && (
                                                <div className="form-error">{formErrors.description}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className="modal-footer">
                                <button className="modal-btn modal-btn-close" onClick={() => setShowCreateModal(false)}>
                                    Cancelar
                                </button>
                                <button className="modal-btn modal-btn-confirm" onClick={handleCreateEvent}>
                                    Crear Cita
                                </button>
                            </div>
                        </aside>
                    </aside>
                )}

                {/* Popup para detalles/edición de cita */}
                {showEventModal && (
                    <aside className="modal-overlay">
                        <aside className="modal-content">
                            <header className="modal-header">
                                <h3>{selectedEvent?.id ? 'Editar Cita' : 'Detalles de la Cita'}</h3>
                                <button className="modal-close-btn" onClick={() => setShowEventModal(false)}>
                                    X
                                </button>
                            </header>
                            <section className="modal-body">
                                <div className="form-group">
                                    <label>Título:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={selectedEvent?.title || ''}
                                        onChange={handleInputChange}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Paciente:</label>
                                    <input
                                        type="text"
                                        name="paciente"
                                        value={selectedEvent?.paciente || ''}
                                        onChange={handleInputChange}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Propietario:</label>
                                    <input
                                        type="text"
                                        name="propietario"
                                        value={selectedEvent?.propietario || ''}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Teléfono:</label>
                                    <input
                                        disabled
                                        type="text"
                                        name="telefono"
                                        value={selectedEvent?.telefonoProp || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Veterinario:</label>
                                    <input
                                        disabled
                                        type="text"
                                        name="veterinario"
                                        value={selectedEvent?.veterinario || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Fecha:</label>
                                    <input
                                        type="date"
                                        value={selectedEvent?.start ? (typeof selectedEvent.start === "string"
                                            ? selectedEvent.start.split('T')[0]
                                            : selectedEvent.start.toISOString().split('T')[0])
                                            : ''}
                                        min={new Date().toISOString().split('T')[0]} // Establece la fecha mínima como hoy
                                        onChange={e => {

                                            const selectedDate = e.target.value
                                            const today = new Date().toISOString().split('T')[0]

                                            if (selectedDate < today) {
                                                Alert.alert(
                                                    'Fecha inválida',
                                                    'No puedes agendar citas en fechas pasadas',
                                                    [{ text: 'OK' }]
                                                )
                                                return
                                            }

                                            const startTime = selectedEvent?.start
                                                ? (typeof selectedEvent.start === "string"
                                                    ? selectedEvent.start.split('T')[1].substring(0, 5)
                                                    : selectedEvent.start.toISOString().split('T')[1].substring(0, 5))
                                                : '09:00'
                                            const endTime = selectedEvent?.end
                                                ? (typeof selectedEvent.end === "string"
                                                    ? selectedEvent.end.split('T')[1].substring(0, 5)
                                                    : selectedEvent.end.toISOString().split('T')[1].substring(0, 5))
                                                : '10:00'
                                            setSelectedEvent({
                                                ...selectedEvent,
                                                start: `${selectedDate}T${startTime}:00`,
                                                end: `${selectedDate}T${endTime}:00`
                                            })
                                        }}
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Hora Inicio:</label>
                                        <input
                                            type="time"
                                            name="start"
                                            value={selectedEvent?.start
                                                ? (typeof selectedEvent.start === "string"
                                                    ? selectedEvent.start.split('T')[1].substring(0, 5)
                                                    : selectedEvent.start.toISOString().split('T')[1].substring(0, 5))
                                                : ''}
                                            onChange={e => {
                                                const time = e.target.value
                                                const date = selectedEvent?.start
                                                    ? (typeof selectedEvent.start === "string"
                                                        ? selectedEvent.start.split('T')[0]
                                                        : selectedEvent.start.toISOString().split('T')[0])
                                                    : ''
                                                setSelectedEvent({
                                                    ...selectedEvent,
                                                    start: `${date}T${time}:00`
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Hora Fin:</label>
                                        <input
                                            type="time"
                                            name="end"
                                            value={selectedEvent?.end
                                                ? (typeof selectedEvent.end === "string"
                                                    ? selectedEvent.end.split('T')[1].substring(0, 5)
                                                    : selectedEvent.end.toISOString().split('T')[1].substring(0, 5))
                                                : ''}
                                            onChange={e => {
                                                const time = e.target.value
                                                const date = selectedEvent?.end
                                                    ? (typeof selectedEvent.end === "string"
                                                        ? selectedEvent.end.split('T')[0]
                                                        : selectedEvent.end.toISOString().split('T')[0])
                                                    : ''
                                                setSelectedEvent({
                                                    ...selectedEvent,
                                                    end: `${date}T${time}:00`
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Tipo:</label>
                                    <select
                                        name="category"
                                        value={selectedEvent?.category || 'consulta'}
                                        onChange={handleInputChange}
                                    >
                                        <option value="consulta">Consulta general</option>
                                        <option value="vacuna">Vacuna</option>
                                        <option value="emergencia">Emergencia</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Consultorio:</label>
                                    <input
                                        type="text"
                                        name="consultorio"
                                        value={selectedEvent?.lug_ate_cit || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Descripción:</label>
                                    <textarea
                                        name="description"
                                        value={selectedEvent?.description || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </section>
                            <div className="modal-footer">
                                <button className="modal-btn modal-btn-delete" onClick={handleDeleteEvent}>
                                    Eliminar
                                </button>
                                <button className="modal-btn modal-btn-close" onClick={() => setShowEventModal(false)}>
                                    Cerrar
                                </button>
                                <button className="modal-btn modal-btn-confirm" onClick={handleUpdateEvent}>
                                    Guardar Cambios
                                </button>
                            </div>
                        </aside>
                    </aside>
                )}
                <Footer />
            </main>
            {notify && (
                <Notification
                    {...notify}
                />
            )}
        </main>
    )
}