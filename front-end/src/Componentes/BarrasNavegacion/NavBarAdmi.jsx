import React from "react"
import { useState, useEffect } from "react"
import {Settings,Users,User,Headset,ChevronDown,Syringe,Bath,Scissors,Calendar,LogOut,
  Menu,X,Stethoscope,CalendarRange,CalendarClock,FlaskRoundIcon as Flask,} from "lucide-react"
import "../../../public/styles/BarrasNavegacion/NavBarAdmin.css"

export const NavBarAdmin = () => {
  const [serviciosAbierto, setServiciosAbierto] = useState(false)
  const [agendaAbierta, setAgendaAbierta] = useState(false)
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false)
  const [esMovil, setEsMovil] = useState(false)

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

      {/* Overlay para cerrar el menú al hacer clic fuera */}
      {menuMovilAbierto && esMovil && <div className="overlaynavadmin" onClick={toggleMenuMovil}></div>}

      {/* Barra lateral */}
      <aside
        className={`
          barranavadmin ${menuMovilAbierto ? "visiblenavadmin" : "ocultanavadmin"}
        `}
      >
        <div className="logonavadmin">
          <img src="/placeholder.svg?height=40&width=120" alt="Logo" className="imagennavadmin" />
        </div>

        <nav className="menunavadmin">
          <ul className="listanavadmin">
            <li className="itemnavadmin">
              <a href="/administracion" className="enlacenavadmin">
                <Settings className="icononavadmin" />
                <span>Administración</span>
              </a>
            </li>

            <li className="itemnavadmin">
              <a href="/usuarios" className="enlacenavadmin">
                <Users className="icononavadmin" />
                <span>Usuarios</span>
              </a>
            </li>

            <li className="itemnavadmin">
              <a href="/propietarios" className="enlacenavadmin">
                <User className="icononavadmin" />
                <span>Propietarios</span>
              </a>
            </li>

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

            <li className="itemnavadmin">
              <a href="/consultorio" className="enlacenavadmin">
                <Stethoscope className="icononavadmin" />
                <span>Consultorio</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="perfilnavadmin">
          <div className="menuusuarionavadmin">
            <button className="usuarionavadmin">
              <div className="avatarnavadmin">
                <div className="inicialnavadmin">NU</div>
              </div>
              <span className="nombrenavadmin">Nombre de Usuario</span>
            </button>
            <div className="menuopcionesnavadmin">
              <button className="opcionnavadmin">
                <User className="iconoopcionnavadmin" />
                <span>Mi Perfil</span>
              </button>
              <button className="opcionnavadmin">
                <Settings className="iconoopcionnavadmin" />
                <span>Configuración</span>
              </button>
              <hr className="separadornavadmin" />
              <button className="opcionnavadmin salirnavadmin">
                <LogOut className="iconoopcionnavadmin" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

