import React from "react"
import { useState } from "react"
import { Calendar, Clock, MapPin, Phone, Edit, User, Stethoscope } from "lucide-react"
import FormularioEditarCitaDetallado from "./FormularioEditarCita"
import DetallesCita from "./DetalleCita"
import "../../styles/InterfazCliente/ProximasCitas.css"
import { formatDate } from "../Varios/Util"

const ProximasCitas = ({ citas, setCitas, onActualizarCita }) => {
  const [filtro, setFiltro] = useState("todas")
  const [citaEditando, setCitaEditando] = useState(null)
  const [citaVisualizando, setCitaVisualizando] = useState(null)

  const filtrarCitas = () => {
    const ahora = new Date()
    switch (filtro) {
      case "proximas":
        return citas?.filter((cita) => new Date(cita.fec_cit) >= ahora)
      case "pasadas":
        return citas?.filter((cita) => new Date(cita.fec_cit) < ahora)
      case "confirmadas":
        return citas?.filter((cita) => cita.est_cit === "confirmada")
      case "pendientes":
        return citas?.filter((cita) => cita.est_cit === "pendiente")
      default:
        return citas
    }
  }

  const citasFiltradas = filtrarCitas()?.sort((a, b) => new Date(a.fec_cit) - new Date(b.fec_cit))

  const obtenerColorEstado = (estado) => {
    switch (estado) {
      case "confirmada":
        return "#22c55e"
      case "pendiente":
        return "#f59e0b"
      case "cancelada":
        return "#ef4444"
      default:
        return "#64748b"
    }
  }

  const esHoy = (fecha) => {
    const hoy = new Date()
    const fechaCita = new Date(fecha)
    return (
      hoy.getDate() === fechaCita.getDate() &&
      hoy.getMonth() === fechaCita.getMonth() &&
      hoy.getFullYear() === fechaCita.getFullYear()
    )
  }

  const esMañana = (fecha) => {
    const mañana = new Date()
    mañana.setDate(mañana.getDate() + 1)
    const fechaCita = new Date(fecha)
    return (
      mañana.getDate() === fechaCita.getDate() &&
      mañana.getMonth() === fechaCita.getMonth() &&
      mañana.getFullYear() === fechaCita.getFullYear()
    )
  }

  const abrirEdicion = (e, cita) => {
    e.stopPropagation()
    setCitaEditando(cita)
  }

  const cerrarEdicion = () => {
    setCitaEditando(null)
  }

  const abrirDetalles = (cita) => {
    setCitaVisualizando(cita)
  }

  const cerrarDetalles = () => {
    setCitaVisualizando(null)
  }

  const guardarCambios = (citaActualizada) => {
    onActualizarCita(citaActualizada)
    setCitaEditando(null)
  }

  return (
    <div className="contenedor-citas-cliente">
      <div className="contenedor-header-citas">
        <header className="header-citas-cliente">
          <section className="titulo-seccion-citas-cliente">
            <h1 className="titulo-citas-cliente">Mis Citas</h1>
            <p className="subtitulo-citas-cliente">Gestiona todas tus citas veterinarias</p>
          </section>

          <section className="estadisticas-citas-cliente" aria-label="Estadísticas de citas">
            <article className="stat-citas-cliente">
              <span className="numero-stat-citas-cliente">{citas?.length || 0}</span>
              <span className="label-stat-citas-cliente">Total</span>
            </article>
            <article className="stat-citas-cliente">
              <span className="numero-stat-citas-cliente">{citas?.filter((c) => c.est_cit?.toLowerCase() === "confirmada").length || 0}</span>
              <span className="label-stat-citas-cliente">Confirmadas</span>
            </article>
            <article className="stat-citas-cliente">
              <span className="numero-stat-citas-cliente">{citas?.filter((c) => c.est_cit?.toLowerCase() === "pendiente").length || 0}</span>
              <span className="label-stat-citas-cliente">Pendientes</span>
            </article>
          </section>
        </header>
      </div>

      <div className="contenedor-filtros-citas">
        <nav className="filtros-citas-cliente" aria-label="Filtros de citas">
          <div className="botones-filtro-citas-cliente" role="tablist">
            {[
              { id: "todas", label: "Todas" },
              { id: "proximas", label: "Próximas" },
              { id: "pasadas", label: "Pasadas" },
              { id: "confirmadas", label: "Confirmadas" },
              { id: "pendientes", label: "Pendientes" },
            ].map((filtroItem) => (
              <button
                key={filtroItem.id}
                className={`boton-filtro-citas-cliente ${filtro === filtroItem.id ? "activo-filtro-citas-cliente" : ""}`}
                onClick={() => setFiltro(filtroItem.id)}
                role="tab"
                aria-selected={filtro === filtroItem.id}
              >
                {filtroItem.label}
              </button>
            ))}
          </div>
        </nav>
      </div>

      <div className="contenedor-lista-citas">
        <section className="lista-citas-cliente" aria-label="Lista de citas">
          {citasFiltradas?.length > 0 ? (
            citasFiltradas?.map((cita) => (
              <article key={cita.id} className="tarjeta-cita-cliente" onClick={() => abrirDetalles(cita)}>
                <aside className="fecha-lateral-cita-cliente">
                  <time dateTime={cita.fec_cit}>
                    <span className="dia-lateral-cita-cliente">{new Date(cita.fec_cit).getDate()}</span>
                    <span className="mes-lateral-cita-cliente">
                      {new Date(cita.fec_cit).toLocaleDateString("es-ES", { month: "short" })}
                    </span>
                    <span className="año-lateral-cita-cliente">{new Date(cita.fec_cit).getFullYear()}</span>
                  </time>
                </aside>

                <div className="contenido-cita-cliente">
                  <header className="header-tarjeta-cita-cliente">
                    <div className="info-principal-cita-cliente">
                      <h3 className="servicio-cita-cliente">{cita.nom_ser}</h3>
                      <p className="mascota-cita-cliente">
                        <User size={16} />
                        {cita.nom_mas}
                      </p>
                      <p className="veterinario-cita-cliente">
                        <Stethoscope size={16} />
                        {cita.veterinario}
                      </p>
                    </div>

                    <div className="estado-y-acciones-cita-cliente">
                      <span
                        className="badge-estado-cita-cliente"
                        style={{ backgroundColor: obtenerColorEstado(cita.est_cit) }}
                      >
                        {cita.est_cit}
                      </span>
                      <div className="acciones-cita-cliente">
                        <button
                          className="boton-accion-cita-cliente editar-cita-cliente"
                          onClick={(e) => abrirEdicion(e, cita)}
                          title="Editar cita"
                          aria-label={`Editar cita de ${cita.nom_ser}`}
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>
                  </header>

                  <section className="detalles-cita-cliente" aria-label="Detalles de la cita">
                    <div className="detalle-item-cita-cliente">
                      <Calendar size={16} />
                      <span className="texto-detalle-cita-cliente">
                        {esHoy(cita.fec_cit) ? "Hoy" : esMañana(cita.fec_cit) ? "Mañana" : formatDate(cita.fec_cit)}
                      </span>
                    </div>

                    <div className="detalle-item-cita-cliente">
                      <Clock size={16} />
                      <span className="texto-detalle-cita-cliente">{cita.hor_ini_cit}</span>
                    </div>

                    <div className="detalle-item-cita-cliente">
                      <MapPin size={16} />
                      <span className="texto-detalle-cita-cliente">Clínica Pets Heaven - Consulta 2</span>
                    </div>

                    <div className="detalle-item-cita-cliente">
                      <Phone size={16} />
                      <span className="texto-detalle-cita-cliente">+34 900 123 456</span>
                    </div>
                  </section>

                  {(esHoy(cita.fec_cit) || esMañana(cita.fec_cit)) && (
                    <aside className="alerta-proxima-cita-cliente" role="alert">
                      {esHoy(cita.fec_cit) ? "Cita hoy" : "Cita mañana"} - No olvides llegar 15 minutos antes
                    </aside>
                  )}
                </div>
              </article>
            ))
          ) : (
            <section className="sin-citas-cliente" aria-label="Sin citas disponibles">
              <Calendar size={64} color="#94a3b8" />
              <h3 className="titulo-sin-citas-cliente">No hay citas</h3>
              <p className="texto-sin-citas-cliente">
                {filtro === "todas"
                  ? "No tienes citas programadas"
                  : `No tienes citas ${filtro === "proximas" ? "próximas" : filtro}`}
              </p>
            </section>
          )}
        </section>
      </div>

      {citaEditando && (
        <FormularioEditarCitaDetallado cita={citaEditando} onGuardar={guardarCambios} onCerrar={cerrarEdicion} />
      )}

      {citaVisualizando && <DetallesCita cita={citaVisualizando} onCerrar={cerrarDetalles} />}
    </div>
  )
}

export default ProximasCitas
  