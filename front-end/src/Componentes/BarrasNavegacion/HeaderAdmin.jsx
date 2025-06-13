// Librarys 
import { useState, useEffect, useContext } from "react"
import { Bell, HelpCircle, LogOut, User, Settings, ChevronDown } from "lucide-react"
import { useNavigate } from 'react-router-dom'

// Imports 
import { AuthContext } from "../../Contexts/Contexts"
import { ReqFunction } from "../../Utils/Utils"
import { PostData } from '../Varios/Requests'
import { TabHelp } from '../Global/TabHelp'

// import styles 
import "../../styles/BarrasNavegacion/Header.css"

// Component
export const HeaderAdmin = ({ onVerTodasNotificaciones, URL = 'http://localhost:3000' }) => {
  // Dynamic Vars 
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [tabHelp, setTabHelp] = useState()
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [appointment, setAppointment] = useState()
  const [notify, setNotify] = useState()

  // Vars 
  const navigate = useNavigate()
  const { user, roles, mainRol, logout } = useContext(AuthContext)
  const mainUrl = `${URL}/appointment/by`

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
    // console.log("Botón de notificaciones clickeado, estado actual:", isNotificationsOpen)
    setIsNotificationsOpen(!isNotificationsOpen)
    setIsProfileOpen(false)
    // console.log("Nuevo estado de notificaciones:", !isNotificationsOpen)
  }

  const handleVerTodasClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsNotificationsOpen(false)
    // console.log("Botón clickeado, función disponible:", typeof onVerTodasNotificaciones)
    if (onVerTodasNotificaciones && typeof onVerTodasNotificaciones === "function") {
      onVerTodasNotificaciones()
    } else {
      console.error("onVerTodasNotificaciones no está disponible")
    }
  }

  // Show TabHelp
  const handleHelp = () => {
    tabHelp ? setTabHelp(false) : setTabHelp(true)
  }

  useEffect(() => {
    ReqFunction(
      mainUrl,
      PostData,
      setNotify,
      setAppointment,
      { by: user.doc }
    )
  }, [])

  return (
    <header className="cabecera-header">
      <div className="contenido-cabecera-header">
        <div className="izquierda-cabecera-header">
          {mainRol === 'Administrador' ? (
            <h1>Panel de Administración</h1>
          ) : (
            <h1>Panel Medico</h1>
          )
          }
          <p>Bienvenid@ de vuelta, {user.names} {user.lastNames}</p>
        </div>

        <nav className="derecha-cabecera-header" aria-label="Navegación principal">
          <button
            type="button"
            className="BackBtn expandBtn"
            aria-label="Obtener ayuda"
            onClick={handleHelp}
          >
            <HelpCircle className="icon" aria-hidden="true" />
            <span>Ayuda</span>
          </button>

          <div className="contenedor-notificaciones-header">
            <button
              type="button"
              className="EditBtn"
              onClick={handleNotificationsClick}
              aria-label="Ver notificaciones"
              aria-expanded={isNotificationsOpen}
              aria-haspopup="true"
            >
              <Bell className="icon" aria-hidden="true" />
              <span className="insignia-notificacion-header" aria-label="3 notificaciones nuevas">
                {appointment?.length || 0}
              </span>
              Notificaciones
            </button>

            {isNotificationsOpen && (
              <div className="dropdown-notificaciones-header" role="menu" aria-label="Lista de notificaciones">
                <header className="cabecera-notificaciones-header">
                  <h2>Notificaciones</h2>
                  <span className="contador-notificaciones-header">{appointment?.length} nuevas</span>
                </header>

                <ul className="lista-notificaciones-header" role="list">
                  {appointment?.map((notification, index) => (
                    <li key={index + 10992} className="item-notificacion-header" role="menuitem">
                      <div className={`icono-notificacion-header`} aria-hidden="true">
                        <Bell className="icon" aria-hidden="true" />
                      </div>
                      <article className="contenido-notificacion-header">
                        <h3>{notification.nom_cat}</h3>
                        <h4>{notification.nom_ser}</h4>
                        <p>{notification.des_ser}</p>
                        <time className="tiempo-notificacion-header">{notification.hor_ini_cit}</time>
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
                <User className="icon" />
              </div>
              <div className="info-perfil-header">
                <span className="nombre-perfil-header">Sr@. {user.names} {user.lastNames}</span>
                <span className="rol-perfil-header">{mainRol}</span>
              </div>
              <ChevronDown
                className={`icono-flecha-header icon ${isProfileOpen ? "rotado-header" : ""}`}
                aria-hidden="true"
              />
            </button>

            {isProfileOpen && (
              <div className="dropdown-perfil-header" role="menu" aria-label="Opciones de perfil">
                <button type="button" className="item-dropdown-header" role="menuitem">
                  <Settings className="icon" aria-hidden="true" />
                  <span>Configuración</span>
                </button>
                <button type="button" className="item-dropdown-header item-salir-header"
                  role="menuitem"
                  onClick={logout}
                >
                  <LogOut className="icon" aria-hidden="true" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
      {tabHelp && (
        <TabHelp onClose={handleHelp} />
      )}
    </header>
  )
}
