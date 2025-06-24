import React from "react"
import { Calendar, Plus, Edit, Trash2, Clock } from "lucide-react"
import "../../../styles/InterfazAdmin/HistorialMedico/ModalProximasCitas.css"

export default function ModalProximasCitas({
  isOpen,
  onClose,
  appointments,
  onAddAppointment,
  onEditAppointment,
  onDeleteAppointment,
  onAppointmentClick,
}) {
  if (!isOpen) return null

  return (
    <div className="overlay-modal-citas">
      <div className="fondo-modal-citas" onClick={onClose}></div>
      <div className="contenedor-modal-citas">
        <div className="cabecera-modal-citas">
          <div className="info-modal-citas">
            <div>
              <h2 className="titulo-modal-citas">
                <Calendar className="ico-titulo-citas" />
                Próximas Citas
              </h2>
              <p className="desc-modal-citas">Gestionar citas programadas</p>
            </div>
            <div className="acciones-modal-citas">
              <button onClick={onAddAppointment} className="btn-nueva-cita">
                <Plus className="ico-btn-citas" />
                Nueva Cita
              </button>
              <button onClick={onClose} className="btn-cerrar-citas">
                ×
              </button>
            </div>
          </div>
        </div>

        <div className="contenido-modal-citas">
          <div className="lista-citas-modal">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="tarjeta-cita-modal">
                <div className="contenido-cita-modal">
                  <div className="info-cita-modal" onClick={() => onAppointmentClick(appointment)}>
                    <div className="cabecera-cita-modal">
                      <Clock className="ico-cita-modal" />
                      <h3 className="titulo-cita-modal">{appointment.type}</h3>
                      <span
                        className={`estado-cita-modal ${
                          appointment.status === "confirmed" ? "confirmada-cita" : "pendiente-cita"
                        }`}
                      >
                        {appointment.status === "confirmed" ? "Confirmada" : "Pendiente"}
                      </span>
                    </div>
                    <div className="detalles-cita-modal">
                      <div className="col-cita-modal">
                        <p className="dato-cita-modal">
                          <span className="etiqueta-cita-modal">Fecha:</span> {appointment.date}
                        </p>
                        <p className="dato-cita-modal">
                          <span className="etiqueta-cita-modal">Hora:</span> {appointment.time}
                        </p>
                        <p className="dato-cita-modal">
                          <span className="etiqueta-cita-modal">Veterinario:</span> {appointment.veterinarian}
                        </p>
                      </div>
                      <div className="col-cita-modal">
                        <p className="dato-cita-modal">
                          <span className="etiqueta-cita-modal">Especialidad:</span> {appointment.specialty}
                        </p>
                        <p className="dato-cita-modal">
                          <span className="etiqueta-cita-modal">Ubicación:</span> {appointment.location}
                        </p>
                      </div>
                    </div>
                    <p className="desc-cita-modal">{appointment.description}</p>
                    {appointment.notes && (
                      <p className="nota-cita-modal">
                        <span className="etiqueta-nota-cita">Nota:</span> {appointment.notes}
                      </p>
                    )}
                  </div>
                  <div className="acciones-cita-modal">
                    <button onClick={() => onEditAppointment(appointment)} className="btn-editar-cita">
                      <Edit className="ico-accion-cita" />
                    </button>
                    <button onClick={() => onDeleteAppointment(appointment)} className="btn-eliminar-cita">
                      <Trash2 className="ico-accion-cita" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
