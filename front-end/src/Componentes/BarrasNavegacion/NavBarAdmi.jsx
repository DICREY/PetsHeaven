import { NavLink, useNavigate } from 'react-router-dom'
import React, { useState, useEffect, useContext } from 'react'
import { Settings, Users, Headset, ChevronDown, Syringe, Bath, Scissors, Cat, Calendar, LogOut, Menu, X,
  Stethoscope, CalendarRange, CalendarClock, FlaskRoundIcon as Flask, 
  Home} from 'lucide-react'

// Imports
import { checkImage } from '../Varios/Util'
import { AuthContext } from '../../Contexts/Contexts'

// Import styles
import '../../../src/styles/BarrasNavegacion/NavBarAdmin.css'

export const NavBarAdmin = () => {
  // Dynamic vars 
  const [serviciosAbierto, setServiciosAbierto] = useState(false)
  const [agendaAbierta, setAgendaAbierta] = useState(false)
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false)
  const [esMovil, setEsMovil] = useState(false)
  const [isAdmin, setIsAdmin] = useState()
  const { roles, user } = useContext(AuthContext)

  // Vars 
  const imgDefault = 'https://imgs.search.brave.com/SWL4XM1cyqoTBFewaA4zN-ry5AIZhcu9EOWH2XbBYOM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9nZXR0/eWltYWdlcy0xNDMy/ODIyOTctbWFzdGVy/LTE1MjI0Mjk4OTYu/anBnP2Nyb3A9MXh3/OjAuOTkxNzk0ODcx/Nzk0ODcxN3hoO2Nl/bnRlcix0b3AmcmVz/aXplPTk4MDoq'
  const navigate = useNavigate()

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const comprobarTamaño = () => {
      setEsMovil(window.innerWidth <= 768)
    }

    comprobarTamaño()
    window.addEventListener('resize', comprobarTamaño)

    return () => {
      window.removeEventListener('resize', comprobarTamaño)
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
    const admin = roles.includes('Administrador')
    setIsAdmin(admin)
  }, [])

  return (
    <header className='MainHeader'>
      {/* Botón de menú móvil */}
      <button
        className={`botonmovilnavadmin ${menuMovilAbierto ? 'activonavadmin' : ''}`}
        onClick={toggleMenuMovil}
        aria-label='Menú'
      >
        {menuMovilAbierto ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`barranavadmin ${menuMovilAbierto ? 'visiblenavadmin' : 'ocultanavadmin'}`}
      >
        <div className='perfilsuperiornavadmin'>
          <div className='avatarnavadmin'>
            {checkImage(
              user.img,
              `${user.names} ${user.lastNames}`,
              imgDefault,
              'inicialnavadmin'
              )}
          </div>
          <div className='nombrenavadmin'>
            {user.names} {user.lastNames}
          </div>
        </div>
        <hr className='separadornavadmin' />

 
        <nav className='menunavadmin'>
          <ul className='listanavadmin'>
            {
              isAdmin && (
                <li className='itemnavadmin'>
                  <NavLink to={'/admin/administracion'} className='enlacenavadmin'>
                    <Settings className='icononavadmin' />
                    <span>Administración</span>
                  </NavLink>
                </li>
              )
            }

            <li className='itemnavadmin'>
              <NavLink to={'/consultorio'} className='enlacenavadmin'>
                <Stethoscope className='icononavadmin' />
                <span>Consultorio</span>
              </NavLink>
            </li>

            {
              isAdmin && (
                <li className='itemnavadmin'>
                  <NavLink to={'/admin/gestion/usuarios'} className='enlacenavadmin'>
                    <Users className='icononavadmin' />
                    <span>Personal</span>
                  </NavLink>
                </li>
              )
            }

            <li className='itemnavadmin'>
              <button className='botonnavadmin' onClick={toggleAgenda}>
                <div className='contenidobotonnavadmin'>
                  <Calendar className='icononavadmin' />
                  <span>Agenda</span>
                </div>
                <ChevronDown className={`flechanavadmin ${agendaAbierta ? 'girarnavadmin' : ''}`} />
              </button>

              <ul className={`submenunavadmin ${agendaAbierta ? 'abiertonavadmin' : 'cerradonavadmin'}`}>
                <li>
                  <NavLink to={'/calendario/general'} className='subenlacenavadmin'>
                    <CalendarRange className='iconosubnavadmin' />
                    <span>Agenda General</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'/calendario/usuario'} className='subenlacenavadmin'>
                    <CalendarClock className='iconosubnavadmin' />
                    <span>Agenda Personal</span>
                  </NavLink>
                </li>
              </ul>
            </li>
            {
              isAdmin && (
                <li className='itemnavadmin'>
                  <button className='botonnavadmin' onClick={toggleServicios}>
                    <div className='contenidobotonnavadmin'>
                      <Headset className='icononavadmin' />
                      <span>Servicios</span>
                    </div>
                    <ChevronDown className={`flechanavadmin ${serviciosAbierto ? 'girarnavadmin' : ''}`} />
                  </button>

                  <ul className={`submenunavadmin ${serviciosAbierto ? 'abiertonavadmin' : 'cerradonavadmin'}`}>
                    <li>
                      <NavLink to={'/services/vacunas'} className='subenlacenavadmin'>
                        <Syringe className='iconosubnavadmin' />
                        <span>Vacunas</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={'/services/cirugia'} className='subenlacenavadmin'>
                        <Scissors className='iconosubnavadmin' />
                        <span>Cirugía</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={'/services/laboratorio'} className='subenlacenavadmin'>
                        <Flask className='iconosubnavadmin' />
                        <span>Pruebas Laboratorio</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={'/services/spa'} className='subenlacenavadmin'>
                        <Bath className='iconosubnavadmin' />
                        <span>Spa</span>
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )
            }
          </ul>
        </nav>

        <hr className='separadornavadmin' />
        <div className='opcionesnavadmin'>
          <button 
            className='opcionnavadmin'
            onClick={() => navigate('/main')}
          >
            <Home className='iconoopcionnavadmin' />
            <span>Pagina Principal</span>
          </button>
        </div>
      </aside>
    </header>
  )
}
