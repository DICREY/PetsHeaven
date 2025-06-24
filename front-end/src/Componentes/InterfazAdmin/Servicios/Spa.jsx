// Librarys 
import { useContext, useState } from "react"
import { Bath, X, Heart, Sparkles, Target, FileText } from "lucide-react"

// Imports 
import { HeaderUser } from '../../BarrasNavegacion/HeaderUser'
import { HeaderAdmin } from '../../BarrasNavegacion/HeaderAdmin'
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import { AuthContext } from "../../../Contexts/Contexts"
import { ServicesContainer } from "../../Global/Services"
import { Notification } from "../../Global/Notifys"
// import Footer from '../../Varios/Footer2'

// Import styles 
import "../../../styles/InterfazAdmin/Servicios/Spa.css"

// Component
export const SpaMascotas = ({ URL = '' }) => {
  // Dynamic vars 
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mostrarDetalle, setMostrarDetalle] = useState(false)
  const [ notify, setNotify ] = useState()
  const [servicioDetalle, setServicioDetalle] = useState(null)
  const [servicioEditando, setServicioEditando] = useState(null)
  const [modoEdicion, setModoEdicion] = useState(false)
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

  // Vars 
  const categorias = ["Higiene", "Estética", "Salud", "Terapéutico", "Relajación", "Especial"]
  const { admin } = useContext(AuthContext)

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(precio)
  }

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
    setNotify({
      title: 'Atencion',
      message: '¿Estás seguro de que deseas eliminar esta vacuna?',
      firstOption: () => {setNotify(null); return},
      secondOption: () => {setNotify(null); DeleteService(id)},
      firstOptionName: 'Cancelar',
      secondOptionName: 'Continuar',
    })
    const DeleteService = async (id) => {
      setServicios(servicios.filter((s) => s.id !== id))
    }
  }

  const cambiarEstado = (id, e) => {
    e.stopPropagation()
    setServicios(
      servicios.map((servicio) => (servicio.id === id ? { ...servicio, disponible: !servicio.disponible } : servicio)),
    )
  }

  return (
    <main className="contenedoradminhome">
      <NavBarAdmin/>
      <section className="tablero-admin">
        {admin? (<HeaderAdmin URL={URL} />):(<HeaderUser />)}
        <ServicesContainer 
          TitleIcon={Bath}
          title="Servicios de Spa y Cuidado"
          titleDes='Tratamientos de belleza y bienestar para tu mascota'
          subTitle="Tratamientos Disponibles"
          Name="Tratamiento"
          datas={servicios}
          filters={categorias}
          headers={{
            nom: 'nombre',
            des: 'descripcion',
            cat: 'categoria',
            sta: 'disponible',
            pri: 'precio',
            cod: 'id',
            time: 'duracion',
            alert: 'frecuencia',
          }}
          SearchHeaders={['categoria']}
          OpenCreate={abrirModalAgregar}
          OpenDetails={abrirModalDetalle}
          OpenEdit={abrirModalEditar}
          Delete={eliminarServicio}
          ChangeState={cambiarEstado}
        />

        {/* Modal Agregar/Editar */}
        {mostrarFormulario && (
          <aside className="modal-fondo-spa">
            <section className="modal-spa">
              <div className="modal-encabezado-spa">
                <h3 className="titulo-modal-spa">{modoEdicion ? "Editar Servicio" : "Agregar Nuevo Servicio"}</h3>
                <button onClick={() => setMostrarFormulario(false)} className="cerrar-modal-spa">
                  <X className="icon" />
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
            </section>
          </aside>
        )}

        {/* Modal Detalle */}
        {mostrarDetalle && servicioDetalle && (
          <aside className="modal-fondo-spa">
            <section className="modal-detalle-spa">
              <header className="modal-encabezado-spa">
                <h3 className="titulo-modal-spa">{servicioDetalle.nombre}</h3>
                <button onClick={() => setMostrarDetalle(false)} className="cerrar-modal-spa">
                  <X className="icon" />
                </button>
              </header>
              <section className="contenido-detalle-spa">
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
                      <FileText className="icono-seccion-spa icon" />
                      <h4 className="titulo-seccion-spa">Descripción</h4>
                    </div>
                    <p className="texto-seccion-spa">{servicioDetalle.descripcion}</p>
                  </div>

                  <div className="seccion-detalle-spa">
                    <div className="encabezado-seccion-spa">
                      <Heart className="icono-seccion-spa icon" />
                      <h4 className="titulo-seccion-spa">Beneficios</h4>
                    </div>
                    <p className="texto-seccion-spa">{servicioDetalle.beneficios}</p>
                  </div>

                  <div className="seccion-detalle-spa">
                    <div className="encabezado-seccion-spa">
                      <Sparkles className="icono-seccion-spa icon" />
                      <h4 className="titulo-seccion-spa">Productos</h4>
                    </div>
                    <p className="texto-seccion-spa">{servicioDetalle.productos}</p>
                  </div>

                  <div className="seccion-detalle-spa">
                    <div className="encabezado-seccion-spa">
                      <Target className="icono-seccion-spa icon" />
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
              </section>
            </section>
          </aside>
        )}
      </section>
      {notify && <Notification {...notify} />}
    </main>
  )
}