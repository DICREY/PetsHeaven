// Librarys
import { useState, useRef, useEffect, useContext, useCallback } from "react";
import { Trash2, PenSquare, Plus, Filter, AlertCircle, FileText, Activity } from "lucide-react"

// Imports
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import { HeaderUser } from '../../BarrasNavegacion/HeaderUser'
import { HeaderAdmin } from '../../BarrasNavegacion/HeaderAdmin'
import { errorStatusHandler } from '../../Varios/Util'
import { Notification } from '../../Global/Notifys'
import Footer from '../../Varios/Footer2'
import { GetData, PostData, ModifyData } from "../../Varios/Requests"
import { AuthContext } from "../../../Contexts/Contexts"

// Style
import "../../../styles/InterfazAdmin/Servicios/Cirugia.css"

export default function CirugiasVeterinaria() {
  const [cirugias, setCirugias] = useState([
    {
      id: "CIR001",
      nombre: "Esterilización",
      descripcion: "Procedimiento quirúrgico para prevenir la reproducción en mascotas.",
      complicaciones: "Sangrado, infección, reacción a anestesia",
      recomendaciones: "Ayuno de 12 horas previo. Reposo post-operatorio de 7-10 días.",
      precio: 150000,
      disponible: true,
      duracion: "45-60 minutos",
      tipoAnimal: "ambos",
      categoria: "Preventiva",
      recuperacion: "7-10 días",
      preparacion: "Ayuno de 12 horas, exámenes prequirúrgicos",
      anestesia: "General inhalatoria",
    },
    {
      id: "CIR002",
      nombre: "Extracción Dental",
      descripcion: "Remoción de piezas dentales dañadas o infectadas.",
      complicaciones: "Sangrado, dolor post-operatorio, infección",
      recomendaciones: "Dieta blanda por 3-5 días. Antibióticos según prescripción.",
      precio: 80000,
      disponible: true,
      duracion: "30-45 minutos",
      tipoAnimal: "ambos",
      categoria: "Dental",
      recuperacion: "3-5 días",
      preparacion: "Ayuno de 8 horas, evaluación dental previa",
      anestesia: "General o local según caso",
    },
    {
      id: "CIR003",
      nombre: "Cirugía de Cataratas",
      descripcion: "Procedimiento para restaurar la visión en casos de cataratas.",
      complicaciones: "Infección ocular, rechazo del implante, ceguera",
      recomendaciones: "Collar isabelino por 2 semanas. Gotas oftálmicas diarias.",
      precio: 450000,
      disponible: false,
      duracion: "60-90 minutos",
      tipoAnimal: "ambos",
      categoria: "Oftalmológica",
      recuperacion: "2-3 semanas",
      preparacion: "Evaluación oftalmológica completa, ayuno de 12 horas",
      anestesia: "General con monitoreo especializado",
    },
    {
      id: "CIR004",
      nombre: "Reparación de Fractura",
      descripcion: "Cirugía ortopédica para reparar huesos fracturados.",
      complicaciones: "Infección ósea, rechazo de implantes, cojera permanente",
      recomendaciones: "Reposo absoluto 4-6 semanas. Fisioterapia posterior.",
      precio: 320000,
      disponible: true,
      duracion: "90-120 minutos",
      tipoAnimal: "ambos",
      categoria: "Ortopédica",
      recuperacion: "4-6 semanas",
      preparacion: "Radiografías, ayuno de 12 horas, estabilización previa",
      anestesia: "General con analgesia multimodal",
    },
  ])

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mostrarDetalle, setMostrarDetalle] = useState(false)
  const [cirugiaDetalle, setCirugiaDetalle] = useState(null)
  const [cirugiaEditando, setCirugiaEditando] = useState(null)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [nuevaCirugia, setNuevaCirugia] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    complicaciones: "",
    recomendaciones: "",
    precio: "",
    disponible: true,
    duracion: "",
    tipoAnimal: "ambos",
    categoria: "Preventiva",
    recuperacion: "",
    preparacion: "",
    anestesia: "",
  })

  const categorias = ["Preventiva", "Dental", "Oftalmológica", "Ortopédica", "Neurológica", "Oncológica", "General"]

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(precio)
  }

  const cirugiasFiltradas = cirugias.filter((cirugia) => {
    if (filtroTipo === "todos") return true
    if (filtroTipo === "disponibles") return cirugia.disponible
    if (filtroTipo === "no-disponibles") return !cirugia.disponible
    return cirugia.categoria === filtroTipo
  })

  const abrirModalAgregar = () => {
    setNuevaCirugia({
      id: "",
      nombre: "",
      descripcion: "",
      complicaciones: "",
      recomendaciones: "",
      precio: "",
      disponible: true,
      duracion: "",
      tipoAnimal: "ambos",
      categoria: "Preventiva",
      recuperacion: "",
      preparacion: "",
      anestesia: "",
    })
    setModoEdicion(false)
    setMostrarFormulario(true)
  }

  const abrirModalEditar = (cirugia) => {
    setNuevaCirugia({ ...cirugia, precio: cirugia.precio.toString() })
    setCirugiaEditando(cirugia.id)
    setModoEdicion(true)
    setMostrarFormulario(true)
  }

  const abrirModalDetalle = (cirugia) => {
    setCirugiaDetalle(cirugia)
    setMostrarDetalle(true)
  }

  const guardarCirugia = () => {
    if (nuevaCirugia.nombre && nuevaCirugia.precio > 0) {
      if (modoEdicion) {
        setCirugias(
          cirugias.map((c) =>
            c.id === cirugiaEditando ? { ...nuevaCirugia, precio: Number(nuevaCirugia.precio) } : c,
          ),
        )
      } else {
        setCirugias([...cirugias, { ...nuevaCirugia, precio: Number(nuevaCirugia.precio) }])
      }
      setMostrarFormulario(false)
    }
  }

  const eliminarCirugia = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta cirugía?")) {
      setCirugias(cirugias.filter((c) => c.id !== id))
    }
  }

  const cambiarEstado = (id, e) => {
    e.stopPropagation()
    setCirugias(
      cirugias.map((cirugia) => (cirugia.id === id ? { ...cirugia, disponible: !cirugia.disponible } : cirugia)),
    )
  }

  return (
    <div className="contenedor-cirugia">
      <div className="contenedorprincipal-cirugia">
        {/* Encabezado */}
        <header className="encabezado-cirugia">
          <div className="tituloadminhome">
            <Activity className="iconoadminhome" />
            <h1 className="textoadminhome">Servicios de Cirugía</h1>
          </div>
          <p className="descripcion-cirugia">Gestión completa de procedimientos quirúrgicos veterinarios</p>
        </header>

        {/* Controles */}
        <div className="header-cirugia">
          <h2 className="subtitulo-cirugia">Cirugías Disponibles</h2>
          <div className="controles-cirugia">
            <div className="filtro-contenedor-cirugia">
              <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} className="filtro-cirugia">
                <option value="todos">Todas las cirugías</option>
                <option value="disponibles">Disponibles</option>
                <option value="no-disponibles">No disponibles</option>
                <optgroup label="Por especialidad">
                  {categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
            <button onClick={abrirModalAgregar} className="boton-agregar-cirugia">
              <Plus size={16} />
              Agregar Cirugía
            </button>
          </div>
        </div>

        {/* Grid de cirugías */}
        <div className="grid-cirugia">
          {cirugiasFiltradas.map((cirugia) => (
            <div key={cirugia.id} className="tarjeta-cirugia" onClick={() => abrirModalDetalle(cirugia)}>
              <div className="header-tarjeta-cirugia">
                <div className="icono-cirugia">
                  <Activity size={20} />
                </div>
                <div className="info-cirugia">
                  <h3 className="nombre-cirugia">{cirugia.nombre}</h3>
                  <span
                    className={`estado-cirugia ${cirugia.disponible ? "disponible-cirugia" : "no-disponible-cirugia"}`}
                    onClick={(e) => cambiarEstado(cirugia.id, e)}
                  >
                    {cirugia.disponible ? "Disponible" : "No disponible"}
                  </span>
                </div>
                <div className="acciones-cirugia">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      abrirModalEditar(cirugia)
                    }}
                    className="boton-editar-cirugia"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      eliminarCirugia(cirugia.id)
                    }}
                    className="boton-eliminar-cirugia"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <p className="descripcion-tarjeta-cirugia">{cirugia.descripcion}</p>

              <div className="detalles-cirugia">
                <div className="detalle-cirugia">
                  <strong>
                    <Clock size={14} className="icono-detalle-cirugia" />
                    Duración:
                  </strong>
                  <p>{cirugia.duracion}</p>
                </div>
                <div className="detalle-cirugia">
                  <strong>
                    <Timer size={14} className="icono-detalle-cirugia" />
                    Recuperación:
                  </strong>
                  <p>{cirugia.recuperacion}</p>
                </div>
              </div>

              <div className="footer-tarjeta-cirugia">
                <span className="precio-cirugia">{formatearPrecio(cirugia.precio)}</span>
                <span className="id-cirugia">{cirugia.id}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Agregar/Editar */}
        {mostrarFormulario && (
          <div className="overlay-cirugia">
            <div className="formulario-cirugia">
              <div className="header-modal-cirugia">
                <h3 className="titulo-formulario-cirugia">
                  {modoEdicion ? "Editar Cirugía" : "Agregar Nueva Cirugía"}
                </h3>
                <button onClick={() => setMostrarFormulario(false)} className="boton-cerrar-cirugia">
                  <X size={20} />
                </button>
              </div>

              <div className="campo-cirugia">
                <label>ID Cirugía</label>
                <input
                  type="text"
                  value={nuevaCirugia.id}
                  onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, id: e.target.value })}
                  disabled={modoEdicion}
                  placeholder="Ej: CIR001"
                />
              </div>

              <div className="campo-cirugia">
                <label>Nombre de la Cirugía</label>
                <input
                  type="text"
                  value={nuevaCirugia.nombre}
                  onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, nombre: e.target.value })}
                  placeholder="Ej: Esterilización"
                />
              </div>

              <div className="campo-cirugia">
                <label>Descripción</label>
                <textarea
                  value={nuevaCirugia.descripcion}
                  onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, descripcion: e.target.value })}
                  placeholder="Descripción del procedimiento quirúrgico"
                />
              </div>

              <div className="campo-cirugia">
                <label>Precio (COP)</label>
                <input
                  type="number"
                  value={nuevaCirugia.precio}
                  onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, precio: e.target.value })}
                  placeholder="Ej: 150000"
                />
              </div>

              <div className="campo-cirugia">
                <label>Duración</label>
                <input
                  type="text"
                  value={nuevaCirugia.duracion}
                  onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, duracion: e.target.value })}
                  placeholder="Ej: 45-60 minutos"
                />
              </div>

              <div className="campo-cirugia">
                <label>Categoría</label>
                <select
                  value={nuevaCirugia.categoria}
                  onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, categoria: e.target.value })}
                >
                  {categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
              </div>

              <div className="campo-cirugia">
                <label>Tiempo de Recuperación</label>
                <input
                  type="text"
                  value={nuevaCirugia.recuperacion}
                  onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, recuperacion: e.target.value })}
                  placeholder="Ej: 7-10 días"
                />
              </div>

              <div className="campo-cirugia">
                <label>Tipo de Anestesia</label>
                <input
                  type="text"
                  value={nuevaCirugia.anestesia}
                  onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, anestesia: e.target.value })}
                  placeholder="Ej: General inhalatoria"
                />
              </div>

              <div className="campo-cirugia">
                <label>Preparación Requerida</label>
                <textarea
                  value={nuevaCirugia.preparacion}
                  onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, preparacion: e.target.value })}
                  placeholder="Preparación necesaria antes de la cirugía"
                />
              </div>

              <div className="campo-cirugia">
                <label>Complicaciones Posibles</label>
                <textarea
                  value={nuevaCirugia.complicaciones}
                  onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, complicaciones: e.target.value })}
                  placeholder="Posibles complicaciones del procedimiento"
                />
              </div>

              <div className="campo-cirugia">
                <label>Recomendaciones Post-operatorias</label>
                <textarea
                  value={nuevaCirugia.recomendaciones}
                  onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, recomendaciones: e.target.value })}
                  placeholder="Cuidados después de la cirugía"
                />
              </div>

              <div className="campo-checkbox-cirugia">
                <label>
                  <input
                    type="checkbox"
                    checked={nuevaCirugia.disponible}
                    onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, disponible: e.target.checked })}
                  />
                  Disponible
                </label>
              </div>

              <div className="botones-formulario-cirugia">
                <button onClick={guardarCirugia} className="boton-guardar-cirugia">
                  {modoEdicion ? "Actualizar" : "Agregar"}
                </button>
                <button onClick={() => setMostrarFormulario(false)} className="boton-cancelar-cirugia">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Detalle */}
        {mostrarDetalle && cirugiaDetalle && (
          <div className="overlay-cirugia">
            <div className="modal-detalle-cirugia">
              <div className="header-modal-cirugia">
                <h3 className="titulo-modal-cirugia">{cirugiaDetalle.nombre}</h3>
                <button onClick={() => setMostrarDetalle(false)} className="boton-cerrar-cirugia">
                  <X size={20} />
                </button>
              </div>

              {/* Métricas principales */}
              <div className="metricas-cirugia">
                <div className="metrica-item-cirugia">
                  <div className="metrica-valor-cirugia">{formatearPrecio(cirugiaDetalle.precio)}</div>
                  <div className="metrica-label-cirugia">Precio</div>
                </div>
                <div className="metrica-item-cirugia">
                  <div className="metrica-valor-cirugia">{cirugiaDetalle.duracion}</div>
                  <div className="metrica-label-cirugia">Duración</div>
                </div>
                <div className="metrica-item-cirugia">
                  <div className="metrica-valor-cirugia">{cirugiaDetalle.categoria}</div>
                  <div className="metrica-label-cirugia">Categoría</div>
                </div>
                <div className="metrica-item-cirugia">
                  <div className={`metrica-valor-cirugia ${cirugiaDetalle.disponible ? "" : "no-disponible-cirugia"}`}>
                    {cirugiaDetalle.disponible ? "SÍ" : "NO"}
                  </div>
                  <div className="metrica-label-cirugia">Disponible</div>
                </div>
              </div>

              {/* Secciones de información */}
              <div className="secciones-detalle-cirugia">
                <div className="seccion-detalle-cirugia">
                  <h4 className="titulo-seccion-cirugia">
                    <FileText size={20} />
                    Descripción
                  </h4>
                  <p className="contenido-seccion-cirugia">{cirugiaDetalle.descripcion}</p>
                </div>

                <div className="seccion-detalle-cirugia">
                  <h4 className="titulo-seccion-cirugia">
                    <Target size={20} />
                    Preparación
                  </h4>
                  <p className="contenido-seccion-cirugia">{cirugiaDetalle.preparacion}</p>
                </div>

                <div className="seccion-detalle-cirugia">
                  <h4 className="titulo-seccion-cirugia">
                    <AlertTriangle size={20} />
                    Complicaciones
                  </h4>
                  <p className="contenido-seccion-cirugia">{cirugiaDetalle.complicaciones}</p>
                </div>

                <div className="seccion-detalle-cirugia">
                  <h4 className="titulo-seccion-cirugia">
                    <Clock size={20} />
                    Recomendaciones
                  </h4>
                  <p className="contenido-seccion-cirugia">{cirugiaDetalle.recomendaciones}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

