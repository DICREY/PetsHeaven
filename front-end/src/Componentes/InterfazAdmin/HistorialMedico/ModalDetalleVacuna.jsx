import React from "react"
import { Shield, FileText, Info, Calendar } from "lucide-react"
import "../../../styles/InterfazAdmin/HistorialMedico/ModalDetalleVacuna.css"

export default function ModalDetalleVacuna({ isOpen, onClose, vaccine }) {
  if (!vaccine) return null

  if (!isOpen) return null

  return (
    <div className="overlay-modal-vac">
      <div className="fondo-modal-vac" onClick={onClose}></div>
      <div className="contenedor-modal-vac">
        <div className="cabecera-modal-vac">
          <div className="info-modal-vac">
            <div>
              <h2 className="titulo-modal-vac">
                <Shield className="ico-titulo-vac" />
                {vaccine.name}
              </h2>
              <div className="badges-modal-vac">
                <span className="badge-id-vac">{vaccine.id}</span>
                <span className="badge-cat-vac">{vaccine.category}</span>
              </div>
            </div>
            <button onClick={onClose} className="btn-cerrar-modal-vac">
              ×
            </button>
          </div>
        </div>

        <div className="contenido-modal-vac">
          {/* Información de aplicación */}
          <div className="seccion-aplicacion-vac">
            <div className="cabecera-seccion-vac">
              <h3 className="titulo-seccion-vac">
                <Calendar className="ico-fecha-vac" />
                Información de Aplicación
              </h3>
            </div>
            <div className="contenido-seccion-vac">
              <div className="datos-aplicacion-vac">
                <div className="item-aplicacion-vac">
                  <h4 className="etiqueta-aplicacion-vac">Última aplicación</h4>
                  <p className="valor-aplicacion-vac">{vaccine.date}</p>
                </div>
                <div className="item-aplicacion-vac">
                  <h4 className="etiqueta-aplicacion-vac">Próxima dosis</h4>
                  <p className="valor-aplicacion-vac">{vaccine.nextDue}</p>
                </div>
                <div className="item-aplicacion-vac">
                  <h4 className="etiqueta-aplicacion-vac">Estado</h4>
                  <span
                    className={`estado-aplicacion-vac ${
                      vaccine.status === "up-to-date"
                        ? "aldia-aplicacion-vac"
                        : vaccine.status === "due-soon"
                          ? "prox-aplicacion-vac"
                          : "venc-aplicacion-vac"
                    }`}
                  >
                    {vaccine.status === "up-to-date" ? "Al día" : vaccine.status === "due-soon" ? "Próxima" : "Vencida"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="seccion-descripcion-vac">
            <div className="cabecera-seccion-vac">
              <h3 className="titulo-seccion-vac">
                <FileText className="ico-desc-vac" />
                Descripción
              </h3>
            </div>
            <div className="contenido-seccion-vac">
              <p className="texto-descripcion-vac">{vaccine.description}</p>
            </div>
          </div>

          {/* Información técnica */}
          <div className="seccion-tecnica-vac">
            <div className="cabecera-seccion-vac">
              <h3 className="titulo-seccion-vac">
                <Info className="ico-tecnica-vac" />
                Información Técnica
              </h3>
            </div>
            <div className="contenido-seccion-vac">
              <p className="texto-tecnica-vac">{vaccine.technicalDescription}</p>

              <div className="datos-tecnica-vac">
                <div className="item-tecnica-vac">
                  <h4 className="etiqueta-tecnica-vac">Laboratorio</h4>
                  <p className="valor-tecnica-vac">{vaccine.laboratory}</p>
                </div>
                <div className="item-tecnica-vac">
                  <h4 className="etiqueta-tecnica-vac">Lote</h4>
                  <p className="valor-tecnica-vac">{vaccine.batchNumber}</p>
                </div>
                <div className="item-tecnica-vac">
                  <h4 className="etiqueta-tecnica-vac">Fecha de fabricación</h4>
                  <p className="valor-tecnica-vac">{vaccine.manufacturingDate}</p>
                </div>
                <div className="item-tecnica-vac">
                  <h4 className="etiqueta-tecnica-vac">Fecha de vencimiento</h4>
                  <p className="valor-tecnica-vac">{vaccine.expirationDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
