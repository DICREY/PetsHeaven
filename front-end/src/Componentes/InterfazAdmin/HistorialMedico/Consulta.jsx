"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar as CalendarUI } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CalendarDays,
  ClockIcon,
  FileText,
  AlertCircle,
  Heart,
  CheckCircle,
  Pill,
  Phone,
  Plus,
  Trash2,
} from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

// Import styles 
import "../../../styles/InterfazAdmin/HistorialMedico/Consulta.css"

// Component 
const FormularioNuevaConsulta = ({
  isOpen,
  onClose,
  petData,
  selectedDate,
  setSelectedDate,
  formData,
  onInputChange,
  onPhysicalExamChange,
  onArrayChange,
  onLabResultChange,
  onMedicationChange,
  onAddArrayItem,
  onRemoveArrayItem,
  onAddLabResult,
  onAddMedication,
  onSubmit,
  isFormValid,
}) => {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="titulo-form-cons">
            <CalendarDays className="w-6 h-6 ico-nueva-cons" />
            Nueva Consulta para {petData.name}
          </DialogTitle>
          <DialogDescription className="desc-form-cons">
            Complete toda la información de la consulta médica
          </DialogDescription>
        </DialogHeader>

        <div className="cont-form-cons">
          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="titulo-seccion-cons">
                  <CalendarDays className="w-5 h-5 ico-fecha-cons" />
                  Fecha y Hora
                </CardTitle>
              </CardHeader>
              <CardContent className="cont-fecha-cons">
                <div>
                  <Label htmlFor="date">Fecha de la consulta</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="btn-fecha-cons">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarUI
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="time">Hora</Label>
                  <Select value={formData.time} onValueChange={(value) => onInputChange("time", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar hora" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          <div className="flex items-center gap-2">
                            <ClockIcon className="w-4 h-4" />
                            {time}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="titulo-seccion-cons">
                  <FileText className="w-5 h-5 ico-tipo-cons" />
                  Detalles de la Consulta
                </CardTitle>
              </CardHeader>
              <CardContent className="cont-detalles-cons">
                <div>
                  <Label htmlFor="consultationType">Tipo de consulta</Label>
                  <Select
                    value={formData.consultationType}
                    onValueChange={(value) => onInputChange("consultationType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {consultationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="veterinarian">Veterinario</Label>
                  <Select value={formData.veterinarian} onValueChange={(value) => onInputChange("veterinarian", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar veterinario" />
                    </SelectTrigger>
                    <SelectContent>
                      {veterinarians.map((vet) => (
                        <SelectItem key={vet.value} value={vet.value}>
                          <div>
                            <div className="font-medium">{vet.label}</div>
                            <div className="texto-esp-vet">{vet.specialty}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Diagnóstico y tratamiento */}
          <Card>
            <CardHeader>
              <CardTitle className="titulo-seccion-cons">
                <FileText className="w-5 h-5 ico-diag-cons" />
                Diagnóstico y Tratamiento
              </CardTitle>
            </CardHeader>
            <CardContent className="cont-diag-cons">
              <div>
                <Label htmlFor="diagnosis">Diagnóstico *</Label>
                <Textarea
                  id="diagnosis"
                  placeholder="Describa el diagnóstico..."
                  value={formData.diagnosis}
                  onChange={(e) => onInputChange("diagnosis", e.target.value)}
                  className="area-diag-cons"
                />
              </div>

              <div>
                <Label htmlFor="treatment">Tratamiento</Label>
                <Textarea
                  id="treatment"
                  placeholder="Describa el tratamiento aplicado..."
                  value={formData.treatment}
                  onChange={(e) => onInputChange("treatment", e.target.value)}
                  className="area-trat-cons"
                />
              </div>

              <div>
                <Label htmlFor="notes">Notas del veterinario</Label>
                <Textarea
                  id="notes"
                  placeholder="Notas adicionales..."
                  value={formData.notes}
                  onChange={(e) => onInputChange("notes", e.target.value)}
                  className="area-notas-cons"
                />
              </div>
            </CardContent>
          </Card>

          {/* Síntomas */}
          <Card>
            <CardHeader>
              <CardTitle className="titulo-seccion-cons">
                <AlertCircle className="w-5 h-5 ico-sint-cons" />
                Síntomas Observados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="cont-sint-cons">
                {formData.symptoms.map((symptom, index) => (
                  <div key={index} className="fila-sint-cons">
                    <Input
                      placeholder="Describa el síntoma..."
                      value={symptom}
                      onChange={(e) => onArrayChange("symptoms", index, e.target.value)}
                      className="input-sint-cons"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => onRemoveArrayItem("symptoms", index)}
                      disabled={formData.symptoms.length === 1}
                      className="btn-eliminar-cons"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onAddArrayItem("symptoms")}
                  className="btn-agregar-cons"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Añadir síntoma
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Examen físico */}
          <Card>
            <CardHeader>
              <CardTitle className="titulo-seccion-cons">
                <Heart className="w-5 h-5 ico-exam-cons" />
                Examen Físico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid-exam-cons">
                <div>
                  <Label htmlFor="temperature">Temperatura</Label>
                  <Input
                    id="temperature"
                    placeholder="ej: 38.5°C"
                    value={formData.physicalExam.temperature}
                    onChange={(e) => onPhysicalExamChange("temperature", e.target.value)}
                    className="input-exam-cons"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Peso</Label>
                  <Input
                    id="weight"
                    placeholder="ej: 28 kg"
                    value={formData.physicalExam.weight}
                    onChange={(e) => onPhysicalExamChange("weight", e.target.value)}
                    className="input-exam-cons"
                  />
                </div>
                <div>
                  <Label htmlFor="heartRate">Frecuencia cardíaca</Label>
                  <Input
                    id="heartRate"
                    placeholder="ej: 90 bpm"
                    value={formData.physicalExam.heartRate}
                    onChange={(e) => onPhysicalExamChange("heartRate", e.target.value)}
                    className="input-exam-cons"
                  />
                </div>
                <div>
                  <Label htmlFor="respiratoryRate">Frecuencia respiratoria</Label>
                  <Input
                    id="respiratoryRate"
                    placeholder="ej: 25 rpm"
                    value={formData.physicalExam.respiratoryRate}
                    onChange={(e) => onPhysicalExamChange("respiratoryRate", e.target.value)}
                    className="input-exam-cons"
                  />
                </div>
                <div>
                  <Label htmlFor="bloodPressure">Presión arterial</Label>
                  <Input
                    id="bloodPressure"
                    placeholder="ej: Normal"
                    value={formData.physicalExam.bloodPressure}
                    onChange={(e) => onPhysicalExamChange("bloodPressure", e.target.value)}
                    className="input-exam-cons"
                  />
                </div>
                <div>
                  <Label htmlFor="bodyCondition">Condición corporal</Label>
                  <Input
                    id="bodyCondition"
                    placeholder="ej: Ideal (5/9)"
                    value={formData.physicalExam.bodyCondition}
                    onChange={(e) => onPhysicalExamChange("bodyCondition", e.target.value)}
                    className="input-exam-cons"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resultados de laboratorio */}
          <Card>
            <CardHeader>
              <CardTitle className="titulo-seccion-cons">
                <CheckCircle className="w-5 h-5 ico-lab-cons" />
                Resultados de Laboratorio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="cont-lab-cons">
                {formData.labResults.map((result, index) => (
                  <div key={index} className="fila-lab-cons">
                    <div>
                      <Label htmlFor={`test-${index}`}>Prueba</Label>
                      <Input
                        id={`test-${index}`}
                        placeholder="ej: Hemograma completo"
                        value={result.test}
                        onChange={(e) => onLabResultChange(index, "test", e.target.value)}
                        className="input-lab-cons"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`result-${index}`}>Resultado</Label>
                      <Input
                        id={`result-${index}`}
                        placeholder="ej: Normal"
                        value={result.result}
                        onChange={(e) => onLabResultChange(index, "result", e.target.value)}
                        className="input-lab-cons"
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label htmlFor={`reference-${index}`}>Referencia</Label>
                        <Input
                          id={`reference-${index}`}
                          placeholder="ej: Dentro de parámetros"
                          value={result.reference}
                          onChange={(e) => onLabResultChange(index, "reference", e.target.value)}
                          className="input-lab-cons"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => onRemoveArrayItem("labResults", index)}
                        disabled={formData.labResults.length === 1}
                        className="btn-eliminar-lab-cons"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={onAddLabResult} className="btn-agregar-cons">
                  <Plus className="w-4 h-4 mr-2" />
                  Añadir resultado de laboratorio
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Medicamentos */}
          <Card>
            <CardHeader>
              <CardTitle className="titulo-seccion-cons">
                <Pill className="w-5 h-5 ico-med-cons" />
                Medicamentos Prescritos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="cont-med-cons">
                {formData.medications.map((medication, index) => (
                  <div key={index} className="fila-med-cons">
                    <div>
                      <Label htmlFor={`med-name-${index}`}>Medicamento</Label>
                      <Input
                        id={`med-name-${index}`}
                        placeholder="ej: Antiparasitario interno"
                        value={medication.name}
                        onChange={(e) => onMedicationChange(index, "name", e.target.value)}
                        className="input-med-cons"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`med-dosage-${index}`}>Dosis</Label>
                      <Input
                        id={`med-dosage-${index}`}
                        placeholder="ej: 1 comprimido"
                        value={medication.dosage}
                        onChange={(e) => onMedicationChange(index, "dosage", e.target.value)}
                        className="input-med-cons"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`med-duration-${index}`}>Duración</Label>
                      <Input
                        id={`med-duration-${index}`}
                        placeholder="ej: 7 días"
                        value={medication.duration}
                        onChange={(e) => onMedicationChange(index, "duration", e.target.value)}
                        className="input-med-cons"
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label htmlFor={`med-instructions-${index}`}>Instrucciones</Label>
                        <Input
                          id={`med-instructions-${index}`}
                          placeholder="ej: Administrar con comida"
                          value={medication.instructions}
                          onChange={(e) => onMedicationChange(index, "instructions", e.target.value)}
                          className="input-med-cons"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => onRemoveArrayItem("medications", index)}
                        disabled={formData.medications.length === 1}
                        className="btn-eliminar-med-cons"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={onAddMedication} className="btn-agregar-cons">
                  <Plus className="w-4 h-4 mr-2" />
                  Añadir medicamento
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recomendaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="titulo-seccion-cons">
                <CheckCircle className="w-5 h-5 ico-rec-cons" />
                Recomendaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="cont-rec-cons">
                {formData.recommendations.map((recommendation, index) => (
                  <div key={index} className="fila-rec-cons">
                    <Input
                      placeholder="Escriba una recomendación..."
                      value={recommendation}
                      onChange={(e) => onArrayChange("recommendations", index, e.target.value)}
                      className="input-rec-cons"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => onRemoveArrayItem("recommendations", index)}
                      disabled={formData.recommendations.length === 1}
                      className="btn-eliminar-cons"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onAddArrayItem("recommendations")}
                  className="btn-agregar-cons"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Añadir recomendación
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Información adicional */}
          <Card>
            <CardHeader>
              <CardTitle className="titulo-seccion-cons">
                <Phone className="w-5 h-5 ico-cont-cons" />
                Información Adicional
              </CardTitle>
            </CardHeader>
            <CardContent className="cont-adicional-cons">
              <div>
                <Label htmlFor="urgency">Nivel de urgencia</Label>
                <Select value={formData.urgency} onValueChange={(value) => onInputChange("urgency", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="nivel-urgencia-cons">
                        <div className="punto-verde-cons"></div>
                        Baja - Consulta de rutina
                      </div>
                    </SelectItem>
                    <SelectItem value="normal">
                      <div className="nivel-urgencia-cons">
                        <div className="punto-amarillo-cons"></div>
                        Normal - Consulta estándar
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="nivel-urgencia-cons">
                        <div className="punto-naranja-cons"></div>
                        Alta - Requiere atención pronta
                      </div>
                    </SelectItem>
                    <SelectItem value="emergency">
                      <div className="nivel-urgencia-cons">
                        <div className="punto-rojo-cons"></div>
                        Emergencia - Atención inmediata
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="contactPhone">Teléfono de contacto</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => onInputChange("contactPhone", e.target.value)}
                  className="input-tel-cons"
                />
              </div>
            </CardContent>
          </Card>

          {/* Botones de acción */}
          <div className="botones-form-cons">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={onSubmit} disabled={!isFormValid()} className="btn-registrar-cons">
              Registrar Consulta
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FormularioNuevaConsulta