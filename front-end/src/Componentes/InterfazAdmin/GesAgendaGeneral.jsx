// Librarys 
import React, { useState, useRef, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import esLocale from "@fullcalendar/core/locales/es"
import axios from 'axios'


// Imports 
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { GetData, PostData, ModifyData } from '../Varios/Requests'
import { errorStatusHandler } from '../Varios/Util'
import { Notification } from '../Global/Notifys'
import { searchFilter } from '../Varios/Util'
import HeaderUser from '../BarrasNavegacion/HeaderUser'

// Import styles 
import "../../styles/InterfazAdmin/GesAgendaGeneral.css"
import Footer from '../Varios/Footer2'

// Función para unir fecha y hora en formato ISO
function joinDateTime(date, time) {
    const cleanDate = date.split('T')[0]
    return `${cleanDate}T${time}`
}

// Component 
export const GesAgendaGeneral = ({ URL = 'http://localhost:3000' }) => {
    // Dynamic vars 
    const [events, setEvents] = useState([])
    const [notify, setNotify] = useState(null)
    const [currentView, setCurrentView] = useState('dayGridMonth')
    const [showEventModal, setShowEventModal] = useState(false) //Mostrar la descripcion en un pop up de la cita
    const [showCreateModal, setShowCreateModal] = useState(false) //Mostrar el pop up de creacion de Cita
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [selectedDate, setSelectedDate] = useState('')
    const [lugar, setLugar] = useState('Consultorio');
    const calendarRef = useRef(null)
    const [allPacientes, setAllPacientes] = useState([]); // Todos los pacientes
    const [filteredPacientes, setFilteredPacientes] = useState([]); // Resultados filtrados
    const [showPacientesDropdown, setShowPacientesDropdown] = useState(false); // Controlar dropdown
    const [newEvent, setNewEvent] = useState({
        title: '',
        start: '',
        end: '',
        description: '',
        category: 'consulta',
        paciente: '',
        propietario: '',
        lug_ate_cit: 'Consultorio',
        telefono: '',
        estado: 'PENDIENTE',
        mas_cit: '' 
    })
    const createModalRef = useRef(null);
    const eventModalRef = useRef(null);

    // Cerrar modal al hacer clic fuera
    useEffect(() => {
        function handleClickOutside(event) {
            if (showCreateModal && createModalRef.current && !createModalRef.current.contains(event.target)) {
                setShowCreateModal(false);
            }
            if (showEventModal && eventModalRef.current && !eventModalRef.current.contains(event.target)) {
                setShowEventModal(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showCreateModal, showEventModal]);


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

    // const [events, setEvents] = useState([
    //         {
    //             id: '1',
    //             title: 'Vacunación de Perro',
    //             start: '2025-05-22T10:30:00',
    //             end: '2025-05-22T11:00:00',
    //             description: 'Vacunación anual contra la rabia',
    //             category: 'vacuna',
    //             paciente: 'Max (Golden Retriever)',
    //             propietario: 'Juan Pérez',
    //             telefono: '555-1234'
    //         }
    // ])


    const fetchPacientes = async () => {
        const token = localStorage.getItem("token");
        try {
            const data = await GetData(`${URL}/pet/all`, token); // Ajusta el endpoint
            if (data) setAllPacientes(data);
        } catch (err) {
            console.error("Error al cargar pacientes:", err);
        }
    };

    // Crear citas
    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr);
        fetchPacientes(); // Cargar pacientes cuando se abre el modal
        setNewEvent({
            title: '',
            start: `${arg.dateStr}T09:00:00`,
            end: `${arg.dateStr}T10:00:00`,
            description: '',
            category: 'consulta',
            paciente: '',
            propietario: '',
            lug_ate_cit: 'Consultorio',
            telefono: '',
            estado: 'PENDIENTE'
        });
        setShowCreateModal(true);
    };

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
        if (!newEvent.title) {
            alert('El título es requerido')
            return
        }

        const token = localStorage.getItem("token")
        console.log(token)
        try {
            const citaData = {
                fec_reg_cit: new Date().toISOString().split('T')[0],
                fec_cit: newEvent.start.split('T')[0],
                hor_ini_cit: newEvent.start.split('T')[1],
                hor_fin_cit: newEvent.end.split('T')[1],
                lug_ate_cit: lugar,
                ser_cit: 1,
                vet_cit: 1, 
                mas_cit: newEvent.mas_cit, 
                estado: 'PENDIENTE'
            }
            await axios.post(`${mainUrl}/register`, citaData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'x-api-key': 'pets_heaven_vite',
                            'user': 'admin', 
                            'roles': 'Administrador', 
                            'accept': 'application/json'
                        }
                    });
            setShowCreateModal(false)
            // Refresca las citas
            fetchAppointments()
        } catch (err) {
            alert('Error al crear la cita')
        }
    }

    // Actualizar cita existente en el backend
    const handleUpdateEvent = async () => {
        const token = localStorage.getItem("token")
        try {
            const citaData = {
                id_cit: selectedEvent.id,
                mas_cit: selectedEvent.id_mas, 
                fec_cit: typeof selectedEvent.start === "string" ? selectedEvent.start.split('T')[0] : selectedEvent.start.toISOString().split('T')[0],
                hor_ini_cit: typeof selectedEvent.start === "string" ? selectedEvent.start.split('T')[1] : selectedEvent.start.toISOString().split('T')[1],
                hor_fin_cit: typeof selectedEvent.end === "string" ? selectedEvent.end.split('T')[1] : selectedEvent.end.toISOString().split('T')[1],
                lug_ate_cit: "Consultorio" 
            }
            await axios.put(`${mainUrl}/modify`, citaData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'x-api-key': 'pets_heaven_vite',
                            'user': 'admin', 
                            'roles': 'Administrador', 
                            'accept': 'application/json'
                        }
                    });            
            setShowEventModal(false)
            fetchAppointments()
        } catch (err) {
            alert('Error al actualizar la cita')
        }
    }

    // Cancelar cita en el backend
    const handleDeleteEvent = async () => {
        if (!window.confirm(`¿Eliminar la cita "${selectedEvent.title}"?`)) return
        const token = localStorage.getItem("token")
        try {
            const citaData = {
                id_cit: selectedEvent.id,
                mas_cit: 1 // Ajusta según tu lógica
            }
            await ModifyData(`${mainUrl}/cancel`, citaData, token)
            setShowEventModal(false)
            fetchAppointments()
        } catch (err) {
            alert('Error al cancelar la cita')
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
        const token = localStorage.getItem("token")
        setNotify({
            title: 'Cargando',
            message: 'Cargando citas, por favor espere...',
            load: 1
        })
        try {
            let data = await GetData(`${mainUrl}/general`, token)
            setNotify(null)
            // Normaliza la respuesta a array
            if (data && !Array.isArray(data)) {
                data = [data]
            }
            if (data) {
                const mappedEvents = data.map(event => ({
                    id: event.id_cit,
                    title: event.nom_ser,
                    start: joinDateTime(event.fec_cit, event.hor_ini_cit),
                    end: joinDateTime(event.fec_cit, event.hor_fin_cit),
                    description: event.des_ser,
                    category: event.nom_ser || 'vacuna',
                    paciente: event.nom_mas,
                    propietario: `${event.nom_per} ${event.ape_per}`,
                    lug_ate_cit: event.lug_ate_cit || 'Consultorio',
                    telefono: event.cel_per,
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
            } 
            else console.error(err)
            // Manejo de error
        }
    }



    return (
        <main className="calendar-container">
            <NavBarAdmin />
            <main className='calendar-container' id='main-container-calendar'>
            <HeaderUser openHelp={() => setTabHelp(true)}/>

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
                        start: "prev today next",  // Botones para navegar entre fechas
                        center: "title",           // Título del calendario
                        end: "dayGridMonth dayGridWeek dayGridDay listWeek"  // Vistas disponibles: mes, semana, lista
                    }}

                    events={events}
                    eventClassNames={(event) => [event.event.extendedProps.category]}

                    // Permite la selección de fechas o rangos de fechas
                    selectable={true}

                    // Función que se ejecuta al hacer clic en una fecha
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}

                    // Habilita la edición de los eventos: mover, redimensionar, eliminar
                    editable={true}

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
                        dayGridMonth: { dayMaxEvents: 2 },   // Límite de 2 eventos solo en la vista de mes
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
                                    <div className="paciente-autocomplete">
                                        <input
                                            type="text"
                                            name="paciente"
                                            value={newEvent.paciente}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setNewEvent({ ...newEvent, paciente: value });
                                                searchFilter(
                                                    value,
                                                    allPacientes,
                                                    ['nom_mas', 'nom_per', 'ape_per'], // Campos a buscar
                                                    setFilteredPacientes
                                                );
                                                setShowPacientesDropdown(value.length > 0);
                                            }}
                                            onFocus={() => setShowPacientesDropdown(newEvent.paciente.length > 0)}
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
                                                            console.log(paciente.id_mas)
                                                            );
                                                            setShowPacientesDropdown(false);
                                                        }}
                                                    >
                                                        {paciente.nom_mas} ({paciente.nom_per} {paciente.ape_per})
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
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
                                        <option value="consulta">Consulta general</option>
                                        <option value="vacuna">Vacuna</option>
                                        <option value="emergencia">Emergencia</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Lugar de atención:</label>
                                    <input
                                        type="text"
                                        name="lugar"
                                        value={lugar}
                                        onChange={e => setLugar(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Descripción:</label>
                                    <textarea
                                        name="description"
                                        value={newEvent.description}
                                        onChange={handleInputChange}
                                    />
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
                <Footer/>
            </main>
            {notify && (
                <Notification
                    {...notify}
                />
            )}
        </main>
    )
}