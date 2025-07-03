import React from "react"
import { useState } from "react"
import "../../styles/InterfazCliente/InicioCliente.css"
import { Calendar, PawPrint, TrendingUp } from "lucide-react"


const InicioCliente = ({ usuario, mascotas, citas, onNavegar, URL = '' }) => {
  const obtenerSaludo = () => {
    const hora = new Date().getHours()
    if (hora < 12) return "Buenos días"
    if (hora < 18) return "Buenas tardes"
    return "Buenas noches"
  }


  const citasProximas = citas.filter((cita) => new Date(cita.fecha) >= new Date()).slice(0, 3)

  const estadisticas = [
    {
      titulo: "Mascotas Registradas",
      valor: mascotas.length,
      icono: <PawPrint size={24} />,
      color: "#00BCD4",
      descripcion: "Mascotas en tu cuenta",
    },
    {
      titulo: "Próximas Citas",
      valor: citasProximas.length,
      icono: <Calendar size={24} />,
      color: "#4CAF50",
      descripcion: "Citas programadas",
    },
    {
      titulo: "Consultas Este Mes",
      valor: 3,
      icono: <TrendingUp size={24} />,
      color: "#FF9800",
      descripcion: "Visitas realizadas",
    },
  ]

  return (
    <div className="contenedor-inicio-cliente">
      <section className="hero-inicio-cliente">
        <div className="saludo-inicio-cliente">
          <h1 className="titulo-saludo-inicio-cliente">
            {obtenerSaludo()}, {usuario.nombre.split(" ")[0]} 🌟
          </h1>
          <p className="subtitulo-saludo-inicio-cliente">Bienvenido a Pets Heaven, tu portal de cuidado veterinario</p>
        </div>

        <div className="estadisticas-inicio-cliente">
          {estadisticas.map((stat, index) => (
            <div key={index} className="tarjeta-estadistica-inicio-cliente" style={{ "--color-stat": stat.color }}>
              <div className="icono-estadistica-inicio-cliente" style={{ color: stat.color }}>
                {stat.icono}
              </div>
              <div className="contenido-estadistica-inicio-cliente">
                <h3 className="valor-estadistica-inicio-cliente">{stat.valor}</h3>
                <p className="titulo-estadistica-inicio-cliente">{stat.titulo}</p>
                <span className="descripcion-estadistica-inicio-cliente">{stat.descripcion}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="resumen-inicio-cliente">
        <div className="proximas-citas-inicio-cliente">
          <h3 className="titulo-resumen-inicio-cliente">Próximas Citas</h3>
          {citasProximas.length > 0 ? (
            <div className="lista-citas-inicio-cliente">
              {citasProximas.map((cita) => (
                <div key={cita.id} className="item-cita-inicio-cliente">
                  <div className="fecha-cita-inicio-cliente">
                    <span className="dia-cita-inicio-cliente">{new Date(cita.fecha).getDate()}</span>
                    <span className="mes-cita-inicio-cliente">
                      {new Date(cita.fecha).toLocaleDateString("es-ES", { month: "short" })}
                    </span>
                  </div>
                  <div className="info-cita-inicio-cliente">
                    <h4 className="servicio-cita-inicio-cliente">{cita.servicio}</h4>
                    <p className="mascota-cita-inicio-cliente">{cita.mascota}</p>
                    <span className="hora-cita-inicio-cliente">{cita.hora}</span>
                  </div>
                  <div className={`estado-cita-inicio-cliente ${cita.estado}`}>{cita.estado}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="sin-citas-inicio-cliente">
              <Calendar size={48} color="#94a3b8" />
              <p className="texto-sin-citas-inicio-cliente">No tienes citas programadas</p>
              <button className="boton-agendar-inicio-cliente" onClick={() => onNavegar("agendar")}>
                Agendar Primera Cita
              </button>
            </div>
          )}
        </div>

        <div className="consejos-inicio-cliente">
          <h3 className="titulo-resumen-inicio-cliente">Consejos de Cuidado</h3>
          <div className="lista-consejos-inicio-cliente">
            <div className="consejo-inicio-cliente">
              <div className="icono-consejo-inicio-cliente">❤️</div>
              <div className="texto-consejo-inicio-cliente">
                <h4 className="titulo-consejo-inicio-cliente">Ejercicio Diario</h4>
                <p className="descripcion-consejo-inicio-cliente">Mantén a tus mascotas activas con paseos regulares</p>
              </div>
            </div>
            <div className="consejo-inicio-cliente">
              <div className="icono-consejo-inicio-cliente">🛡️</div>
              <div className="texto-consejo-inicio-cliente">
                <h4 className="titulo-consejo-inicio-cliente">Vacunación al Día</h4>
                <p className="descripcion-consejo-inicio-cliente">Revisa el calendario de vacunas de tus mascotas</p>
              </div>
            </div>
            <div className="consejo-inicio-cliente">
              <div className="icono-consejo-inicio-cliente">🥗</div>
              <div className="texto-consejo-inicio-cliente">
                <h4 className="titulo-consejo-inicio-cliente">Alimentación Balanceada</h4>
                <p className="descripcion-consejo-inicio-cliente">Proporciona una dieta equilibrada y nutritiva</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default InicioCliente
