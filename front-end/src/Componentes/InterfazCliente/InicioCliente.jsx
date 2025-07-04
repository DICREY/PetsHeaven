// Librarys 
import React, { useContext, useState } from "react"
import { Calendar, PawPrint, TrendingUp } from "lucide-react"

// Imports 
import { AuthContext } from "../../Contexts/Contexts"

// Import styles
import "../../styles/InterfazCliente/InicioCliente.css"

// Component 
const InicioCliente = ({ onNavegar, appointments, pets, URL = '' }) => {
  const [ notify, setNotify ] = useState(null)
  const { user } = useContext(AuthContext)

  const obtenerSaludo = () => {
    const hora = new Date().getHours()
    if (hora < 12) return "Buenos días"
    if (hora < 18) return "Buenas tardes"
    return "Buenas noches"
  }

  const citasProximas = appointments?.filter((cita) => new Date(cita.fec_cit) >= new Date()).slice(0, 3)

  const estadisticas = [
    {
      titulo: "Mascotas Registradas",
      valor: pets?.length,
      icono: <PawPrint className="icon" />,
      color: "#00BCD4",
      descripcion: "Mascotas en tu cuenta",
    },
    {
      titulo: "Próximas Citas",
      valor: appointments?.length,
      icono: <Calendar className="icon" />,
      color: "#4CAF50",
      descripcion: "Citas programadas",
    },
    {
      titulo: "Consultas Este Mes",
      valor: 3,
      icono: <TrendingUp className="icon" />,
      color: "#FF9800",
      descripcion: "Visitas realizadas",
    },
  ]

  return (
    <div className="contenedor-inicio-cliente">
      <section className="hero-inicio-cliente">
        <div className="saludo-inicio-cliente">
          <h1 className="titulo-saludo-inicio-cliente">
            {obtenerSaludo()}, {user.names} {user.lastNames} 🌟
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
          {appointments?.length > 0 ? (
            <div className="lista-citas-inicio-cliente">
              {appointments?.map((cita, idx) => (
                <div key={idx} className="item-cita-inicio-cliente">
                  <div className="fecha-cita-inicio-cliente">
                    <span className="dia-cita-inicio-cliente">{new Date(cita.fec_cit).getDate()}</span>
                    <span className="mes-cita-inicio-cliente">
                      {new Date(cita.fec_cit).toLocaleDateString("es-ES", { month: "short" })}
                    </span>
                  </div>
                  <div className="info-cita-inicio-cliente">
                    <h4 className="servicio-cita-inicio-cliente">{cita.nom_ser}</h4>
                    <p className="mascota-cita-inicio-cliente">{cita.nom_mas}</p>
                    <span className="hora-cita-inicio-cliente">{cita.hor_ini_cit}</span>
                  </div>
                  <div className={`estado-cita-inicio-cliente ${cita.est_cit}`}>{cita.est_cit}</div>
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
