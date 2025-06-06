import React from "react"
import { Calendar, Users, Heart, Clock, ExternalLink, Plus } from "lucide-react"
import { useNavigate } from 'react-router-dom'

import "../../styles/InterfazAdmin/Home.css"
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import Header from '../BarrasNavegacion/HeaderUser'

export default function VeterinaryDashboard({ onVerTodasNotificaciones }) {
  
  const navigate = useNavigate()

  const todayAppointments = [
    {
      id: 1,
      time: "09:00",
      pet: "Max",
      owner: "Juan Pérez",
      doctor: "Dr. García",
      type: "Consulta general",
      status: "confirmed",
    },
    {
      id: 2,
      time: "10:30",
      pet: "Luna",
      owner: "María García",
      doctor: "Dra. Rodríguez",
      type: "Vacunación",
      status: "confirmed",
    },
    {
      id: 3,
      time: "11:15",
      pet: "Rocky",
      owner: "Carlos López",
      doctor: "Dr. Martínez",
      type: "Cirugía menor",
      status: "pending",
    },
    {
      id: 4,
      time: "14:00",
      pet: "Bella",
      owner: "Ana Martínez",
      doctor: "Dra. Rodríguez",
      type: "Control post-operatorio",
      status: "confirmed",
    },
    {
      id: 5,
      time: "15:30",
      pet: "Toby",
      owner: "Luis Rodríguez",
      doctor: "Dr. García",
      type: "Emergencia",
      status: "urgent",
    },
  ]

  const stats = [
    { title: "Citas Hoy", value: "12", icon: Calendar, color: "azul" },
    { title: "Pacientes Activos", value: "248", icon: Heart, color: "verde" },
    { title: "Doctores Disponibles", value: "4", icon: Users, color: "morado" },
    { title: "Emergencias", value: "2", icon: Clock, color: "rojo" },
  ]

  return (
    <div className="contenedoradminhome">
      <NavBarAdmin/>
      <div className="tablero-admin">
        
        <main className="contenido-principal-admin">
          {/* Header del dashboard */}
          <Header/>

          {/* Stats Grid */}
          <section className="estadisticas-grid-admin" aria-label="Estadísticas del día">
            {stats.map((stat, index) => (
              <article key={index} className={`tarjeta-estadistica-admin ${stat.color}-admin`}>
                <header className="cabecera-estadistica-admin">
                  <stat.icon size={24} aria-hidden="true" />
                </header>
                <div className="contenido-estadistica-admin">
                  <h2>{stat.value}</h2>
                  <p>{stat.title}</p>
                </div>
              </article>
            ))}
          </section>

          {/* Content Grid */}
          <section className="contenido-grid-admin">
            {/* Today's Appointments */}
            <article className="tarjeta-citas-admin">
              <header className="cabecera-tarjeta-admin">
                <h2>Citas de Hoy</h2>
                <span className="contador-citas-admin" aria-label={`${todayAppointments.length} citas programadas`}>
                  {todayAppointments.length} citas
                </span>
              </header>

              <ul className="lista-citas-admin" role="list">
                {todayAppointments.map((appointment) => (
                  <li key={appointment.id} className={`item-cita-admin ${appointment.status}-admin`}>
                    <div className="tiempo-cita-admin">
                      <Clock size={16} aria-hidden="true" />
                      <time>{appointment.time}</time>
                    </div>

                    <div className="detalles-cita-admin">
                      <h3>{appointment.pet}</h3>
                      <p>Dueño: {appointment.owner}</p>
                      <p>Doctor: {appointment.doctor}</p>
                      <span className="tipo-cita-admin">{appointment.type}</span>
                    </div>

                    <div className={`insignia-estado-admin ${appointment.status}-admin`} role="status">
                      {appointment.status === "confirmed" && "Confirmada"}
                      {appointment.status === "pending" && "Pendiente"}
                      {appointment.status === "urgent" && "Urgente"}
                    </div>
                  </li>
                ))}
              </ul>
            </article>

            {/* Quick Actions */}
            <aside className="tarjeta-acciones-admin">
              <h2>Acciones Rápidas</h2>

              <nav className="acciones-rapidas-admin" aria-label="Acciones rápidas">
                <button type="button" className="boton-accion-admin primario-admin">
                  <Plus size={20} aria-hidden="true" />
                  Nueva Cita
                </button>

                <a href="#" className="boton-accion-admin sitio-web-admin"
                  onClick={() => navigate('/main')}>
                  <ExternalLink size={20} aria-hidden="true" />
                  Visitar Página Web
                </a>
              </nav>

              {/* Recent Activity */}
              <section className="actividad-reciente-admin">
                <h3>Actividad Reciente</h3>
                <ul className="lista-actividad-admin" role="list">
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
      </div>
    </div>
  )
}

