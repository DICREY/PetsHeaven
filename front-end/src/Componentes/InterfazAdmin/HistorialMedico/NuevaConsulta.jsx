import React from "react"
import { Calendar, Plus, Minus, Save } from "lucide-react"
import "../../../styles/InterfazAdmin/HistorialMedico/NuevaConsulta.css"

export default function FormularioNuevaConsulta({isOpen,onClose,petData,selectedDate,setSelectedDate,formData,onInputChange,onPhysicalExamChange,onArrayChange,onLabResultChange,
  onMedicationChange,onAddArrayItem,onRemoveArrayItem,onAddLabResult,onAddMedication,onSubmit,isFormValid,}) {
  if (!isOpen) return null

  return (
    <div className="overlay-form-cons">
      <div className="fondo-form-cons" onClick={onClose}></div>
      <div className="contenedor-form-cons">
        <div className="cabecera-form-cons">
          <div className="info-form-cons">
            <div>
              <h2 className="titulo-form-cons">
                <Calendar className="ico-form-cons" />
                Nueva Consulta - {petData.name}
              </h2>
              <p className="desc-form-cons">Registrar nueva consulta médica</p>
            </div>
            <button onClick={onClose} className="btn-cerrar-form-cons">
              ×
            </button>
          </div>
        </div>

        <div className="contenido-form-cons">
          {/* Información básica */}
          <div className="seccion-basica-form-cons">
            <div className="campo-form-cons">
              <label className="etiqueta-form-cons">Fecha</label>
              <input
                type="date"
                className="input-form-cons"
                value={selectedDate || ""}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="campo-form-cons">
              <label className="etiqueta-form-cons">Hora</label>
              <input
                type="time"
                className="input-form-cons"
                value={formData.time}
                onChange={(e) => onInputChange("time", e.target.value)}
              />
            </div>
            <div className="campo-form-cons">
              <label className="etiqueta-form-cons">Tipo de Consulta</label>
              <select
                className="select-form-cons"
                value={formData.consultationType}
                onChange={(e) => onInputChange("consultationType", e.target.value)}
              >
                <option value="">Seleccionar tipo</option>
                <option value="Consulta General">Consulta General</option>
                <option value="Vacunación">Vacunación</option>
                <option value="Emergencia">Emergencia</option>
                <option value="Control">Control</option>
                <option value="Cirugía">Cirugía</option>
              </select>
            </div>
            <div className="campo-form-cons">
              <label className="etiqueta-form-cons">Veterinario</label>
              <select
                className="select-form-cons"
                value={formData.veterinarian}
                onChange={(e) => onInputChange("veterinarian", e.target.value)}
              >
                <option value="">Seleccionar veterinario</option>
                <option value="Dr. Carlos Ruiz">Dr. Carlos Ruiz</option>
                <option value="Dra. Ana López">Dra. Ana López</option>
                <option value="Dr. Miguel Torres">Dr. Miguel Torres</option>
              </select>
            </div>
          </div>

          {/* Diagnóstico y Tratamiento */}
          <div className="seccion-diag-form-cons">
            <div className="campo-textarea-form-cons">
              <label className="etiqueta-form-cons">Diagnóstico</label>
              <textarea
                className="textarea-form-cons"
                rows={3}
                value={formData.diagnosis}
                onChange={(e) => onInputChange("diagnosis", e.target.value)}
                placeholder="Descripción del diagnóstico..."
              />
            </div>
            <div className="campo-textarea-form-cons">
              <label className="etiqueta-form-cons">Tratamiento</label>
              <textarea
                className="textarea-form-cons"
                rows={3}
                value={formData.treatment}
                onChange={(e) => onInputChange("treatment", e.target.value)}
                placeholder="Descripción del tratamiento..."
              />
            </div>
            <div className="campo-textarea-form-cons">
              <label className="etiqueta-form-cons">Notas</label>
              <textarea
                className="textarea-form-cons"
                rows={2}
                value={formData.notes}
                onChange={(e) => onInputChange("notes", e.target.value)}
                placeholder="Notas adicionales..."
              />
            </div>
          </div>

          {/* Síntomas */}
          <div className="seccion-sintomas-form-cons">
            <div className="cabecera-sintomas-form-cons">
              <label className="etiqueta-form-cons">Síntomas</label>
              <button type="button" onClick={() => onAddArrayItem("symptoms")} className="btn-agregar-form-cons">
                <Plus className="ico-btn-form-cons" />
                Agregar
              </button>
            </div>
            <div className="lista-sintomas-form-cons">
              {formData.symptoms.map((symptom, index) => (
                <div key={index} className="item-sintoma-form-cons">
                  <input
                    type="text"
                    className="input-sintoma-form-cons"
                    value={symptom}
                    onChange={(e) => onArrayChange("symptoms", index, e.target.value)}
                    placeholder="Descripción del síntoma..."
                  />
                  {formData.symptoms.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onRemoveArrayItem("symptoms", index)}
                      className="btn-eliminar-form-cons"
                    >
                      <Minus className="ico-btn-form-cons" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Examen físico */}
          <div className="seccion-examen-form-cons">
            <h3 className="titulo-examen-form-cons">Examen Físico</h3>
            <div className="grilla-examen-form-cons">
              <div className="campo-form-cons">
                <label className="etiqueta-form-cons">Temperatura</label>
                <input
                  type="text"
                  className="input-form-cons"
                  value={formData.physicalExam.temperature}
                  onChange={(e) => onPhysicalExamChange("temperature", e.target.value)}
                  placeholder="38.5°C"
                />
              </div>
              <div className="campo-form-cons">
                <label className="etiqueta-form-cons">Peso</label>
                <input
                  type="text"
                  className="input-form-cons"
                  value={formData.physicalExam.weight}
                  onChange={(e) => onPhysicalExamChange("weight", e.target.value)}
                  placeholder="28 kg"
                />
              </div>
              <div className="campo-form-cons">
                <label className="etiqueta-form-cons">Frecuencia Cardíaca</label>
                <input
                  type="text"
                  className="input-form-cons"
                  value={formData.physicalExam.heartRate}
                  onChange={(e) => onPhysicalExamChange("heartRate", e.target.value)}
                  placeholder="90 bpm"
                />
              </div>
              <div className="campo-form-cons">
                <label className="etiqueta-form-cons">Frecuencia Respiratoria</label>
                <input
                  type="text"
                  className="input-form-cons"
                  value={formData.physicalExam.respiratoryRate}
                  onChange={(e) => onPhysicalExamChange("respiratoryRate", e.target.value)}
                  placeholder="25 rpm"
                />
              </div>
              <div className="campo-form-cons">
                <label className="etiqueta-form-cons">Presión Arterial</label>
                <input
                  type="text"
                  className="input-form-cons"
                  value={formData.physicalExam.bloodPressure}
                  onChange={(e) => onPhysicalExamChange("bloodPressure", e.target.value)}
                  placeholder="Normal"
                />
              </div>
              <div className="campo-form-cons">
                <label className="etiqueta-form-cons">Condición Corporal</label>
                <input
                  type="text"
                  className="input-form-cons"
                  value={formData.physicalExam.bodyCondition}
                  onChange={(e) => onPhysicalExamChange("bodyCondition", e.target.value)}
                  placeholder="Ideal (5/9)"
                />
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="acciones-form-cons">
            <button onClick={onClose} className="btn-cancelar-form-cons">
              Cancelar
            </button>
            <button
              onClick={onSubmit}
              disabled={!isFormValid()}
              className={`btn-guardar-form-cons ${!isFormValid() ? "deshabilitado-form-cons" : ""}`}
            >
              <Save className="ico-btn-form-cons" />
              Guardar Consulta
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
