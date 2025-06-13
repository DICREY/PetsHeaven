// Librarys
import { useState, useRef, useEffect, useContext, useCallback } from "react";
import { Activity, Plus, Trash2, Edit, X, Clock, AlertTriangle, FileText, Target, Timer } from "lucide-react"

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
import { data } from "react-router";

export function CirugiasVeterinaria() {
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

  const obtenerColorCategoria = (categoria) => {
    const colores = {
      Preventiva: "bg-green-100 text-green-700",
      Dental: "bg-blue-100 text-blue-700",
      Oftalmológica: "bg-purple-100 text-purple-700",
      Ortopédica: "bg-orange-100 text-orange-700",
      Neurológica: "bg-red-100 text-red-700",
      Oncológica: "bg-pink-100 text-pink-700",
      General: "bg-gray-100 text-gray-700",
    }
    return colores[categoria] || "bg-gray-100 text-gray-700"
  }

  return (
    <div className="contenedor-cirugia">
      <div className="contenedor-principal-cirugia">
        {/* Encabezado */}
        <header className="encabezado-cirugia">
          <div className="titulo-con-icono-cirugia">
            <Activity className="icono-titulo-cirugia" />
            <h1 className="titulo-cirugia">Servicios de Cirugía</h1>
          </div>
          <p className="descripcion-cirugia">Gestión completa de procedimientos quirúrgicos veterinarios</p>
        </header>

        {/* Controles */}
        <div className="controles-cirugia">
          <h2 className="subtitulo-cirugia">Cirugías Disponibles</h2>
          <div className="acciones-control-cirugia">
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
            <button onClick={abrirModalAgregar} className="boton-agregar-cirugia">
              <Plus size={16} />
              Agregar Cirugía
            </button>
          </div>
        </div>

        {/* Grid de cirugías */}
        <div className="grid-cirugia">
          {cirugiasFiltradas.map((cirugia) => (
            <div
              key={cirugia.id}
              className={`tarjeta-cirugia ${!cirugia.disponible ? "no-disponible-cirugia" : ""}`}
              onClick={() => abrirModalDetalle(cirugia)}
            >
              <div className="encabezado-tarjeta-cirugia">
                <div className="info-principal-cirugia">
                  <h3 className="nombre-cirugia">{cirugia.nombre}</h3>
                  <div className="etiquetas-cirugia">
                    <span className={`categoria-cirugia ${obtenerColorCategoria(cirugia.categoria)}`}>
                      {cirugia.categoria}
                    </span>
                    <span
                      className={`estado-cirugia ${
                        cirugia.disponible ? "disponible-cirugia" : "no-disponible-badge-cirugia"
                      }`}
                      onClick={(e) => cambiarEstado(cirugia.id, e)}
                    >
                      {cirugia.disponible ? "Disponible" : "No disponible"}
                    </span>
                  </div>
                </div>
                <div className="acciones-cirugia">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      eliminarCirugia(cirugia.id)
                    }}
                    className="boton-eliminar-cirugia"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      abrirModalEditar(cirugia)
                    }}
                    className="boton-editar-cirugia"
                  >
                    <Edit size={16} />
                  </button>
                </div>
              </div>

              <p className="descripcion-tarjeta-cirugia">{cirugia.descripcion}</p>

              <div className="detalles-rapidos-cirugia">
                <div className="detalle-rapido-cirugia">
                  <Clock size={14} className="icono-detalle-cirugia" />
                  <span className="texto-detalle-cirugia">{cirugia.duracion}</span>
                </div>
                <div className="detalle-rapido-cirugia">
                  <Timer size={14} className="icono-detalle-cirugia" />
                  <span className="texto-detalle-cirugia">Recuperación: {cirugia.recuperacion}</span>
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
          <div className="modal-fondo-cirugia">
            <div className="modal-cirugia">
              <div className="modal-encabezado-cirugia">
                <h3 className="titulo-modal-cirugia">{modoEdicion ? "Editar Cirugía" : "Agregar Nueva Cirugía"}</h3>
                <button onClick={() => setMostrarFormulario(false)} className="cerrar-modal-cirugia">
                  <X size={20} />
                </button>
              </div>
              <div className="formulario-cirugia">
                <div className="seccion-formulario-cirugia">
                  <h4 className="titulo-seccion-formulario">Información General</h4>
                  <div className="campos-formulario-cirugia">
                    <div className="campos-dobles-cirugia">
                      <div className="campo-cirugia">
                        <label className="etiqueta-campo-cirugia">ID Cirugía</label>
                        <input
                          type="text"
                          value={nuevaCirugia.id}
                          onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, id: e.target.value })}
                          className="input-cirugia"
                          disabled={modoEdicion}
                          placeholder="Ej: CIR001"
                        />
                      </div>
                      <div className="campo-cirugia">
                        <label className="etiqueta-campo-cirugia">Nombre de la Cirugía</label>
                        <input
                          type="text"
                          value={nuevaCirugia.nombre}
                          onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, nombre: e.target.value })}
                          className="input-cirugia"
                          placeholder="Ej: Esterilización"
                        />
                      </div>
                    </div>
                    <div className="campo-cirugia">
                      <label className="etiqueta-campo-cirugia">Descripción</label>
                      <textarea
                        value={nuevaCirugia.descripcion}
                        onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, descripcion: e.target.value })}
                        className="textarea-cirugia"
                        rows={2}
                        placeholder="Descripción del procedimiento quirúrgico"
                      />
                    </div>
                  </div>
                </div>

                <div className="seccion-formulario-cirugia">
                  <h4 className="titulo-seccion-formulario">Detalles y Clasificación</h4>
                  <div className="campos-formulario-cirugia">
                    <div className="campos-dobles-cirugia">
                      <div className="campo-cirugia">
                        <label className="etiqueta-campo-cirugia">Precio (COP)</label>
                        <input
                          type="number"
                          value={nuevaCirugia.precio}
                          onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, precio: e.target.value })}
                          className="input-cirugia"
                          placeholder="Ej: 150000"
                        />
                      </div>
                      <div className="campo-cirugia">
                        <label className="etiqueta-campo-cirugia">Duración</label>
                        <input
                          type="text"
                          value={nuevaCirugia.duracion}
                          onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, duracion: e.target.value })}
                          className="input-cirugia"
                          placeholder="Ej: 45-60 minutos"
                        />
                      </div>
                    </div>
                    <div className="campos-dobles-cirugia">
                      <div className="campo-cirugia">
                        <label className="etiqueta-campo-cirugia">Tipo de Animal</label>
                        <select
                          value={nuevaCirugia.tipoAnimal}
                          onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, tipoAnimal: e.target.value })}
                          className="select-cirugia"
                        >
                          <option value="perro">Perro</option>
                          <option value="gato">Gato</option>
                          <option value="ambos">Ambos</option>
                        </select>
                      </div>
                      <div className="campo-cirugia">
                        <label className="etiqueta-campo-cirugia">Categoría</label>
                        <select
                          value={nuevaCirugia.categoria}
                          onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, categoria: e.target.value })}
                          className="select-cirugia"
                        >
                          {categorias.map((categoria) => (
                            <option key={categoria} value={categoria}>
                              {categoria}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="campos-dobles-cirugia">
                      <div className="campo-cirugia">
                        <label className="etiqueta-campo-cirugia">Tiempo de Recuperación</label>
                        <input
                          type="text"
                          value={nuevaCirugia.recuperacion}
                          onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, recuperacion: e.target.value })}
                          className="input-cirugia"
                          placeholder="Ej: 7-10 días"
                        />
                      </div>
                      <div className="campo-cirugia">
                        <label className="etiqueta-campo-cirugia">Tipo de Anestesia</label>
                        <input
                          type="text"
                          value={nuevaCirugia.anestesia}
                          onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, anestesia: e.target.value })}
                          className="input-cirugia"
                          placeholder="Ej: General inhalatoria"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="seccion-formulario-cirugia">
                  <h4 className="titulo-seccion-formulario">Información Médica</h4>
                  <div className="campos-formulario-cirugia">
                    <div className="campo-cirugia">
                      <label className="etiqueta-campo-cirugia">Preparación Requerida</label>
                      <textarea
                        value={nuevaCirugia.preparacion}
                        onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, preparacion: e.target.value })}
                        className="textarea-cirugia"
                        rows={2}
                        placeholder="Preparación necesaria antes de la cirugía"
                      />
                    </div>
                    <div className="campo-cirugia">
                      <label className="etiqueta-campo-cirugia">Complicaciones Posibles</label>
                      <textarea
                        value={nuevaCirugia.complicaciones}
                        onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, complicaciones: e.target.value })}
                        className="textarea-cirugia"
                        rows={2}
                        placeholder="Posibles complicaciones del procedimiento"
                      />
                    </div>
                    <div className="campo-cirugia">
                      <label className="etiqueta-campo-cirugia">Recomendaciones Post-operatorias</label>
                      <textarea
                        value={nuevaCirugia.recomendaciones}
                        onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, recomendaciones: e.target.value })}
                        className="textarea-cirugia"
                        rows={2}
                        placeholder="Cuidados después de la cirugía"
                      />
                    </div>
                    <div className="campo-checkbox-cirugia">
                      <input
                        type="checkbox"
                        checked={nuevaCirugia.disponible}
                        onChange={(e) => setNuevaCirugia({ ...nuevaCirugia, disponible: e.target.checked })}
                        className="checkbox-cirugia"
                      />
                      <label className="etiqueta-checkbox-cirugia">Disponible</label>
                    </div>
                  </div>
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
          </div>
        )}

        {/* Modal Detalle */}
        {mostrarDetalle && cirugiaDetalle && (
          <div className="modal-fondo-cirugia">
            <div className="modal-detalle-cirugia">
              <div className="modal-encabezado-cirugia">
                <h3 className="titulo-modal-cirugia">{cirugiaDetalle.nombre}</h3>
                <button onClick={() => setMostrarDetalle(false)} className="cerrar-modal-cirugia">
                  <X size={20} />
                </button>
              </div>
              <div className="contenido-detalle-cirugia">
                {/* Métricas principales */}
                <div className="metricas-principales-cirugia">
                  <div className="metrica-cirugia">
                    <div className="valor-metrica-cirugia">{formatearPrecio(cirugiaDetalle.precio)}</div>
                    <div className="etiqueta-metrica-cirugia">Precio</div>
                  </div>
                  <div className="metrica-cirugia">
                    <div className="valor-metrica-cirugia">{cirugiaDetalle.duracion}</div>
                    <div className="etiqueta-metrica-cirugia">Duración</div>
                  </div>
                  <div className="metrica-cirugia">
                    <div className="valor-metrica-cirugia">{cirugiaDetalle.categoria}</div>
                    <div className="etiqueta-metrica-cirugia">Categoría</div>
                  </div>
                  <div className="metrica-cirugia">
                    <div
                      className={`valor-metrica-cirugia ${
                        cirugiaDetalle.disponible ? "texto-verde-cirugia" : "texto-rojo-cirugia"
                      }`}
                    >
                      {cirugiaDetalle.disponible ? "SÍ" : "NO"}
                    </div>
                    <div className="etiqueta-metrica-cirugia">Disponible</div>
                  </div>
                </div>

                {/* Grid de información */}
                <div className="grid-detalle-cirugia">
                  <div className="seccion-detalle-cirugia">
                    <div className="encabezado-seccion-cirugia">
                      <FileText size={20} className="icono-seccion-cirugia" />
                      <h4 className="titulo-seccion-cirugia">Descripción</h4>
                    </div>
                    <p className="texto-seccion-cirugia">{cirugiaDetalle.descripcion}</p>
                  </div>

                  <div className="seccion-detalle-cirugia">
                    <div className="encabezado-seccion-cirugia">
                      <Target size={20} className="icono-seccion-cirugia" />
                      <h4 className="titulo-seccion-cirugia">Preparación</h4>
                    </div>
                    <p className="texto-seccion-cirugia">{cirugiaDetalle.preparacion}</p>
                  </div>

                  <div className="seccion-detalle-cirugia">
                    <div className="encabezado-seccion-cirugia">
                      <AlertTriangle size={20} className="icono-seccion-cirugia" />
                      <h4 className="titulo-seccion-cirugia">Complicaciones</h4>
                    </div>
                    <p className="texto-seccion-cirugia">{cirugiaDetalle.complicaciones}</p>
                  </div>

                  <div className="seccion-detalle-cirugia">
                    <div className="encabezado-seccion-cirugia">
                      <Clock size={20} className="icono-seccion-cirugia" />
                      <h4 className="titulo-seccion-cirugia">Recomendaciones</h4>
                    </div>
                    <p className="texto-seccion-cirugia">{cirugiaDetalle.recomendaciones}</p>
                  </div>
                </div>

                {/* Información adicional */}
                <div className="info-adicional-cirugia">
                  <h4 className="titulo-info-adicional-cirugia">Información Adicional</h4>
                  <div className="contenedor-info-adicional-cirugia">
                    <div className="item-info-adicional-cirugia">
                      <span className="etiqueta-info-adicional-cirugia">Recuperación:</span>
                      <span className="valor-info-adicional-cirugia">{cirugiaDetalle.recuperacion}</span>
                    </div>
                    <div className="item-info-adicional-cirugia">
                      <span className="etiqueta-info-adicional-cirugia">Anestesia:</span>
                      <span className="valor-info-adicional-cirugia">{cirugiaDetalle.anestesia}</span>
                    </div>
                    <div className="item-info-adicional-cirugia">
                      <span className="etiqueta-info-adicional-cirugia">Tipo de Animal:</span>
                      <span className="valor-info-adicional-cirugia">
                        {cirugiaDetalle.tipoAnimal === "perro"
                          ? "Perros"
                          : cirugiaDetalle.tipoAnimal === "gato"
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


