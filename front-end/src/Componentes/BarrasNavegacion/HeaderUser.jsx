import { Bell, HelpCircle, LogOut, User, Settings, ChevronDown, Clock, AlertCircle, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import {useNavigate } from 'react-router-dom'
import "../../styles/BarrasNavegacion/Header.css"

export default function Header({ onVerTodasNotificaciones }) {
  
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const navigate = useNavigate()

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
      if (isProfileOpen && !event.target.closest(".contenedor-perfil-header")) {
        setIsProfileOpen(false)
      }
      if (isNotificationsOpen && !event.target.closest(".contenedor-notificaciones-header")) {
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
    console.log("Botón de notificaciones clickeado, estado actual:", isNotificationsOpen)
    setIsNotificationsOpen(!isNotificationsOpen)
    setIsProfileOpen(false)
    console.log("Nuevo estado de notificaciones:", !isNotificationsOpen)
  }

  const handleVerTodasClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsNotificationsOpen(false)
    console.log("Botón clickeado, función disponible:", typeof onVerTodasNotificaciones)
    if (onVerTodasNotificaciones && typeof onVerTodasNotificaciones === "function") {
      onVerTodasNotificaciones()
    } else {
      console.error("onVerTodasNotificaciones no está disponible")
    }
  }

  return (
    <header className="cabecera-header">
      <div className="contenido-cabecera-header">
        <div className="izquierda-cabecera-header">
          <h1>Panel de Administración</h1>
          <p>Bienvenido de vuelta, Dr. Administrador</p>
        </div>

        <nav className="derecha-cabecera-header" aria-label="Navegación principal">
          <button type="button" className="boton-cabecera-header boton-ayuda-header" aria-label="Obtener ayuda">
            <HelpCircle size={20} aria-hidden="true" />
            <span>Ayuda</span>
          </button>

          <div className="contenedor-notificaciones-header">
            <button
              type="button"
              className="boton-cabecera-header boton-notificacion-header"
              onClick={handleNotificationsClick}
              aria-label="Ver notificaciones"
              aria-expanded={isNotificationsOpen}
              aria-haspopup="true"
            >
              <Bell size={20} aria-hidden="true" />
              <span className="insignia-notificacion-header" aria-label="3 notificaciones nuevas">
                3
              </span>
            </button>

            {isNotificationsOpen && (
              <div className="dropdown-notificaciones-header" role="menu" aria-label="Lista de notificaciones">
                <header className="cabecera-notificaciones-header">
                  <h2>Notificaciones</h2>
                  <span className="contador-notificaciones-header">{notifications.length} nuevas</span>
                </header>

                <ul className="lista-notificaciones-header" role="list">
                  {notifications.map((notification) => (
                    <li key={notification.id} className="item-notificacion-header" role="menuitem">
                      <div className={`icono-notificacion-header ${notification.color}-header`} aria-hidden="true">
                        <notification.icon size={16} />
                      </div>
                      <article className="contenido-notificacion-header">
                        <h3>{notification.title}</h3>
                        <p>{notification.message}</p>
                        <time className="tiempo-notificacion-header">{notification.time}</time>
                      </article>
                    </li>
                  ))}
                </ul>

                <footer className="pie-notificaciones-header">
                  <button type="button" className="boton-ver-todas-header" onClick={() => navigate('/notificaciones')}>
                    Ver todas las notificaciones 
                  </button>
                </footer>
              </div>
            )}
          </div>

          <div className="contenedor-perfil-header">
            <button
              type="button"
              className="boton-cabecera-header boton-perfil-header"
              onClick={handleProfileClick}
              aria-label="Menú de perfil"
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
            >
              <div className="avatar-perfil-header" aria-hidden="true">
                <User size={20} />
              </div>
              <div className="info-perfil-header">
                <span className="nombre-perfil-header">Dr. Administrador</span>
                <span className="rol-perfil-header">Administrador</span>
              </div>
              <ChevronDown
                size={16}
                className={`icono-flecha-header ${isProfileOpen ? "rotado-header" : ""}`}
                aria-hidden="true"
              />
            </button>

            {isProfileOpen && (
              <div className="dropdown-perfil-header" role="menu" aria-label="Opciones de perfil">
                <button type="button" className="item-dropdown-header" role="menuitem">
                  <Settings size={18} aria-hidden="true" />
                  <span>Configuración</span>
                </button>
                <button type="button" className="item-dropdown-header item-salir-header" role="menuitem">
                  <LogOut size={18} aria-hidden="true" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
