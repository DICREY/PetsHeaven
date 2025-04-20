import React from "react"
import { useState, useEffect } from "react"
import {Settings,Users,User,Headset,ChevronDown,Syringe,Bath,Scissors,Cat,Calendar,LogOut,Menu,X,Stethoscope,CalendarRange,
  CalendarClock,FlaskRoundIcon as Flask,} from "lucide-react"

// Imports
import "../../../public/styles/BarrasNavegacion/NavBarAdmin.css"
import { Logout, decodeJWT,getRoles } from "../Varios/Util"

export const NavBarAdmin = () => {
  const [serviciosAbierto, setServiciosAbierto] = useState(false)
  const [agendaAbierta, setAgendaAbierta] = useState(false)
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false)
  const [esMovil, setEsMovil] = useState(false)
  const [user, setUser] = useState({})
  const [isAdmin, setIsAdmin] = useState()
  const token = localStorage.getItem("token")

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const comprobarTamaño = () => {
      setEsMovil(window.innerWidth <= 768)
    }

    comprobarTamaño()
    window.addEventListener("resize", comprobarTamaño)

    return () => {
      window.removeEventListener("resize", comprobarTamaño)
    }
  }, [])

  const toggleServicios = () => {
    setServiciosAbierto(!serviciosAbierto)
  }

  const toggleAgenda = () => {
    setAgendaAbierta(!agendaAbierta)
  }

  const toggleMenuMovil = () => {
    setMenuMovilAbierto(!menuMovilAbierto)
  }

  useEffect(() => {
    if(token){
      const tokenJWT = decodeJWT(token)
      setUser(tokenJWT)
      const roles = getRoles(token)
      const admin = roles.some(role => role.toLowerCase() === "administrador")
      setIsAdmin(admin)
    }
    
  }, [])

  return (
    <>
      {/* Botón de menú móvil */}
      <button
        className={`botonmovilnavadmin ${menuMovilAbierto ? "activonavadmin" : ""}`}
        onClick={toggleMenuMovil}
        aria-label="Menú"
      >
        {menuMovilAbierto ? <X size={20} /> : <Menu size={20} />}
      </button>

      {menuMovilAbierto && esMovil && <div className="overlaynavadmin" onClick={toggleMenuMovil}></div>}

      <aside
        className={`
          barranavadmin ${menuMovilAbierto ? "visiblenavadmin" : "ocultanavadmin"}
        `}
      >
        <div className="perfilsuperiornavadmin">
          <div className="avatarnavadmin">
            <img
              src="https://imgs.search.brave.com/SWL4XM1cyqoTBFewaA4zN-ry5AIZhcu9EOWH2XbBYOM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9nZXR0/eWltYWdlcy0xNDMy/ODIyOTctbWFzdGVy/LTE1MjI0Mjk4OTYu/anBnP2Nyb3A9MXh3/OjAuOTkxNzk0ODcx/Nzk0ODcxN3hoO2Nl/bnRlcix0b3AmcmVz/aXplPTk4MDoq"
              className="inicialnavadmin"
            />
          </div>
          <div className="nombrenavadmin">
            {user.names} {user.lastNames}
          </div>
        </div>
        <hr className="separadornavadmin" />

 
        <nav className="menunavadmin">
          <ul className="listanavadmin">
            {
              isAdmin && (
                <li className="itemnavadmin">
                  <a href="/administracion" className="enlacenavadmin">
                    <Settings className="icononavadmin" />
                    <span>Administración</span>
                  </a>
                </li>
              )
            }

            <li className="itemnavadmin">
              <a href="/consultorio" className="enlacenavadmin">
                <Stethoscope className="icononavadmin" />
                <span>Consultorio</span>
              </a>
            </li>

            {
              isAdmin && (
                <li className="itemnavadmin">
                  <a href="/gestion/usuarios" className="enlacenavadmin">
                    <Users className="icononavadmin" />
                    <span>Usuarios</span>
                  </a>
                </li>
              )
            }

            <li className="itemnavadmin">
              <a href="/gestion/propietarios" className="enlacenavadmin">
                <User className="icononavadmin" />
                <span>Propietarios</span>
              </a>
            </li>

            <li className="itemnavadmin">
              <a href="/gestion/mascotas" className="enlacenavadmin">
                <Cat className="icononavadmin" />
                <span>Mascotas</span>
              </a>
            </li>

            <li className="itemnavadmin">
              <button className="botonnavadmin" onClick={toggleAgenda}>
                <div className="contenidobotonnavadmin">
                  <Calendar className="icononavadmin" />
                  <span>Agenda</span>
                </div>
                <ChevronDown className={`flechanavadmin ${agendaAbierta ? "girarnavadmin" : ""}`} />
              </button>

              <ul className={`submenunavadmin ${agendaAbierta ? "abiertonavadmin" : "cerradonavadmin"}`}>
                <li>
                  <a href="/agenda/general" className="subenlacenavadmin">
                    <CalendarRange className="iconosubnavadmin" />
                    <span>Agenda General</span>
                  </a>
                </li>
                <li>
                  <a href="/agenda/personal" className="subenlacenavadmin">
                    <CalendarClock className="iconosubnavadmin" />
                    <span>Agenda Personal</span>
                  </a>
                </li>
              </ul>
            </li>
            {
              isAdmin && (
                <li className="itemnavadmin">
                  <button className="botonnavadmin" onClick={toggleServicios}>
                    <div className="contenidobotonnavadmin">
                      <Headset className="icononavadmin" />
                      <span>Servicios</span>
                    </div>
                    <ChevronDown className={`flechanavadmin ${serviciosAbierto ? "girarnavadmin" : ""}`} />
                  </button>

                  <ul className={`submenunavadmin ${serviciosAbierto ? "abiertonavadmin" : "cerradonavadmin"}`}>
                    <li>
                      <a href="/servicios/vacunas" className="subenlacenavadmin">
                        <Syringe className="iconosubnavadmin" />
                        <span>Vacunas</span>
                      </a>
                    </li>
                    <li>
                      <a href="/servicios/cirugia" className="subenlacenavadmin">
                        <Scissors className="iconosubnavadmin" />
                        <span>Cirugía</span>
                      </a>
                    </li>
                    <li>
                      <a href="/servicios/laboratorio" className="subenlacenavadmin">
                        <Flask className="iconosubnavadmin" />
                        <span>Pruebas Laboratorio</span>
                      </a>
                    </li>
                    <li>
                      <a href="/servicios/spa" className="subenlacenavadmin">
                        <Bath className="iconosubnavadmin" />
                        <span>Spa</span>
                      </a>
                    </li>
                  </ul>
                </li>
              )
            }
          </ul>
        </nav>

        <hr className="separadornavadmin" />
        <div className="opcionesnavadmin">
          <button className="opcionnavadmin">
            <Settings className="iconoopcionnavadmin" />
            <span>Configuración</span>
          </button>
          <button className="opcionnavadmin salirnavadmin">
            <LogOut className="iconoopcionnavadmin" />
            <span onClick={Logout}>Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  )
}
