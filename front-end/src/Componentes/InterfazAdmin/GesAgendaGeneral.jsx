// Librarys 
import React, { useState, useRef, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import esLocale from "@fullcalendar/core/locales/es"

// Imports 
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { GetData } from '../Varios/Requests'

// Import styles 
import "./prueba.css"

// Component 
export const GesAgendaGeneral = ({ URL = '' }) => {
    // Dynamic vars 
    const [app,setApp] = useState()
    const mainUrl = `${URL}/user`

    // Functions
    const GetAppointments = async () => {
        const token = localStorage.getItem("token")
        try {
            if (token){
                const data = await GetData(`${mainUrl}/calendar/general`,token)
                console.log(data)
                setApp(data)
            } else navigate('/user/login')
        } catch (err) {
            if (err.status) {
            const message = errorStatusHandler(err.status)
            swal({
                title: "Error",
                text: message,
                icon: "error",
                button: "Aceptar"
            })
            if(err.status === 403) {
                setTimeout(() => {
                    Logout()
                }, 2000)
            }
            } else console.log(err)
        }
    }

    //Dia de hoy
    const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

    //Eventos solo de prueba
    const [events, setEvents] = useState([
        {
            id: '1',
            title: 'Vacunación de Perro',
            start: '2025-05-22T10:30:00',
            end: '2025-05-22T11:00:00',
            description: 'Vacunación anual contra la rabia',
            category: 'vacuna',
            paciente: 'Max (Golden Retriever)',
            propietario: 'Juan Pérez',
            telefono: '555-1234'
        },
        {
            id: '2',
            title: 'Vacunación de Perro',
            start: '2025-05-22T11:30:00',
            end: '2025-05-22T12:00:00',
            description: 'Vacunación anual contra la rabia',
            category: 'consulta',
            paciente: 'Max (Golden Retriever)',
            propietario: 'Juan Pérez',
            telefono: '555-1234'
        },
        {
            id: '3',
            title: 'Vacunación de Perro',
            start: '2025-05-22T12:30:00',
            end: '2025-05-22T13:00:00',
            description: 'Vacunación anual contra la rabia',
            category: 'emergencia',
            paciente: 'Max (Golden Retriever)',
            propietario: 'Juan Pérez',
            telefono: '555-1234'
        },
        {
            id: '4',
            title: 'Vacunación de Perro',
            start: '2025-05-22T12:30:00',
            end: '2025-05-22T13:00:00',
            description: 'Vacunación anual contra la rabia',
            category: 'emergencia',
            paciente: 'Max (Golden Retriever)',
            propietario: 'Juan Pérez',
            telefono: '555-1234'
        }
    ])

    //Mes actual
    const [mesActual, setMesActual] = useState('')
    //Vista Actual del usuario
    const [currentView, setCurrentView] = useState('dayGridMonth')
    //Mostrar la descripcion en un pop up de la cita
    const [showEventModal, setShowEventModal] = useState(false)
    //Mostrar el pop up de creacion de Cita
    const [showCreateModal, setShowCreateModal] = useState(false)
    //Evento seleccionado
    const [selectedEvent, setSelectedEvent] = useState(null)
    //Nuevo evento
    const [newEvent, setNewEvent] = useState({
        title: '',
        start: '',
        end: '',
        description: '',
        category: 'consulta',
        paciente: '',
        propietario: '',
        telefono: ''
    })
    //Fecha
    const [selectedDate, setSelectedDate] = useState('')
    const calendarRef = useRef(null)


    //Funcion para cambiar entre meses
    const navigate = (action) => {
        const calendarApi = calendarRef.current.getApi()
        switch (action) {
            case 'prev':
                calendarApi.prev()
                break
            case 'next':
                calendarApi.next()
                break
            case 'today':
                calendarApi.today()
                break
            default:
                break
        }
        // Actualizar el mes actual después de navegar
        const mes = calendarApi.view.title.split(' ')[0]
        setMesActual(mes)
    }

    // Cambiar vista del calendario
    const changeView = (view) => {
        const calendarApi = calendarRef.current.getApi()
        calendarApi.changeView(view)
        setCurrentView(view)
    }

    // Mostrar popup para crear cita
    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr)
        setNewEvent({
            title: '',
            start: `${arg.dateStr}T09:00:00`,
            end: `${arg.dateStr}T10:00:00`,
            description: '',
            category: 'consulta',
            paciente: '',
            propietario: '',
            telefono: ''
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

    // Crear nueva cita
    const handleCreateEvent = () => {
        if (!newEvent.title) {
            alert('El título es requerido')
            return
        }

        const eventToAdd = {
            id: Date.now().toString(),
            ...newEvent
        }

        setEvents([...events, eventToAdd])
        setShowCreateModal(false)
    }

    // Actualizar cita existente
    const handleUpdateEvent = () => {
        setEvents(events.map(event => 
            event.id === selectedEvent.id ? selectedEvent : event
        ))
        setShowEventModal(false)
    }

    // Eliminar cita
    const handleDeleteEvent = () => {
        if (window.confirm(`¿Eliminar la cita "${selectedEvent.title}"?`)) {
            setEvents(events.filter(event => event.id !== selectedEvent.id))
            setShowEventModal(false)
        }
    }

    // Manejar cambios en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target
        if (showCreateModal) {
            setNewEvent({...newEvent, [name]: value})
        } else {
            setSelectedEvent({...selectedEvent, [name]: value})
        }
    }

    return (
        <div className="calendar-container">
            <NavBarAdmin />
            <div className='calendar-container' id='main-container-calendar'>
                
            <FullCalendar
                // Refencia del calendario, permite acceder a la instancia del componente para manipularlo
                ref={calendarRef}

                // Plugins utilizados para habilitar características adicionales en el calendario
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                
                // Vista inicial del calendario (se puede cambiar dinámicamente)
                initialView={currentView}

                // Deshabilita los dias que ya pasaron 
                validRange={{
                    start:today
                }}

                // Configuración de la barra de herramientas del encabezado
                headerToolbar={{
                    start: "prev today next",  // Botones para navegar entre fechas
                    center: "title",           // Título del calendario
                    end: "dayGridMonth dayGridWeek dayGridDay listWeek"  // Vistas disponibles: mes, semana, lista
                }}
                
                // Eventos del calendario, se mapea para añadir clases personalizadas
                events={events.map(event => ({
                    ...event,
                    classNames: [event.category] 
                }))}

                // Permite la selección de fechas o rangos de fechas
                selectable={true}

                // Función que se ejecuta al hacer clic en una fecha
                dateClick={handleDateClick}

                // Función que se ejecuta al hacer clic en un evento
                eventClick={handleEventClick}

                // Habilita la edición de los eventos: mover, redimensionar, eliminar
                editable={true}

                // Texto que aparece cuando hay más eventos de los que se pueden mostrar en un día
                moreLinkText={`Ver más`}

                // Altura del calendario, ajustada para ocupar el espacio restante de la ventana
                height="calc(100vh - 120px)"

                // Muestra una línea indicadora para la hora actual
                nowIndicator={true}

                // Configura la hora mínima visible en las vistas basadas en tiempo
                slotMinTime="06:00:00" 

                // Configura la hora máxima visible en las vistas basadas en tiempo
                slotMaxTime="19:00:00" 

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
                    endTime: "18:00"                 // Finaliza a las 6:00 PM
                }}

                // Permite la interactividad de los eventos (clics, drag-and-drop, etc.)
                eventInteractive={true}

                views={{
                    dayGridDay: { dayMaxEvents: false }, // Sin límite de eventos en la vista de día
                    dayGridMonth: { dayMaxEvents: 2 } ,   // Límite de 2 eventos solo en la vista de mes
                    dayGridWeek: { dayMaxEvents: false} // Limite de eventos deshabilitado en semana
                }}

                // Función que personaliza el contenido de los eventos en el calendario
                eventContent={(eventInfo) => (
                    <div className={`fc-event-content ${eventInfo.event.extendedProps.category}`}>
                    <div className="fc-event-time">
                        {eventInfo.timeText}  {/* Muestra la hora del evento */}
                    </div>
                    <div className="fc-event-title">
                        {eventInfo.event.title}  {/* Título del evento */}
                    </div>
                    <div className="fc-event-patient">
                        {eventInfo.event.extendedProps.paciente}  {/* Información personalizada del evento */}
                    </div>
                    </div>
                )}
                />

            {/* Popup para crear nueva cita */}
            {showCreateModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Nueva Cita</h3>
                            <button className="modal-close-btn" onClick={() => setShowCreateModal(false)}>
                                X
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Título:</label>
                                <input 
                                    type="text" 
                                    name="title" 
                                    value={newEvent.title}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Paciente:</label>
                                <input 
                                    type="text" 
                                    name="paciente" 
                                    value={newEvent.paciente}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Propietario:</label>
                                <input 
                                    type="text" 
                                    name="propietario" 
                                    value={newEvent.propietario}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Teléfono:</label>
                                <input 
                                    type="text" 
                                    name="telefono" 
                                    value={newEvent.telefono}
                                    onChange={handleInputChange}
                                />
                            </div>
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
                                <label>Tipo:</label>
                                <select 
                                    name="category" 
                                    value={newEvent.category}
                                    onChange={handleInputChange}
                                >
                                    <option value="consulta">Consulta</option>
                                    <option value="vacuna">Vacuna</option>
                                    <option value="emergencia">Emergencia</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Descripción:</label>
                                <textarea 
                                    name="description" 
                                    value={newEvent.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-btn modal-btn-close" onClick={() => setShowCreateModal(false)}>
                                Cancelar
                            </button>
                            <button className="modal-btn modal-btn-confirm" onClick={handleCreateEvent}>
                                Crear Cita
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Popup para detalles/edición de cita */}
            {showEventModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>{selectedEvent?.id ? 'Editar Cita' : 'Detalles de la Cita'}</h3>
                            <button className="modal-close-btn" onClick={() => setShowEventModal(false)}>
                                X
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Título:</label>
                                <input 
                                    type="text" 
                                    name="title" 
                                    value={selectedEvent?.title || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Paciente:</label>
                                <input 
                                    type="text" 
                                    name="paciente" 
                                    value={selectedEvent?.paciente || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Propietario:</label>
                                <input 
                                    type="text" 
                                    name="propietario" 
                                    value={selectedEvent?.propietario || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Teléfono:</label>
                                <input 
                                    type="text" 
                                    name="telefono" 
                                    value={selectedEvent?.telefono || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Fecha y Hora:</label>
                                <div>
                                    {selectedEvent?.start?.toLocaleDateString()} 
                                    {selectedEvent?.start?.toLocaleTimeString()} - 
                                    {selectedEvent?.end?.toLocaleTimeString()}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Tipo:</label>
                                <select 
                                    name="category" 
                                    value={selectedEvent?.category || 'consulta'}
                                    onChange={handleInputChange}
                                >
                                    <option value="consulta">Consulta</option>
                                    <option value="vacuna">Vacuna</option>
                                    <option value="emergencia">Emergencia</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Descripción:</label>
                                <textarea 
                                    name="description" 
                                    value={selectedEvent?.description || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
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
                    </div>
                </div>
            )}            
        </div>
        </div>            
    )
}