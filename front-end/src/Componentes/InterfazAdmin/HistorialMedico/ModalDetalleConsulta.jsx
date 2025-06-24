import React from "react"
import { Calendar, User, FileText, Activity, TestTube, Pill, Lightbulb, Clock } from "lucide-react"
import "../../../styles/InterfazAdmin/HistorialMedico/ModalDetalleConsulta.css"

export default function ModalDetalleConsulta({ isOpen, onClose, consultation }) {
  if (!consultation) return null

  if (!isOpen) return null

  return (
    <div className="overlay-modal-cons">
      <div className="fondo-modal-cons" onClick={onClose}></div>
      <div className="contenedor-modal-cons">
        <div className="cabecera-modal-cons">
          <div className="info-modal-cons">
            <div>
              <h2 className="titulo-modal-cons">
                <FileText className="ico-titulo-cons" />
                {consultation.type}
              </h2>
              <div className="meta-modal-cons">
                <span className="fecha-meta-cons">
                  <Calendar className="ico-meta-cons" />
                  {consultation.date} - {consultation.time}
                </span>
                <span className="vet-meta-cons">
                  <User className="ico-meta-cons" />
                  {consultation.veterinarian}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="btn-cerrar-cons">
              ×
            </button>
          </div>
        </div>

        <div className="contenido-modal-cons">
          {/* Información básica */}
          <div className="seccion-basica-cons">
            <div className="tarjeta-info-cons">
              <h3 className="titulo-info-cons">Diagnóstico</h3>
              <p className="texto-info-cons">{consultation.diagnosis}</p>
            </div>
            <div className="tarjeta-info-cons">
              <h3 className="titulo-info-cons">Tratamiento</h3>
              <p className="texto-info-cons">{consultation.treatment}</p>
            </div>
          </div>

          {consultation.notes && (
            <div className="tarjeta-notas-cons">
              <h3 className="titulo-notas-cons">Notas</h3>
              <p className="texto-notas-cons">{consultation.notes}</p>
            </div>
          )}

          {/* Síntomas */}
          <div className="seccion-sintomas-cons">
            <div className="cabecera-seccion-cons">
              <h3 className="titulo-seccion-cons">
                <Activity className="ico-sintomas-cons" />
                Síntomas
              </h3>
            </div>
            <div className="contenido-seccion-cons">
              <div className="lista-sintomas-cons">
                {consultation.symptoms.map((symptom, index) => (
                  <div key={index} className="item-sintoma-cons">
                    <p className="texto-sintoma-cons">{symptom}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Examen físico */}
          <div className="seccion-examen-cons">
            <div className="cabecera-seccion-cons">
              <h3 className="titulo-seccion-cons">
                <Activity className="ico-examen-cons" />
                Examen Físico
              </h3>
            </div>
            <div className="contenido-seccion-cons">
              <div className="grilla-examen-cons">
                <div className="item-examen-cons">
                  <p className="etiqueta-examen-cons">Temperatura</p>
                  <p className="valor-examen-cons">{consultation.physicalExam.temperature}</p>
                </div>
                <div className="item-examen-cons">
                  <p className="etiqueta-examen-cons">Peso</p>
                  <p className="valor-examen-cons">{consultation.physicalExam.weight}</p>
                </div>
                <div className="item-examen-cons">
                  <p className="etiqueta-examen-cons">F. Cardíaca</p>
                  <p className="valor-examen-cons">{consultation.physicalExam.heartRate}</p>
                </div>
                <div className="item-examen-cons">
                  <p className="etiqueta-examen-cons">F. Respiratoria</p>
                  <p className="valor-examen-cons">{consultation.physicalExam.respiratoryRate}</p>
                </div>
                <div className="item-examen-cons">
                  <p className="etiqueta-examen-cons">P. Arterial</p>
                  <p className="valor-examen-cons">{consultation.physicalExam.bloodPressure}</p>
                </div>
                <div className="item-examen-cons">
                  <p className="etiqueta-examen-cons">Condición</p>
                  <p className="valor-examen-cons">{consultation.physicalExam.bodyCondition}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados de laboratorio */}
          {consultation.labResults.length > 0 && (
            <div className="seccion-lab-cons">
              <div className="cabecera-seccion-cons">
                <h3 className="titulo-seccion-cons">
                  <TestTube className="ico-lab-cons" />
                  Resultados de Laboratorio
                </h3>
              </div>
              <div className="contenido-seccion-cons">
                <div className="lista-lab-cons">
                  {consultation.labResults.map((result, index) => (
                    <div key={index} className="item-lab-cons">
                      <div className="info-lab-cons">
                        <p className="nombre-lab-cons">{result.test}</p>
                        <p className="ref-lab-cons">{result.reference}</p>
                      </div>
                      <p className="resultado-lab-cons">{result.result}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Medicamentos */}
          <div className="seccion-med-cons">
            <div className="cabecera-seccion-cons">
              <h3 className="titulo-seccion-cons">
                <Pill className="ico-med-cons" />
                Medicamentos
              </h3>
            </div>
            <div className="contenido-seccion-cons">
              <div className="lista-med-cons">
                {consultation.medications.map((medication, index) => (
                  <div key={index} className="item-med-cons">
                    <h4 className="nombre-med-cons">{medication.name}</h4>
                    <div className="detalles-med-cons">
                      <p className="detalle-med-cons">
                        <span className="etiqueta-med-cons">Dosis:</span> {medication.dosage}
                      </p>
                      <p className="detalle-med-cons">
                        <span className="etiqueta-med-cons">Duración:</span> {medication.duration}
                      </p>
                      <p className="detalle-med-cons">
                        <span className="etiqueta-med-cons">Instrucciones:</span> {medication.instructions}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recomendaciones */}
          <div className="seccion-rec-cons">
            <div className="cabecera-seccion-cons">
              <h3 className="titulo-seccion-cons">
                <Lightbulb className="ico-rec-cons" />
                Recomendaciones
              </h3>
            </div>
            <div className="contenido-seccion-cons">
              <div className="lista-rec-cons">
                {consultation.recommendations.map((recommendation, index) => (
                  <div key={index} className="item-rec-cons">
                    <p className="texto-rec-cons">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Próxima cita */}
          {consultation.nextAppointment && (
            <div className="seccion-cita-cons">
              <div className="cabecera-cita-cons">
                <Clock className="ico-cita-cons" />
                <h3 className="titulo-cita-cons">Próxima Cita Recomendada</h3>
              </div>
              <p className="fecha-cita-cons">{consultation.nextAppointment}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
