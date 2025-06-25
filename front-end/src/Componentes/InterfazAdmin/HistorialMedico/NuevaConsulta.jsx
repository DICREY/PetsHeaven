import React from "react"
import { CalendarDays, FileText, AlertCircle, Heart, CheckCircle, Pill, Phone, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import "../../../styles/InterfazAdmin/HistorialMedico/NuevaConsulta.css"

// Component 
export default function FormularioNuevaConsulta({ close }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const [formData, setFormData] = useState({
    time: "",
    consultationType: "",
    veterinarian: "",
    diagnosis: "",
    treatment: "",
    notes: "",
    symptoms: [""],
    physicalExam: {
      temperature: "",
      weight: "",
      heartRate: "",
      respiratoryRate: "",
      bloodPressure: "",
      bodyCondition: "",
    },
    labResults: [{ test: "", result: "", reference: "" }],
    medications: [{ name: "", dosage: "", duration: "", instructions: "" }],
    recommendations: [""],
    urgency: "normal",
    contactPhone: "",
  })

  const petData = { name: "Max" } // Ejemplo

  const consultationTypes = [
    { value: "routine", label: "Consulta de Rutina" },
    { value: "vaccination", label: "Vacunación" },
    { value: "emergency", label: "Emergencia" },
    { value: "dental", label: "Revisión Dental" },
    { value: "surgery", label: "Cirugía" },
    { value: "followup", label: "Seguimiento" },
    { value: "grooming", label: "Peluquería" },
    { value: "other", label: "Otro" },
  ]

  const veterinarians = [
    { value: "dr-carlos-ruiz", label: "Dr. Carlos Ruiz", specialty: "Medicina General" },
    { value: "dra-ana-lopez", label: "Dra. Ana López", specialty: "Vacunación y Prevención" },
    { value: "dr-miguel-torres", label: "Dr. Miguel Torres", specialty: "Emergencias" },
    { value: "dra-sofia-martinez", label: "Dra. Sofía Martínez", specialty: "Cirugía" },
    { value: "dr-luis-garcia", label: "Dr. Luis García", specialty: "Dermatología" },
  ]

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
  ]

  const onInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const onPhysicalExamChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      physicalExam: { ...prev.physicalExam, [field]: value },
    }))
  }

  const onArrayChange = (arrayName, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => (i === index ? value : item)),
    }))
  }

  const onLabResultChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      labResults: prev.labResults.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const onMedicationChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      medications: prev.medications.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const onAddArrayItem = (arrayName) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], ""],
    }))
  }

  const onRemoveArrayItem = (arrayName, index) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }))
  }

  const onAddLabResult = () => {
    setFormData((prev) => ({
      ...prev,
      labResults: [...prev.labResults, { test: "", result: "", reference: "" }],
    }))
  }

  const onAddMedication = () => {
    setFormData((prev) => ({
      ...prev,
      medications: [...prev.medications, { name: "", dosage: "", duration: "", instructions: "" }],
    }))
  }

  const isFormValid = () => {
    return formData.diagnosis.trim() !== "" && selectedDate && formData.time
  }

  const onSubmit = () => {
    if (isFormValid()) {
      console.log("Formulario enviado:", { ...formData, date: selectedDate })
      close()
    }
  }


  return (
    <>
      {/* Modal del formulario */}
        <aside className="modal-overlay-consulta">
          <div className="modal-backdrop-consulta" onClick={close}></div>
          <div className="modal-container-consulta">
            <div className="modal-header-consulta">
              <div className="header-content-consulta">
                <div>
                  <h2 className="titulo-modal-consulta">
                    <CalendarDays className="icono-md-consulta icono-nueva-consulta" />
                    Nueva Consulta para {petData.name}
                  </h2>
                  <p className="subtitulo-modal-consulta">Complete toda la información de la consulta médica</p>
                </div>
                <button onClick={close} className="btn-close-consulta">
                  ×
                </button>
              </div>
            </div>

            <div className="modal-body-consulta">
              {/* Información básica */}
              <div className="grid-2-consulta">
                <div className="tarjeta-fecha-consulta">
                  <div className="cabecera-fecha-consulta">
                    <h3 className="titulo-fecha-consulta flex-center-consulta">
                      <CalendarDays className="icono-sm-consulta icono-fecha-consulta" />
                      Fecha y Hora
                    </h3>
                  </div>
                  <div className="contenido-fecha-consulta space-y-consulta">
                    <div>
                      <label htmlFor="date" className="label-consulta">
                        Fecha de la consulta
                      </label>
                      <input
                        id="date"
                        type="date"
                        className="input-consulta"
                        value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                      />
                    </div>

                    <div>
                      <label htmlFor="time" className="label-consulta">
                        Hora
                      </label>
                      <select
                        id="time"
                        className="input-consulta"
                        value={formData.time}
                        onChange={(e) => onInputChange("time", e.target.value)}
                      >
                        <option value="">Seleccionar hora</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="tarjeta-detalles-consulta">
                  <div className="cabecera-detalles-consulta">
                    <h3 className="titulo-detalles-consulta flex-center-consulta">
                      <FileText className="icono-sm-consulta icono-tipo-consulta" />
                      Detalles de la Consulta
                    </h3>
                  </div>
                  <div className="contenido-detalles-consulta space-y-consulta">
                    <div>
                      <label htmlFor="consultationType" className="label-consulta">
                        Tipo de consulta
                      </label>
                      <select
                        id="consultationType"
                        className="input-consulta"
                        value={formData.consultationType}
                        onChange={(e) => onInputChange("consultationType", e.target.value)}
                      >
                        <option value="">Seleccionar tipo</option>
                        {consultationTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="veterinarian" className="label-consulta">
                        Veterinario
                      </label>
                      <select
                        id="veterinarian"
                        className="input-consulta"
                        value={formData.veterinarian}
                        onChange={(e) => onInputChange("veterinarian", e.target.value)}
                      >
                        <option value="">Seleccionar veterinario</option>
                        {veterinarians.map((vet) => (
                          <option key={vet.value} value={vet.value}>
                            {vet.label} - {vet.specialty}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Diagnóstico y tratamiento */}
              <div className="tarjeta-diag-consulta">
                <div className="cabecera-diag-consulta">
                  <h3 className="titulo-diag-consulta flex-center-consulta">
                    <FileText className="icono-sm-consulta icono-diag-consulta" />
                    Diagnóstico y Tratamiento
                  </h3>
                </div>
                <div className="contenido-diag-consulta space-y-consulta">
                  <div>
                    <label htmlFor="diagnosis" className="label-consulta">
                      Diagnóstico *
                    </label>
                    <textarea
                      id="diagnosis"
                      placeholder="Describa el diagnóstico..."
                      className="textarea-consulta"
                      value={formData.diagnosis}
                      onChange={(e) => onInputChange("diagnosis", e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="treatment" className="label-consulta">
                      Tratamiento
                    </label>
                    <textarea
                      id="treatment"
                      placeholder="Describa el tratamiento aplicado..."
                      className="textarea-consulta"
                      value={formData.treatment}
                      onChange={(e) => onInputChange("treatment", e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="notes" className="label-consulta">
                      Notas del veterinario
                    </label>
                    <textarea
                      id="notes"
                      placeholder="Notas adicionales..."
                      className="textarea-consulta"
                      value={formData.notes}
                      onChange={(e) => onInputChange("notes", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Síntomas */}
              <div className="tarjeta-sint-consulta">
                <div className="cabecera-sint-consulta">
                  <h3 className="titulo-sint-consulta flex-center-consulta">
                    <AlertCircle className="icono-sm-consulta icono-sint-consulta" />
                    Síntomas Observados
                  </h3>
                </div>
                <div className="contenido-sint-consulta">
                  <div className="space-y-sm-consulta">
                    {formData.symptoms.map((symptom, index) => (
                      <div key={index} className="flex-gap-consulta">
                        <input
                          placeholder="Describa el síntoma..."
                          className="input-flex-consulta"
                          value={symptom}
                          onChange={(e) => onArrayChange("symptoms", index, e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn-remove-consulta"
                          onClick={() => onRemoveArrayItem("symptoms", index)}
                          disabled={formData.symptoms.length === 1}
                        >
                          <Trash2 className="icono-xs-consulta" />
                        </button>
                      </div>
                    ))}
                    <button type="button" className="btn-add-consulta" onClick={() => onAddArrayItem("symptoms")}>
                      <Plus className="icono-xs-consulta" />
                      Añadir síntoma
                    </button>
                  </div>
                </div>
              </div>

              {/* Examen físico */}
              <div className="tarjeta-exam-consulta">
                <div className="cabecera-exam-consulta">
                  <h3 className="titulo-exam-consulta flex-center-consulta">
                    <Heart className="icono-sm-consulta icono-exam-consulta" />
                    Examen Físico
                  </h3>
                </div>
                <div className="contenido-exam-consulta">
                  <div className="grid-3-consulta">
                    <div>
                      <label htmlFor="temperature" className="label-consulta">
                        Temperatura
                      </label>
                      <input
                        id="temperature"
                        placeholder="ej: 38.5°C"
                        className="input-consulta"
                        value={formData.physicalExam.temperature}
                        onChange={(e) => onPhysicalExamChange("temperature", e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="weight" className="label-consulta">
                        Peso
                      </label>
                      <input
                        id="weight"
                        placeholder="ej: 28 kg"
                        className="input-consulta"
                        value={formData.physicalExam.weight}
                        onChange={(e) => onPhysicalExamChange("weight", e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="heartRate" className="label-consulta">
                        Frecuencia cardíaca
                      </label>
                      <input
                        id="heartRate"
                        placeholder="ej: 90 bpm"
                        className="input-consulta"
                        value={formData.physicalExam.heartRate}
                        onChange={(e) => onPhysicalExamChange("heartRate", e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="respiratoryRate" className="label-consulta">
                        Frecuencia respiratoria
                      </label>
                      <input
                        id="respiratoryRate"
                        placeholder="ej: 25 rpm"
                        className="input-consulta"
                        value={formData.physicalExam.respiratoryRate}
                        onChange={(e) => onPhysicalExamChange("respiratoryRate", e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="bloodPressure" className="label-consulta">
                        Presión arterial
                      </label>
                      <input
                        id="bloodPressure"
                        placeholder="ej: Normal"
                        className="input-consulta"
                        value={formData.physicalExam.bloodPressure}
                        onChange={(e) => onPhysicalExamChange("bloodPressure", e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="bodyCondition" className="label-consulta">
                        Condición corporal
                      </label>
                      <input
                        id="bodyCondition"
                        placeholder="ej: Ideal (5/9)"
                        className="input-consulta"
                        value={formData.physicalExam.bodyCondition}
                        onChange={(e) => onPhysicalExamChange("bodyCondition", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Resultados de laboratorio */}
              <div className="tarjeta-lab-consulta">
                <div className="cabecera-lab-consulta">
                  <h3 className="titulo-lab-consulta flex-center-consulta">
                    <CheckCircle className="icono-sm-consulta icono-lab-consulta" />
                    Resultados de Laboratorio
                  </h3>
                </div>
                <div className="contenido-lab-consulta">
                  <div className="space-y-consulta">
                    {formData.labResults.map((result, index) => (
                      <div key={index} className="grid-lab-consulta">
                        <div>
                          <label htmlFor={`test-${index}`} className="label-consulta">
                            Prueba
                          </label>
                          <input
                            id={`test-${index}`}
                            placeholder="ej: Hemograma completo"
                            className="input-consulta"
                            value={result.test}
                            onChange={(e) => onLabResultChange(index, "test", e.target.value)}
                          />
                        </div>
                        <div>
                          <label htmlFor={`result-${index}`} className="label-consulta">
                            Resultado
                          </label>
                          <input
                            id={`result-${index}`}
                            placeholder="ej: Normal"
                            className="input-consulta"
                            value={result.result}
                            onChange={(e) => onLabResultChange(index, "result", e.target.value)}
                          />
                        </div>
                        <div className="flex-gap-consulta">
                          <div className="flex-1-consulta">
                            <label htmlFor={`reference-${index}`} className="label-consulta">
                              Referencia
                            </label>
                            <input
                              id={`reference-${index}`}
                              placeholder="ej: Dentro de parámetros"
                              className="input-consulta"
                              value={result.reference}
                              onChange={(e) => onLabResultChange(index, "reference", e.target.value)}
                            />
                          </div>
                          <button
                            type="button"
                            className="btn-remove-consulta mt-top-consulta"
                            onClick={() => onRemoveArrayItem("labResults", index)}
                            disabled={formData.labResults.length === 1}
                          >
                            <Trash2 className="icono-xs-consulta" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button type="button" className="btn-add-consulta" onClick={onAddLabResult}>
                      <Plus className="icono-xs-consulta" />
                      Añadir resultado de laboratorio
                    </button>
                  </div>
                </div>
              </div>

              {/* Medicamentos */}
              <div className="tarjeta-med-consulta">
                <div className="cabecera-med-consulta">
                  <h3 className="titulo-med-consulta flex-center-consulta">
                    <Pill className="icono-sm-consulta icono-med-consulta" />
                    Medicamentos Prescritos
                  </h3>
                </div>
                <div className="contenido-med-consulta">
                  <div className="space-y-consulta">
                    {formData.medications.map((medication, index) => (
                      <div key={index} className="grid-med-consulta">
                        <div>
                          <label htmlFor={`med-name-${index}`} className="label-consulta">
                            Medicamento
                          </label>
                          <input
                            id={`med-name-${index}`}
                            placeholder="ej: Antiparasitario interno"
                            className="input-consulta"
                            value={medication.name}
                            onChange={(e) => onMedicationChange(index, "name", e.target.value)}
                          />
                        </div>
                        <div>
                          <label htmlFor={`med-dosage-${index}`} className="label-consulta">
                            Dosis
                          </label>
                          <input
                            id={`med-dosage-${index}`}
                            placeholder="ej: 1 comprimido"
                            className="input-consulta"
                            value={medication.dosage}
                            onChange={(e) => onMedicationChange(index, "dosage", e.target.value)}
                          />
                        </div>
                        <div>
                          <label htmlFor={`med-duration-${index}`} className="label-consulta">
                            Duración
                          </label>
                          <input
                            id={`med-duration-${index}`}
                            placeholder="ej: 7 días"
                            className="input-consulta"
                            value={medication.duration}
                            onChange={(e) => onMedicationChange(index, "duration", e.target.value)}
                          />
                        </div>
                        <div className="flex-gap-consulta">
                          <div className="flex-1-consulta">
                            <label htmlFor={`med-instructions-${index}`} className="label-consulta">
                              Instrucciones
                            </label>
                            <input
                              id={`med-instructions-${index}`}
                              placeholder="ej: Administrar con comida"
                              className="input-consulta"
                              value={medication.instructions}
                              onChange={(e) => onMedicationChange(index, "instructions", e.target.value)}
                            />
                          </div>
                          <button
                            type="button"
                            className="btn-remove-consulta mt-top-consulta"
                            onClick={() => onRemoveArrayItem("medications", index)}
                            disabled={formData.medications.length === 1}
                          >
                            <Trash2 className="icono-xs-consulta" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button type="button" className="btn-add-consulta" onClick={onAddMedication}>
                      <Plus className="icono-xs-consulta" />
                      Añadir medicamento
                    </button>
                  </div>
                </div>
              </div>

              {/* Recomendaciones */}
              <div className="tarjeta-rec-consulta">
                <div className="cabecera-rec-consulta">
                  <h3 className="titulo-rec-consulta flex-center-consulta">
                    <CheckCircle className="icono-sm-consulta icono-rec-consulta" />
                    Recomendaciones
                  </h3>
                </div>
                <div className="contenido-rec-consulta">
                  <div className="space-y-sm-consulta">
                    {formData.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex-gap-consulta">
                        <input
                          placeholder="Escriba una recomendación..."
                          className="input-flex-consulta"
                          value={recommendation}
                          onChange={(e) => onArrayChange("recommendations", index, e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn-remove-consulta"
                          onClick={() => onRemoveArrayItem("recommendations", index)}
                          disabled={formData.recommendations.length === 1}
                        >
                          <Trash2 className="icono-xs-consulta" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn-add-consulta"
                      onClick={() => onAddArrayItem("recommendations")}
                    >
                      <Plus className="icono-xs-consulta" />
                      Añadir recomendación
                    </button>
                  </div>
                </div>
              </div>

              {/* Información adicional */}
              <div className="tarjeta-info-consulta">
                <div className="cabecera-info-consulta">
                  <h3 className="titulo-info-consulta flex-center-consulta">
                    <Phone className="icono-sm-consulta icono-info-consulta" />
                    Información Adicional
                  </h3>
                </div>
                <div className="contenido-info-consulta space-y-consulta">
                  <div>
                    <label htmlFor="urgency" className="label-consulta">
                      Nivel de urgencia
                    </label>
                    <select
                      id="urgency"
                      className="input-consulta"
                      value={formData.urgency}
                      onChange={(e) => onInputChange("urgency", e.target.value)}
                    >
                      <option value="low">Baja - Consulta de rutina</option>
                      <option value="normal">Normal - Consulta estándar</option>
                      <option value="high">Alta - Requiere atención pronta</option>
                      <option value="emergency">Emergencia - Atención inmediata</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contactPhone" className="label-consulta">
                      Teléfono de contacto
                    </label>
                    <input
                      id="contactPhone"
                      type="tel"
                      className="input-consulta"
                      value={formData.cel_per}
                      onChange={(e) => onInputChange("contactPhone", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="footer-consulta">
                <button onClick={close} className="btn-cancel-consulta">
                  Cancelar
                </button>
                <button onClick={onSubmit} disabled={!isFormValid()} className="btn-registrar-consulta">
                  Registrar Consulta
                </button>
              </div>
            </div>
          </div>
        </aside>
    </>
  )
}
