import React, { useContext, useEffect, useState } from "react"
import { Calendar, Users, Heart, Clock, ExternalLink, Plus, User, Dog } from "lucide-react"
import { useNavigate } from 'react-router-dom'

// Imports
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { HeaderAdmin } from '../BarrasNavegacion/HeaderAdmin'
import { GetData, PostData } from "../Varios/Requests"
import { Notification } from "../Global/Notifys"
import { errorStatusHandler, hourTraductor } from '../Varios/Util'
import { AuthContext } from "../../Contexts/Contexts"
import { ReqFunction } from "../../Utils/Utils"
import { FormularioServicio } from "./Servicios/Forms/Forms"
import AppointmentForm from "../InterfazAdmin/FormulariosAdmin/AgendarCita"

import "../../styles/InterfazAdmin/Home.css"
import RazasFrecuentesChart from "../Global/graff"

// Component 
export default function VeterinaryDashboard({ URL = '', setPetSelect }) {
  // Dynamic vars 
  const [ appoint, setAppoint ] = useState()
  const [ infoGeneral, setInfoGeneral ] = useState()
  const [ notify, setNotify ] = useState()
  const [ servicesForm, setServicesForm ] = useState()
  const [ petStats, setPetStats ] = useState()

  // Vars 
  const mainUrl = `${URL}/appointment`
  const navigate = useNavigate()
  const { admin } = useContext(AuthContext)
  const stats = [
    { title: "Citas Hoy", value: infoGeneral?.cit || '0', icon: Calendar, color: "azul" },
    { title: "Pacientes Activos", value: infoGeneral?.mas || '0', icon: Heart, color: "verde" },
    { title: "Doctores Disponibles", value: infoGeneral?.doc || '0', icon: Users, color: "morado" },
    { title: "Emergencias", value: infoGeneral?.emg || '0', icon: Clock, color: "rojo" },
  ]

  const saveService = async (data) => {
    try {
      setNotify({
        title: 'Guardando',
        message: 'Guardando servicio...',
        load: 1
      })

      const create = await PostData(`${URL}/service/register`, data)
      if (create?.success) {
        setNotify({
          title: 'Éxito',
          message: `servicio agregado correctamente`,
          close: setNotify
        })
        setMostrarFormulario(null)
      }

    } catch (err) {
      setNotify(null)
      const message = errorStatusHandler(err)
      setNotify({
        title: 'Error',
        message: message,
        close: setNotify
      })
    }
  }

  const getAppoint = async () => {
    try {
      const data = await GetData(`${mainUrl}/general`)
      setNotify(null)
      if (data) setAppoint(data)
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
  

  const handlePetSelect = (data = {}) => {
    const pet = {
      nom_mas: data.nom_mas,
      esp_mas: data.esp_mas,
      col_mas: data.col_mas,
      raz_mas: data.raz_mas,
      ali_mas: data.ali_mas,
      fec_nac_mas: data.fec_nac_mas,
      pes_mas: data.pes_mas,
      gen_mas: data.gen_mas,
      est_rep_mas: data.est_rep_mas,
      fot_mas: data.fot_mas,
      doc_per: data.prop_doc_per,
      nom_per: data.prop_nom_per,
      ape_per: data.prop_ape_per,
      email_per: data.prop_email_per,
      cel_per: data.prop_cel_per
    }
    setPetSelect(pet)
    navigate('/pets/details')
  }

  useEffect(() => {
    ReqFunction(
      `${URL}/global/info/general`,
      GetData,
      setNotify,
      setInfoGeneral
    )
    getAppoint()
  }, [])

  // Form flotante agendar cita 
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  return (
    <main className="contenedoradminhome">
      <NavBarAdmin />
      <main className="tablero-admin">
        {/* Header del dashboard */}
        <HeaderAdmin URL={URL} />

        <main className="contenido-principal-admin">
          {/* Stats Grid */}
          <section className="estadisticas-grid-admin" aria-label="Estadísticas del día">
            {stats?.map((stat, index) => (
              <article key={index} className={`tarjeta-estadistica-admin ${stat.color}-admin`}>
                <header className="cabecera-estadistica-admin">
                  <stat.icon className="icon" aria-hidden="true" />
                </header>
                  <h2>{stat.value}</h2>
                <div className="contenido-estadistica-admin">
                  <p>{stat.title}</p>
                </div>
              </article>
            ))}
          </section>

          {/* Content Grid */}
          <section className="contenido-grid-vet">
            {/* Today's Appointments */}
            <article className="tarjeta-citas-admin">
              <header className="cabecera-tarjeta-admin">
                <h2>Citas de Hoy</h2>
                <span className="contador-citas-admin" aria-label={`${appoint?.length} citas programadas`}>
                  {appoint?.length} citas
                </span>
              </header>

              <ul className="lista-citas-admin" role="list">
                {appoint?.map((appointment, index) => (
                  <li 
                    key={index + 123123} 
                    className={`item-cita-admin ${appointment.estado}-admin`}
                    onClick={() => handlePetSelect(appointment)}
                  >
                    <div className="tiempo-cita-admin">
                      <Clock className="icon" aria-hidden="true" />
                      <time>{hourTraductor(appointment.hor_ini_cit)}</time>
                    </div>

                    <div className="detalles-cita-admin">
                      <h3>{appointment.nom_mas}</h3>
                      <p>Propietario: {appointment.prop_nom_per} {appointment.prop_ape_per}</p>
                    </div>

                    <div className="detalles-cita-admin">
                      <p>Veterinario: {appointment.vet_nom_per} {appointment.vet_ape_per}</p>
                      <span className="tipo-cita-admin">{appointment.nom_cat}</span>
                    </div>

                    <div className={`insignia-estado-admin ${appointment.estado}-admin`} role="status">
                      {appointment.estado === "REALIZADO" && "Realizada"}
                      {appointment.estado === "EN-ESPERA" && "En espera"}
                      {appointment.estado === "PENDIENTE" && "Pendiente"}
                      {appointment.estado === "CONFIRMADO" && "Confirmada"}
                    </div>
                  </li>
                ))}
              </ul>
            </article>

            {/* Quick Actions */}
            <aside className="tarjeta-acciones-admin">
              <h2>Acciones Rápidas</h2>

              <nav className="acciones-rapidas-admin" aria-label="Acciones rápidas">
                <button type="button" className="AddBtn" onClick={() => setServicesForm(1)}>
                  <Plus className="icon" aria-hidden="true" />
                  Nuevo Servicio
                </button>

                <button type="button" className="AddBtn" onClick={toggleFormulario}>
                  <Plus className="icon" aria-hidden="true" />
                  Nueva Cita
                </button>

                <button type="button" className="AddBtn" onClick={() => navigate('/propietario/registro')}>
                  <Plus className="icon" aria-hidden="true" />
                  Registrar Propietario
                </button>

                <button type="button" className="AddBtn" onClick={() => navigate('/admin/usuario/registro')}>
                  <Plus className="icon" aria-hidden="true" />
                  Registrar Personal
                </button>

                <button type="button" className="EditBtn" onClick={() => navigate('/user/home')}>
                  <User className="icon" aria-hidden="true" />
                  Panel Usuario
                </button>

                <button
                  className="EditBtn"
                  onClick={() => navigate('/main')}
                >
                  <ExternalLink className="icon" aria-hidden="true" />
                  Visitar Página Web
                </button>
                {mostrarFormulario && <AppointmentForm onClose={toggleFormulario} URL={URL} sended={getAppoint} />}
              </nav>

              {/* Recent Activity */}
              <section className="actividad-reciente-admin">
                <h3>Actividad</h3>
                <RazasFrecuentesChart URL={URL} />
              </section>

              {servicesForm && (
                <FormularioServicio
                  onGuardar={saveService}
                  onCancelar={() => setServicesForm(null)}
                  URL={URL}
                />
              )}
            </aside>
          </section>
        </main>
      </main>
      {notify && (
        <Notification
          {...notify}
        />
      )}
    </main>
  )
}

