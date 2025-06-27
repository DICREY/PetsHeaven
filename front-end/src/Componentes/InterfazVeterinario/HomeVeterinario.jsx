// Librarys 
import React, { useState, useEffect, useContext } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Heart, Clock, ExternalLink, Plus, Stethoscope, Activity, FileText, AlertCircle, CheckCircle } from "lucide-react"

// Import
import { Notification } from '../Global/Notifys'
import { HeaderAdmin } from '../BarrasNavegacion/HeaderAdmin'
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { ReqFunction } from "../../Utils/Utils"
import { PostData } from "../Varios/Requests"
import { AuthContext } from "../../Contexts/Contexts"
import { errorStatusHandler, hourTraductor } from "../Varios/Util"
import AppointmentForm from "../InterfazAdmin/FormulariosAdmin/AgendarCita"

// Import styles 
import "../../styles/InterfazVeterinario/HomeVeterinario.css"

// Component
export const PanelVeterinario = ({ URL , imgDefault = '', setPetSelect }) => {
  // Dynamic vars 
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [notify, setNotify] = useState(null)
  const [appoint, setAppoint] = useState([])
  const [infoGeneral, setInfoGeneral] = useState(null)

  // Vars
  const mainUrl = `${URL}/staff`
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const stats = [
    { title: "Pacientes Hoy", value: appoint?.length || '0', icon: Stethoscope, color: "azul" },
    { title: "Cirugías Programadas", value: infoGeneral?.cir_pro || "0", icon: Activity, color: "verde" },
    { title: "Emergencias Atendidas", value: infoGeneral?.emg_ate || "0", icon: Heart, color: "rojo" },
    { title: "Consultas Completadas", value: infoGeneral?.con_com || "0", icon: FileText, color: "morado" },
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

  const handlePetSelect = (data = {}) => {
    const pet = {
      nom_mas: data.nom_mas,
      esp_mas: data.esp_mas,
      col_mas: data.col_mas,
      raz_mas: data.raz_mas,
      ali_mas: data.ali_mas,
      fec_nac_mas: data.fec_nac_mas,
      pes_mas: data.pes_mas,
      gen_mas: data.gen_mas,
      est_rep_mas: data.est_rep_mas,
      fot_mas: data.fot_mas,
      doc_per: data.prop_doc_per,
      nom_per: data.prop_nom_per,
      ape_per: data.prop_ape_per,
      email_per: data.prop_email_per,
      cel_per: data.prop_cel_per
    }
    setPetSelect(pet)
    navigate('/pets/details')
  }

  const getAppoint = async () => {
    try {
      const data = await PostData(`${URL}/appointment/by`,{ by: user.doc })
      setNotify(null)
      if (data.result) setAppoint(data.result)
    } catch (err) {
      setNotify(null)
      if (err) {
        const message = errorStatusHandler(err)
        setNotify({
          title: 'Error',
          message: `${message}`,
          close: setNotify
        })
      }
    }
  }

  useEffect(() => {
    ReqFunction(
      `${URL}/global/stats/staff`,
      PostData,
      setNotify,
      setInfoGeneral,
      { by: user.doc }
    )
    getAppoint()
  }, [])

  // Form flotante agendar cita 
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
    const toggleFormulario = () => {
      setMostrarFormulario(!mostrarFormulario);
    };

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
                  <header className="cabecera-estadistica-admin">
                    <stat.icon className="icon" aria-hidden="true" />
                  </header>
                  <div className="contenido-estadistica-admin">
                    <h2>{stat.value}</h2>
                    <p>{stat.title}</p>
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
                <span className="contador-pacientes-vet" aria-label={`${appoint?.length} pacientes programados`}>
                  {appoint?.length} pacientes
                </span>
              </header>

              <ul className="lista-citas-admin" role="list">
                {appoint?.map((cita, index) => (
                  <li 
                    key={index + 123} 
                    className={`item-paciente-vet ${cita.estado}-vet ${cita.urgencia}-vet`}
                    onClick={() => handlePetSelect(cita)}
                  >
                    <div className="hora-paciente-vet">
                      <Clock className="icon" aria-hidden="true" />
                      <time>{hourTraductor(cita.hor_ini_cit)}</time>
                    </div>

                    <div className="detalles-paciente-vet">
                      <h3>{cita.nom_mas}</h3>
                      <p>Propietario: {cita.prop_nom_per} {cita.prop_ape_per}</p>
                      <p>{cita.nom_ser}</p>
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
                <button type="button" className="EditBtn" onClick={toggleFormulario}>
                  <Plus className="icon" aria-hidden="true" />
                  Nueva Consulta
                </button>
                <button type="button" className="AddBtn" onClick={() => navigate('/mascota/registro')}>
                  <Plus className="icon" aria-hidden="true" />
                  Registrar Mascota
                </button>
                <button type="button" className="AddBtn" onClick={() => navigate('/propietario/registro')}>
                  <Plus className="icon" aria-hidden="true" />
                  Registrar Propietario
                </button>
                {mostrarFormulario && <AppointmentForm URL={URL} onClose={toggleFormulario} sended={getAppoint} />}
                <button type="button" className="DeleteBtn">
                  <Activity className="icon" aria-hidden="true" />
                  Programar Cirugía
                </button>
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
