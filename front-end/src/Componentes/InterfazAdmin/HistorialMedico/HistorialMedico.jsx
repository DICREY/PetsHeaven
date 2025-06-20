"use client"

import { useState } from "react"
import { Calendar, Heart, Pill, Stethoscope, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import "./styles/principal.css"
import { ArrowLeft, Printer, Plus } from "lucide-react"

// Importar los nuevos componentes
import ResumenMascota from "./components/resumen-mascota"
import TarjetaHistorial from "./components/tarjeta-historial"
import ModalDetalleConsulta from "./components/modal-detalle-consulta"
import FormularioNuevaConsulta from "./components/formulario-nueva-consulta"
import GeneradorPDF from "./components/generador-pdf"
import ModalDetalleVacuna from "./components/modal-detalle-vacuna"

export default function PetMedicalHistory() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [selectedConsultation, setSelectedConsultation] = useState(null)
  const [selectedVaccine, setSelectedVaccine] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isNewConsultationOpen, setIsNewConsultationOpen] = useState(false)
  const [isVaccineDialogOpen, setIsVaccineDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState()

  const [petData, setPetData] = useState({
    name: "Luna",
    species: "Perro",
    breed: "Golden Retriever",
    color: "Dorado",
    food: "Royal Canin Adult",
    weight: "28 kg",
    reproductiveStatus: "Esterilizada",
    gender: "Hembra",
    birthDate: "2021-03-15",
    owner: {
      name: "María González",
      phone: "+34 612 345 678",
      email: "maria.gonzalez@email.com",
      address: "Calle Mayor 123, Madrid",
    },
    photo: "/placeholder.svg?height=120&width=120",
  })

  const [formData, setFormData] = useState({
    consultationType: "",
    veterinarian: "",
    time: "",
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
    contactPhone: petData.owner.phone,
  })

  // Datos del historial médico
  const medicalHistory = [
    {
      id: 1,
      date: "2024-01-15",
      time: "10:30",
      type: "Consulta General",
      veterinarian: "Dr. Carlos Ruiz",
      diagnosis: "Revisión rutinaria - Estado saludable",
      treatment: "Ninguno requerido",
      notes: "Mascota en excelente estado. Continuar con dieta actual.",
      status: "completed",
      symptoms: ["Ninguno reportado", "Comportamiento normal", "Apetito normal"],
      physicalExam: {
        temperature: "38.5°C",
        weight: "28 kg",
        heartRate: "90 bpm",
        respiratoryRate: "25 rpm",
        bloodPressure: "Normal",
        bodyCondition: "Ideal (5/9)",
      },
      labResults: [
        { test: "Hemograma completo", result: "Normal", reference: "Dentro de parámetros" },
        { test: "Química sanguínea", result: "Normal", reference: "Todos los valores normales" },
      ],
      medications: [
        {
          name: "Antiparasitario interno",
          dosage: "1 comprimido",
          duration: "Dosis única",
          instructions: "Administrar con comida",
        },
      ],
      recommendations: [
        "Continuar con dieta actual de alta calidad",
        "Ejercicio diario moderado (30-45 minutos)",
        "Próxima revisión en 6 meses",
        "Mantener higiene dental regular",
      ],
      nextAppointment: "2024-07-15",
      images: ["/placeholder.svg?height=200&width=300"],
    },
    {
      id: 2,
      date: "2023-12-10",
      time: "14:15",
      type: "Vacunación",
      veterinarian: "Dra. Ana López",
      diagnosis: "Vacunación anual",
      treatment: "Vacuna polivalente + Antirrábica",
      notes: "Próxima vacunación en diciembre 2024",
      status: "completed",
      symptoms: ["Ninguno", "Animal en buen estado general"],
      physicalExam: {
        temperature: "38.2°C",
        weight: "27.5 kg",
        heartRate: "85 bpm",
        respiratoryRate: "22 rpm",
        bloodPressure: "Normal",
        bodyCondition: "Ideal (5/9)",
      },
      labResults: [],
      medications: [
        { name: "Vacuna Polivalente", dosage: "1 ml", duration: "Dosis única", instructions: "Vía subcutánea" },
        { name: "Vacuna Antirrábica", dosage: "1 ml", duration: "Dosis única", instructions: "Vía subcutánea" },
      ],
      recommendations: [
        "Observar por 24-48 horas post-vacunación",
        "Evitar baños por 48 horas",
        "Contactar si presenta reacciones adversas",
        "Próxima vacunación en 12 meses",
      ],
      nextAppointment: "2024-12-10",
      images: [],
    },
    {
      id: 3,
      date: "2023-11-22",
      time: "16:45",
      type: "Emergencia",
      veterinarian: "Dr. Miguel Torres",
      diagnosis: "Gastroenteritis leve",
      treatment: "Dieta blanda + Probióticos",
      notes: "Recuperación completa en 5 días",
      status: "completed",
      symptoms: ["Vómitos ocasionales", "Diarrea leve", "Pérdida de apetito", "Letargo"],
      physicalExam: {
        temperature: "39.1°C",
        weight: "27 kg",
        heartRate: "110 bpm",
        respiratoryRate: "28 rpm",
        bloodPressure: "Ligeramente elevada",
        bodyCondition: "Buena (4/9)",
      },
      labResults: [
        { test: "Análisis fecal", result: "Negativo para parásitos", reference: "Sin patógenos detectados" },
        { test: "Hemograma", result: "Leve leucocitosis", reference: "Indicativo de inflamación leve" },
      ],
      medications: [
        {
          name: "Probióticos",
          dosage: "1 sobre",
          duration: "7 días",
          instructions: "Mezclar con comida, 2 veces al día",
        },
        {
          name: "Dieta blanda",
          dosage: "Según necesidad",
          duration: "3-5 días",
          instructions: "Arroz hervido con pollo",
        },
      ],
      recommendations: [
        "Dieta blanda por 3-5 días",
        "Agua fresca disponible siempre",
        "Monitorear síntomas",
        "Revisión en 5 días si no mejora",
        "Evitar cambios bruscos en la dieta",
      ],
      nextAppointment: "2023-11-27",
      images: ["/placeholder.svg?height=200&width=300"],
    },
  ]

  const vaccinations = [
    {
      id: "VAC001",
      name: "Polivalente",
      date: "2023-12-10",
      nextDue: "2024-12-10",
      status: "up-to-date",
      category: "Vacuna Core",
      description:
        "Vacuna polivalente que protege contra las principales enfermedades virales caninas incluyendo moquillo, hepatitis, parvovirus, parainfluenza y adenovirus.",
      technicalDescription:
        "Vacuna de virus vivos modificados y virus inactivados. Contiene antígenos purificados de Distemper, Hepatitis/Adenovirus tipo 2, Parvovirus, Parainfluenza. Formulación liofilizada con adyuvante de hidróxido de aluminio.",
      sideEffects: [
        "Dolor leve en el sitio de inyección",
        "Letargo temporal (24-48 horas)",
        "Pérdida de apetito leve",
        "Fiebre baja ocasional",
        "Reacciones alérgicas (raras)",
      ],
      dosageByAge: [
        {
          ageRange: "6-8 semanas",
          dosage: "1 ml subcutáneo",
          frequency: "Primera dosis",
          notes: "Inicio del protocolo de vacunación",
        },
        {
          ageRange: "10-12 semanas",
          dosage: "1 ml subcutáneo",
          frequency: "Segunda dosis",
          notes: "Refuerzo necesario para inmunidad completa",
        },
        {
          ageRange: "14-16 semanas",
          dosage: "1 ml subcutáneo",
          frequency: "Tercera dosis",
          notes: "Completar serie primaria",
        },
        {
          ageRange: "Adultos",
          dosage: "1 ml subcutáneo",
          frequency: "Anual",
          notes: "Refuerzo anual recomendado",
        },
      ],
      batchNumber: "LOT2023-PV-4567",
      manufacturingDate: "2023-08-15",
      expirationDate: "2025-08-15",
      laboratory: "Laboratorios Veterinarios S.A.",
      countryOfOrigin: "España",
      storageTemperature: "2-8°C",
      price: "45.00€",
    },
    {
      id: "VAC002",
      name: "Antirrábica",
      date: "2023-12-10",
      nextDue: "2024-12-10",
      status: "up-to-date",
      category: "Vacuna Obligatoria",
      description:
        "Vacuna antirrábica inactivada que proporciona protección contra el virus de la rabia. Obligatoria por ley en la mayoría de jurisdicciones.",
      technicalDescription:
        "Vacuna de virus inactivado cultivado en células Vero. Contiene virus de la rabia cepa Pasteur RIV con adyuvante de hidróxido de aluminio y tiomersal como conservante.",
      sideEffects: [
        "Hinchazón leve en el sitio de inyección",
        "Letargo por 24-48 horas",
        "Pérdida temporal del apetito",
        "Reacciones alérgicas severas (muy raras)",
      ],
      dosageByAge: [
        {
          ageRange: "12-16 semanas",
          dosage: "1 ml subcutáneo",
          frequency: "Dosis única inicial",
          notes: "Primera vacunación antirrábica",
        },
        {
          ageRange: "Adultos",
          dosage: "1 ml subcutáneo",
          frequency: "Anual",
          notes: "Refuerzo anual obligatorio",
        },
      ],
      batchNumber: "RAB2023-8901",
      manufacturingDate: "2023-09-20",
      expirationDate: "2026-09-20",
      laboratory: "BioVet Internacional",
      countryOfOrigin: "Francia",
      storageTemperature: "2-8°C",
      price: "25.00€",
    },
    {
      id: "VAC003",
      name: "Leishmaniosis",
      date: "2023-06-15",
      nextDue: "2024-06-15",
      status: "due-soon",
      category: "Vacuna Específica",
      description:
        "Vacuna específica contra la leishmaniosis canina, enfermedad parasitaria transmitida por flebótomos. Especialmente importante en zonas endémicas.",
      technicalDescription:
        "Vacuna recombinante que contiene proteína LiESAp-MDP purificada de Leishmania infantum con adyuvante QA-21 saponina. Estimula respuesta inmune celular específica.",
      sideEffects: [
        "Dolor moderado en el sitio de inyección",
        "Formación de nódulo temporal",
        "Letargo leve",
        "Pérdida de apetito temporal",
        "Fiebre baja (rara)",
      ],
      dosageByAge: [
        {
          ageRange: "6 meses en adelante",
          dosage: "1 ml subcutáneo",
          frequency: "Serie de 3 dosis",
          notes: "Dosis separadas por 3 semanas",
        },
        {
          ageRange: "Adultos",
          dosage: "1 ml subcutáneo",
          frequency: "Anual",
          notes: "Refuerzo anual en zonas endémicas",
        },
      ],
      batchNumber: "LEISH2023-3456",
      manufacturingDate: "2023-04-10",
      expirationDate: "2025-04-10",
      laboratory: "Virbac España",
      countryOfOrigin: "España",
      storageTemperature: "2-8°C",
      price: "85.00€",
    },
    {
      id: "VAC004",
      name: "Tos de las perreras",
      date: "2023-03-20",
      nextDue: "2024-03-20",
      status: "overdue",
      category: "Vacuna Opcional",
      description:
        "Vacuna intranasal contra la traqueobronquitis infecciosa canina (tos de las perreras). Protege contra Bordetella bronchiseptica y Parainfluenza.",
      technicalDescription:
        "Vacuna de bacterias vivas atenuadas (Bordetella bronchiseptica) y virus vivos modificados (Parainfluenza). Administración intranasal para inmunidad local rápida.",
      sideEffects: [
        "Estornudos leves por 2-3 días",
        "Secreción nasal temporal",
        "Tos leve ocasional",
        "Letargo mínimo",
      ],
      dosageByAge: [
        {
          ageRange: "3 semanas en adelante",
          dosage: "0.5 ml intranasal",
          frequency: "Dosis única",
          notes: "Protección rápida en 72 horas",
        },
        {
          ageRange: "Adultos",
          dosage: "0.5 ml intranasal",
          frequency: "Anual",
          notes: "Refuerzo anual recomendado",
        },
      ],
      batchNumber: "KC2023-7890",
      manufacturingDate: "2023-01-15",
      expirationDate: "2025-01-15",
      laboratory: "Zoetis España",
      countryOfOrigin: "Bélgica",
      storageTemperature: "2-8°C",
      price: "35.00€",
    },
  ]

  const medications = [
    {
      name: "Antiparasitario interno",
      dosage: "1 comprimido",
      frequency: "Cada 3 meses",
      lastGiven: "2024-01-15",
      nextDue: "2024-04-15",
    },
    {
      name: "Antiparasitario externo",
      dosage: "1 pipeta",
      frequency: "Mensual",
      lastGiven: "2024-01-01",
      nextDue: "2024-02-01",
    },
  ]

  const upcomingAppointments = [
    {
      date: "2024-02-15",
      time: "10:30",
      type: "Revisión dental",
      veterinarian: "Dr. Carlos Ruiz",
    },
    {
      date: "2024-06-15",
      time: "16:00",
      type: "Vacunación Leishmaniosis",
      veterinarian: "Dra. Ana López",
    },
  ]

  // Funciones para manejar cambios en formularios
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePhysicalExamChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      physicalExam: {
        ...prev.physicalExam,
        [field]: value,
      },
    }))
  }

  const handleArrayChange = (arrayName, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (arrayName) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], ""],
    }))
  }

  const removeArrayItem = (arrayName, index) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }))
  }

  const handleLabResultChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      labResults: prev.labResults.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const handleMedicationChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      medications: prev.medications.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const addLabResult = () => {
    setFormData((prev) => ({
      ...prev,
      labResults: [...prev.labResults, { test: "", result: "", reference: "" }],
    }))
  }

  const addMedication = () => {
    setFormData((prev) => ({
      ...prev,
      medications: [...prev.medications, { name: "", dosage: "", duration: "", instructions: "" }],
    }))
  }

  const handleSubmitConsultation = () => {
    console.log("Nueva consulta agendada:", {
      date: selectedDate,
      ...formData,
    })

    // Resetear formulario
    setFormData({
      consultationType: "",
      veterinarian: "",
      time: "",
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
      contactPhone: petData.owner.phone,
    })
    setSelectedDate(undefined)
    setIsNewConsultationOpen(false)
    alert("¡Consulta registrada exitosamente!")
  }

  const isFormValid = () => {
    return (
      selectedDate && formData.consultationType && formData.veterinarian && formData.time && formData.diagnosis.trim()
    )
  }

  const handleVaccineClick = (vaccine) => {
    setSelectedVaccine(vaccine)
    setIsVaccineDialogOpen(true)
  }

  // Generar PDF usando el componente GeneradorPDF
  const { generatePDF } = GeneradorPDF({ petData, medicalHistory })

  return (
    <div className="cont-hist">
      {/* Botones superiores */}
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Atrás
        </Button>

        <div className="flex gap-3">
          <Button className="btn-ppal flex items-center gap-2" onClick={() => setIsNewConsultationOpen(true)}>
            <Plus className="w-4 h-4" />
            Nueva Consulta
          </Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={generatePDF}>
            <Printer className="w-4 h-4" />
            Imprimir Historial
          </Button>
        </div>
      </div>

      <div className="cont-ppal">
        {/* Header con información básica de la mascota */}
        <ResumenMascota petData={petData} setPetData={setPetData} />

        {/* Tabs para diferentes secciones */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 nav-tabs">
            <TabsTrigger value="overview" className="flex items-center gap-2 btn-tab">
              <Stethoscope className="w-4 h-4" />
              Resumen
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2 btn-tab">
              <Calendar className="w-4 h-4" />
              Historial
            </TabsTrigger>
            <TabsTrigger value="vaccinations" className="flex items-center gap-2 btn-tab">
              <Heart className="w-4 h-4" />
              Vacunas
            </TabsTrigger>
            <TabsTrigger value="medications" className="flex items-center gap-2 btn-tab">
              <Pill className="w-4 h-4" />
              Medicamentos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="espacio-tabs">
            {/* Próximas citas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 ico-citas" />
                  Próximas Citas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="espacio-citas">
                  {upcomingAppointments.map((appointment, index) => (
                    <div key={index} className="tarj-cita">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900">{appointment.type}</p>
                          <p className="text-gray-600">{appointment.veterinarian}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium fecha-cita">{appointment.date}</p>
                          <p className="text-gray-600">{appointment.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="espacio-tabs">
            {medicalHistory.map((record) => (
              <TarjetaHistorial
                key={record.id}
                record={record}
                onClick={(record) => {
                  setSelectedConsultation(record)
                  setIsDialogOpen(true)
                }}
              />
            ))}

            <ModalDetalleConsulta
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              consultation={selectedConsultation}
            />
          </TabsContent>

          <TabsContent value="vaccinations" className="espacio-tabs">
            <div className="grid gap-4">
              {vaccinations.map((vaccine, index) => (
                <Card key={index} className="tarj-vac cursor-pointer" onClick={() => handleVaccineClick(vaccine)}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Heart className="w-5 h-5 text-green-600" />
                          <h3 className="font-semibold text-lg">{vaccine.name}</h3>
                          <span className="texto-id-vac">{vaccine.id}</span>
                        </div>
                        <p className="text-gray-600">Última aplicación: {vaccine.date}</p>
                        <p className="text-gray-600">Próxima dosis: {vaccine.nextDue}</p>
                        <p className="enlace-det-vac">Clic para ver detalles completos →</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          vaccine.status === "up-to-date"
                            ? "est-aldia"
                            : vaccine.status === "due-soon"
                              ? "est-prox"
                              : "est-venc"
                        }`}
                      >
                        {vaccine.status === "up-to-date"
                          ? "Al día"
                          : vaccine.status === "due-soon"
                            ? "Próxima"
                            : "Vencida"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ModalDetalleVacuna
              isOpen={isVaccineDialogOpen}
              onClose={() => setIsVaccineDialogOpen(false)}
              vaccine={selectedVaccine}
            />
          </TabsContent>

          <TabsContent value="medications" className="espacio-tabs">
            <div className="grid gap-4">
              {medications.map((medication, index) => (
                <Card key={index} className="tarj-med">
                  <CardContent className="p-4">
                    <div className="espacio-med">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg">{medication.name}</h3>
                        <span className="est-activo">Activo</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Dosis:</span>
                          <p className="text-gray-900">{medication.dosage}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Frecuencia:</span>
                          <p className="text-gray-900">{medication.frequency}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Próxima dosis:</span>
                          <p className="text-gray-900">{medication.nextDue}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Formulario para nueva consulta completa */}
      <FormularioNuevaConsulta
        isOpen={isNewConsultationOpen}
        onClose={() => setIsNewConsultationOpen(false)}
        petData={petData}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        formData={formData}
        onInputChange={handleInputChange}
        onPhysicalExamChange={handlePhysicalExamChange}
        onArrayChange={handleArrayChange}
        onLabResultChange={handleLabResultChange}
        onMedicationChange={handleMedicationChange}
        onAddArrayItem={addArrayItem}
        onRemoveArrayItem={removeArrayItem}
        onAddLabResult={addLabResult}
        onAddMedication={addMedication}
        onSubmit={handleSubmitConsultation}
        isFormValid={isFormValid}
      />
    </div>
  )
}
