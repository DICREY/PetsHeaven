import React from "react"
import { useState } from "react"
import "../../styles/InterfazCliente/CitasClientes.css"

export default function CitasPage() {
  const [formData, setFormData] = useState({
    mascota: "",
    fecha: "",
    hora: "",
    veterinario: "",
    servicio: "",
    observaciones: "",
  })

  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date())

  const mascotas = [
    { id: 1, nombre: "Max", tipo: "Perro" },
    { id: 2, nombre: "Luna", tipo: "Gato" },
    { id: 3, nombre: "Rocky", tipo: "Perro" },
  ]

  const veterinarios = [
    { id: 1, nombre: "Dr. Carlos Mendoza", especialidad: "Medicina General" },
    { id: 2, nombre: "Dra. Ana García", especialidad: "Cirugía" },
    { id: 3, nombre: "Dr. Luis Rodríguez", especialidad: "Dermatología" },
    { id: 4, nombre: "Dra. María López", especialidad: "Cardiología" },
  ]

  const citasCalendario = [
    { fecha: 15, mascota: "Max", hora: "10:00" },
    { fecha: 20, mascota: "Luna", hora: "14:30" },
    { fecha: 25, mascota: "Rocky", hora: "09:00" },
  ]

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Cita agendada:", formData)
  }

  const generarCalendario = () => {
    const año = fechaSeleccionada.getFullYear()
    const mes = fechaSeleccionada.getMonth()
    const primerDia = new Date(año, mes, 1).getDay()
    const diasEnMes = new Date(año, mes + 1, 0).getDate()

    const dias = []

    // Días vacíos al inicio
    for (let i = 0; i < primerDia; i++) {
      dias.push(<div key={`vacio-${i}`} className="dia-vacio"></div>)
    }

    // Días del mes
    for (let dia = 1; dia <= diasEnMes; dia++) {
      const citaDelDia = citasCalendario.find((cita) => cita.fecha === dia)
      dias.push(
        <div key={dia} className={`dia-cal ${citaDelDia ? "con-cita" : ""}`}>
          <span className="numero-dia">{dia}</span>
          {citaDelDia && (
            <div className="cita-cal">
              <div className="cita-cal-mascota">{citaDelDia.mascota}</div>
              <div className="cita-cal-hora">{citaDelDia.hora}</div>
            </div>
          )}
        </div>,
      )
    }

    return dias
  }

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  return (
    <div className="citas-contenedor">
      <div className="citas-header">
        <h1 className="citas-titulo">Gestión de Citas</h1>
      </div>

      <div className="citas-grid">
        <div className="form-card">
          <h2 className="form-titulo">Nueva Cita</h2>
          <form className="cita-form" onSubmit={handleSubmit}>
            <div className="campo-cita">
              <label className="label-cita">Mascota</label>
              <select name="mascota" className="input-cita" value={formData.mascota} onChange={handleInputChange}>
                <option value="">Seleccionar mascota</option>
                {mascotas.map((mascota) => (
                  <option key={mascota.id} value={mascota.id}>
                    {mascota.nombre} - {mascota.tipo}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo-cita">
              <label className="label-cita">Veterinario</label>
              <select
                name="veterinario"
                className="input-cita"
                value={formData.veterinario}
                onChange={handleInputChange}
              >
                <option value="">Seleccionar veterinario</option>
                {veterinarios.map((vet) => (
                  <option key={vet.id} value={vet.id}>
                    {vet.nombre} - {vet.especialidad}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo-cita">
              <label className="label-cita">Fecha</label>
              <input
                type="date"
                name="fecha"
                className="input-cita"
                value={formData.fecha}
                onChange={handleInputChange}
              />
            </div>

            <div className="campo-cita">
              <label className="label-cita">Hora</label>
              <select name="hora" className="input-cita" value={formData.hora} onChange={handleInputChange}>
                <option value="">Seleccionar hora</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
              </select>
            </div>

            <div className="campo-cita">
              <label className="label-cita">Servicio</label>
              <select name="servicio" className="input-cita" value={formData.servicio} onChange={handleInputChange}>
                <option value="">Seleccionar servicio</option>
                <option value="consulta">Consulta general</option>
                <option value="vacunacion">Vacunación</option>
                <option value="cirugia">Cirugía</option>
                <option value="emergencia">Emergencia</option>
              </select>
            </div>

            <div className="campo-cita">
              <label className="label-cita">Observaciones</label>
              <textarea
                name="observaciones"
                className="input-cita textarea-cita"
                rows={3}
                placeholder="Describe el motivo de la consulta..."
                value={formData.observaciones}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <button type="submit" className="btn-agendar">
              Confirmar Cita
            </button>
          </form>
        </div>

        <div className="calendario-card">
          <div className="calendario-header">
            <button
              className="nav-mes"
              onClick={() =>
                setFechaSeleccionada(new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() - 1))
              }
            >
              ‹
            </button>
            <h3 className="mes-año">
              {meses[fechaSeleccionada.getMonth()]} {fechaSeleccionada.getFullYear()}
            </h3>
            <button
              className="nav-mes"
              onClick={() =>
                setFechaSeleccionada(new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 1))
              }
            >
              ›
            </button>
          </div>

          <div className="calendario-grid">
            <div className="dia-semana">Dom</div>
            <div className="dia-semana">Lun</div>
            <div className="dia-semana">Mar</div>
            <div className="dia-semana">Mié</div>
            <div className="dia-semana">Jue</div>
            <div className="dia-semana">Vie</div>
            <div className="dia-semana">Sáb</div>
            {generarCalendario()}
          </div>
        </div>
      </div>
    </div>
  )
}
