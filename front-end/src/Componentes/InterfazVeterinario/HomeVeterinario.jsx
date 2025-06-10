import {Heart,Clock,ExternalLink,Plus,Stethoscope,Activity,FileText,Bell,HelpCircle,LogOut,User,Settings,ChevronDown,AlertCircle,CheckCircle} from "lucide-react"
import { useState, useEffect } from "react"
import React from "react"
import "../../styles/InterfazVeterinario/HomeVeterinario.css"

export default function PanelVeterinario() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  const notifications = [
    {
      id: 1,
      type: "appointment",
      title: "Nueva cita programada",
      message: "Cita para Max a las 09:00 AM",
      time: "Hace 5 min",
      icon: Clock,
      color: "azul",
    },
    {
      id: 2,
      type: "emergency",
      title: "Emergencia atendida",
      message: "Cirugía de Toby completada exitosamente",
      time: "Hace 1 hora",
      icon: AlertCircle,
      color: "verde",
    },
    {
      id: 3,
      type: "reminder",
      title: "Recordatorio de vacuna",
      message: "Luna necesita vacuna de refuerzo",
      time: "Hace 2 horas",
      icon: CheckCircle,
      color: "naranja",
    },
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
    <div className="tablero-vet">
      <main className="contenido-principal-vet">
        {/* Header del panel veterinario */}
        <header className="cabecera-vet">
          <div className="contenido-cabecera-vet">
            <div className="izquierda-cabecera-vet">
              <h1>Panel Veterinario</h1>
              <p>Bienvenido de vuelta, Dr. Martínez</p>
            </div>

            <nav className="derecha-cabecera-vet" aria-label="Navegación principal">
              <button type="button" className="boton-cabecera-vet boton-ayuda-vet" aria-label="Obtener ayuda">
                <HelpCircle size={20} aria-hidden="true" />
                <span>Ayuda</span>
              </button>

              <div className="contenedor-notificaciones-vet">
                <button
                  type="button"
                  className="boton-cabecera-vet boton-notificacion-vet"
                  onClick={handleNotificationsClick}
                  aria-label="Ver notificaciones"
                  aria-expanded={isNotificationsOpen}
                  aria-haspopup="true"
                >
                  <Bell size={20} aria-hidden="true" />
                  <span className="insignia-notificacion-vet" aria-label="3 notificaciones nuevas">
                    3
                  </span>
                </button>

                {isNotificationsOpen && (
                  <div className="dropdown-notificaciones-vet" role="menu" aria-label="Lista de notificaciones">
                    <header className="cabecera-notificaciones-vet">
                      <h2>Notificaciones</h2>
                      <span className="contador-notificaciones-vet">{notifications.length} nuevas</span>
                    </header>

                    <ul className="lista-notificaciones-vet" role="list">
                      {notifications.map((notification) => (
                        <li key={notification.id} className="item-notificacion-vet" role="menuitem">
                          <div className={`icono-notificacion-vet ${notification.color}-vet`} aria-hidden="true">
                            <notification.icon size={16} />
                          </div>
                          <article className="contenido-notificacion-vet">
                            <h3>{notification.title}</h3>
                            <p>{notification.message}</p>
                            <time className="tiempo-notificacion-vet">{notification.time}</time>
                          </article>
                        </li>
                      ))}
                    </ul>

                    <footer className="pie-notificaciones-vet">
                      <button type="button" className="boton-ver-todas-vet">
                        Ver todas las notificaciones
                      </button>
                    </footer>
                  </div>
                )}
              </div>

              <div className="contenedor-perfil-vet">
                <button
                  type="button"
                  className="boton-cabecera-vet boton-perfil-vet"
                  onClick={handleProfileClick}
                  aria-label="Menú de perfil"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="true"
                >
                  <div className="avatar-perfil-vet" aria-hidden="true">
                    <User size={20} />
                  </div>
                  <div className="info-perfil-vet">
                    <span className="nombre-perfil-vet">Dr. Martínez</span>
                    <span className="rol-perfil-vet">Veterinario</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`icono-flecha-vet ${isProfileOpen ? "rotado-vet" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                {isProfileOpen && (
                  <div className="dropdown-perfil-vet" role="menu" aria-label="Opciones de perfil">
                    <button type="button" className="item-dropdown-vet" role="menuitem">
                      <Settings size={18} aria-hidden="true" />
                      <span>Configuración</span>
                    </button>
                    <button type="button" className="item-dropdown-vet item-salir-vet" role="menuitem">
                      <LogOut size={18} aria-hidden="true" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </header>

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
    </div>
  )
}
