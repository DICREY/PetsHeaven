// Librarys 
import React, { useState, useEffect, useContext } from "react"
import { Outlet } from "react-router-dom"
import { Heart, Clock, ExternalLink, Plus, Stethoscope, Activity, FileText, AlertCircle, CheckCircle } from "lucide-react"

// Import
import { Notification } from '../Global/Notifys'
import { HeaderAdmin } from '../BarrasNavegacion/HeaderAdmin'
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { ReqFunction } from "../../Utils/Utils"
import { GetData, PostData } from "../Varios/Requests"
import { AuthContext } from "../../Contexts/Contexts"

// Import styles 
import "../../styles/InterfazVeterinario/HomeVeterinario.css"

// Component
export const PanelVeterinario = ({ URL = '', imgDefault = '' }) => {
  // Dynamic vars 
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [notify, setNotify] = useState(null)
  const [appoint, setAppoint] = useState([])
  const [infoGeneral, setInfoGeneral] = useState(null)

  // Vars
  const mainUrl = `${URL}/staff`
  const { user } = useContext(AuthContext)
  const stats = [
    { title: "Pacientes Hoy", value: "8", icon: Stethoscope, color: "azul" },
    { title: "Cirugías Programadas", value: "3", icon: Activity, color: "verde" },
    { title: "Emergencias Atendidas", value: "2", icon: Heart, color: "rojo" },
    { title: "Consultas Completadas", value: "12", icon: FileText, color: "morado" },
  ]

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

  const getAppoint = async () => {
    try {
      const data = await PostData(`${URL}/appointment/by`,{ by: user.doc })
      setNotify(null)
      if (data[0]) setAppoint(data[0])
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
    ReqFunction(
      `${URL}/global/info/general`,
      GetData,
      setNotify,
      setInfoGeneral
    )
    getAppoint()
  }, [])

  return (
    <main className="tablero-vet">
      <NavBarAdmin />

      <main className="tablero-admin">
        <HeaderAdmin URL={URL} />

        <main className="contenido-principal-vet">
          {/* Stats Grid */}
          <section className="estadisticas-grid-admin" aria-label="Estadísticas del día">
              {stats?.map((stat, index) => (
                <article key={index} className={`tarjeta-estadistica-admin ${stat.color}-admin`}>
                  <div className="contenido-estadistica-admin">
                    <p>{stat.title}</p>
                  </div>
                  <header className="cabecera-estadistica-admin">
                    <stat.icon className="icon" aria-hidden="true" />
                    <h2>{stat.value}</h2>
                  </header>
                </article>
              ))}
            </section>

          {/* Grid de Contenido */}
          <section className="contenido-grid-vet">
            {/* Pacientes del Día */}
            <article className="tarjeta-pacientes-vet">
              <header className="cabecera-tarjeta-vet">
                <h2>Mis Pacientes de Hoy</h2>
                <span className="contador-pacientes-vet" aria-label={`${appoint?.length} pacientes programados`}>
                  {appoint?.length} pacientes
                </span>
              </header>

              <ul className="lista-pacientes-vet" role="list">
                {appoint?.map((cita, index) => (
                  <li key={index + 123} className={`item-paciente-vet ${cita.estado}-vet ${cita.urgencia}-vet`}>
                    <div className="hora-paciente-vet">
                      <Clock className="icon" aria-hidden="true" />
                      <time>{cita.hor_ini_cit}</time>
                    </div>

                    <div className="detalles-paciente-vet">
                      <h3>{cita.nom_mas}</h3>
                      <p>Propietario: {cita.nom_per} {cita.ape_per}</p>
                      <span className="tipo-consulta-vet">{cita.nom_cat}</span>
                    </div>

                    <div className="indicadores-paciente-vet">
                      <div className={`insignia-estado-vet ${cita.estado}-vet`} role="status">
                        {cita.estado === "CONFIRMADA" && "Confirmada"}
                        {cita.estado === "PENDIENTE" && "Pendiente"}
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
                <button type="button" className="EditBtn">
                  <Plus className="icon" aria-hidden="true" />
                  Nueva Consulta
                </button>

                <button type="button" className="AddBtn">
                  <FileText className="icon" aria-hidden="true" />
                  Historial Médico
                </button>

                <button type="button" className="DeleteBtn">
                  <Activity className="icon" aria-hidden="true" />
                  Programar Cirugía
                </button>

                <a href="#" className="BackBtn">
                  <ExternalLink className="icon" aria-hidden="true" />
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
