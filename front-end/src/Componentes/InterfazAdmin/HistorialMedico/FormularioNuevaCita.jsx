import React from "react"
import { Calendar, Save } from "lucide-react"
import "../../../styles/InterfazAdmin/HistorialMedico/FormularioNuevaCita.css"

export default function FormularioNuevaCita({
  isOpen,
  onClose,
  petData,
  formData,
  onInputChange,
  onSubmit,
  isFormValid,
}) {
  if (!isOpen) return null

  return (
    <div className="overlay-form-cita">
      <div className="fondo-form-cita" onClick={onClose}></div>
      <div className="contenedor-form-cita">
        <div className="cabecera-form-cita">
          <div className="info-form-cita">
            <div>
              <h2 className="titulo-form-cita">
                <Calendar className="ico-form-cita" />
                Nueva Cita - {petData.name}
              </h2>
              <p className="desc-form-cita">Programar nueva cita médica</p>
            </div>
            <button onClick={onClose} className="btn-cerrar-form-cita">
              ×
            </button>
          </div>
        </div>

        <div className="contenido-form-cita">
          <div className="seccion-basica-form-cita">
            <div className="campo-form-cita">
              <label className="etiqueta-form-cita">Fecha</label>
              <input
                type="date"
                className="input-form-cita"
                value={formData.date}
                onChange={(e) => onInputChange("date", e.target.value)}
              />
            </div>
            <div className="campo-form-cita">
              <label className="etiqueta-form-cita">Hora</label>
              <input
                type="time"
                className="input-form-cita"
                value={formData.time}
                onChange={(e) => onInputChange("time", e.target.value)}
              />
            </div>
            <div className="campo-form-cita">
              <label className="etiqueta-form-cita">Tipo de Cita</label>
              <select
                className="select-form-cita"
                value={formData.type}
                onChange={(e) => onInputChange("type", e.target.value)}
              >
                <option value="">Seleccionar tipo</option>
                <option value="Consulta General">Consulta General</option>
                <option value="Vacunación">Vacunación</option>
                <option value="Revisión dental">Revisión dental</option>
                <option value="Control">Control</option>
                <option value="Cirugía">Cirugía</option>
                <option value="Emergencia">Emergencia</option>
              </select>
            </div>
            <div className="campo-form-cita">
              <label className="etiqueta-form-cita">Veterinario</label>
              <select
                className="select-form-cita"
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

          <div className="campo-textarea-form-cita">
            <label className="etiqueta-form-cita">Descripción</label>
            <textarea
              className="textarea-form-cita"
              rows={3}
              value={formData.description}
              onChange={(e) => onInputChange("description", e.target.value)}
              placeholder="Descripción de la cita..."
            />
          </div>

          <div className="campo-textarea-form-cita">
            <label className="etiqueta-form-cita">Notas</label>
            <textarea
              className="textarea-form-cita"
              rows={2}
              value={formData.notes}
              onChange={(e) => onInputChange("notes", e.target.value)}
              placeholder="Notas adicionales..."
            />
          </div>

          <div className="campo-textarea-form-cita">
            <label className="etiqueta-form-cita">Preparación</label>
            <textarea
              className="textarea-form-cita"
              rows={2}
              value={formData.preparation}
              onChange={(e) => onInputChange("preparation", e.target.value)}
              placeholder="Instrucciones de preparación..."
            />
          </div>

          <div className="seccion-adicional-form-cita">
            <div className="campo-form-cita">
              <label className="etiqueta-form-cita">Ubicación</label>
              <select
                className="select-form-cita"
                value={formData.location}
                onChange={(e) => onInputChange("location", e.target.value)}
              >
                <option value="">Seleccionar ubicación</option>
                <option value="Consulta 1 - Planta Baja">Consulta 1 - Planta Baja</option>
                <option value="Consulta 2 - Planta Baja">Consulta 2 - Planta Baja</option>
                <option value="Quirófano - Primera Planta">Quirófano - Primera Planta</option>
              </select>
            </div>
            <div className="campo-form-cita">
              <label className="etiqueta-form-cita">Teléfono de contacto</label>
              <input
                type="tel"
                className="input-form-cita"
                value={formData.contactPhone}
                onChange={(e) => onInputChange("contactPhone", e.target.value)}
              />
            </div>
          </div>

          <div className="campo-checkbox-form-cita">
            <input
              type="checkbox"
              id="confirmationRequired"
              className="checkbox-form-cita"
              checked={formData.confirmationRequired}
              onChange={(e) => onInputChange("confirmationRequired", e.target.checked)}
            />
            <label htmlFor="confirmationRequired" className="etiqueta-checkbox-form-cita">
              Requiere confirmación
            </label>
          </div>

          <div className="acciones-form-cita">
            <button onClick={onClose} className="btn-cancelar-form-cita">
              Cancelar
            </button>
            <button
              onClick={onSubmit}
              disabled={!isFormValid()}
              className={`btn-guardar-form-cita ${!isFormValid() ? "deshabilitado-form-cita" : ""}`}
            >
              <Save className="ico-btn-form-cita" />
              Programar Cita
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
