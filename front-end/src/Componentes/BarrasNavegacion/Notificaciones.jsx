import {Bell,Clock,AlertCircle,CheckCircle,Calendar,Heart,Users,Search,Trash2,Eye,EyeOff,ArrowLeft} from "lucide-react"
import { useState } from "react"
import "../../styles/BarrasNavegacion/Notificaciones.css"
import React from "react"

import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import Header from '../BarrasNavegacion/HeaderUser'


export default function TodasLasNotificaciones({ onVolver }) {
  const [filtroActivo, setFiltroActivo] = useState("todas")
  const [busqueda, setBusqueda] = useState("")

  const notificaciones = [
    {
      id: 1,
      type: "appointment",
      title: "Nueva cita programada",
      message: "Cita para Max con Dr. García a las 09:00 AM - Consulta general",
      time: "Hace 5 min",
      date: "Hoy",
      icon: Calendar,
      color: "azul",
      leida: false,
      prioridad: "normal",
    },
    {
      id: 2,
      type: "emergency",
      title: "Emergencia atendida exitosamente",
      message: "Cirugía de emergencia para Toby completada. Paciente estable y en recuperación.",
      time: "Hace 1 hora",
      date: "Hoy",
      icon: AlertCircle,
      color: "verde",
      leida: false,
      prioridad: "alta",
    },
    {
      id: 3,
      type: "reminder",
      title: "Recordatorio de vacuna",
      message: "Luna necesita vacuna de refuerzo. Contactar a María García para programar cita.",
      time: "Hace 2 horas",
      date: "Hoy",
      icon: CheckCircle,
      color: "naranja",
      leida: true,
      prioridad: "normal",
    },
    {
      id: 4,
      type: "appointment",
      title: "Cita cancelada",
      message: "Carlos López canceló la cita de Rocky programada para las 15:30",
      time: "Hace 3 horas",
      date: "Hoy",
      icon: Calendar,
      color: "rojo",
      leida: true,
      prioridad: "normal",
    },
    {
      id: 5,
      type: "patient",
      title: "Nuevo paciente registrado",
      message: "Bella ha sido registrada como nueva paciente. Dueña: Ana Martínez",
      time: "Hace 5 horas",
      date: "Ayer",
      icon: Heart,
      color: "verde",
      leida: true,
      prioridad: "baja",
    },
    {
      id: 6,
      type: "staff",
      title: "Doctor disponible",
      message: "Dra. Rodríguez ha confirmado su disponibilidad para mañana",
      time: "Hace 1 día",
      date: "Ayer",
      icon: Users,
      color: "azul",
      leida: true,
      prioridad: "normal",
    },
    {
      id: 7,
      type: "emergency",
      title: "Alerta de emergencia",
      message: "Paciente crítico ingresado - Requiere atención inmediata",
      time: "Hace 2 días",
      date: "15 Ene",
      icon: AlertCircle,
      color: "rojo",
      leida: true,
      prioridad: "critica",
    },
    {
      id: 8,
      type: "reminder",
      title: "Recordatorio de seguimiento",
      message: "Revisar evolución post-operatoria de Max en 3 días",
      time: "Hace 3 días",
      date: "14 Ene",
      icon: Clock,
      color: "naranja",
      leida: true,
      prioridad: "normal",
    },
  ]

  const filtros = [
    { id: "todas", label: "Todas", count: notificaciones.length },
    { id: "no-leidas", label: "No leídas", count: notificaciones.filter((n) => !n.leida).length },
    { id: "appointment", label: "Citas", count: notificaciones.filter((n) => n.type === "appointment").length },
    { id: "emergency", label: "Emergencias", count: notificaciones.filter((n) => n.type === "emergency").length },
    { id: "reminder", label: "Recordatorios", count: notificaciones.filter((n) => n.type === "reminder").length },
  ]

  const notificacionesFiltradas = notificaciones.filter((notif) => {
    const cumpleFiltro =
      filtroActivo === "todas" || (filtroActivo === "no-leidas" && !notif.leida) || notif.type === filtroActivo

    const cumpleBusqueda =
      notif.title.toLowerCase().includes(busqueda.toLowerCase()) ||
      notif.message.toLowerCase().includes(busqueda.toLowerCase())

    return cumpleFiltro && cumpleBusqueda
  })

  const marcarComoLeida = (id) => {
    console.log("Marcar como leída:", id)
  }

  const eliminarNotificacion = (id) => {
    console.log("Eliminar notificación:", id)
  }

  return (
    <div className="contenedoradminhome">
      <NavBarAdmin/>
      <div className="tablero-admin">
        <main className="contenido-principal-admin">
          {/* Header del dashboard - igual que en veterinary */}
          <Header/>

          {/* Contenedor unificado para cabecera y controles */}
          <section className="contenedor-cabecera-notificaciones-noti">
            {/* Header específico de notificaciones */}
            <header className="cabecera-pagina-noti">
              <div className="titulo-seccion-noti">
                <Bell size={24} aria-hidden="true" />
                <h1>Todas las Notificaciones</h1>
              </div>

              <div className="acciones-cabecera-noti">
                <button
                  type="button"
                  className="boton-atras-noti"
                  onClick={onVolver}
                  aria-label="Volver al panel principal"
                >
                  <ArrowLeft size={20} aria-hidden="true" />
                  Volver al Panel
                </button>

                <button className="boton-marcar-todas-noti" type="button">
                  <Eye size={18} aria-hidden="true" />
                  Marcar todas como leídas
                </button>
              </div>
            </header>

            {/* Línea separadora */}
            <div className="separador-notificaciones-noti"></div>

            {/* Filtros y Búsqueda */}
            <div className="controles-notificaciones-noti">
              <nav className="filtros-notificaciones-noti" role="tablist" aria-label="Filtros de notificaciones">
                {filtros.map((filtro) => (
                  <button
                    key={filtro.id}
                    type="button"
                    role="tab"
                    aria-selected={filtroActivo === filtro.id}
                    className={`filtro-notificacion-noti ${filtroActivo === filtro.id ? "activo-noti" : ""}`}
                    onClick={() => setFiltroActivo(filtro.id)}
                  >
                    {filtro.label}
                    <span className="contador-filtro-noti" aria-label={`${filtro.count} notificaciones`}>
                      {filtro.count}
                    </span>
                  </button>
                ))}
              </nav>

              <div className="busqueda-notificaciones-noti">
                <label htmlFor="busqueda-input" className="sr-only">
                  Buscar notificaciones
                </label>
                <Search size={18} aria-hidden="true" />
                <input
                  id="busqueda-input"
                  type="search"
                  placeholder="Buscar notificaciones..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="input-busqueda-noti"
                />
              </div>
            </div>
          </section>

          {/* Lista de Notificaciones */}
          <section className="contenedor-notificaciones-noti" aria-label="Lista de notificaciones">
            {notificacionesFiltradas.length === 0 ? (
              <div className="sin-notificaciones-noti" role="status">
                <Bell size={48} aria-hidden="true" />
                <h2>No hay notificaciones</h2>
                <p>No se encontraron notificaciones que coincidan con tu búsqueda.</p>
              </div>
            ) : (
              <ul className="lista-completa-notificaciones-noti" role="list">
                {notificacionesFiltradas.map((notificacion) => (
                  <li
                    key={notificacion.id}
                    className={`notificacion-completa-noti ${!notificacion.leida ? "no-leida-noti" : ""} ${notificacion.prioridad}-noti`}
                  >
                    <div className="indicador-leida-noti" aria-hidden="true">
                      {!notificacion.leida && <div className="punto-no-leida-noti"></div>}
                    </div>

                    <div className={`icono-notificacion-completa-noti ${notificacion.color}-noti`} aria-hidden="true">
                      <notificacion.icon size={20} />
                    </div>

                    <article className="contenido-notificacion-completa-noti">
                      <header className="cabecera-notificacion-completa-noti">
                        <h3>{notificacion.title}</h3>
                        <div className="meta-notificacion-noti">
                          <time className="fecha-notificacion-noti">{notificacion.date}</time>
                          <time className="tiempo-notificacion-noti">{notificacion.time}</time>
                          {notificacion.prioridad === "alta" && (
                            <span className="prioridad-alta-noti" role="status">
                              Alta prioridad
                            </span>
                          )}
                          {notificacion.prioridad === "critica" && (
                            <span className="prioridad-critica-noti" role="alert">
                              Crítica
                            </span>
                          )}
                        </div>
                      </header>

                      <p className="mensaje-notificacion-noti">{notificacion.message}</p>
                    </article>

                    <div className="acciones-notificacion-noti">
                      <button
                        type="button"
                        className="boton-accion-notif-noti"
                        onClick={() => marcarComoLeida(notificacion.id)}
                        aria-label={
                          notificacion.leida
                            ? `Marcar "${notificacion.title}" como no leída`
                            : `Marcar "${notificacion.title}" como leída`
                        }
                      >
                        {notificacion.leida ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>

                      <button
                        type="button"
                        className="boton-accion-notif-noti eliminar-noti"
                        onClick={() => eliminarNotificacion(notificacion.id)}
                        aria-label={`Eliminar notificación "${notificacion.title}"`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}


