import React from "react"
import { useState } from "react"
import { Calendar, Clock, User, FileText, CheckCircle, Search } from "lucide-react"
import "../../styles/InterfazCliente/AgendarCita.css"

const AgendarCita = ({ mascotas, onAgregarCita, onNavegar }) => {
  const [paso, setPaso] = useState(1)
  const [formData, setFormData] = useState({
    mascota: "",
    servicio: "",
    veterinario: "",
    fecha: "",
    hora: "",
    motivo: "",
    urgente: false,
  })

  const [busquedaServicio, setBusquedaServicio] = useState("")
  const [fechaSeleccionada, setFechaSeleccionada] = useState("")

  const servicios = [
    { id: "consulta", nombre: "Consulta General" },
    { id: "vacunacion", nombre: "Vacunación" },
    { id: "desparasitacion", nombre: "Desparasitación" },
    { id: "cirugia", nombre: "Cirugía" },
    { id: "revision", nombre: "Revisión Anual" },
    { id: "emergencia", nombre: "Emergencia" },
    { id: "limpieza", nombre: "Limpieza Dental" },
    { id: "radiografia", nombre: "Radiografía" },
    { id: "analitica", nombre: "Analítica Sanguínea" },
    { id: "ecografia", nombre: "Ecografía" },
  ]

  const veterinarios = [
    { id: "perez", nombre: "Dr. Pérez", especialidad: "Medicina General" },
    { id: "lopez", nombre: "Dra. López", especialidad: "Cirugía" },
    { id: "martin", nombre: "Dr. Martín", especialidad: "Dermatología" },
    { id: "garcia", nombre: "Dra. García", especialidad: "Cardiología" },
    { id: "rodriguez", nombre: "Dr. Rodríguez", especialidad: "Oftalmología" },
  ]

  const horasDisponibles = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
  ]

  const serviciosFiltrados = servicios
    .filter((servicio) => servicio.nombre.toLowerCase().includes(busquedaServicio.toLowerCase()))
    .slice(0, 4)

  const manejarCambio = (campo, valor) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }))
  }

  const manejarCambioFecha = (fecha) => {
    setFechaSeleccionada(fecha)
    manejarCambio("fecha", fecha)
  }

  const siguientePaso = () => {
    if (paso < 4) setPaso(paso + 1)
  }

  const pasoAnterior = () => {
    if (paso > 1) setPaso(paso - 1)
  }

  const confirmarCita = () => {
    const servicioSeleccionado = servicios.find((s) => s.id === formData.servicio)
    const veterinarioSeleccionado = veterinarios.find((v) => v.id === formData.veterinario)
    const nuevaCita = {
      id: Date.now(),
      fecha: formData.fecha,
      hora: formData.hora,
      servicio: servicioSeleccionado.nombre,
      mascota: formData.mascota,
      estado: formData.urgente ? "urgente" : "pendiente",
      veterinario: veterinarioSeleccionado.nombre,
      motivo: formData.motivo,
      propietario: "María González",
      telefono: "+34 612 345 678",
      consultorio: "Consultorio 1",
      tipo: servicioSeleccionado.nombre,
      descripcion: formData.motivo,
      horaFin: "",
    }
    onAgregarCita(nuevaCita)
    setPaso(5)
  }

  const obtenerFechaMinima = () => {
    const hoy = new Date()
    return hoy.toISOString().split("T")[0]
  }

  const renderizarCalendario = () => {
    const hoy = new Date()
    const primerDia = new Date(hoy.getFullYear(), hoy.getMonth(), 1)
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0)
    const diasMes = []

    // Días del mes anterior para completar la primera semana
    const primerDiaSemana = primerDia.getDay()
    for (let i = primerDiaSemana - 1; i >= 0; i--) {
      const fecha = new Date(primerDia)
      fecha.setDate(fecha.getDate() - i - 1)
      diasMes.push({ fecha, esOtroMes: true })
    }

    // Días del mes actual
    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
      const fecha = new Date(hoy.getFullYear(), hoy.getMonth(), dia)
      diasMes.push({ fecha, esOtroMes: false })
    }

    // Días del mes siguiente para completar la última semana
    const diasRestantes = 42 - diasMes.length
    for (let i = 1; i <= diasRestantes; i++) {
      const fecha = new Date(ultimoDia)
      fecha.setDate(fecha.getDate() + i)
      diasMes.push({ fecha, esOtroMes: true })
    }

    return (
      <div className="calendario-agendar-cliente">
        <div className="header-calendario-cliente">
          <h4 className="titulo-calendario-cliente">
            {hoy.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
          </h4>
        </div>
        <div className="dias-semana-cliente">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((dia) => (
            <div key={dia} className="dia-semana-cliente">
              {dia}
            </div>
          ))}
        </div>
        <div className="grid-calendario-cliente">
          {diasMes.map((item, index) => {
            const fechaStr = item.fecha.toISOString().split("T")[0]
            const esHoy = fechaStr === hoy.toISOString().split("T")[0]
            const esPasado = item.fecha < hoy && !esHoy
            const esSeleccionado = fechaStr === fechaSeleccionada

            return (
              <button
                key={index}
                type="button"
                className={`dia-calendario-cliente ${
                  item.esOtroMes ? "otro-mes-cliente" : ""
                } ${esHoy ? "hoy-cliente" : ""} ${
                  esPasado ? "pasado-cliente" : ""
                } ${esSeleccionado ? "seleccionado-cliente" : ""}`}
                onClick={() => !esPasado && !item.esOtroMes && manejarCambioFecha(fechaStr)}
                disabled={esPasado || item.esOtroMes}
              >
                {item.fecha.getDate()}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const renderizarPaso = () => {
    switch (paso) {
      case 1:
        return (
          <div className="paso-agendar-cliente">
            <div className="header-paso-agendar-cliente">
              <User size={32} color="#00BCD4" />
              <h3 className="titulo-paso-agendar-cliente">Selecciona tu Mascota</h3>
              <p className="descripcion-paso-agendar-cliente">¿Para cuál de tus mascotas es la cita?</p>
            </div>

            <div className="opciones-mascota-agendar-cliente">
              {mascotas.map((mascota) => (
                <button
                  key={mascota.id}
                  type="button"
                  className={`opcion-mascota-agendar-cliente ${formData.mascota === mascota.nombre ? "seleccionada-agendar-cliente" : ""}`}
                  onClick={() => manejarCambio("mascota", mascota.nombre)}
                >
                  <img
                    src={mascota.foto || "/placeholder.svg?height=80&width=80"}
                    alt={mascota.nombre}
                    className="foto-mascota-agendar-cliente"
                  />
                  <div className="info-mascota-agendar-cliente">
                    <h4 className="nombre-mascota-agendar-cliente">{mascota.nombre}</h4>
                    <p className="detalles-mascota-agendar-cliente">
                      {mascota.especie} • {mascota.raza}
                    </p>
                    <span className="edad-mascota-agendar-cliente">{mascota.edad} años</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="paso-agendar-cliente">
            <div className="header-paso-agendar-cliente">
              <FileText size={32} color="#00BCD4" />
              <h3 className="titulo-paso-agendar-cliente">Servicio y Veterinario</h3>
              <p className="descripcion-paso-agendar-cliente">Selecciona el tipo de consulta y veterinario</p>
            </div>

            <div className="seleccion-servicio-agendar-cliente">
              <div className="buscador-servicio-cliente">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Buscar servicio..."
                  value={busquedaServicio}
                  onChange={(e) => setBusquedaServicio(e.target.value)}
                  className="input-buscar-servicio-cliente"
                />
              </div>

              <div className="lista-servicios-compacta-cliente">
                {serviciosFiltrados.map((servicio) => (
                  <button
                    key={servicio.id}
                    type="button"
                    className={`opcion-servicio-compacta-cliente ${formData.servicio === servicio.id ? "seleccionada-agendar-cliente" : ""}`}
                    onClick={() => manejarCambio("servicio", servicio.id)}
                  >
                    {servicio.nombre}
                  </button>
                ))}
              </div>
            </div>

            <div className="seleccion-veterinario-cliente">
              <h4 className="titulo-veterinario-cliente">Seleccionar Veterinario</h4>
              <div className="opciones-veterinario-cliente">
                {veterinarios.map((veterinario) => (
                  <button
                    key={veterinario.id}
                    type="button"
                    className={`opcion-veterinario-cliente ${formData.veterinario === veterinario.id ? "seleccionada-agendar-cliente" : ""}`}
                    onClick={() => manejarCambio("veterinario", veterinario.id)}
                  >
                    <div className="info-veterinario-cliente">
                      <h5 className="nombre-veterinario-cliente">{veterinario.nombre}</h5>
                      <p className="especialidad-veterinario-cliente">{veterinario.especialidad}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="campo-motivo-agendar-cliente">
              <label className="label-agendar-cliente">Motivo de la consulta (opcional)</label>
              <textarea
                className="textarea-agendar-cliente"
                placeholder="Describe brevemente el motivo de la consulta..."
                value={formData.motivo}
                onChange={(e) => manejarCambio("motivo", e.target.value)}
                rows="3"
              />
            </div>

            <div className="campo-urgente-agendar-cliente">
              <label className="checkbox-agendar-cliente">
                <input
                  type="checkbox"
                  checked={formData.urgente}
                  onChange={(e) => manejarCambio("urgente", e.target.checked)}
                />
                <span className="checkmark-agendar-cliente"></span>
                Es una consulta urgente
              </label>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="paso-agendar-cliente">
            <div className="header-paso-agendar-cliente">
              <Calendar size={32} color="#00BCD4" />
              <h3 className="titulo-paso-agendar-cliente">Fecha y Hora</h3>
              <p className="descripcion-paso-agendar-cliente">Selecciona cuándo quieres la cita</p>
            </div>

            <div className="seleccion-fecha-hora-cliente">
              <div className="calendario-contenedor-cliente">{renderizarCalendario()}</div>

              {fechaSeleccionada && (
                <div className="seleccion-hora-cliente">
                  <h4 className="titulo-hora-cliente">Horas Disponibles</h4>
                  <div className="opciones-hora-agendar-cliente">
                    {horasDisponibles.map((hora) => (
                      <button
                        key={hora}
                        type="button"
                        className={`opcion-hora-agendar-cliente ${formData.hora === hora ? "seleccionada-agendar-cliente" : ""}`}
                        onClick={() => manejarCambio("hora", hora)}
                      >
                        <Clock size={16} />
                        {hora}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case 4:
        const servicioSeleccionado = servicios.find((s) => s.id === formData.servicio)
        const veterinarioSeleccionado = veterinarios.find((v) => v.id === formData.veterinario)
        const mascotaSeleccionada = mascotas.find((m) => m.nombre === formData.mascota)

        return (
          <div className="paso-agendar-cliente">
            <div className="header-paso-agendar-cliente">
              <CheckCircle size={32} color="#00BCD4" />
              <h3 className="titulo-paso-agendar-cliente">Confirmar Cita</h3>
              <p className="descripcion-paso-agendar-cliente">Revisa los detalles antes de confirmar</p>
            </div>

            <div className="resumen-cita-agendar-cliente">
              <div className="seccion-resumen-agendar-cliente">
                <h4 className="titulo-resumen-agendar-cliente">Mascota</h4>
                <div className="detalle-resumen-agendar-cliente">
                  <img
                    src={mascotaSeleccionada?.foto || "/placeholder.svg?height=50&width=50"}
                    alt={formData.mascota}
                    className="foto-resumen-agendar-cliente"
                  />
                  <div>
                    <p className="nombre-resumen-agendar-cliente">{formData.mascota}</p>
                    <p className="info-resumen-agendar-cliente">
                      {mascotaSeleccionada?.especie} • {mascotaSeleccionada?.raza}
                    </p>
                  </div>
                </div>
              </div>

              <div className="seccion-resumen-agendar-cliente">
                <h4 className="titulo-resumen-agendar-cliente">Servicio</h4>
                <div className="detalle-resumen-agendar-cliente">
                  <p className="nombre-resumen-agendar-cliente">{servicioSeleccionado?.nombre}</p>
                </div>
              </div>

              <div className="seccion-resumen-agendar-cliente">
                <h4 className="titulo-resumen-agendar-cliente">Veterinario</h4>
                <div className="detalle-resumen-agendar-cliente">
                  <p className="nombre-resumen-agendar-cliente">{veterinarioSeleccionado?.nombre}</p>
                  <p className="info-resumen-agendar-cliente">{veterinarioSeleccionado?.especialidad}</p>
                </div>
              </div>

              <div className="seccion-resumen-agendar-cliente">
                <h4 className="titulo-resumen-agendar-cliente">Fecha y Hora</h4>
                <div className="detalle-resumen-agendar-cliente">
                  <p className="nombre-resumen-agendar-cliente">
                    {new Date(formData.fecha).toLocaleDateString("es-ES", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="info-resumen-agendar-cliente">A las {formData.hora}</p>
                </div>
              </div>

              {formData.motivo && (
                <div className="seccion-resumen-agendar-cliente">
                  <h4 className="titulo-resumen-agendar-cliente">Motivo</h4>
                  <p className="motivo-resumen-agendar-cliente">{formData.motivo}</p>
                </div>
              )}

              {formData.urgente && (
                <div className="alerta-urgente-agendar-cliente">
                  <FileText size={16} />
                  Consulta marcada como urgente
                </div>
              )}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="paso-agendar-cliente exito-agendar-cliente">
            <div className="header-paso-agendar-cliente">
              <CheckCircle size={64} color="#4CAF50" />
              <h3 className="titulo-paso-agendar-cliente">¡Cita Agendada!</h3>
              <p className="descripcion-paso-agendar-cliente">Tu cita ha sido programada exitosamente</p>
            </div>

            <div className="mensaje-exito-agendar-cliente">
              <p className="texto-exito-agendar-cliente">
                Recibirás una confirmación por email y SMS. Te recordaremos la cita 24 horas antes.
              </p>

              <div className="acciones-exito-agendar-cliente">
                <button className="boton-ver-citas-agendar-cliente" onClick={() => onNavegar("citas")}>
                  Ver Mis Citas
                </button>
                <button className="boton-inicio-agendar-cliente" onClick={() => onNavegar("inicio")}>
                  Volver al Inicio
                </button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="contenedor-agendar-cliente">
      <div className="header-agendar-cliente">
        <h1 className="titulo-agendar-cliente">Agendar Nueva Cita</h1>
        <p className="subtitulo-agendar-cliente">Programa una consulta para tu mascota en pocos pasos</p>
      </div>

      {paso < 5 && (
        <div className="progreso-agendar-cliente">
          <div className="barra-progreso-agendar-cliente">
            <div className="progreso-completado-agendar-cliente" style={{ width: `${(paso / 4) * 100}%` }}></div>
          </div>
          <div className="pasos-agendar-cliente">
            {["Mascota", "Servicio", "Fecha", "Confirmar"].map((nombre, index) => (
              <div
                key={index}
                className={`paso-item-agendar-cliente ${paso > index ? "completado-agendar-cliente" : ""} ${paso === index + 1 ? "activo-agendar-cliente" : ""}`}
              >
                <div className="numero-paso-agendar-cliente">{index + 1}</div>
                <span className="nombre-paso-agendar-cliente">{nombre}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="contenido-agendar-cliente">{renderizarPaso()}</div>

      {paso < 5 && (
        <div className="botones-agendar-cliente">
          {paso > 1 && (
            <button className="boton-anterior-agendar-cliente" onClick={pasoAnterior}>
              ← Anterior
            </button>
          )}

          {paso < 4 ? (
            <button
              className="boton-siguiente-agendar-cliente"
              onClick={siguientePaso}
              disabled={
                (paso === 1 && !formData.mascota) ||
                (paso === 2 && (!formData.servicio || !formData.veterinario)) ||
                (paso === 3 && (!formData.fecha || !formData.hora))
              }
            >
              Siguiente →
            </button>
          ) : (
            <button className="boton-confirmar-agendar-cliente" onClick={confirmarCita}>
              Confirmar Cita
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default AgendarCita

