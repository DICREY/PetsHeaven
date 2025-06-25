import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { Calendar, Heart, Pill, Stethoscope, Clock, ArrowLeft, Printer, Plus } from "lucide-react"
import "../../../styles/InterfazAdmin/HistorialMedico/HistorialMedico.css"

// Importar los componentes
import ResumenMascota from "./ResumenMascota"
import TarjetaHistorial from "./TarjetaHistorial"
import ModalDetalleConsulta from "./ModalDetalleConsulta"
import FormularioNuevaConsulta from "./NuevaConsulta"
import GeneradorPDF from "./GeneradorPdf"
import ModalDetalleVacuna from "./ModalDetalleVacuna"
import ModalProximasCitas from "./ModalProximasCitas"
import ModalDetalleCita from "./ModalDetalleCita"
import FormularioNuevaCita from "./FormularioNuevaCita"
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import { HeaderAdmin } from '../../BarrasNavegacion/HeaderAdmin'

// Component
export default function PetMedicalHistory({ datas = {}, URL = '', imgPetDefault = '', tab }) {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [selectedConsultation, setSelectedConsultation] = useState(null)
  const [selectedVaccine, setSelectedVaccine] = useState(null)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isNewConsultationOpen, setIsNewConsultationOpen] = useState(false)
  const [isVaccineDialogOpen, setIsVaccineDialogOpen] = useState(false)
  const [isAppointmentsModalOpen, setIsAppointmentsModalOpen] = useState(false)
  const [isAppointmentDetailOpen, setIsAppointmentDetailOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState()
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Antiparasitario interno",
      dosage: "1 comprimido",
      frequency: "Cada 3 meses",
      lastGiven: "2024-01-15",
      nextDue: "2024-04-15",
      status: "activo",
    },
    {
      id: 2,
      name: "Antiparasitario externo",
      dosage: "1 pipeta",
      frequency: "Mensual",
      lastGiven: "2024-01-01",
      nextDue: "2024-02-01",
      status: "activo",
    },
  ])

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
  const navigate = useNavigate()
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
      batchNumber: "LOT2023-PV-4567",
      manufacturingDate: "2023-08-15",
      expirationDate: "2025-08-15",
      laboratory: "Laboratorios Veterinarios S.A.",
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
      batchNumber: "RAB2023-8901",
      manufacturingDate: "2023-09-20",
      expirationDate: "2026-09-20",
      laboratory: "BioVet Internacional",
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
      batchNumber: "LEISH2023-3456",
      manufacturingDate: "2023-04-10",
      expirationDate: "2025-04-10",
      laboratory: "Virbac España",
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
      batchNumber: "KC2023-7890",
      manufacturingDate: "2023-01-15",
      expirationDate: "2025-01-15",
      laboratory: "Zoetis España",
    },
  ]

  const upcomingAppointments = [
    {
      id: 1,
      date: "2024-02-15",
      time: "10:30",
      type: "Revisión dental",
      veterinarian: "Dr. Carlos Ruiz",
      specialty: "Odontología Veterinaria",
      description: "Revisión dental completa y limpieza profesional",
      notes: "Traer a Luna en ayunas desde la noche anterior",
      preparation: "Ayuno de 12 horas antes de la cita",
      status: "confirmed",
      clinicPhone: "+34 912 345 678",
      location: "Consulta 2 - Planta Baja",
      confirmationRequired: true,
    },
    {
      id: 2,
      date: "2024-06-15",
      time: "16:00",
      type: "Vacunación Leishmaniosis",
      veterinarian: "Dra. Ana López",
      specialty: "Medicina Preventiva",
      description: "Aplicación de vacuna anual contra leishmaniosis",
      notes: "Recordar traer cartilla de vacunación",
      status: "pending",
      clinicPhone: "+34 912 345 678",
      location: "Consulta 1 - Planta Baja",
      confirmationRequired: false,
    },
  ]

  // Agregar estado para el formulario de nueva cita
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)
  const [appointmentFormData, setAppointmentFormData] = useState({
    date: "",
    time: "",
    type: "",
    veterinarian: "",
    description: "",
    notes: "",
    preparation: "",
    contactPhone: petData.owner.phone,
    location: "",
    status: "programada",
    confirmationRequired: false,
  })

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

  // Actualizar la función handleAddAppointment
  const handleAddAppointment = () => {
    setIsNewAppointmentOpen(true)
    setIsAppointmentsModalOpen(false)
  }

  const handleEditAppointment = (appointment) => {
    // Lógica para editar cita
    console.log("Editar cita:", appointment)
  }

  const handleDeleteAppointment = (appointment) => {
    // Lógica para eliminar cita
    console.log("Eliminar cita:", appointment)
  }

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment)
    setIsAppointmentDetailOpen(true)
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

  const toggleMedicationStatus = (medicationId) => {
    setMedications((prev) =>
      prev.map((med) =>
        med.id === medicationId ? { ...med, status: med.status === "activo" ? "inactivo" : "activo" } : med,
      ),
    )
  }

  // Generar PDF usando el componente GeneradorPDF
  const { generatePDF } = GeneradorPDF({ petData, medicalHistory })

  // Agregar función para manejar cambios en el formulario de cita
  const handleAppointmentInputChange = (field, value) => {
    setAppointmentFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Agregar función para validar el formulario de cita
  const isAppointmentFormValid = () => {
    return (
      appointmentFormData.date &&
      appointmentFormData.time &&
      appointmentFormData.type &&
      appointmentFormData.veterinarian
    )
  }

  // Agregar función para enviar el formulario de cita
  const handleSubmitAppointment = () => {
    console.log("Nueva cita programada:", appointmentFormData)

    // Resetear formulario
    setAppointmentFormData({
      date: "",
      time: "",
      type: "",
      veterinarian: "",
      description: "",
      notes: "",
      preparation: "",
      contactPhone: petData.owner.phone,
      location: "",
      status: "programada",
      confirmationRequired: false,
    })

    setIsNewAppointmentOpen(false)
    alert("¡Cita programada exitosamente!")
  }

  useEffect(() => {
    if (!datas) navigate(-1)
  },[])

  return (

    <main className="contenedoradminhome">
        <NavBarAdmin />

        <section className="principaladminhome">
        <HeaderAdmin URL={URL} />
            <div className="cont-hist">
            
            {/* Botones superiores */}
            {console.log(datas)}
                <div className="cabecera-hist">
                    <button className="btn-atras-hist">
                    <ArrowLeft className="ico-hist" />
                    Atrás
                    </button>

                    <div className="acciones-hist">
                    <button className="btn-ppal-hist" onClick={() => setIsNewConsultationOpen(true)}>
                        <Plus className="ico-hist" />
                        Nueva Consulta
                    </button>
                    <button className="btn-impr-hist" onClick={generatePDF}>
                        <Printer className="ico-hist" />
                        Imprimir Historial
                    </button>
                    </div>
                </div>

                {/* Header con información básica de la mascota - Separado */}
                <div className="seccion-masc-hist">
                    <ResumenMascota cota petData={datas} setPetData={setPetData} imgDefault={imgPetDefault} />
                </div>

                {/* Contenido principal - Separado del header */}
                <div className="main-container-hist">
                    <div className="contenido-hist">
                    <div className="tabs-nav-hist">
                        <button
                        className={`tab-btn-hist ${selectedTab === "overview" ? "activo-hist" : ""}`}
                        onClick={() => setSelectedTab("overview")}
                        >
                        <Stethoscope className="ico-hist" />
                        Resumen
                        </button>
                        <button
                        className={`tab-btn-hist ${selectedTab === "history" ? "activo-hist" : ""}`}
                        onClick={() => setSelectedTab("history")}
                        >
                        <Calendar className="ico-hist" />
                        Historial
                        </button>
                        <button
                        className={`tab-btn-hist ${selectedTab === "vaccinations" ? "activo-hist" : ""}`}
                        onClick={() => setSelectedTab("vaccinations")}
                        >
                        <Heart className="ico-hist" />
                        Vacunas
                        </button>
                        <button
                        className={`tab-btn-hist ${selectedTab === "medications" ? "activo-hist" : ""}`}
                        onClick={() => setSelectedTab("medications")}
                        >
                        <Pill className="ico-hist" />
                        Medicamentos
                        </button>
                    </div>

                    {selectedTab === "overview" && (
                        <div className="resumen-hist">
                        {/* Solo Próximas citas */}
                        <div className="seccion-citas-hist">
                            <div className="cabecera-sec-hist">
                            <div className="titulo-sec-hist">
                                <h3 className="titulo-hist">
                                <Clock className="ico-citas-hist" />
                                Próximas Citas
                                </h3>
                                <button onClick={() => setIsAppointmentsModalOpen(true)} className="enlace-hist">
                                Ver todas →
                                </button>
                            </div>
                            </div>
                            <div className="contenido-sec-hist">
                            <div className="lista-citas-hist">
                                {upcomingAppointments.map((appointment, index) => (
                                <div
                                    key={index}
                                    className="tarjeta-cita-hist"
                                    onClick={() => handleAppointmentClick(appointment)}
                                >
                                    <div className="info-cita-hist">
                                    <div className="datos-cita-hist">
                                        <p className="tipo-cita-hist">{appointment.type}</p>
                                        <p className="vet-cita-hist">{appointment.veterinarian}</p>
                                    </div>
                                    <div className="fecha-hora-hist">
                                        <p className="fecha-cita-hist">{appointment.date}</p>
                                        <p className="hora-cita-hist">{appointment.time}</p>
                                    </div>
                                    </div>
                                </div>
                                ))}
                            </div>
                            </div>
                        </div>
                        </div>
                    )}

                    {selectedTab === "history" && (
                        <div className="historial-hist">
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
                        </div>
                    )}

                    {selectedTab === "vaccinations" && (
                        <div className="vacunas-hist">
                        <div className="lista-vacunas-hist">
                            {vaccinations.map((vaccine, index) => (
                            <div key={index} className="tarjeta-vac-hist" onClick={() => handleVaccineClick(vaccine)}>
                                <div className="contenido-vac-hist">
                                <div className="info-vac-hist">
                                    <div className="datos-vac-hist">
                                    <div className="cabecera-vac-hist">
                                        <Heart className="ico-vac-hist" />
                                        <h3 className="nombre-vac-hist">{vaccine.name}</h3>
                                        <span className="id-vac-hist">{vaccine.id}</span>
                                    </div>
                                    <p className="fecha-vac-hist">Última aplicación: {vaccine.date}</p>
                                    <p className="proxima-vac-hist">Próxima dosis: {vaccine.nextDue}</p>
                                    <p className="detalle-vac-hist">Clic para ver detalles completos →</p>
                                    </div>
                                    <span
                                    className={`estado-vac-hist ${
                                        vaccine.status === "up-to-date"
                                        ? "aldia-vac-hist"
                                        : vaccine.status === "due-soon"
                                            ? "proxima-vac-hist"
                                            : "vencida-vac-hist"
                                    }`}
                                    >
                                    {vaccine.status === "up-to-date"
                                        ? "Al día"
                                        : vaccine.status === "due-soon"
                                        ? "Próxima"
                                        : "Vencida"}
                                    </span>
                                </div>
                                </div>
                            </div>
                            ))}
                        </div>
                        <ModalDetalleVacuna
                            isOpen={isVaccineDialogOpen}
                            onClose={() => setIsVaccineDialogOpen(false)}
                            vaccine={selectedVaccine}
                        />
                        </div>
                    )}

                    {selectedTab === "medications" && (
                        <div className="medicamentos-hist">
                        <div className="lista-med-hist">
                            {medications.map((medication) => (
                            <div key={medication.id} className="tarjeta-med-hist">
                                <div className="contenido-med-hist">
                                <div className="info-med-hist">
                                    <div className="cabecera-med-hist">
                                    <h3 className="nombre-med-hist">{medication.name}</h3>
                                    <button
                                        onClick={() => toggleMedicationStatus(medication.id)}
                                        className={`estado-med-hist ${
                                        medication.status === "activo" ? "activo-med-hist" : "inactivo-med-hist"
                                        }`}
                                    >
                                        {medication.status === "activo" ? "Activo" : "Inactivo"}
                                    </button>
                                    </div>
                                    <div className="detalles-med-hist">
                                    <div className="dato-med-hist">
                                        <span className="etiqueta-med-hist">Dosis:</span>
                                        <p className="valor-med-hist">{medication.dosage}</p>
                                    </div>
                                    <div className="dato-med-hist">
                                        <span className="etiqueta-med-hist">Frecuencia:</span>
                                        <p className="valor-med-hist">{medication.frequency}</p>
                                    </div>
                                    <div className="dato-med-hist">
                                        <span className="etiqueta-med-hist">Próxima dosis:</span>
                                        <p className="valor-med-hist">{medication.nextDue}</p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            ))}
                        </div>
                        </div>
                    )}
                    </div>
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

                <ModalProximasCitas
                    isOpen={isAppointmentsModalOpen}
                    onClose={() => setIsAppointmentsModalOpen(false)}
                    appointments={upcomingAppointments}
                    onAddAppointment={handleAddAppointment}
                    onEditAppointment={handleEditAppointment}
                    onDeleteAppointment={handleDeleteAppointment}
                    onAppointmentClick={handleAppointmentClick}
                />

                <ModalDetalleCita
                    isOpen={isAppointmentDetailOpen}
                    onClose={() => setIsAppointmentDetailOpen(false)}
                    appointment={selectedAppointment}
                />

                {/* Agregar el componente FormularioNuevaCita antes del cierre del return */}
                <FormularioNuevaCita
                    isOpen={isNewAppointmentOpen}
                    onClose={() => setIsNewAppointmentOpen(false)}
                    petData={petData}
                    formData={appointmentFormData}
                    onInputChange={handleAppointmentInputChange}
                    onSubmit={handleSubmitAppointment}
                    isFormValid={isAppointmentFormValid}
                />
                </div>
        </section>
    </main>
  )
}
