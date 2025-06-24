import React from "react"
import { Calendar, MapPin, Phone, Clock, AlertCircle } from "lucide-react"
import "../../../styles/InterfazAdmin/HistorialMedico/ModalDetalleCita.css"

export default function ModalDetalleCita({ isOpen, onClose, appointment }) {
  if (!appointment) return null

  if (!isOpen) return null

  return (
    <div className="overlay-detalle-cita">
      <div className="fondo-detalle-cita" onClick={onClose}></div>
      <div className="contenedor-detalle-cita">
        <div className="cabecera-detalle-cita">
          <div className="info-detalle-cita">
            <div>
              <h2 className="titulo-detalle-cita">
                <Calendar className="ico-detalle-cita" />
                {appointment.type}
              </h2>
              <div className="estado-detalle-cita">
                <span
                  className={`badge-estado-cita ${
                    appointment.status === "confirmed" ? "confirmada-detalle" : "pendiente-detalle"
                  }`}
                >
                  {appointment.status === "confirmed" ? "Confirmada" : "Pendiente"}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="btn-cerrar-detalle">
              ×
            </button>
          </div>
        </div>

        <div className="contenido-detalle-cita">
          {/* Información de la cita */}
          <div className="seccion-info-cita">
            <h3 className="titulo-seccion-cita">
              <Clock className="ico-seccion-cita" />
              Información de la Cita
            </h3>
            <div className="datos-info-cita">
              <div className="campo-info-cita">
                <p className="etiqueta-info-cita">Fecha</p>
                <p className="valor-info-cita">{appointment.date}</p>
              </div>
              <div className="campo-info-cita">
                <p className="etiqueta-info-cita">Hora</p>
                <p className="valor-info-cita">{appointment.time}</p>
              </div>
              <div className="campo-info-cita">
                <p className="etiqueta-info-cita">Veterinario</p>
                <p className="valor-info-cita">{appointment.veterinarian}</p>
              </div>
              <div className="campo-info-cita">
                <p className="etiqueta-info-cita">Especialidad</p>
                <p className="valor-info-cita">{appointment.specialty}</p>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="seccion-desc-cita">
            <h3 className="titulo-seccion-cita">Descripción</h3>
            <p className="texto-desc-cita">{appointment.description}</p>
          </div>

          {/* Ubicación y contacto */}
          <div className="seccion-ubicacion-cita">
            <h3 className="titulo-seccion-cita">
              <MapPin className="ico-ubicacion-cita" />
              Ubicación y Contacto
            </h3>
            <div className="datos-ubicacion-cita">
              <div className="item-ubicacion-cita">
                <MapPin className="ico-item-cita" />
                <span className="texto-ubicacion-cita">{appointment.location}</span>
              </div>
              <div className="item-ubicacion-cita">
                <Phone className="ico-item-cita" />
                <span className="texto-ubicacion-cita">{appointment.clinicPhone}</span>
              </div>
            </div>
          </div>

          {/* Notas y preparación */}
          {(appointment.notes || appointment.preparation) && (
            <div className="seccion-instrucciones-cita">
              <h3 className="titulo-seccion-cita">
                <AlertCircle className="ico-instrucciones-cita" />
                Instrucciones
              </h3>
              {appointment.notes && (
                <div className="item-instruccion-cita">
                  <p className="etiqueta-instruccion-cita">Notas:</p>
                  <p className="texto-instruccion-cita">{appointment.notes}</p>
                </div>
              )}
              {appointment.preparation && (
                <div className="item-instruccion-cita">
                  <p className="etiqueta-instruccion-cita">Preparación:</p>
                  <p className="texto-instruccion-cita">{appointment.preparation}</p>
                </div>
              )}
            </div>
          )}

          {/* Confirmación requerida */}
          {appointment.confirmationRequired && (
            <div className="seccion-confirmacion-cita">
              <div className="cabecera-confirmacion-cita">
                <AlertCircle className="ico-confirmacion-cita" />
                <p className="titulo-confirmacion-cita">Confirmación requerida</p>
              </div>
              <p className="texto-confirmacion-cita">
                Esta cita requiere confirmación. Por favor, contacte a la clínica.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
