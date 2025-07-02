import React from "react"
import "../../../styles/InterfazCliente/NavBar/NavbarHorizontal.css"
import { useState } from "react"
import { Bell, Settings, LogOut, User } from "lucide-react"

const NavbarHorizontal = ({ usuario, onMostrarPerfil }) => {
  const [mostrarPerfil, setMostrarPerfil] = useState(false)
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false)

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

  const notificacionesNoLeidas = notificaciones.filter((n) => !n.leida).length

  return (
    <header className="navbar-horizontal">
      <div className="contenedor-horizontal">
        <div className="saludo-horizontal">
          <h1 className="titulo-horizontal">¡Hola, {usuario.nombre.split(" ")[0]}!</h1>
          <p className="subtitulo-horizontal">Bienvenido de vuelta a tu portal veterinario</p>
        </div>

        <div className="acciones-horizontal">
          <div className="dropdown-horizontal">
            <button
              className="boton-notificaciones-horizontal"
              onClick={() => setMostrarNotificaciones(!mostrarNotificaciones)}
            >
              <Bell size={20} />
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
              <img
                src={usuario.avatar || "/placeholder.svg?height=40&width=40"}
                alt={usuario.nombre}
                className="avatar-horizontal"
              />
              <span className="nombre-perfil-horizontal">{usuario.nombre.split(" ")[0]}</span>
            </button>

            {mostrarPerfil && (
              <div className="menu-perfil-horizontal">
                <div className="info-usuario-horizontal">
                  <img
                    src={usuario.avatar || "/placeholder.svg?height=50&width=50"}
                    alt={usuario.nombre}
                    className="avatar-grande-horizontal"
                  />
                  <div className="datos-usuario-horizontal">
                    <h4 className="nombre-usuario-horizontal">{usuario.nombre}</h4>
                    <p className="email-usuario-horizontal">{usuario.email}</p>
                  </div>
                </div>

                <div className="opciones-perfil-horizontal">
                  <button className="opcion-perfil-horizontal" onClick={onMostrarPerfil}>
                    <User size={16} />
                    Mi Perfil
                  </button>
                  <button className="opcion-perfil-horizontal">
                    <Settings size={16} />
                    Configuración
                  </button>
                  <button className="opcion-perfil-horizontal salir-horizontal">
                    <LogOut size={16} />
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
