// Librarys 
import React, { useContext, useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { Calendar, Heart, Pill, Stethoscope, Clock, ArrowLeft, Printer, Plus, Trash2 } from "lucide-react"

// Imports
import ResumenMascota from "./ResumenMascota"
import TarjetaHistorial from "./TarjetaHistorial"
import ModalDetalleConsulta from "./ModalDetalleConsulta"
import FormularioNuevaConsulta from "./NuevaConsulta"
import GeneradorPDF from "./GeneradorPdf"
import ModalDetalleVacuna from "./ModalDetalleVacuna"
import ModalProximasCitas from "./ModalProximasCitas"
import ModalDetalleCita from "./ModalDetalleCita"
import FormularioNuevaCita from "./FormularioNuevaCita"
import AppointmentForm from "../FormulariosAdmin/AgendarCita"
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import { HeaderAdmin } from '../../BarrasNavegacion/HeaderAdmin'
import { ModifyData, PostData } from "../../Varios/Requests"
import { errorStatusHandler, formatDate, hourTraductor } from "../../Varios/Util"
import { Notification } from "../../Global/Notifys"
import { capitalize } from "../../../Utils/Utils"
import { AuthContext } from "../../../Contexts/Contexts"

// Import styles 
import "../../../styles/InterfazAdmin/HistorialMedico/HistorialMedico.css"

// Component
export default function PetMedicalHistory({ datas = {}, URL = '', imgPetDefault = '', tab = 'overview' }) {
  const [ selectedTab, setSelectedTab ] = useState('overview')
  const [ selectedConsultation, setSelectedConsultation ] = useState(null)
  const [ selectedVaccine, setSelectedVaccine ] = useState(null)
  const [ selectedAppointment, setSelectedAppointment ] = useState(null)
  const [ isDialogOpen, setIsDialogOpen ] = useState(false)
  const [ isNewConsultationOpen, setIsNewConsultationOpen ] = useState(false)
  const [ isVaccineDialogOpen, setIsVaccineDialogOpen ] = useState(false)
  const [ isAppointmentsModalOpen, setIsAppointmentsModalOpen ] = useState(false)
  const [ isAppointmentDetailOpen, setIsAppointmentDetailOpen ] = useState(false)
  const [ selectedDate, setSelectedDate ] = useState()
  const [ petData, setPetData ] = useState()
  const [ notify, setNotify ] = useState(null)
  const [ appointments, setAppointments] = useState()
  const [ medicalHistory, setMedicalHistory ] = useState()
  const [ vaccinations, setVaccinations ] = useState()
  const [ isNewAppointmentOpen, setIsNewAppointmentOpen ] = useState(false)
  const [ medications, setMedications ] = useState([
    {
      id: 1,
      name: "Antiparasitario interno",
      dosage: "1 comprimido",
      frequency: "Cada 3 meses",
      lastGiven: "2024-01-15",
      nextDue: "2024-04-15",
      status: "activo",
    }
  ])


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
    contactPhone: petData?.cel_per,
  })

  // Vars 
  const navigate = useNavigate()
  const { admin } = useContext(AuthContext)

  // Agregar estado para el formulario de nueva cita
  const [appointmentFormData, setAppointmentFormData] = useState({
    date: "",
    time: "",
    type: "",
    veterinarian: "",
    description: "",
    notes: "",
    preparation: "",
    contactPhone: petData?.cel_per,
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
      contactPhone: petData?.cel_per,
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
      contactPhone: petData?.cel_per,
      location: "",
      status: "programada",
      confirmationRequired: false,
    })

    setIsNewAppointmentOpen(false)
    alert("¡Cita programada exitosamente!")
  }

  const GetAppointment = async (nom,doc) => {
    try {
      const data = await PostData(`${URL}/appointment/pet`, {
        nom_mas: nom,
        doc_per: doc
      })
      if (data?.result) {
        const appMap = data?.result?.map((app) => ({
          id: app.id_cit,
          date: app.fec_cit? formatDate(app.fec_cit): '0000/00/00',
          time: app.hor_ini_cit? hourTraductor(app.hor_ini_cit): '00:00',
          type: app.nom_tip_ser,
          veterinarian: `Dr. ${app.vet_nom_per} ${app.vet_ape_per}`,
          specialty: app.vet_esp,
          description: app.des_ser,
          notes: "Traer a Luna en ayunas desde la noche anterior",
          preparation: "Ayuno de 12 horas antes de la cita",
          status: app.sta_mas,
          clinicPhone: app.vet_cel_per,
          location: app.nom_con,
          confirmationRequired: app.est_cit === 'PENDIENTE'?1:0,
        }))
        setAppointments(appMap)
      }
    } catch (err) {
        const message = errorStatusHandler(err)
        setNotify({
            title: 'Error',
            message: `${message}`,
            close: setNotify
        })
    }
  }

  const GetAppointmentCompleted = async (nom,doc) => {
    try {
      const data = await PostData(`${URL}/appointment/pet/completed`, {
        nom_mas: nom,
        doc_per: doc
      })
      if (data?.result) {
        const appComMap = data?.result?.map((app, index) => ({
          id: index,
          date: app.fec_cit? formatDate(app.fec_cit):'0000/00/00',
          time: app.hor_ini_cit? hourTraductor(app.hor_ini_cit): '00:00',
          type: app.nom_cat,
          veterinarian: `${app.vet_nom_per} ${app.vet_ape_per}`,
          diagnosis: app.des_pro,
          treatment: "Ninguno requerido",
          notes: "Mascota en excelente estado. Continuar con dieta actual.",
          status: app.est_cit? capitalize(app.est_cit): 'Completada',
          symptoms: ["Ninguno reportado", "Comportamiento normal", "Apetito normal"],
          physicalExam: {
            temperature: "38.5°C",
            weight: app.pes_mas,
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
        }))
        setMedicalHistory(appComMap)
      }
    } catch (err) {
        const message = errorStatusHandler(err)
        setNotify({
            title: 'Error',
            message: `${message}`,
            close: setNotify
        })
    }
  }
  const GetAppointmentVaccines = async (nom,doc) => {
    try {
      const data = await PostData(`${URL}/appointment/pet/vaccine`, {
        nom_mas: nom,
        doc_per: doc
      })
      if (data?.result) {
        const appVaccMap = data?.result?.map((vacc) => ({
          id: vacc.id_cit,
          name: vacc.nom_vac,
          date: vacc.fec_cit? formatDate(vacc.fec_cit): '0000/00/00',
          nextDue: vacc.fre_vac? formatDate(new Date().setDate(new Date().getDay() + Number(vacc.fre_vac))):'No ahí mas dosis por aplicar',
          status: "up-to-date",
          category: vacc.cat_vac,
          description: vacc.des_vac,
          technicalDescription: vacc.des_vac,
          batchNumber: vacc.lot_vac,
          manufacturingDate: vacc.fec_cre_vac? formatDate(vacc.fec_cre_vac): '0000/00/00',
          expirationDate: vacc.fec_ven_vac? formatDate(vacc.fec_ven_vac): '0000/00/00',
          laboratory: "Laboratorios Veterinarios S.A.",
        }))
        setVaccinations(appVaccMap)
      }
    } catch (err) {
        const message = errorStatusHandler(err)
        setNotify({
            title: 'Error',
            message: `${message}`,
            close: setNotify
        })
    }
  }

  // Request for Modify Data
  const modify = async () => {
      setNotify({
          title: 'Validando...',
          message: 'Verificando datos proporcionados',
          load: 1
      })
      try {
          const imgUrl = await uploadImg(modPet.img,'mascotas')
          const mod = await ModifyData(`${mainURL}/modify`, {...modPet, img_mas: imgUrl})
          setNotify(null)
          if (mod?.modify) {
              setNotify({
                  title: 'Modificación exitosa',
                  message: 'Los datos de la mascota han sido modificados exitosamente',
                  close: setNotify
              })
              setTimeout(() => navigate(-1),2000)
          }
      } catch (err) {
          setNotify(null)
          const message = errorStatusHandler(err)
          setNotify({
              title: 'Error',
              message: `${message}`,
              close: setNotify
          })
      }
    }

  useEffect(() => {
    if (!datas?.nom_mas) {
      navigate(-1)
    } else {
      setPetData(datas)
      GetAppointment(datas?.nom_mas, datas?.doc_per)
      GetAppointmentCompleted(datas?.nom_mas, datas?.doc_per)
      GetAppointmentVaccines(datas?.nom_mas, datas?.doc_per)
    }
  },[])

  return (

    <main className="contenedoradminhome">
        <NavBarAdmin />

        <section className="principaladminhome">
        <HeaderAdmin URL={URL} />
            <section className="cont-hist">
            
            {/* Botones superiores */}
              <nav className="cabecera-hist">
                  <button className="BackBtn" onClick={() => navigate(-1)}>
                  <ArrowLeft className="ico-hist" />
                  Atrás
                  </button>

                  <div className="acciones-hist">
                    <button className="EditBtn" onClick={() => setIsNewConsultationOpen(1)}>
                        <Plus className="ico-hist" />
                        Nueva Consulta
                    </button>
                    <button className="BackBtn" onClick={generatePDF}>
                        <Printer className="ico-hist" />
                        Imprimir Historial
                    </button>
                  </div>
              </nav>

                {/* Header con información básica de la mascota - Separado */}
              <section className="seccion-masc-hist">
                { petData && (<ResumenMascota
                    petData={datas}
                    setPetData={setPetData}
                    imgDefault={imgPetDefault}
                    URL={URL}
                    setNotify={setNotify}
                  />)
                }
              </section>

                {/* Contenido principal - Separado del header */}
                <section className="main-container-hist">
                    <section className="contenido-hist">
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
                      <section className="resumen-hist">
                        {/* Solo Próximas citas */}
                        <section className="seccion-citas-hist">
                          <header className="cabecera-sec-hist">
                            <div className="titulo-sec-hist">
                              <h3 className="titulo-hist">
                                <Clock className="ico-citas-hist" />
                                Próximas Citas
                              </h3>
                              <button onClick={() => setIsAppointmentsModalOpen(true)} className="enlace-hist">
                                Ver todas →
                              </button>
                            </div>
                          </header>
                          <section className="contenido-sec-hist">
                            <div className="lista-citas-hist">
                              {appointments?.map((appointment, index) => (
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
                          </section>
                        </section>
                      </section>
                    )}

                    {selectedTab === "history" && (
                        <div className="historial-hist">
                        {medicalHistory?.map((record) => (
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
                            {vaccinations?.map((vaccine, index) => (
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
                    </section>
                </section>

                {/* Formulario para nueva consulta completa */}
                {isNewConsultationOpen && (
                  <FormularioNuevaConsulta
                      close={() => setIsNewConsultationOpen(false)}
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
                )}

                <ModalProximasCitas
                    isOpen={isAppointmentsModalOpen}
                    onClose={() => setIsAppointmentsModalOpen(false)}
                    appointments={appointments}
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
                </section>
        </section>
        {notify && (
            <Notification
                {...notify}
            />
        )}
    </main>
  )
}
