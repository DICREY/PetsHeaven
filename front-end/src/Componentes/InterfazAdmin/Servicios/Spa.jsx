// Librarys 
import { useContext, useState } from "react"
import { Bath, Plus, Trash2, Edit, X, Heart, Clock, Sparkles, Timer, Target, FileText } from "lucide-react"

// Imports 
import { HeaderUser } from '../../BarrasNavegacion/HeaderUser'
import { HeaderAdmin } from '../../BarrasNavegacion/HeaderAdmin'
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import Footer from '../../Varios/Footer2'
import { AuthContext } from "../../../Contexts/Contexts"

// Import styles 
import "../../../styles/InterfazAdmin/Servicios/Spa.css"

// Component
export function SpaMascotas() {
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
      categoria: "Higiene",
      tipoAnimal: "ambos",
      productos: "Champú hipoalergénico, acondicionador, desparasitante externo",
      frecuencia: "Cada 3-4 semanas",
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
      categoria: "Estética",
      tipoAnimal: "ambos",
      productos: "Tijeras profesionales, máquina de corte, productos de acabado",
      frecuencia: "Cada 6-8 semanas",
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
      categoria: "Salud",
      tipoAnimal: "ambos",
      productos: "Pasta dental enzimática, cepillos especializados, enjuague bucal",
      frecuencia: "Cada 3-4 meses",
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
      categoria: "Terapéutico",
      tipoAnimal: "ambos",
      productos: "Aceites esenciales, cremas terapéuticas, técnicas de relajación",
      frecuencia: "Semanal o según necesidad",
    },
  ])

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mostrarDetalle, setMostrarDetalle] = useState(false)
  const [servicioDetalle, setServicioDetalle] = useState(null)
  const [servicioEditando, setServicioEditando] = useState(null)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [nuevoServicio, setNuevoServicio] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    beneficios: "",
    duracion: "",
    recomendaciones: "",
    precio: "",
    disponible: true,
    categoria: "Higiene",
    tipoAnimal: "ambos",
    productos: "",
    frecuencia: "",
  })

  const categorias = ["Higiene", "Estética", "Salud", "Terapéutico", "Relajación", "Especial"]

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(precio)
  }

  const serviciosFiltrados = servicios.filter((servicio) => {
    if (filtroTipo === "todos") return true
    if (filtroTipo === "disponibles") return servicio.disponible
    if (filtroTipo === "no-disponibles") return !servicio.disponible
    return servicio.categoria === filtroTipo
  })

  const abrirModalAgregar = () => {
    setNuevoServicio({
      id: "",
      nombre: "",
      descripcion: "",
      beneficios: "",
      duracion: "",
      recomendaciones: "",
      precio: "",
      disponible: true,
      categoria: "Higiene",
      tipoAnimal: "ambos",
      productos: "",
      frecuencia: "",
    })
    setModoEdicion(false)
    setMostrarFormulario(true)
  }

  const abrirModalEditar = (servicio) => {
    setNuevoServicio({ ...servicio, precio: servicio.precio.toString() })
    setServicioEditando(servicio.id)
    setModoEdicion(true)
    setMostrarFormulario(true)
  }

  const abrirModalDetalle = (servicio) => {
    setServicioDetalle(servicio)
    setMostrarDetalle(true)
  }

  const guardarServicio = () => {
    if (nuevoServicio.nombre && nuevoServicio.precio > 0) {
      if (modoEdicion) {
        setServicios(
          servicios.map((s) =>
            s.id === servicioEditando ? { ...nuevoServicio, precio: Number(nuevoServicio.precio) } : s,
          ),
        )
      } else {
        setServicios([...servicios, { ...nuevoServicio, precio: Number(nuevoServicio.precio) }])
      }
      setMostrarFormulario(false)
    }
  }

  const eliminarServicio = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este servicio?")) {
      setServicios(servicios.filter((s) => s.id !== id))
    }
  }

  const cambiarEstado = (id, e) => {
    e.stopPropagation()
    setServicios(
      servicios.map((servicio) => (servicio.id === id ? { ...servicio, disponible: !servicio.disponible } : servicio)),
    )
  }

  const obtenerColorCategoria = (categoria) => {
    const colores = {
      Higiene: "bg-blue-100 text-blue-700",
      Estética: "bg-pink-100 text-pink-700",
      Salud: "bg-green-100 text-green-700",
      Terapéutico: "bg-purple-100 text-purple-700",
      Relajación: "bg-indigo-100 text-indigo-700",
      Especial: "bg-orange-100 text-orange-700",
    }
    return colores[categoria] || "bg-gray-100 text-gray-700"
  }

  return (
    <div className="contenedor-spa">
      <div className="contenedor-principal-spa">
        {/* Encabezado */}
        <header className="encabezado-spa">
          <div className="titulo-con-icono-spa">
            <Bath className="icono-titulo-spa" />
            <h1 className="titulo-spa">Servicios de Spa y Cuidado</h1>
          </div>
          <p className="descripcion-spa">Tratamientos de belleza y bienestar para tu mascota</p>
        </header>

        {/* Controles */}
        <div className="controles-spa">
          <h2 className="subtitulo-spa">Tratamientos Disponibles</h2>
          <div className="acciones-control-spa">
            <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} className="filtro-spa">
              <option value="todos">Todos los servicios</option>
              <option value="disponibles">Disponibles</option>
              <option value="no-disponibles">No disponibles</option>
              <optgroup label="Por categoría">
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </optgroup>
            </select>
            <button onClick={abrirModalAgregar} className="boton-agregar-spa">
              <Plus size={16} />
              Agregar Servicio
            </button>
          </div>
        </div>

        {/* Grid de servicios */}
        <div className="grid-spa">
          {serviciosFiltrados.map((servicio) => (
            <div
              key={servicio.id}
              className={`tarjeta-spa ${!servicio.disponible ? "no-disponible-spa" : ""}`}
              onClick={() => abrirModalDetalle(servicio)}
            >
              <div className="encabezado-tarjeta-spa">
                <div className="info-principal-spa">
                  <h3 className="nombre-spa">{servicio.nombre}</h3>
                  <div className="etiquetas-spa">
                    <span className={`categoria-spa ${obtenerColorCategoria(servicio.categoria)}`}>
                      {servicio.categoria}
                    </span>
                    <span
                      className={`estado-spa ${servicio.disponible ? "disponible-spa" : "no-disponible-badge-spa"}`}
                      onClick={(e) => cambiarEstado(servicio.id, e)}
                    >
                      {servicio.disponible ? "Disponible" : "No disponible"}
                    </span>
                  </div>
                </div>
                <div className="acciones-spa">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      eliminarServicio(servicio.id)
                    }}
                    className="boton-eliminar-spa"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      abrirModalEditar(servicio)
                    }}
                    className="boton-editar-spa"
                  >
                    <Edit size={16} />
                  </button>
                </div>
              </div>

              <p className="descripcion-tarjeta-spa">{servicio.descripcion}</p>

              <div className="detalles-rapidos-spa">
                <div className="detalle-rapido-spa">
                  <Clock size={14} className="icono-detalle-spa" />
                  <span className="texto-detalle-spa">{servicio.duracion}</span>
                </div>
                <div className="detalle-rapido-spa">
                  <Timer size={14} className="icono-detalle-spa" />
                  <span className="texto-detalle-spa">{servicio.frecuencia}</span>
                </div>
              </div>

              <div className="footer-tarjeta-spa">
                <span className="precio-spa">{formatearPrecio(servicio.precio)}</span>
                <span className="id-spa">{servicio.id}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Agregar/Editar */}
        {mostrarFormulario && (
          <div className="modal-fondo-spa">
            <div className="modal-spa">
              <div className="modal-encabezado-spa">
                <h3 className="titulo-modal-spa">{modoEdicion ? "Editar Servicio" : "Agregar Nuevo Servicio"}</h3>
                <button onClick={() => setMostrarFormulario(false)} className="cerrar-modal-spa">
                  <X size={20} />
                </button>
              </div>
              <div className="formulario-spa">
                <div className="seccion-formulario-spa">
                  <h4 className="titulo-seccion-formulario">Información General</h4>
                  <div className="campos-formulario-spa">
                    <div className="campos-dobles-spa">
                      <div className="campo-spa">
                        <label className="etiqueta-campo-spa">ID Servicio</label>
                        <input
                          type="text"
                          value={nuevoServicio.id}
                          onChange={(e) => setNuevoServicio({ ...nuevoServicio, id: e.target.value })}
                          className="input-spa"
                          disabled={modoEdicion}
                          placeholder="Ej: SPA001"
                        />
                      </div>
                      <div className="campo-spa">
                        <label className="etiqueta-campo-spa">Nombre del Servicio</label>
                        <input
                          type="text"
                          value={nuevoServicio.nombre}
                          onChange={(e) => setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })}
                          className="input-spa"
                          placeholder="Ej: Baño Completo"
                        />
                      </div>
                    </div>
                    <div className="campo-spa">
                      <label className="etiqueta-campo-spa">Descripción</label>
                      <textarea
                        value={nuevoServicio.descripcion}
                        onChange={(e) => setNuevoServicio({ ...nuevoServicio, descripcion: e.target.value })}
                        className="textarea-spa"
                        rows={2}
                        placeholder="Descripción del servicio de spa"
                      />
                    </div>
                  </div>
                </div>

                <div className="seccion-formulario-spa">
                  <h4 className="titulo-seccion-formulario">Detalles y Clasificación</h4>
                  <div className="campos-formulario-spa">
                    <div className="campos-dobles-spa">
                      <div className="campo-spa">
                        <label className="etiqueta-campo-spa">Precio (COP)</label>
                        <input
                          type="number"
                          value={nuevoServicio.precio}
                          onChange={(e) => setNuevoServicio({ ...nuevoServicio, precio: e.target.value })}
                          className="input-spa"
                          placeholder="Ej: 45000"
                        />
                      </div>
                      <div className="campo-spa">
                        <label className="etiqueta-campo-spa">Duración</label>
                        <input
                          type="text"
                          value={nuevoServicio.duracion}
                          onChange={(e) => setNuevoServicio({ ...nuevoServicio, duracion: e.target.value })}
                          className="input-spa"
                          placeholder="Ej: 45-60 minutos"
                        />
                      </div>
                    </div>
                    <div className="campos-dobles-spa">
                      <div className="campo-spa">
                        <label className="etiqueta-campo-spa">Tipo de Animal</label>
                        <select
                          value={nuevoServicio.tipoAnimal}
                          onChange={(e) => setNuevoServicio({ ...nuevoServicio, tipoAnimal: e.target.value })}
                          className="select-spa"
                        >
                          <option value="perro">Perro</option>
                          <option value="gato">Gato</option>
                          <option value="ambos">Ambos</option>
                        </select>
                      </div>
                      <div className="campo-spa">
                        <label className="etiqueta-campo-spa">Categoría</label>
                        <select
                          value={nuevoServicio.categoria}
                          onChange={(e) => setNuevoServicio({ ...nuevoServicio, categoria: e.target.value })}
                          className="select-spa"
                        >
                          {categorias.map((categoria) => (
                            <option key={categoria} value={categoria}>
                              {categoria}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="campos-dobles-spa">
                      <div className="campo-spa">
                        <label className="etiqueta-campo-spa">Frecuencia Recomendada</label>
                        <input
                          type="text"
                          value={nuevoServicio.frecuencia}
                          onChange={(e) => setNuevoServicio({ ...nuevoServicio, frecuencia: e.target.value })}
                          className="input-spa"
                          placeholder="Ej: Cada 3-4 semanas"
                        />
                      </div>
                      <div className="campo-spa">
                        <label className="etiqueta-campo-spa">Productos Utilizados</label>
                        <input
                          type="text"
                          value={nuevoServicio.productos}
                          onChange={(e) => setNuevoServicio({ ...nuevoServicio, productos: e.target.value })}
                          className="input-spa"
                          placeholder="Ej: Champú hipoalergénico"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="seccion-formulario-spa">
                  <h4 className="titulo-seccion-formulario">Información de Bienestar</h4>
                  <div className="campos-formulario-spa">
                    <div className="campo-spa">
                      <label className="etiqueta-campo-spa">Beneficios</label>
                      <textarea
                        value={nuevoServicio.beneficios}
                        onChange={(e) => setNuevoServicio({ ...nuevoServicio, beneficios: e.target.value })}
                        className="textarea-spa"
                        rows={2}
                        placeholder="Beneficios del tratamiento"
                      />
                    </div>
                    <div className="campo-spa">
                      <label className="etiqueta-campo-spa">Recomendaciones</label>
                      <textarea
                        value={nuevoServicio.recomendaciones}
                        onChange={(e) => setNuevoServicio({ ...nuevoServicio, recomendaciones: e.target.value })}
                        className="textarea-spa"
                        rows={2}
                        placeholder="Recomendaciones para el cuidado"
                      />
                    </div>
                    <div className="campo-checkbox-spa">
                      <input
                        type="checkbox"
                        checked={nuevoServicio.disponible}
                        onChange={(e) => setNuevoServicio({ ...nuevoServicio, disponible: e.target.checked })}
                        className="checkbox-spa"
                      />
                      <label className="etiqueta-checkbox-spa">Disponible</label>
                    </div>
                  </div>
                </div>

                <div className="botones-formulario-spa">
                  <button onClick={guardarServicio} className="boton-guardar-spa">
                    {modoEdicion ? "Actualizar" : "Agregar"}
                  </button>
                  <button onClick={() => setMostrarFormulario(false)} className="boton-cancelar-spa">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Detalle */}
        {mostrarDetalle && servicioDetalle && (
          <div className="modal-fondo-spa">
            <div className="modal-detalle-spa">
              <div className="modal-encabezado-spa">
                <h3 className="titulo-modal-spa">{servicioDetalle.nombre}</h3>
                <button onClick={() => setMostrarDetalle(false)} className="cerrar-modal-spa">
                  <X size={20} />
                </button>
              </div>
              <div className="contenido-detalle-spa">
                {/* Métricas principales */}
                <div className="metricas-principales-spa">
                  <div className="metrica-spa">
                    <div className="valor-metrica-spa">{formatearPrecio(servicioDetalle.precio)}</div>
                    <div className="etiqueta-metrica-spa">Precio</div>
                  </div>
                  <div className="metrica-spa">
                    <div className="valor-metrica-spa">{servicioDetalle.duracion}</div>
                    <div className="etiqueta-metrica-spa">Duración</div>
                  </div>
                  <div className="metrica-spa">
                    <div className="valor-metrica-spa">{servicioDetalle.categoria}</div>
                    <div className="etiqueta-metrica-spa">Categoría</div>
                  </div>
                  <div className="metrica-spa">
                    <div
                      className={`valor-metrica-spa ${
                        servicioDetalle.disponible ? "texto-verde-spa" : "texto-rojo-spa"
                      }`}
                    >
                      {servicioDetalle.disponible ? "SÍ" : "NO"}
                    </div>
                    <div className="etiqueta-metrica-spa">Disponible</div>
                  </div>
                </div>

                {/* Grid de información */}
                <div className="grid-detalle-spa">
                  <div className="seccion-detalle-spa">
                    <div className="encabezado-seccion-spa">
                      <FileText size={20} className="icono-seccion-spa" />
                      <h4 className="titulo-seccion-spa">Descripción</h4>
                    </div>
                    <p className="texto-seccion-spa">{servicioDetalle.descripcion}</p>
                  </div>

                  <div className="seccion-detalle-spa">
                    <div className="encabezado-seccion-spa">
                      <Heart size={20} className="icono-seccion-spa" />
                      <h4 className="titulo-seccion-spa">Beneficios</h4>
                    </div>
                    <p className="texto-seccion-spa">{servicioDetalle.beneficios}</p>
                  </div>

                  <div className="seccion-detalle-spa">
                    <div className="encabezado-seccion-spa">
                      <Sparkles size={20} className="icono-seccion-spa" />
                      <h4 className="titulo-seccion-spa">Productos</h4>
                    </div>
                    <p className="texto-seccion-spa">{servicioDetalle.productos}</p>
                  </div>

                  <div className="seccion-detalle-spa">
                    <div className="encabezado-seccion-spa">
                      <Target size={20} className="icono-seccion-spa" />
                      <h4 className="titulo-seccion-spa">Recomendaciones</h4>
                    </div>
                    <p className="texto-seccion-spa">{servicioDetalle.recomendaciones}</p>
                  </div>
                </div>

                {/* Información adicional */}
                <div className="info-adicional-spa">
                  <h4 className="titulo-info-adicional-spa">Información Adicional</h4>
                  <div className="contenedor-info-adicional-spa">
                    <div className="item-info-adicional-spa">
                      <span className="etiqueta-info-adicional-spa">Frecuencia:</span>
                      <span className="valor-info-adicional-spa">{servicioDetalle.frecuencia}</span>
                    </div>
                    <div className="item-info-adicional-spa">
                      <span className="etiqueta-info-adicional-spa">Tipo de Animal:</span>
                      <span className="valor-info-adicional-spa">
                        {servicioDetalle.tipoAnimal === "perro"
                          ? "Perros"
                          : servicioDetalle.tipoAnimal === "gato"
                            ? "Gatos"
                            : "Perros y gatos"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

