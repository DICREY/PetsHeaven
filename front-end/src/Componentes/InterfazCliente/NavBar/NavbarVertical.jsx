// Librarys 
import React, { useContext } from "react"
import { Home, PawPrint, Calendar, Clock, Stethoscope } from "lucide-react"
import { useNavigate } from "react-router"

// Imports 
import { AuthContext } from "../../../Contexts/Contexts"

// Import styles
import "../../../styles/InterfazCliente/NavBar/NavbarVertical.css"

// Component 
export const NavbarVertical = ({ vistaActual, onNavegar }) => {
  // Vars 
  const { admin } = useContext(AuthContext)
  const navigate = useNavigate()
  const menuItems = [
    {
      id: "inicio",
      titulo: "Inicio",
      icono: <Home className="icon" />,
      descripcion: "Panel principal",
    },
    {
      id: "mascotas",
      titulo: "Mascotas",
      icono: <PawPrint className="icon" />,
      descripcion: "Gestionar mascotas",
    },
    {
      id: "agendar",
      titulo: "Agendar Cita",
      icono: <Calendar className="icon" />,
      descripcion: "Nueva cita",
    },
    {
      id: "citas",
      titulo: "Próximas Citas",
      icono: <Clock className="icon" />,
      descripcion: "Ver citas programadas",
    },
  ]

  return (
    <nav className="navbar-vertical">
      <div className="logo-vertical">
        <div className="icono-logo-vertical">
          <Stethoscope className="icon" color="#00BCD4" />
        </div>
        <div className="texto-logo-vertical">
          <h2 className="nombre-logo-vertical">Pets Heaven</h2>
          <p className="subtitulo-logo-vertical">Portal Cliente</p>
        </div>
      </div>

      <div className="menu-vertical">
        {menuItems?.map((item) => (
          <button
            key={item.id}
            className={`item-menu-vertical ${vistaActual === item.id ? "activo-vertical" : ""}`}
            onClick={() => onNavegar(item.id)}
          >
            <div className="icono-menu-vertical">{item.icono}</div>
            <div className="texto-menu-vertical">
              <span className="titulo-menu-vertical">{item.titulo}</span>
              <span className="descripcion-menu-vertical">{item.descripcion}</span>
            </div>
          </button>
        ))}
        {admin && (
          <button
            className={'item-menu-vertical'}
            onClick={() => navigate(-1)}
          >
            <div className="icono-menu-vertical"><Home className="icon" /></div>
            <div className="texto-menu-vertical">
              <span className="titulo-menu-vertical">Volver</span>
              <span className="descripcion-menu-vertical">Regresar al panel anterior</span>
            </div>
          </button>
        )}
      </div>

      <div className="footer-vertical">
        <div className="info-clinica-vertical">
          <h4 className="nombre-clinica-vertical">Clínica Pets Heaven</h4>
          <p className="telefono-clinica-vertical">📞 +34 900 123 456</p>
          <p className="horario-clinica-vertical">🕒 L-V: 9:00-20:00</p>
        </div>
      </div>
    </nav>
  )
}