import React from "react"
import { X, Calendar, Clock, User, Stethoscope, MapPin, Phone, FileText } from "lucide-react"
import "../../styles/InterfazCliente/DetalleCita.css"

const DetallesCita = ({ cita, onCerrar }) => {
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const obtenerColorEstado = (estado) => {
    switch (estado) {
      case "confirmada":
        return "#22c55e"
      case "pendiente":
        return "#f59e0b"
      case "cancelada":
        return "#ef4444"
      default:
        return "#64748b"
    }
  }

  const obtenerIconoServicio = (servicio) => {
    switch (servicio.toLowerCase()) {
      case "consulta general":
        return <Stethoscope size={24} />
      case "vacunación":
        return <FileText size={24} />
      case "cirugía":
        return <FileText size={24} />
      default:
        return <FileText size={24} />
    }
  }

  return (
    <div className="overlay-detalles-cita">
      <div className="modal-detalles-cita">
        <div className="header-detalles-cita">
          <div className="titulo-header-detalles">
            {obtenerIconoServicio(cita.servicio)}
            <h3 className="titulo-detalles-cita">Detalles de la Cita</h3>
          </div>
          <button className="boton-cerrar-detalles" onClick={onCerrar}>
            <X size={20} />
          </button>
        </div>

        <div className="contenido-detalles-cita">
          <div className="seccion-principal-detalles">
            <div className="info-servicio-detalles">
              <h2 className="nombre-servicio-detalles">{cita.servicio}</h2>
              <span className="estado-servicio-detalles" style={{ backgroundColor: obtenerColorEstado(cita.estado) }}>
                {cita.estado}
              </span>
            </div>

            <div className="grid-informacion-detalles">
              <div className="seccion-detalles">
                <div className="header-seccion-detalles">
                  <User size={20} color="#00BCD4" />
                  <h4 className="titulo-seccion-detalles">Información del Paciente</h4>
                </div>

                <div className="campos-seccion-detalles">
                  <div className="campo-detalle">
                    <span className="label-detalle">Paciente:</span>
                    <span className="valor-detalle">{cita.mascota}</span>
                  </div>
                  <div className="campo-detalle">
                    <span className="label-detalle">Propietario:</span>
                    <span className="valor-detalle">María González</span>
                  </div>
                  <div className="campo-detalle">
                    <span className="label-detalle">Teléfono:</span>
                    <span className="valor-detalle">+34 612 345 678</span>
                  </div>
                </div>
              </div>

              <div className="seccion-detalles">
                <div className="header-seccion-detalles">
                  <Stethoscope size={20} color="#00BCD4" />
                  <h4 className="titulo-seccion-detalles">Profesional y Lugar</h4>
                </div>

                <div className="campos-seccion-detalles">
                  <div className="campo-detalle">
                    <span className="label-detalle">Veterinario:</span>
                    <span className="valor-detalle">{cita.veterinario}</span>
                  </div>
                  <div className="campo-detalle">
                    <span className="label-detalle">Consultorio:</span>
                    <span className="valor-detalle">Consultorio 2</span>
                  </div>
                  <div className="campo-detalle">
                    <span className="label-detalle">Clínica:</span>
                    <span className="valor-detalle">Pets Heaven</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="seccion-fecha-hora-detalles">
              <div className="header-seccion-detalles">
                <Calendar size={20} color="#00BCD4" />
                <h4 className="titulo-seccion-detalles">Fecha y Horario</h4>
              </div>

              <div className="info-fecha-hora-detalles">
                <div className="fecha-completa-detalles">
                  <Calendar size={16} />
                  <span>{formatearFecha(cita.fecha)}</span>
                </div>
                <div className="hora-detalles">
                  <Clock size={16} />
                  <span>{cita.hora}</span>
                </div>
                <div className="ubicacion-detalles">
                  <MapPin size={16} />
                  <span>Clínica Pets Heaven - Consulta 2</span>
                </div>
                <div className="telefono-detalles">
                  <Phone size={16} />
                  <span>+34 900 123 456</span>
                </div>
              </div>
            </div>

            {cita.motivo && (
              <div className="seccion-motivo-detalles">
                <div className="header-seccion-detalles">
                  <FileText size={20} color="#00BCD4" />
                  <h4 className="titulo-seccion-detalles">Motivo de la Consulta</h4>
                </div>
                <p className="texto-motivo-detalles">{cita.motivo}</p>
              </div>
            )}

            <div className="seccion-instrucciones-detalles">
              <div className="header-seccion-detalles">
                <FileText size={20} color="#00BCD4" />
                <h4 className="titulo-seccion-detalles">Instrucciones</h4>
              </div>
              <div className="lista-instrucciones-detalles">
                <div className="instruccion-detalle">
                  <span className="numero-instruccion">1</span>
                  <span>Llegar 15 minutos antes de la cita</span>
                </div>
                <div className="instruccion-detalle">
                  <span className="numero-instruccion">2</span>
                  <span>Traer cartilla de vacunación</span>
                </div>
                <div className="instruccion-detalle">
                  <span className="numero-instruccion">3</span>
                  <span>Mantener a la mascota en ayunas si es necesario</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-detalles-cita">
          <button className="boton-cerrar-footer-detalles" onClick={onCerrar}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetallesCita
