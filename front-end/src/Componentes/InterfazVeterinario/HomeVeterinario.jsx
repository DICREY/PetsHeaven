// Librarys 
import React, { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { Heart, Clock, ExternalLink, Plus, Stethoscope, Activity, FileText, AlertCircle, CheckCircle } from "lucide-react"

// Import
import { Notification } from '../Global/Notifys'
import { HeaderAdmin } from '../BarrasNavegacion/HeaderAdmin'

// Import styles 
import "../../styles/InterfazVeterinario/HomeVeterinario.css"

// Component
export const PanelVeterinario = ({ URL = '', imgDefault = '' }) => {
  // Dynamic vars 
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [notify, setNotify] = useState(null)

  // Vars
  const mainUrl = `${URL}/staff`

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest(".contenedor-perfil-vet")) {
        setIsProfileOpen(false)
      }
      if (isNotificationsOpen && !event.target.closest(".contenedor-notificaciones-vet")) {
        setIsNotificationsOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isProfileOpen, isNotificationsOpen])

  const handleProfileClick = (e) => {
    e.stopPropagation()
    setIsProfileOpen(!isProfileOpen)
    setIsNotificationsOpen(false)
  }

  const handleNotificationsClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsNotificationsOpen(!isNotificationsOpen)
    setIsProfileOpen(false)
  }

  const citasHoy = [
    {
      id: 1,
      hora: "09:00",
      mascota: "Max",
      propietario: "Juan Pérez",
      tipo: "Consulta general",
      estado: "confirmada",
      urgencia: "normal",
    },
    {
      id: 2,
      hora: "10:30",
      mascota: "Luna",
      propietario: "María García",
      tipo: "Vacunación",
      estado: "confirmada",
      urgencia: "normal",
    },
    {
      id: 3,
      hora: "11:15",
      mascota: "Rocky",
      propietario: "Carlos López",
      tipo: "Cirugía menor",
      estado: "pendiente",
      urgencia: "alta",
    },
    {
      id: 4,
      hora: "14:00",
      mascota: "Bella",
      propietario: "Ana Martínez",
      tipo: "Control post-operatorio",
      estado: "confirmada",
      urgencia: "normal",
    },
    {
      id: 5,
      hora: "15:30",
      mascota: "Toby",
      propietario: "Luis Rodríguez",
      tipo: "Emergencia",
      estado: "urgente",
      urgencia: "critica",
    },
    {
      id: 6,
      hora: "16:45",
      mascota: "Milo",
      propietario: "Carmen Ruiz",
      tipo: "Revisión dental",
      estado: "confirmada",
      urgencia: "normal",
    },
  ]

  const estadisticas = [
    { titulo: "Pacientes Hoy", valor: "8", icono: Stethoscope, color: "azul" },
    { titulo: "Cirugías Programadas", valor: "3", icono: Activity, color: "verde" },
    { titulo: "Emergencias Atendidas", valor: "2", icono: Heart, color: "rojo" },
    { titulo: "Consultas Completadas", valor: "12", icono: FileText, color: "morado" },
  ]

  return (
    <main className="tablero-vet">
      <main className="contenido-principal-vet">
        {/* Header del panel veterinario */}
        <HeaderAdmin URL={URL} />

        {/* Grid de Estadísticas */}
        <section className="estadisticas-grid-vet" aria-label="Estadísticas del día">
          {estadisticas.map((stat, index) => (
            <article key={index} className={`tarjeta-estadistica-vet ${stat.color}-vet`}>
              <header className="cabecera-estadistica-vet">
                <stat.icono size={24} aria-hidden="true" />
              </header>
              <div className="contenido-estadistica-vet">
                <h2>{stat.valor}</h2>
                <p>{stat.titulo}</p>
              </div>
            </article>
          ))}
        </section>

        {/* Grid de Contenido */}
        <section className="contenido-grid-vet">
          {/* Pacientes del Día */}
          <article className="tarjeta-pacientes-vet">
            <header className="cabecera-tarjeta-vet">
              <h2>Mis Pacientes de Hoy</h2>
              <span className="contador-pacientes-vet" aria-label={`${citasHoy.length} pacientes programados`}>
                {citasHoy.length} pacientes
              </span>
            </header>

            <ul className="lista-pacientes-vet" role="list">
              {citasHoy.map((cita) => (
                <li key={cita.id} className={`item-paciente-vet ${cita.estado}-vet ${cita.urgencia}-vet`}>
                  <div className="hora-paciente-vet">
                    <Clock size={16} aria-hidden="true" />
                    <time>{cita.hora}</time>
                  </div>

                  <div className="detalles-paciente-vet">
                    <h3>{cita.mascota}</h3>
                    <p>Propietario: {cita.propietario}</p>
                    <span className="tipo-consulta-vet">{cita.tipo}</span>
                  </div>

                  <div className="indicadores-paciente-vet">
                    <div className={`insignia-estado-vet ${cita.estado}-vet`} role="status">
                      {cita.estado === "confirmada" && "Confirmada"}
                      {cita.estado === "pendiente" && "Pendiente"}
                      {cita.estado === "urgente" && "Urgente"}
                    </div>
                    {cita.urgencia === "alta" && <div className="insignia-urgencia-vet alta-vet">Alta</div>}
                    {cita.urgencia === "critica" && <div className="insignia-urgencia-vet critica-vet">Crítica</div>}
                  </div>
                </li>
              ))}
            </ul>
          </article>

          {/* Acciones Rápidas */}
          <aside className="tarjeta-acciones-vet">
            <h2>Acciones Rápidas</h2>

            <nav className="acciones-rapidas-vet" aria-label="Acciones rápidas">
              <button type="button" className="boton-accion-vet primario-vet">
                <Plus size={20} aria-hidden="true" />
                Nueva Consulta
              </button>

              <button type="button" className="boton-accion-vet secundario-vet">
                <FileText size={20} aria-hidden="true" />
                Historial Médico
              </button>

              <button type="button" className="boton-accion-vet terciario-vet">
                <Activity size={20} aria-hidden="true" />
                Programar Cirugía
              </button>

              <a href="#" className="boton-accion-vet sitio-web-vet">
                <ExternalLink size={20} aria-hidden="true" />
                Portal Veterinario
              </a>
            </nav>

            {/* Actividad Reciente */}
            <section className="actividad-reciente-vet">
              <h3>Actividad Médica Reciente</h3>
              <ul className="lista-actividad-vet" role="list">
                <li className="item-actividad-vet">
                  <div className="punto-actividad-vet verde-vet" aria-hidden="true"></div>
                  <p>Cirugía de Max completada exitosamente</p>
                  <time>Hace 30 min</time>
                </li>
                <li className="item-actividad-vet">
                  <div className="punto-actividad-vet azul-vet" aria-hidden="true"></div>
                  <p>Vacunación de Luna registrada</p>
                  <time>Hace 1 hora</time>
                </li>
                <li className="item-actividad-vet">
                  <div className="punto-actividad-vet naranja-vet" aria-hidden="true"></div>
                  <p>Diagnóstico de Toby actualizado</p>
                  <time>Hace 2 horas</time>
                </li>
                <li className="item-actividad-vet">
                  <div className="punto-actividad-vet rojo-vet" aria-hidden="true"></div>
                  <p>Emergencia de Rocky atendida</p>
                  <time>Hace 3 horas</time>
                </li>
                <li className="item-actividad-vet">
                  <div className="punto-actividad-vet morado-vet" aria-hidden="true"></div>
                  <p>Revisión dental de Milo programada</p>
                  <time>Hace 4 horas</time>
                </li>
              </ul>
            </section>
          </aside>
        </section>
      </main>
      {notify && (
        <Notification
          {...notify}
        />
      )}

      <Outlet />
    </main>
  )
}
