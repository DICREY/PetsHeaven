// Librarys 
import { useContext, useState } from "react"
import { Bath ,Scissors, Trash2, PenSquare, Plus, Filter, Heart, Droplets, Clock, Sparkles, X } from "lucide-react"

// Imports 
import { HeaderUser } from '../../BarrasNavegacion/HeaderUser'
import { HeaderAdmin } from '../../BarrasNavegacion/HeaderAdmin'
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import Footer from '../../Varios/Footer2'
import { AuthContext } from "../../../Contexts/Contexts"

// Import styles 
import "../../../styles/InterfazAdmin/Servicios/Spa.css"

export const SpaMascotas = ({ roles = ['Usuario'] }) => {
  const [servicios, setServicios] = useState([
    {
      id: "SPA001",
      nombre: "Baño Completo",
      descripcion: "Baño con champú especial, secado y cepillado para dejar el pelaje brillante y suave.",
      beneficios: "Elimina suciedad, parásitos externos y mal olor",
      duracion: "45-60 minutos",
      recomendaciones: "Recomendado cada 3-4 semanas dependiendo de la raza y actividad",
      precio: 45000,
      disponible: true,
    },
    {
      id: "SPA002",
      nombre: "Corte de Pelo",
      descripcion: "Corte profesional adaptado a la raza y preferencias del dueño.",
      beneficios: "Mejora la apariencia, previene enredos y reduce la caída de pelo",
      duracion: "60-90 minutos",
      recomendaciones: "Varía según la raza, generalmente cada 6-8 semanas",
      precio: 60000,
      disponible: true,
    },
    {
      id: "SPA003",
      nombre: "Limpieza Dental",
      descripcion: "Limpieza profunda de dientes y encías sin anestesia para mascotas dóciles.",
      beneficios: "Previene enfermedades dentales, mal aliento y acumulación de sarro",
      duracion: "30 minutos",
      recomendaciones: "Recomendado cada 3-4 meses para mantener buena salud bucal",
      precio: 75000,
      disponible: false,
    },
    {
      id: "SPA004",
      nombre: "Masaje Terapéutico",
      descripcion: "Sesión de masaje relajante que mejora la circulación y alivia tensiones musculares.",
      beneficios: "Reduce estrés, mejora movilidad y fortalece vínculo con la mascota",
      duracion: "30-45 minutos",
      recomendaciones: "Ideal para mascotas mayores o con problemas articulares",
      precio: 55000,
      disponible: true,
    },
  ])

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [servicioEditando, setServicioEditando] = useState(null)
  const [filtro, setFiltro] = useState("todos")
  const [nuevoServicio, setNuevoServicio] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    beneficios: "",
    duracion: "",
    recomendaciones: "",
    precio: "",
    disponible: true,
  })

  // Vars 
  const { admin } = useContext(AuthContext)

  const manejarCambioFormulario = (e) => {
    const { name, value, type, checked } = e.target
    setNuevoServicio((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const agregarServicio = (e) => {
    e.preventDefault()
    if (servicioEditando) {
      setServicios((prev) =>
        prev.map((servicio) =>
          servicio.id === servicioEditando.id ? { ...nuevoServicio, precio: Number(nuevoServicio.precio) } : servicio,
        ),
      )
      setServicioEditando(null)
    } else {
      setServicios((prev) => [...prev, { ...nuevoServicio, precio: Number(nuevoServicio.precio) }])
    }
    resetFormulario()
  }

  const editarServicio = (servicio) => {
    setNuevoServicio({ ...servicio, precio: servicio.precio.toString() })
    setServicioEditando(servicio)
    setMostrarFormulario(true)
  }

  const eliminarServicio = (id) => {
    setServicios((prev) => prev.filter((servicio) => servicio.id !== id))
  }

  const resetFormulario = () => {
    setMostrarFormulario(false)
    setServicioEditando(null)
    setNuevoServicio({
      id: "",
      nombre: "",
      descripcion: "",
      beneficios: "",
      duracion: "",
      recomendaciones: "",
      precio: "",
      disponible: true,
    })
  }

  const manejarCambioFiltro = (e) => {
    setFiltro(e.target.value)
  }

  const getIconoServicio = (nombre) => {
    if (nombre.toLowerCase().includes("baño")) return <Droplets size={24} aria-hidden="true" />
    if (nombre.toLowerCase().includes("corte")) return <Scissors size={24} aria-hidden="true" />
    if (nombre.toLowerCase().includes("limpieza")) return <Sparkles size={24} aria-hidden="true" />
    return <Heart size={24} aria-hidden="true" />
  }

  const serviciosFiltrados = servicios.filter((servicio) => {
    if (filtro === "disponibles") return servicio.disponible
    if (filtro === "no-disponibles") return !servicio.disponible
    return true
  })

  return (
    <div className="maincontenedor-spa">
      <NavBarAdmin roles={roles} />
      <div className="principaladminhome">
      {admin? (<HeaderAdmin />): (<HeaderUser />)}
        <main className="contenedor-spa">
          <div className="contenedorsecundario-spa">
            <header className="encabezado-spa">
              <div className="tituloadminhome">
                <Bath className='iconoadminhome' aria-hidden='true' />
                <h1 className="titulo-spa">Servicios de Spa y Cuidado</h1>
              </div>
            </header>

            <section className="seccion-spa">
              <header className="header-spa">
                <h2 className="subtitulo-spa">Tratamientos Disponibles</h2>
                <nav className="controles-spa">
                  <div className="filtro-contenedor-spa">
                    <Filter size={16} className="icono-filtro-spa" aria-hidden="true" />
                    <select
                      className="filtro-spa"
                      value={filtro}
                      onChange={manejarCambioFiltro}
                      aria-label="Filtrar servicios"
                    >
                      <option value="todos">Todos los servicios</option>
                      <option value="disponibles">Disponibles</option>
                      <option value="no-disponibles">No disponibles</option>
                    </select>
                  </div>
                  <button className="boton-agregar-spa" onClick={() => setMostrarFormulario(true)}>
                    <Plus size={18} aria-hidden="true" /> <span>Agregar Servicio</span>
                  </button>
                </nav>
              </header>

              {mostrarFormulario && (
                <aside className="overlay-spa" role="dialog" aria-modal="true" aria-labelledby="form-title">
                  <section className="formulario-spa">
                    <h3 id="form-title" className="titulo-formulario-spa">
                      {servicioEditando ? "Editar Servicio" : "Agregar Nuevo Servicio"}
                    </h3>
                    <button className="boton-cerrar-spa" onClick={resetFormulario} aria-label="Cerrar formulario">
                      <X size={20} />
                    </button>
                    <form onSubmit={agregarServicio}>
                      <fieldset>
                        <legend className="sr-only">Información del servicio</legend>
                        <div className="campo-spa">
                          <label htmlFor="id-spa">ID Servicio:</label>
                          <input
                            type="text"
                            id="id-spa"
                            name="id"
                            value={nuevoServicio.id}
                            onChange={manejarCambioFormulario}
                            required
                            disabled={servicioEditando}
                          />
                        </div>
                        <div className="campo-spa">
                          <label htmlFor="nombre-spa">Nombre del Servicio:</label>
                          <input
                            type="text"
                            id="nombre-spa"
                            name="nombre"
                            value={nuevoServicio.nombre}
                            onChange={manejarCambioFormulario}
                            required
                          />
                        </div>
                        <div className="campo-spa">
                          <label htmlFor="descripcion-spa">Descripción del Servicio:</label>
                          <textarea
                            id="descripcion-spa"
                            name="descripcion"
                            value={nuevoServicio.descripcion}
                            onChange={manejarCambioFormulario}
                            required
                          />
                        </div>
                        <div className="campo-spa">
                          <label htmlFor="beneficios-spa">Beneficios:</label>
                          <textarea
                            id="beneficios-spa"
                            name="beneficios"
                            value={nuevoServicio.beneficios}
                            onChange={manejarCambioFormulario}
                            required
                          />
                        </div>
                        <div className="campo-spa">
                          <label htmlFor="duracion-spa">Duración:</label>
                          <input
                            type="text"
                            id="duracion-spa"
                            name="duracion"
                            value={nuevoServicio.duracion}
                            onChange={manejarCambioFormulario}
                            required
                          />
                        </div>
                        <div className="campo-spa">
                          <label htmlFor="recomendaciones-spa">Recomendaciones:</label>
                          <textarea
                            id="recomendaciones-spa"
                            name="recomendaciones"
                            value={nuevoServicio.recomendaciones}
                            onChange={manejarCambioFormulario}
                            required
                          />
                        </div>
                        <div className="campo-spa">
                          <label htmlFor="precio-spa">Precio:</label>
                          <input
                            type="number"
                            id="precio-spa"
                            name="precio"
                            value={nuevoServicio.precio}
                            onChange={manejarCambioFormulario}
                            required
                          />
                        </div>
                        <div className="campo-checkbox-spa">
                          <label htmlFor="disponible-spa">
                            <input
                              type="checkbox"
                              id="disponible-spa"
                              name="disponible"
                              checked={nuevoServicio.disponible}
                              onChange={manejarCambioFormulario}
                            />
                            Disponible
                          </label>
                        </div>
                      </fieldset>
                      <div className="botones-formulario-spa">
                        <button type="submit" className="boton-guardar-spa">
                          {servicioEditando ? "Actualizar" : "Agregar"}
                        </button>
                        <button type="button" className="boton-cancelar-spa" onClick={resetFormulario}>
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </section>
                </aside>
              )}

              <ul className="grid-spa" aria-label="Lista de servicios de spa disponibles">
                {serviciosFiltrados.map((servicio) => (
                  <li key={servicio.id}>
                    <article className="tarjeta-spa">
                      <header className="header-tarjeta-spa">
                        <div className="info-spa">
                          <h3 className="nombre-spa">{servicio.nombre}</h3>
                          <span className={`estado-spa ${servicio.disponible ? "disponible-spa" : "no-disponible-spa"}`}>
                            {servicio.disponible ? "Disponible" : "No disponible"}
                          </span>
                        </div>
                        <div className="acciones-spa">
                          <button
                            className="boton-eliminar-spa"
                            onClick={() => eliminarServicio(servicio.id)}
                            aria-label={`Eliminar servicio ${servicio.nombre}`}
                          >
                            <Trash2 size={18} aria-hidden="true" />
                          </button>
                          <button
                            className="boton-editar-spa"
                            onClick={() => editarServicio(servicio)}
                            aria-label={`Editar servicio ${servicio.nombre}`}
                          >
                            <PenSquare size={18} aria-hidden="true" />
                          </button>
                        </div>
                      </header>

                      <p className="descripcion-tarjeta-spa">{servicio.descripcion}</p>

                      <section className="detalles-spa">
                        <div className="detalle-spa">
                          <strong>
                            <Heart size={14} className="icono-detalle-spa" aria-hidden="true" /> Beneficios:
                          </strong>
                          <p>{servicio.beneficios}</p>
                        </div>
                        <div className="detalle-spa">
                          <strong>
                            <Clock size={14} className="icono-detalle-spa" aria-hidden="true" /> Duración:
                          </strong>
                          <p>{servicio.duracion}</p>
                        </div>
                        <div className="detalle-spa">
                          <strong>
                            <Sparkles size={14} className="icono-detalle-spa" aria-hidden="true" /> Recomendaciones:
                          </strong>
                          <p>{servicio.recomendaciones}</p>
                        </div>
                      </section>

                      <footer className="footer-tarjeta-spa">
                        <span className="precio-spa">Precio: ${servicio.precio.toLocaleString()}</span>
                        <span className="id-spa">{servicio.id}</span>
                      </footer>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

