import React, { useContext } from "react"
import "../../../styles/InterfazCliente/Navbar/NavbarHorizontal.css"
import { useState } from "react"
import { Bell,LogOut, User } from "lucide-react"
import { AuthContext } from "../../../Contexts/Contexts"
import { CheckImage } from "../../../Utils/Utils"
import { errorStatusHandler } from "../../Varios/Util"
import { PostData } from "../../Varios/Requests"

const NavbarHorizontal = ({ usuario, onMostrarPerfil, imgDefault }) => {
  const [mostrarPerfil, setMostrarPerfil] = useState(false)
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false)
  const { logout, user } = useContext(AuthContext)

  const notificaciones = [
    {
      id: 1,
      titulo: "Cita confirmada",
      mensaje: "Tu cita con Max ha sido confirmada para mañana",
      tiempo: "hace 5 min",
      leida: false,
    },
    {
      id: 2,
      titulo: "Recordatorio de vacuna",
      mensaje: "Luna necesita su vacuna anual la próxima semana",
      tiempo: "hace 1 hora",
      leida: false,
    },
    {
      id: 3,
      titulo: "Resultado de análisis",
      mensaje: "Los resultados de Max están disponibles",
      tiempo: "hace 2 horas",
      leida: true,
    },
  ]

  const getAppoint = async () => {
    try {
      const data = await PostData(mainUrl,{ by: user.doc })
      setNotify(null)
      if (data?.result) setAppointment(data.result)
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

  const notificacionesNoLeidas = notificaciones.filter((n) => !n.leida).length

  return (
    <header className="navbar-horizontal">
      <div className="contenedor-horizontal">
        <div className="saludo-horizontal">
          <h1 className="titulo-horizontal">¡Hola, {user.names} {user.lastNames}!</h1>
          <p className="subtitulo-horizontal">Bienvenido de vuelta a tú portal</p>
        </div>

        <div className="acciones-horizontal">
          <div className="dropdown-horizontal">
            <button
              className="boton-notificaciones-horizontal"
              onClick={() => setMostrarNotificaciones(!mostrarNotificaciones)}
            >
              <Bell className="icon" />
              {notificacionesNoLeidas > 0 && <span className="badge-horizontal">{notificacionesNoLeidas}</span>}
            </button>

            {mostrarNotificaciones && (
              <div className="menu-notificaciones-horizontal">
                <div className="header-notificaciones-horizontal">
                  <h4 className="titulo-notificaciones-horizontal">Notificaciones</h4>
                  <span className="contador-notificaciones-horizontal">{notificacionesNoLeidas} nuevas</span>
                </div>

                <div className="lista-notificaciones-horizontal">
                  {notificaciones.map((notif) => (
                    <div
                      key={notif.id}
                      className={`item-notificacion-horizontal ${!notif.leida ? "no-leida-horizontal" : ""}`}
                    >
                      <div className="contenido-notificacion-horizontal">
                        <h5 className="titulo-notif-horizontal">{notif.titulo}</h5>
                        <p className="mensaje-notif-horizontal">{notif.mensaje}</p>
                        <span className="tiempo-notif-horizontal">{notif.tiempo}</span>
                      </div>
                      {!notif.leida && <div className="punto-notif-horizontal"></div>}
                    </div>
                  ))}
                </div>

                <div className="footer-notificaciones-horizontal">
                  <button className="boton-ver-todas-horizontal">Ver todas las notificaciones</button>
                </div>
              </div>
            )}
          </div>

          <div className="dropdown-horizontal">
            <button className="boton-perfil-horizontal" onClick={() => setMostrarPerfil(!mostrarPerfil)}>
              <CheckImage 
                src={user.img}
                imgDefault={''}
                className="avatar-horizontal"
                alt=""
              />
              <span className="nombre-perfil-horizontal">{user.names}</span>
            </button>

            {mostrarPerfil && (
              <div className="menu-perfil-horizontal">
                <div className="info-usuario-horizontal">
                  <CheckImage 
                    src={user.img}
                    imgDefault={''}
                    className="avatar-grande-horizontal"
                    alt={user.names}
                  />
                  <div className="datos-usuario-horizontal">
                    <h4 className="nombre-usuario-horizontal">{user.names}</h4>
                    <p className="email-usuario-horizontal">{user.email}</p>
                  </div>
                </div>

                <div className="opciones-perfil-horizontal">
                  <button className="opcion-perfil-horizontal" onClick={onMostrarPerfil}>
                    <User className="icon" />
                    Mi Perfil
                  </button>
                  <button 
                    className="opcion-perfil-horizontal salir-horizontal"
                    onClick={logout}
                  >
                    <LogOut className="icon" />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavbarHorizontal
