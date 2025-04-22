// Librarys 
import React, { useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
// import "./prueba.css";

export const GesAgendaGeneral = () => {
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
        },
        {
            id: '2',
            title: 'Cita de Emergencia',
            start: '2025-04-23T14:00:00',
            end: '2025-04-23T15:00:00',
            description: 'Herida en pata delantera',
            category: 'emergencia',
            paciente: 'Luna (Pastor Alemán)',
            propietario: 'María Gómez',
            telefono: '555-5678'
        }
    ]);

    const [currentView, setCurrentView] = useState('dayGridMonth');
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const calendarRef = useRef(null);

    // Cambiar vista del calendario
    const changeView = (view) => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.changeView(view);
        setCurrentView(view);
    };

    // Mostrar detalles del evento
    const handleEventClick = (info) => {
        setSelectedEvent({
            title: info.event.title,
            start: info.event.start,
            end: info.event.end,
            ...info.event.extendedProps
        });
        setShowModal(true);
    };

    // Crear nueva cita
    const handleDateClick = (arg) => {
        const title = prompt('Título de la cita:');
        if (title) {
            const startTime = prompt('Hora de inicio (HH:MM):', '09:00');
            const endTime = prompt('Hora de fin (HH:MM):', '10:00');
            
            const newEvent = {
                id: Date.now().toString(),
                title,
                start: `${arg.dateStr}T${startTime}:00`,
                end: `${arg.dateStr}T${endTime}:00`,
                description: prompt('Descripción:') || '',
                category: prompt('Tipo (vacuna/emergencia/consulta):') || 'consulta',
                paciente: prompt('Nombre del paciente:') || '',
                propietario: prompt('Nombre del propietario:') || '',
                telefono: prompt('Teléfono de contacto:') || ''
            };
            
            setEvents([...events, newEvent]);
        }
    };

    // Eliminar cita
    const handleDeleteEvent = () => {
        if (window.confirm(`¿Eliminar la cita "${selectedEvent.title}"?`)) {
            setEvents(events.filter(event => event.id !== selectedEvent.id));
            setShowModal(false);
        }
    };

    return (
        <div className="calendar-container">
            <h2>Calendario de Citas Veterinarias</h2>
            
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
                    Lista Diaria
                </button>
            </div>

            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView={currentView}
                headerToolbar={false}
                events={events.map(event => ({
                    ...event,
                    classNames: [event.category] // Esto es lo importante que se había perdido
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

            {/* Modal personalizado */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Detalles de la Cita</h3>
                            <button 
                                className="modal-close-btn"
                                onClick={() => setShowModal(false)}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            {selectedEvent && (
                                <div className="event-details">
                                    <h4>{selectedEvent.title}</h4>
                                    <p><strong>Paciente:</strong> {selectedEvent.paciente}</p>
                                    <p><strong>Propietario:</strong> {selectedEvent.propietario}</p>
                                    <p><strong>Teléfono:</strong> {selectedEvent.telefono}</p>
                                    <p><strong>Fecha y Hora:</strong> {selectedEvent.start.toLocaleString()} - {selectedEvent.end.toLocaleTimeString()}</p>
                                    <p><strong>Tipo:</strong> {selectedEvent.category}</p>
                                    <p><strong>Descripción:</strong> {selectedEvent.description}</p>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button 
                                className="modal-btn modal-btn-close"
                                onClick={() => setShowModal(false)}
                            >
                                Cerrar
                            </button>
                            <button 
                                className="modal-btn modal-btn-delete"
                                onClick={handleDeleteEvent}
                            >
                                Eliminar Cita
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Outlet />

        </div>
    );
};