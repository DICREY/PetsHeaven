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

// Import styles 
import "./prueba.css"

// Component 
export const GesAgendaGeneral = () => {

    //Eventos solo de prueba
    const [events, setEvents] = useState([
        {
            id: '1',
            title: 'Vacunación de Perro',
            start: '2025-04-22T10:30:00',
            end: '2025-04-22T11:00:00',
            description: 'Vacunación anual contra la rabia',
            category: 'vacuna',
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
                
            <div className="calendar-controls">
                <div className="navigation-buttons">
                    <button onClick={() => navigate('today')}>Hoy</button>
                    <button onClick={() => navigate('prev')}>&lt</button>
                    <button onClick={() => navigate('next')}>&gt</button>
                </div>
                <h2>{mesActual}</h2>
                <div className="view-buttons">
                    <button 
                        onClick={() => changeView('dayGridMonth')}
                        className={currentView === 'dayGridMonth' ? 'active' : ''}
                    >
                        Mes
                    </button>
                    <button 
                        onClick={() => changeView('timeGridWeek')}
                        className={currentView === 'timeGridWeek' ? 'active' : ''}
                    >
                        Semana
                    </button>
                    <button 
                        onClick={() => changeView('timeGridDay')}
                        className={currentView === 'timeGridDay' ? 'active' : ''}
                    >
                        Día
                    </button>
                    <button 
                        onClick={() => changeView('listDay')}
                        className={currentView === 'listDay' ? 'active' : ''}
                    >
                        Lista
                    </button>
                </div>
            </div>

            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView={currentView}
                headerToolbar={false}
                events={events.map(event => ({
                    ...event,
                    classNames: [event.category]
                }))}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                editable={true}
                dayMaxEvents={3}
                moreLinkText={`Ver mas`}
                height="calc(100vh - 120px)"
                nowIndicator={true}
                slotMinTime="08:00:00"
                slotMaxTime="20:00:00"
                slotDuration="00:30:00"
                locales={[esLocale]}
                locale="es"
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                }}
                eventContent={(eventInfo) => (
                    <div className={`fc-event-content ${eventInfo.event.extendedProps.category}`}>
                        <div className="fc-event-time">
                            {eventInfo.timeText}
                        </div>
                        <div className="fc-event-title">
                            {eventInfo.event.title}
                        </div>
                        <div className="fc-event-patient">
                            {eventInfo.event.extendedProps.paciente}
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
                                &times
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
                                &times
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