import React from "react"
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
import { useState } from "react"
import EditarMascota from "./EditarMascota"
import "../../styles/InterfazCliente/HistorialMascota.css"

const HistorialMascota = ({ mascota, onNavegar }) => {
  const [mostrarEdicion, setMostrarEdicion] = useState(false)

  const descargarPDF = () => {
    // Simular descarga de PDF
    const link = document.createElement("a")
    link.href = "#"
    link.download = `historial-${mascota.nombre}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    alert(`Descargando historial médico de ${mascota.nombre} en PDF...`)
  }

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const obtenerIconoTipo = (tipo) => {
    switch (tipo.toLowerCase()) {
      case "consulta":
        return <Stethoscope size={16} />
      case "vacunación":
        return <Syringe size={16} />
      case "tratamiento":
        return <Pill size={16} />
      case "cirugía":
        return <Heart size={16} />
      default:
        return <FileText size={16} />
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

  const abrirEdicion = () => {
    setMostrarEdicion(true)
  }

  const cerrarEdicion = () => {
    setMostrarEdicion(false)
  }

  const guardarCambios = (mascotaActualizada) => {
    // Aquí se actualizaría la mascota en el estado global
    console.log("Mascota actualizada:", mascotaActualizada)
    setMostrarEdicion(false)
    alert("Datos de la mascota actualizados correctamente")
  }

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
          <p className="subtitulo-historial">Registro completo de {mascota.nombre}</p>
        </div>

        <div className="acciones-header-historial">
          <button className="boton-editar-mascota-historial" onClick={abrirEdicion}>
            <Edit size={18} />
            Editar Mascota
          </button>
          <button className="boton-descargar-historial" onClick={descargarPDF}>
            <Download size={18} />
            Descargar PDF
          </button>
        </div>
      </div>

      <div className="perfil-mascota-historial">
        <div className="foto-perfil-historial">
          <img
            src={mascota.foto || "/placeholder.svg?height=120&width=120"}
            alt={mascota.nombre}
            className="imagen-perfil-historial"
          />
          <div className="estado-perfil-historial">
            <Activity size={16} />
            <span>Activo</span>
          </div>
        </div>

        <div className="info-perfil-historial">
          <h2 className="nombre-perfil-historial">{mascota.nombre}</h2>
          <p className="raza-perfil-historial">
            {mascota.especie} • {mascota.raza}
          </p>

          <div className="detalles-perfil-historial">
            <div className="detalle-perfil-historial">
              <span className="label-perfil-historial">Edad</span>
              <span className="valor-perfil-historial">{mascota.edad} años</span>
            </div>
            <div className="detalle-perfil-historial">
              <span className="label-perfil-historial">Peso</span>
              <span className="valor-perfil-historial">{mascota.peso} kg</span>
            </div>
            <div className="detalle-perfil-historial">
              <span className="label-perfil-historial">Color</span>
              <span className="valor-perfil-historial">{mascota.color}</span>
            </div>
            <div className="detalle-perfil-historial">
              <span className="label-perfil-historial">Género</span>
              <span className="valor-perfil-historial">{mascota.genero}</span>
            </div>
            <div className="detalle-perfil-historial">
              <span className="label-perfil-historial">Esterilizado</span>
              <span className="valor-perfil-historial">{mascota.esterilizado ? "Sí" : "No"}</span>
            </div>
            <div className="detalle-perfil-historial">
              <span className="label-perfil-historial">Consultas</span>
              <span className="valor-perfil-historial">{mascota.historial?.length || 0}</span>
            </div>
          </div>
        </div>

        <div className="estadisticas-perfil-historial">
          <div className="stat-perfil-historial">
            <div className="numero-stat-perfil-historial">{mascota.historial?.length || 0}</div>
            <div className="label-stat-perfil-historial">Consultas Totales</div>
          </div>
          <div className="stat-perfil-historial">
            <div className="numero-stat-perfil-historial">
              {mascota.historial?.filter((h) => h.tipo === "Vacunación").length || 0}
            </div>
            <div className="label-stat-perfil-historial">Vacunas</div>
          </div>
          <div className="stat-perfil-historial">
            <div className="numero-stat-perfil-historial">
              {mascota.historial?.filter((h) => h.tipo === "Cirugía").length || 0}
            </div>
            <div className="label-stat-perfil-historial">Cirugías</div>
          </div>
        </div>
      </div>

      <div className="contenido-historial">
        <div className="timeline-historial">
          <h3 className="titulo-timeline-historial">Historial Médico</h3>

          {mascota.historial && mascota.historial.length > 0 ? (
            <div className="lista-timeline-historial">
              {mascota.historial
                .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                .map((registro, index) => (
                  <article key={index} className="tarjeta-historial-detallada">
                    <header className="header-historial-detallada">
                      <div className="info-principal-historial">
                        <div className="icono-tipo-detallada" style={{ color: obtenerColorTipo(registro.tipo) }}>
                          {obtenerIconoTipo(registro.tipo)}
                        </div>
                        <div className="titulo-fecha-historial">
                          <h3 className="tipo-historial-detallada">{registro.tipo}</h3>
                          <time className="fecha-historial-detallada" dateTime={registro.fecha}>
                            <Calendar size={12} />
                            {new Date(registro.fecha).toLocaleDateString("es-ES", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })}{" "}
                            -{" "}
                            {new Date(registro.fecha).toLocaleTimeString("es-ES", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </time>
                        </div>
                      </div>
                      <span
                        className="estado-historial-detallada"
                        style={{ backgroundColor: obtenerColorTipo(registro.tipo) }}
                      >
                        Completada
                      </span>
                    </header>

                    <div className="veterinario-historial-detallada">
                      <User size={16} />
                      <span>{registro.veterinario}</span>
                    </div>

                    <section className="contenido-historial-detallada">
                      <div className="campo-historial">
                        <h4 className="label-campo-historial">Diagnóstico:</h4>
                        <p className="valor-campo-historial">{registro.descripcion}</p>
                      </div>

                      <div className="campo-historial">
                        <h4 className="label-campo-historial">Tratamiento:</h4>
                        <p className="valor-campo-historial">
                          {registro.tipo === "Vacunación"
                            ? "Vacuna aplicada correctamente"
                            : registro.tipo === "Cirugía"
                              ? "Procedimiento quirúrgico exitoso"
                              : registro.tipo === "Tratamiento"
                                ? "Medicación prescrita"
                                : "Ninguno requerido"}
                        </p>
                      </div>

                      <div className="campo-historial">
                        <h4 className="label-campo-historial">Notas:</h4>
                        <p className="valor-campo-historial">
                          {registro.tipo === "Consulta"
                            ? "Mascota en excelente estado. Continuar con cuidados actuales."
                            : registro.tipo === "Vacunación"
                              ? "Próxima vacuna programada según calendario."
                              : registro.tipo === "Cirugía"
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
              <p className="texto-sin-historial">{mascota.nombre} aún no tiene registros en su historial médico.</p>
            </div>
          )}
        </div>

        <div className="sidebar-historial">
          <div className="proximas-citas-historial">
            <h4 className="titulo-sidebar-historial">Próximas Citas</h4>
            <div className="lista-proximas-historial">
              <div className="item-proxima-historial">
                <div className="fecha-proxima-historial">
                  <Calendar size={16} />
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
                  <Syringe size={16} />
                </div>
                <div className="contenido-recordatorio-historial">
                  <p className="titulo-recordatorio-historial">Vacuna Anual</p>
                  <span className="fecha-recordatorio-historial">Próxima semana</span>
                </div>
              </div>
              <div className="item-recordatorio-historial">
                <div className="icono-recordatorio-historial">
                  <Pill size={16} />
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
                <Calendar size={16} />
                Agendar Cita
              </button>
              <button className="boton-rapido-historial" onClick={descargarPDF}>
                <Download size={16} />
                Descargar PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {mostrarEdicion && <EditarMascota mascota={mascota} onGuardar={guardarCambios} onCerrar={cerrarEdicion} />}
    </div>
  )
}

export default HistorialMascota
