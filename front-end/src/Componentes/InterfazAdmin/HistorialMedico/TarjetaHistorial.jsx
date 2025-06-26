import React from "react"
import { Calendar, User, FileText } from "lucide-react"
import "../../../styles/InterfazAdmin/HistorialMedico/TarjetaHistorial.css"

export default function TarjetaHistorial({ record, onClick }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completada":
        return "completada-tarj"
      case "Pendiente":
        return "pendiente-tarj"
      case "Cancelada":
        return "cancelada-tarj"
      default:
        return "normal-tarj"
    }
  }

  return (
    <div className="contenedor-tarj" onClick={() => onClick(record)}>
      <div className="contenido-tarj">
        <div className="cabecera-tarj">
          <div className="info-basica-tarj">
            <div className="icono-tarj">
              <FileText className="ico-archivo-tarj" />
            </div>
            <div className="datos-tarj">
              <h3 className="titulo-tarj">{record.type}</h3>
              <p className="fecha-tarj">
                <Calendar className="ico-fecha-tarj" />
                {record.date} - {record.time}
              </p>
            </div>
          </div>
          <span className={`estado-tarj ${getStatusColor(record.status)}`}>
            {record?.status}
          </span>
        </div>

        <div className="detalles-tarj">
          <div className="vet-tarj">
            <User className="ico-vet-tarj" />
            <span className="nombre-vet-tarj">{record.veterinarian}</span>
          </div>

          <div className="seccion-tarj">
            <p className="etiqueta-tarj">Diagnóstico:</p>
            <p className="valor-tarj">{record.diagnosis}</p>
          </div>

          <div className="seccion-tarj">
            <p className="etiqueta-tarj">Tratamiento:</p>
            <p className="valor-tarj">{record.treatment}</p>
          </div>

          {record.notes && (
            <div className="seccion-tarj">
              <p className="etiqueta-tarj">Notas:</p>
              <p className="valor-tarj">{record.notes}</p>
            </div>
          )}
        </div>

        <div className="pie-tarj">
          <p className="enlace-tarj">Clic para ver detalles completos →</p>
        </div>
      </div>
    </div>
  )
}
