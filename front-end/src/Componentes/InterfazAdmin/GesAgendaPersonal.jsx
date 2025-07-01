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
import { GetData, ModifyData, PostData} from '../Varios/Requests'
import { errorStatusHandler } from '../Varios/Util'
import { Notification } from '../Global/Notifys'
import { HeaderAdmin } from '../BarrasNavegacion/HeaderAdmin'
import { AuthContext } from '../../Contexts/Contexts'
import AppointmentForm from './FormulariosAdmin/AgendarCita'
// import Footer from '../Varios/Footer2'

// Import styles 
import "../../styles/InterfazAdmin/GesAgendaGeneral.css"

// Función para unir fecha y hora en formato ISO
function joinDateTime(date, time) {
    const cleanDate = date.split('T')[0]
    return `${cleanDate}T${time}`
}

// Component 
export const GesAgendaPersonal = ({ URL = '' }) => {
    // Dynamic vars 
    const [events, setEvents] = useState([])
    const [notify, setNotify] = useState(null)
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [selectedDate, setSelectedDate] = useState('')
    const [lugar, setLugar] = useState('Consultorio')
    const calendarRef = useRef(null)
    const [activeModal, setActiveModal] = useState(null); // null, 'event', o 'create'
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
    const { user } = useContext(AuthContext)


    // Cerrar modal al hacer clic fuera
    useEffect(() => {
    const handleClickOutside = (event) => {
        // Verificar si hay un modal activo
        if (!activeModal) return;
        
        // Verificar clicks fuera del modal de creación
        if (activeModal === 'create' && 
            createModalRef.current && 
            !createModalRef.current.contains(event.target)) {
            closeModal();
        }
        
        // Verificar clicks fuera del modal de evento
        if (activeModal === 'event' && 
            eventModalRef.current && 
            !eventModalRef.current.contains(event.target)) {
            closeModal();
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [activeModal]); // Solo se vuelve a ejecutar cuando activeModal cambia


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

    // Crear citas
    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr);
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
        });
        setActiveModal('create'); // Abrir modal de creación
    };

    // Detalles cita
    const handleEventClick = (info) => {
        info.jsEvent.stopPropagation();
        setSelectedEvent({
            id: info.event.id,
            title: info.event.title,
            start: info.event.start,
            end: info.event.end,
            ...info.event.extendedProps
        });
        setActiveModal('event'); // Abrir modal de evento
    };

    // Actualizar cita existente en el backend
    const handleUpdateEvent = async () => {
        const errors = validateEventFields(selectedEvent);
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) return;
        // Verificar fecha
        const eventDate = new Date(selectedEvent.start)
        const today = new Date()
        today.setHours(0, 0, 0, 0) 

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
    const { name, value } = e.target;
    setNewEvent(prev => ({
        ...prev,
        [name]: value
    }));
    };

    const fetchAppointments = async () => {
        setNotify({
            title: 'Cargando',
            message: 'Cargando citas, por favor espere...',
            load: 1
        })
        try {
            let data = await PostData(`${mainUrl}/by`, { by: user.doc })
            setNotify(null)
            // Normaliza la respuesta a array
            if (data && data.result) {
                data = data.result
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
                    lug_ate_cit: event.nom_con || 'Consultorio',
                    estado: event.est_cit,
                    fotoMascota: event.fot_mas
                }))
                setEvents(mappedEvents)
            }
        } catch (err) {
            setNotify(null)
            const message = errorStatusHandler(err)
            setNotify({
                title: 'Error',
                message: `${message}`,
                close: setNotify
            })
        }
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
                <HeaderAdmin URL={URL} />

                <FullCalendar
                    // Refencia del calendario, permite acceder a la instancia del componente para manipularlo
                    ref={calendarRef}

                    // Plugins utilizados para habilitar características adicionales en el calendario
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}

                    // Deshabilita los dias que ya pasaron
                    validRange={{
                        start: today
                    }}

                    // Configuración de la barra de herramientas del encabezado
                    headerToolbar={{
                        start: "customPrev today customNext buscarPersona",
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
                        },
                        buscarPersona: {
                            text : 'Buscar por Persona',
                            click : () => null
                        }
                    }}

                    events={events}
                    eventClassNames={(event) => [event.event.extendedProps.estado]}

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
                        daysOfWeek: "",
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
                {activeModal === 'create' && (
                    <AppointmentForm 
                        onClose={() => setActiveModal(null)} 
                        URL={URL}
                        date={selectedDate}
                        sended={fetchAppointments}
                    />)}
                {/* Popup para detalles/edición de cita */}
                {activeModal === 'event' && (
                    <aside className="modal-overlay">
                        <aside className="modal-content">
                            <header className="modal-header">
                                <h3>{selectedEvent?.id ? 'Editar Cita' : 'Detalles de la Cita'}</h3>
                                <button className="modal-close-btn" onClick={() => setActiveModal(null)}>
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
                                <button className="modal-btn modal-btn-close" onClick={() => setActiveModal(null)}>
                                    Cerrar
                                </button>
                                <button className="modal-btn modal-btn-confirm" onClick={handleUpdateEvent}>
                                    Guardar Cambios
                                </button>
                            </div>
                        </aside>
                    </aside>
                )}
            </main>
            {notify && (
                <Notification
                    {...notify}
                />
            )}
        </main>
    )
}