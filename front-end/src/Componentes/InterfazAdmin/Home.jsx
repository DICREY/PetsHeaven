import React, { useContext, useEffect, useState } from "react"
import { Calendar, Users, Heart, Clock, ExternalLink, Plus } from "lucide-react"
import { useNavigate } from 'react-router-dom'

// Imports
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { HeaderAdmin } from '../BarrasNavegacion/HeaderAdmin'
import { GetData } from "../Varios/Requests"
import { Notification } from "../Global/Notifys"
import { errorStatusHandler } from '../Varios/Util'

import "../../styles/InterfazAdmin/Home.css"
import { AuthContext } from "../../Contexts/Contexts"

export default function VeterinaryDashboard({ onVerTodasNotificaciones, URL }) {
  // Dynamic vars 
  const [ appoint, setAppoint ] = useState()
  const [ notify, setNotify ] = useState()

  // Vars 
  const mainUrl = `${URL}/appointment`
  const navigate = useNavigate()
  const { admin } = useContext(AuthContext)

  const stats = [
    { title: "Citas Hoy", value: "12", icon: Calendar, color: "azul" },
    { title: "Pacientes Activos", value: "248", icon: Heart, color: "verde" },
    { title: "Doctores Disponibles", value: "4", icon: Users, color: "morado" },
    { title: "Emergencias", value: "2", icon: Clock, color: "rojo" },
  ]
  const getAppoint = async () => {
    try {
      const data = await GetData(`${mainUrl}/general`)
      setNotify(null)
      if (data) setAppoint(data)
    } catch (err) {
      setNotify(null)
      if (err.status) {
        const message = errorStatusHandler(err.status)
        setNotify({
          title: 'Error',
          message: `${message}`,    
          close: setNotify
        })
      } else console.log(err)
    }
  }

  useEffect(() => {
    getAppoint()
  },[])

  return (
    <main className="contenedoradminhome">
      <NavBarAdmin/>
      <main className="tablero-admin">
        {/* Header del dashboard */}
        <HeaderAdmin />
        
        <main className="contenido-principal-admin">

          {/* Stats Grid */}
          <section className="estadisticas-grid-admin" aria-label="Estadísticas del día">
            {stats.map((stat, index) => (
              <article key={index} className={`tarjeta-estadistica-admin ${stat.color}-admin`}>
                <div className="contenido-estadistica-admin">
                  <p>{stat.title}</p>
                </div>
                <header className="cabecera-estadistica-admin">
                  <stat.icon size={24} aria-hidden="true" />
                  <h2>{stat.value}</h2>
                </header>
              </article>
            ))}
          </section>

          {/* Content Grid */}
          <section className="contenido-grid-admin">
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
                  <li key={index + 123123} className={`item-cita-admin ${appointment.estado}-admin`}>
                    <div className="tiempo-cita-admin">
                      <Clock className="icon" aria-hidden="true" />
                      <time>{appointment.hor_ini_cit}</time>
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
                <button type="button" className="AddBtn">
                  <Plus className="icon" aria-hidden="true" />
                  Nueva Cita
                </button>

                <button 
                  className="EditBtn"
                  onClick={() => navigate('/main')}
                >
                  <ExternalLink className="icon" aria-hidden="true" />
                  Visitar Página Web
                </button>
              </nav>

              {/* Recent Activity */}
              <section className="actividad-reciente-admin">
                <h3>Actividad Reciente</h3>
                <ul className="lista-actividad-admin" role="list">
                  {/* {appointCurrent?.map(app, index) => } */}
                  <li className="item-actividad-admin">
                    <div className="punto-actividad-admin verde-admin" aria-hidden="true"></div>
                    <p>Nueva cita programada para Max</p>
                    <time>Hace 5 min</time>
                  </li>
                  <li className="item-actividad-admin">
                    <div className="punto-actividad-admin azul-admin" aria-hidden="true"></div>
                    <p>Cirugía completada exitosamente</p>
                    <time>Hace 1 hora</time>
                  </li>
                  <li className="item-actividad-admin">
                    <div className="punto-actividad-admin naranja-admin" aria-hidden="true"></div>
                    <p>Recordatorio de vacuna enviado</p>
                    <time>Hace 2 horas</time>
                  </li>
                </ul>
              </section>
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

