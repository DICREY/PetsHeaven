import React from "react"
import "../../styles/InterfazCliente/HomeCliente.css"

export default function InicioPage({ onNavegar }) {
  const servicios = [
    { icono: "🩺", titulo: "Consultas", desc: "Revisiones generales y diagnósticos especializados" },
    { icono: "💉", titulo: "Vacunación", desc: "Programa completo de vacunas para todas las edades" },
    { icono: "🏥", titulo: "Cirugías", desc: "Procedimientos quirúrgicos con tecnología avanzada" },
    { icono: "🦷", titulo: "Odontología", desc: "Cuidado dental especializado para mascotas" },
    { icono: "🔬", titulo: "Laboratorio", desc: "Análisis clínicos y estudios especializados" },
    { icono: "🚑", titulo: "Emergencias", desc: "Atención de urgencias las 24 horas" },
  ]

  return (
    <div className="inicio-contenedor">
      <section className="hero-inicio">
        <div className="hero-contenido">
          <h1 className="hero-titulo">Bienvenido a VetCare</h1>
          <p className="hero-desc">
            El cuidado de tus mascotas es nuestra prioridad. Agenda citas, consulta el historial y mantente al día con
            la salud de tus compañeros.
          </p>
          <div className="hero-botones">
            <button className="btn-primario-inicio" onClick={() => onNavegar("citas")}>
              Agendar Cita
            </button>
            <button className="btn-secundario-inicio" onClick={() => onNavegar("mascotas")}>
              Ver Mascotas
            </button>
          </div>
        </div>
      </section>

      <section className="servicios-inicio">
        <h2 className="servicios-titulo">Nuestros Servicios</h2>
        <div className="servicios-grid">
          {servicios.map((servicio, index) => (
            <div key={index} className="servicio-card">
              <div className="servicio-icono">{servicio.icono}</div>
              <h3 className="servicio-titulo">{servicio.titulo}</h3>
              <p className="servicio-desc">{servicio.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
