import React, { useContext, useEffect, useState } from "react"
import {
  ArrowLeft,
  Download,
  Edit,
  Calendar,
  FileText,
  Activity,
  User,
  Stethoscope,
  Syringe,
  Pill,
  Heart,
} from "lucide-react"

// Imports 
import EditarMascota from "./EditarMascota"
import { ModifyData, PostData } from "../Varios/Requests"
import { errorStatusHandler, formatDate, getAge, uploadImg } from "../Varios/Util"
import { AuthContext } from "../../Contexts/Contexts"

// Import styles
import "../../styles/InterfazCliente/HistorialMascota.css"
import { CheckImage } from "../../Utils/Utils"

// Component 
const HistorialMascota = ({ mascota, onNavegar, URL = '', imgDefault = '', setNotify }) => {
  // Dynamic vars 
  const [ mostrarEdicion, setMostrarEdicion ] = useState(false)
  const [ history, setHistory ] = useState(null)
  const [ vaccines, setVaccines ] = useState(null)

  // Vars 
  const { user } = useContext(AuthContext)
  const mainURL = `${URL}/pet`

  // Functions 
  const descargarPDF = () => {
    // Simular descarga de PDF
    const link = document.createElement("a")
    link.href = "#"
    link.download = `historial-${mascota.nom_mas}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    alert(`Descargando historial médico de ${mascota.nom_mas} en PDF...`)
  }

  const obtenerIconoTipo = (tipo) => {
    switch (tipo.toLowerCase()) {
      case "consulta":
        return <Stethoscope className="icon" />
      case "vacunación":
        return <Syringe className="icon" />
      case "tratamiento":
        return <Pill className="icon" />
      case "cirugía":
        return <Heart className="icon" />
      default:
        return <FileText className="icon" />
    }
  }

  const obtenerColorTipo = (tipo) => {
    switch (tipo.toLowerCase()) {
      case "consulta":
        return "#00BCD4"
      case "vacunación":
        return "#4CAF50"
      case "tratamiento":
        return "#FF9800"
      case "cirugía":
        return "#F44336"
      default:
        return "#64748b"
    }
  }

  // Request for Modify Data
  const guardarCambios = async (pet = {}) => {
    console.log("Mascota actualizada:", pet)
    setNotify({
      title: 'Validando...',
      message: 'Verificando datos proporcionados',
      load: 1
    })
    try {
      const imgUrl = pet.img_mas? pet.img_mas === 'No-registrado'? null: await uploadImg(pet.img_mas,'mascotas'): null
      const modPet = {
        nom_mas: pet.nom_mas,
        esp_mas: pet.esp_mas,
        col_mas: pet.col_mas,
        raz_mas: pet.raz_mas,
        ali_mas: pet.ali_mas,
        fec_nac_mas: pet.fec_nac_mas,
        pes_mas: pet.pes_mas,
        doc_per: pet.doc_per,
        gen_mas: pet.gen_mas,
        est_rep_mas: pet.est_rep_mas,
        img_mas: imgUrl
      }
      const mod = await ModifyData(`${mainURL}/modify`, modPet)
      setNotify(null)
      if (mod?.modify) {
        setNotify({
          title: 'Modificación exitosa',
          message: 'Los datos de la mascota han sido modificados exitosamente',
          close: setNotify
        })
        setMostrarEdicion(false)
        setTimeout(() => window.location.reload(),2000)
      }
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
    const GetVaccines = async () => {
      try {
        const data = await PostData(`${URL}/appointment/pet/vaccine`, {
          nom_mas: mascota.nom_mas,
          doc_per: user.doc
        })
        if (data?.result) {
          setVaccines(data.result)
        }
      } catch (err) {
        const message = errorStatusHandler(err)
      }
    }

    const getHistory = async () => {
      try {
        const data = await PostData(`${URL}/pet/history`,{ firstData: mascota.nom_mas, secondData: user.doc})
        setNotify(null)
        if (data?.result) setHistory(data.result)
      } catch (err) {
        setNotify(null)
        const message = errorStatusHandler(err)
      }
    }

    if (mascota?.nom_mas) {
      getHistory()
      GetVaccines()
    }
  },[mascota])

  if (!mascota) {
    return (
      <div className="contenedor-historial">
        <div className="error-historial">
          <FileText size={64} color="#ef4444" />
          <h3 className="titulo-error-historial">Mascota no encontrada</h3>
          <p className="texto-error-historial">No se pudo cargar la información de la mascota</p>
          <button className="boton-volver-error-historial" onClick={() => onNavegar("mascotas")}>
            Volver a Mascotas
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="contenedor-historial">
      <div className="header-historial">
        <button className="boton-volver-historial" onClick={() => onNavegar("mascotas")}>
          <ArrowLeft size={20} />
          Volver a Mascotas
        </button>

        <div className="titulo-seccion-historial">
          <h1 className="titulo-historial">Historial Médico</h1>
          <p className="subtitulo-historial">Registro completo de {mascota.nom_mas}</p>
        </div>

        <div className="acciones-header-historial">
          <button className="boton-editar-mascota-historial" onClick={() => setMostrarEdicion(true)}>
            <Edit className="icon" />
            Editar Mascota
          </button>
          <button className="boton-descargar-historial" onClick={descargarPDF}>
            <Download className="icon" />
            Descargar PDF
          </button>
        </div>
      </div>

      <div className="perfil-mascota-historial">
        <div className="foto-perfil-historial">
          <CheckImage
            src={mascota.fot_mas}
            alt={mascota.nom_mas}
            className="imagen-perfil-historial"
            imgDefault={imgDefault}
          />
          <div className="estado-perfil-historial">
            <Activity className="icon" />
            <span>{mascota.estado?'Activo':'Inactivo'}</span>
          </div>
        </div>

        <div className="info-perfil-historial">
          <h2 className="nombre-perfil-historial">{mascota.nom_mas}</h2>
          <p className="raza-perfil-historial">
            {mascota.esp_mas} • {mascota.raz_mas}
          </p>

          <div className="detalles-perfil-historial">
            <div className="detalle-perfil-historial">
              <span className="label-perfil-historial">Edad</span>
              <span className="valor-perfil-historial">{getAge(mascota.fec_nac_mas)} años</span>
            </div>
            <div className="detalle-perfil-historial">
              <span className="label-perfil-historial">Peso</span>
              <span className="valor-perfil-historial">{mascota.pes_mas} kg</span>
            </div>
            <div className="detalle-perfil-historial">
              <span className="label-perfil-historial">Color</span>
              <span className="valor-perfil-historial">{mascota.col_mas}</span>
            </div>
            <div className="detalle-perfil-historial">
              <span className="label-perfil-historial">Género</span>
              <span className="valor-perfil-historial">{mascota.gen_mas}</span>
            </div>
            <div className="detalle-perfil-historial">
              <span className="label-perfil-historial">Esterilizado</span>
              <span className="valor-perfil-historial">{mascota.est_rep_mas?.toLowerCase() === 'estirilizado' ? "Sí" : "No"}</span>
            </div>
            <div className="detalle-perfil-historial">
              <span className="label-perfil-historial">Consultas</span>
              <span className="valor-perfil-historial">{history?.citas?.length || 0}</span>
            </div>
          </div>
        </div>

        <div className="estadisticas-perfil-historial">
          <div className="stat-perfil-historial">
            <div className="numero-stat-perfil-historial">{history?.citas?.length || 0}</div>
            <div className="label-stat-perfil-historial">Consultas Totales</div>
          </div>
          <div className="stat-perfil-historial">
            <div className="numero-stat-perfil-historial">
              {vaccines?.length || 0}
            </div>
            <div className="label-stat-perfil-historial">Vacunas</div>
          </div>
          <div className="stat-perfil-historial">
            <div className="numero-stat-perfil-historial">
              {history?.citas?.filter((h) => h.tipo === "Cirugía").length || 0}
            </div>
            <div className="label-stat-perfil-historial">Cirugías</div>
          </div>
        </div>
      </div>

      <div className="contenido-historial">
        <div className="timeline-historial">
          <h3 className="titulo-timeline-historial">Historial Médico</h3>

          {history?.citas?.length > 0 ? (
            <div className="lista-timeline-historial">
              {history.citas?.map((registro, index) => (
                  <article key={index} className="tarjeta-historial-detallada">
                    <header className="header-historial-detallada">
                      <div className="info-principal-historial">
                        <div className="icono-tipo-detallada" style={{ color: obtenerColorTipo(registro.nom_cat) }}>
                          {obtenerIconoTipo(registro.nom_cat)}
                        </div>
                        <div className="titulo-fecha-historial">
                          <h3 className="tipo-historial-detallada">{registro.nom_cat}</h3>
                          <time className="fecha-historial-detallada" dateTime={registro.fecha}>
                            <Calendar size={12} />
                            {formatDate(registro.fec_cit)}
                          </time>
                        </div>
                      </div>
                      <span
                        className="estado-historial-detallada"
                        style={{ backgroundColor: obtenerColorTipo(registro.nom_cat) }}
                      >
                        Completada
                      </span>
                    </header>

                    <div className="veterinario-historial-detallada">
                      <User className="icon" />
                      <span>{registro.nom_per} {registro.ape_per}</span>
                    </div>

                    <section className="contenido-historial-detallada">
                      <div className="campo-historial">
                        <h4 className="label-campo-historial">Diagnóstico:</h4>
                        <p className="valor-campo-historial">{registro.des_ser}</p>
                      </div>

                      <div className="campo-historial">
                        <h4 className="label-campo-historial">Tratamiento:</h4>
                        <p className="valor-campo-historial">
                          {registro.nom_cat === "Vacunación"
                            ? "Vacuna aplicada correctamente"
                            : registro.nom_cat === "Cirugía"
                              ? "Procedimiento quirúrgico exitoso"
                              : registro.nom_cat === "Tratamiento"
                                ? "Medicación prescrita"
                                : "Ninguno requerido"}
                        </p>
                      </div>

                      <div className="campo-historial">
                        <h4 className="label-campo-historial">Notas:</h4>
                        <p className="valor-campo-historial">
                          {registro.nom_cat === "Consulta"
                            ? "Mascota en excelente estado. Continuar con cuidados actuales."
                            : registro.nom_cat === "Vacunación"
                              ? "Próxima vacuna programada según calendario."
                              : registro.nom_cat === "Cirugía"
                                ? "Recuperación satisfactoria. Seguir indicaciones post-operatorias."
                                : "Evolución favorable. Continuar con el tratamiento indicado."}
                        </p>
                      </div>
                    </section>

                    <footer className="footer-historial-detallada">
                      <button className="link-detalles-historial">Clic para ver detalles completos →</button>
                    </footer>
                  </article>
                ))}
            </div>
          ) : (
            <div className="sin-historial">
              <FileText size={48} color="#94a3b8" />
              <h4 className="titulo-sin-historial">Sin registros médicos</h4>
              <p className="texto-sin-historial">{mascota.nom_mas} aún no tiene registros en su historial médico.</p>
            </div>
          )}
        </div>

        <div className="sidebar-historial">
          <div className="proximas-citas-historial">
            <h4 className="titulo-sidebar-historial">Próximas Citas</h4>
            <div className="lista-proximas-historial">
              <div className="item-proxima-historial">
                <div className="fecha-proxima-historial">
                  <Calendar className="icon" />
                  <div className="info-fecha-proxima">
                    <span className="dia-proxima-historial">15</span>
                    <span className="mes-proxima-historial">Ene</span>
                  </div>
                </div>
                <div className="info-proxima-historial">
                  <p className="servicio-proxima-historial">Consulta General</p>
                  <span className="hora-proxima-historial">10:00 AM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="recordatorios-historial">
            <h4 className="titulo-sidebar-historial">Recordatorios</h4>
            <div className="lista-recordatorios-historial">
              <div className="item-recordatorio-historial">
                <div className="icono-recordatorio-historial">
                  <Syringe className="icon" />
                </div>
                <div className="contenido-recordatorio-historial">
                  <p className="titulo-recordatorio-historial">Vacuna Anual</p>
                  <span className="fecha-recordatorio-historial">Próxima semana</span>
                </div>
              </div>
              <div className="item-recordatorio-historial">
                <div className="icono-recordatorio-historial">
                  <Pill className="icon" />
                </div>
                <div className="contenido-recordatorio-historial">
                  <p className="titulo-recordatorio-historial">Desparasitación</p>
                  <span className="fecha-recordatorio-historial">En 2 meses</span>
                </div>
              </div>
            </div>
          </div>

          <div className="acciones-rapidas-historial">
            <h4 className="titulo-sidebar-historial">Acciones Rápidas</h4>
            <div className="botones-rapidos-historial">
              <button className="boton-rapido-historial" onClick={() => onNavegar("agendar")}>
                <Calendar className="icon" />
                Agendar Cita
              </button>
              <button className="boton-rapido-historial" onClick={descargarPDF}>
                <Download className="icon" />
                Descargar PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {mostrarEdicion && <EditarMascota mascota={mascota} imgDefault={imgDefault} onGuardar={guardarCambios} onCerrar={() => setMostrarEdicion(null)} />}
    </div>
  )
}

export default HistorialMascota
