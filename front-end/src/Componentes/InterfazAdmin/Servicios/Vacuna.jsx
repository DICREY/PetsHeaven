// Librarys 
import { useContext, useState, useEffect, useCallback } from "react"
import { Syringe, Plus, Trash2, Edit, X, Calendar, Clock, AlertTriangle, FileText, Target } from "lucide-react"

// Imports 
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import { HeaderUser } from '../../BarrasNavegacion/HeaderUser'
import { HeaderAdmin } from '../../BarrasNavegacion/HeaderAdmin'
import Footer from '../../Varios/Footer2'
import { AuthContext } from "../../../Contexts/Contexts"
import { Notification } from '../../Global/Notifys'
import { GetData } from "../../Varios/Requests"

// Import styles 
import "../../../styles/InterfazAdmin/Servicios/Vacuna.css"

// Component 
export function VisualizadorVacunas() {
  const [vacunas, setVacunas] = useState([
    {
      id: "VAC001",
      nombre: "Rabia",
      descripcion: "Vacuna esencial para prevenir la rabia en perros y gatos.",
      descripcionTecnica: "Vacuna inactivada con virus de la rabia cultivado en células diploides humanas (HDCV).",
      precio: 85000,
      frecuencia: "Anual",
      disponible: true,
      efectosSecundarios: "Dolor leve en el sitio de inyección, fiebre baja, letargo por 24-48 horas.",
      dosis: {
        cachorro: "1 ml subcutáneo a partir de los 3 meses",
        adulto: "1 ml subcutáneo anual",
        senior: "1 ml subcutáneo anual, evaluación previa recomendada",
      },
      tipoAnimal: "ambos",
      categoria: "Obligatoria",
      lote: "RB-2023-45678",
      fechaVencimiento: "2025-06-30",
    },
    {
      id: "VAC002",
      nombre: "Parvovirus",
      descripcion: "Protege contra el parvovirus canino, una enfermedad altamente contagiosa.",
      descripcionTecnica: "Vacuna con virus vivo modificado (MLV) del parvovirus canino tipo 2b.",
      precio: 95000,
      frecuencia: "Cada 3 años",
      disponible: true,
      efectosSecundarios: "Fiebre leve, posible diarrea leve transitoria.",
      dosis: {
        cachorro: "1 ml subcutáneo a las 6, 9 y 12 semanas",
        adulto: "1 ml subcutáneo cada 3 años",
        senior: "1 ml subcutáneo cada 3 años",
      },
      tipoAnimal: "perro",
      categoria: "Esencial",
      lote: "PV-2023-78945",
      fechaVencimiento: "2024-12-15",
    },
    {
      id: "VAC003",
      nombre: "Moquillo",
      descripcion: "Previene el moquillo canino, una enfermedad viral grave.",
      descripcionTecnica: "Vacuna con virus vivo modificado (MLV) del virus del moquillo canino cepa Onderstepoort.",
      precio: 78000,
      frecuencia: "Anual",
      disponible: true,
      efectosSecundarios: "Letargo, posible inflamación en el sitio de inyección.",
      dosis: {
        cachorro: "1 ml subcutáneo a las 8, 12 y 16 semanas",
        adulto: "1 ml subcutáneo anual",
        senior: "1 ml subcutáneo anual",
      },
      tipoAnimal: "perro",
      categoria: "Esencial",
      lote: "MQ-2023-36547",
      fechaVencimiento: "2025-03-22",
    },
    {
      id: "VAC004",
      nombre: "Leucemia Felina",
      descripcion: "Vacuna recomendada para gatos con acceso al exterior.",
      descripcionTecnica: "Vacuna recombinante con proteína p45 del virus de la leucemia felina.",
      precio: 110000,
      frecuencia: "Anual",
      disponible: false,
      efectosSecundarios: "Pérdida de apetito temporal, posible fiebre leve.",
      dosis: {
        cachorro: "1 ml subcutáneo a las 9 y 12 semanas",
        adulto: "1 ml subcutáneo anual",
        senior: "1 ml subcutáneo anual, evaluación previa recomendada",
      },
      tipoAnimal: "gato",
      categoria: "Recomendada",
      lote: "LF-2023-98765",
      fechaVencimiento: "2024-09-10",
    },
  ])

  const [modalAbierto, setModalAbierto] = useState(false)
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false)
  const [vacunaDetalle, setVacunaDetalle] = useState(null)
  const [filtroAnimal, setFiltroAnimal] = useState("todos")
  const [modoEdicion, setModoEdicion] = useState(false)
  const [vacunaEditando, setVacunaEditando] = useState(null)
  const [nuevaVacuna, setNuevaVacuna] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    descripcionTecnica: "",
    precio: "",
    frecuencia: "",
    tipoAnimal: "perro",
    disponible: true,
    categoria: "Esencial",
    efectosSecundarios: "",
    lote: "",
    fechaVencimiento: "",
    dosis: {
      cachorro: "",
      adulto: "",
      senior: "",
    },
  })

  const categorias = ["Obligatoria", "Esencial", "Recomendada", "Opcional"]

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(precio)
  }

  const vacunasFiltradas = vacunas.filter((vacuna) => {
    if (filtroAnimal === "todos") return true
    if (filtroAnimal === "disponibles") return vacuna.disponible
    if (filtroAnimal === "no-disponibles") return !vacuna.disponible
    return vacuna.tipoAnimal === filtroAnimal || vacuna.tipoAnimal === "ambos"
  })

  const abrirModalAgregar = () => {
    setNuevaVacuna({
      id: "",
      nombre: "",
      descripcion: "",
      descripcionTecnica: "",
      precio: "",
      frecuencia: "",
      tipoAnimal: "perro",
      disponible: true,
      categoria: "Esencial",
      efectosSecundarios: "",
      lote: "",
      fechaVencimiento: "",
      dosis: {
        cachorro: "",
        adulto: "",
        senior: "",
      },
    })
    setModoEdicion(false)
    setModalAbierto(true)
  }

  const abrirModalEditar = (vacuna) => {
    setNuevaVacuna({ ...vacuna, precio: vacuna.precio.toString() })
    setVacunaEditando(vacuna.id)
    setModoEdicion(true)
    setModalAbierto(true)
  }

  const guardarVacuna = () => {
    if (nuevaVacuna.nombre && nuevaVacuna.precio > 0) {
      if (modoEdicion) {
        setVacunas(
          vacunas.map((v) => (v.id === vacunaEditando ? { ...nuevaVacuna, precio: Number(nuevaVacuna.precio) } : v)),
        )
      } else {
        setVacunas([...vacunas, { ...nuevaVacuna, precio: Number(nuevaVacuna.precio) }])
      }
      setModalAbierto(false)
    }
  }

  const eliminarVacuna = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta vacuna?")) {
      setVacunas(vacunas.filter((v) => v.id !== id))
    }
  }

  const abrirModalDetalle = (vacuna) => {
    setVacunaDetalle(vacuna)
    setModalDetalleAbierto(true)
  }

  const cambiarEstado = (id, e) => {
    e.stopPropagation()
    setVacunas(vacunas.map((vacuna) => (vacuna.id === id ? { ...vacuna, disponible: !vacuna.disponible } : vacuna)))
  }

  const handleDosisChange = (edad, valor) => {
    setNuevaVacuna({
      ...nuevaVacuna,
      dosis: {
        ...nuevaVacuna.dosis,
        [edad]: valor,
      },
    })
  }

  const obtenerColorCategoria = (categoria) => {
    const colores = {
      Obligatoria: "categoria-obligatoria",
      Esencial: "categoria-esencial",
      Recomendada: "categoria-recomendada",
      Opcional: "categoria-opcional",
    }
    return colores[categoria] || "categoria-opcional"
  }

  return (
    <div className="contenedor-vacunas">
      <NavBarAdmin/>
      <div className="contenedor-principal-vacunas">
        {/* Encabezado */}
        <header className="encabezado-vacunas">
          <div className="titulo-con-icono-vacunas">
            <Syringe className="icono-titulo-vacunas" />
            <h1 className="titulo-vacunas">Servicios de Vacunación</h1>
          </div>
          <p className="descripcion-vacunas">Ofrecemos una variedad de vacunas para mantener a tu mascota saludable</p>
        </header>

        {/* Controles */}
        <div className="controles-vacunas">
          <h2 className="subtitulo-vacunas">Vacunas Disponibles</h2>
          <div className="acciones-control-vacunas">
            <select value={filtroAnimal} onChange={(e) => setFiltroAnimal(e.target.value)} className="filtro-vacunas">
              <option value="todos">Todas las vacunas</option>
              <option value="disponibles">Disponibles</option>
              <option value="no-disponibles">No disponibles</option>
              <optgroup label="Por tipo de animal">
                <option value="perro">Solo perros</option>
                <option value="gato">Solo gatos</option>
                <option value="ambos">Ambos</option>
              </optgroup>
            </select>
            <button onClick={abrirModalAgregar} className="boton-agregar-vacunas">
              <Plus size={16} />
              Agregar Vacuna
            </button>
          </div>
        </div>

        {/* Grid de vacunas */}
        <div className="grid-vacunas">
          {vacunasFiltradas.map((vacuna) => (
            <div
              key={vacuna.id}
              className={`tarjeta-vacunas ${!vacuna.disponible ? "no-disponible-vacunas" : ""}`}
              onClick={() => abrirModalDetalle(vacuna)}
            >
              <div className="encabezado-tarjeta-vacunas">
                <div className="info-principal-vacunas">
                  <h3 className="nombre-vacunas">{vacuna.nombre}</h3>
                  <div className="etiquetas-vacunas">
                    <span className={`categoria-vacunas ${obtenerColorCategoria(vacuna.categoria)}`}>
                      {vacuna.categoria}
                    </span>
                    <span
                      className={`estado-vacunas ${
                        vacuna.disponible ? "disponible-vacunas" : "no-disponible-badge-vacunas"
                      }`}
                      onClick={(e) => cambiarEstado(vacuna.id, e)}
                    >
                      {vacuna.disponible ? "Disponible" : "No disponible"}
                    </span>
                  </div>
                </div>
                <div className="acciones-vacunas">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      eliminarVacuna(vacuna.id)
                    }}
                    className="boton-eliminar-vacunas"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      abrirModalEditar(vacuna)
                    }}
                    className="boton-editar-vacunas"
                  >
                    <Edit size={16} />
                  </button>
                </div>
              </div>

              <p className="descripcion-tarjeta-vacunas">{vacuna.descripcion}</p>

              <div className="detalles-rapidos-vacunas">
                <div className="detalle-rapido-vacunas">
                  <Calendar size={14} className="icono-detalle-vacunas" />
                  <span className="texto-detalle-vacunas">{vacuna.frecuencia}</span>
                </div>
                <div className="detalle-rapido-vacunas">
                  <Target size={14} className="icono-detalle-vacunas" />
                  <span className="texto-detalle-vacunas">
                    {vacuna.tipoAnimal === "perro"
                      ? "Perros"
                      : vacuna.tipoAnimal === "gato"
                        ? "Gatos"
                        : "Perros y gatos"}
                  </span>
                </div>
              </div>

              <div className="footer-tarjeta-vacunas">
                <span className="precio-vacunas">{formatearPrecio(vacuna.precio)}</span>
                <span className="id-vacunas">{vacuna.id}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Agregar/Editar */}
        {modalAbierto && (
          <div className="modal-fondo-vacunas">
            <div className="modal-vacunas">
              <div className="modal-encabezado-vacunas">
                <h3 className="titulo-modal-vacunas">{modoEdicion ? "Editar Vacuna" : "Agregar Nueva Vacuna"}</h3>
                <button onClick={() => setModalAbierto(false)} className="cerrar-modal-vacunas">
                  <X size={20} />
                </button>
              </div>
              <div className="formulario-vacunas">
                <div className="seccion-formulario-vacunas">
                  <h4 className="titulo-seccion-formulario">Información General</h4>
                  <div className="campos-formulario-vacunas">
                    <div className="campo-vacunas">
                      <label className="etiqueta-campo-vacunas">Nombre de la Vacuna</label>
                      <input
                        type="text"
                        value={nuevaVacuna.nombre}
                        onChange={(e) => setNuevaVacuna({ ...nuevaVacuna, nombre: e.target.value })}
                        className="input-vacunas"
                        placeholder="Ej: Rabia"
                      />
                    </div>
                    <div className="campo-vacunas">
                      <label className="etiqueta-campo-vacunas">Descripción General</label>
                      <textarea
                        value={nuevaVacuna.descripcion}
                        onChange={(e) => setNuevaVacuna({ ...nuevaVacuna, descripcion: e.target.value })}
                        className="textarea-vacunas"
                        rows={2}
                        placeholder="Breve descripción de la vacuna"
                      />
                    </div>
                    <div className="campo-vacunas">
                      <label className="etiqueta-campo-vacunas">Descripción Técnica</label>
                      <textarea
                        value={nuevaVacuna.descripcionTecnica}
                        onChange={(e) => setNuevaVacuna({ ...nuevaVacuna, descripcionTecnica: e.target.value })}
                        className="textarea-vacunas"
                        rows={2}
                        placeholder="Información técnica sobre la vacuna"
                      />
                    </div>
                  </div>
                </div>

                <div className="seccion-formulario-vacunas">
                  <h4 className="titulo-seccion-formulario">Detalles y Clasificación</h4>
                  <div className="campos-formulario-vacunas">
                    <div className="campos-dobles-vacunas">
                      <div className="campo-vacunas">
                        <label className="etiqueta-campo-vacunas">Precio (COP)</label>
                        <input
                          type="number"
                          value={nuevaVacuna.precio}
                          onChange={(e) => setNuevaVacuna({ ...nuevaVacuna, precio: e.target.value })}
                          className="input-vacunas"
                          placeholder="Ej: 85000"
                        />
                      </div>
                      <div className="campo-vacunas">
                        <label className="etiqueta-campo-vacunas">Frecuencia</label>
                        <input
                          type="text"
                          value={nuevaVacuna.frecuencia}
                          onChange={(e) => setNuevaVacuna({ ...nuevaVacuna, frecuencia: e.target.value })}
                          className="input-vacunas"
                          placeholder="Ej: Anual"
                        />
                      </div>
                    </div>
                    <div className="campos-dobles-vacunas">
                      <div className="campo-vacunas">
                        <label className="etiqueta-campo-vacunas">Tipo de Animal</label>
                        <select
                          value={nuevaVacuna.tipoAnimal}
                          onChange={(e) => setNuevaVacuna({ ...nuevaVacuna, tipoAnimal: e.target.value })}
                          className="select-vacunas"
                        >
                          <option value="perro">Perro</option>
                          <option value="gato">Gato</option>
                          <option value="ambos">Ambos</option>
                        </select>
                      </div>
                      <div className="campo-vacunas">
                        <label className="etiqueta-campo-vacunas">Categoría</label>
                        <select
                          value={nuevaVacuna.categoria}
                          onChange={(e) => setNuevaVacuna({ ...nuevaVacuna, categoria: e.target.value })}
                          className="select-vacunas"
                        >
                          {categorias.map((categoria) => (
                            <option key={categoria} value={categoria}>
                              {categoria}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="campos-dobles-vacunas">
                      <div className="campo-vacunas">
                        <label className="etiqueta-campo-vacunas">Número de Lote</label>
                        <input
                          type="text"
                          value={nuevaVacuna.lote}
                          onChange={(e) => setNuevaVacuna({ ...nuevaVacuna, lote: e.target.value })}
                          className="input-vacunas"
                          placeholder="Ej: RB-2023-45678"
                        />
                      </div>
                      <div className="campo-vacunas">
                        <label className="etiqueta-campo-vacunas">Fecha de Vencimiento</label>
                        <input
                          type="date"
                          value={nuevaVacuna.fechaVencimiento}
                          onChange={(e) => setNuevaVacuna({ ...nuevaVacuna, fechaVencimiento: e.target.value })}
                          className="input-vacunas"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="seccion-formulario-vacunas">
                  <h4 className="titulo-seccion-formulario">Información Médica</h4>
                  <div className="campos-formulario-vacunas">
                    <div className="campo-vacunas">
                      <label className="etiqueta-campo-vacunas">Efectos Secundarios</label>
                      <textarea
                        value={nuevaVacuna.efectosSecundarios}
                        onChange={(e) => setNuevaVacuna({ ...nuevaVacuna, efectosSecundarios: e.target.value })}
                        className="textarea-vacunas"
                        rows={2}
                        placeholder="Posibles efectos secundarios"
                      />
                    </div>
                    <div className="subseccion-formulario-vacunas">
                      <h5 className="subtitulo-seccion-formulario">Dosis Recomendadas</h5>
                      <div className="campo-vacunas">
                        <label className="etiqueta-campo-vacunas">Cachorros</label>
                        <input
                          type="text"
                          value={nuevaVacuna.dosis?.cachorro || ""}
                          onChange={(e) => handleDosisChange("cachorro", e.target.value)}
                          className="input-vacunas"
                          placeholder="Ej: 1 ml subcutáneo a partir de los 3 meses"
                        />
                      </div>
                      <div className="campo-vacunas">
                        <label className="etiqueta-campo-vacunas">Adultos</label>
                        <input
                          type="text"
                          value={nuevaVacuna.dosis?.adulto || ""}
                          onChange={(e) => handleDosisChange("adulto", e.target.value)}
                          className="input-vacunas"
                          placeholder="Ej: 1 ml subcutáneo anual"
                        />
                      </div>
                      <div className="campo-vacunas">
                        <label className="etiqueta-campo-vacunas">Senior</label>
                        <input
                          type="text"
                          value={nuevaVacuna.dosis?.senior || ""}
                          onChange={(e) => handleDosisChange("senior", e.target.value)}
                          className="input-vacunas"
                          placeholder="Ej: 1 ml subcutáneo anual, evaluación previa recomendada"
                        />
                      </div>
                    </div>
                    <div className="campo-checkbox-vacunas">
                      <input
                        type="checkbox"
                        checked={nuevaVacuna.disponible}
                        onChange={(e) => setNuevaVacuna({ ...nuevaVacuna, disponible: e.target.checked })}
                        className="checkbox-vacunas"
                      />
                      <label className="etiqueta-checkbox-vacunas">Disponible</label>
                    </div>
                  </div>
                </div>

                <div className="botones-formulario-vacunas">
                  <button onClick={guardarVacuna} className="boton-guardar-vacunas">
                    {modoEdicion ? "Actualizar" : "Agregar"}
                  </button>
                  <button onClick={() => setModalAbierto(false)} className="boton-cancelar-vacunas">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Detalle */}
        {modalDetalleAbierto && vacunaDetalle && (
          <div className="modal-fondo-vacunas">
            <div className="modal-detalle-vacunas">
              <div className="modal-encabezado-vacunas">
                <h3 className="titulo-modal-vacunas">{vacunaDetalle.nombre}</h3>
                <button onClick={() => setModalDetalleAbierto(false)} className="cerrar-modal-vacunas">
                  <X size={20} />
                </button>
              </div>
              <div className="contenido-detalle-vacunas">
                {/* Métricas principales */}
                <div className="metricas-principales-vacunas">
                  <div className="metrica-vacunas">
                    <div className="valor-metrica-vacunas">{formatearPrecio(vacunaDetalle.precio)}</div>
                    <div className="etiqueta-metrica-vacunas">Precio</div>
                  </div>
                  <div className="metrica-vacunas">
                    <div className="valor-metrica-vacunas">{vacunaDetalle.frecuencia}</div>
                    <div className="etiqueta-metrica-vacunas">Frecuencia</div>
                  </div>
                  <div className="metrica-vacunas">
                    <div className="valor-metrica-vacunas">{vacunaDetalle.categoria}</div>
                    <div className="etiqueta-metrica-vacunas">Categoría</div>
                  </div>
                  <div className="metrica-vacunas">
                    <div
                      className={`valor-metrica-vacunas ${
                        vacunaDetalle.disponible ? "texto-verde-vacunas" : "texto-rojo-vacunas"
                      }`}
                    >
                      {vacunaDetalle.disponible ? "SÍ" : "NO"}
                    </div>
                    <div className="etiqueta-metrica-vacunas">Disponible</div>
                  </div>
                </div>

                {/* Grid de información */}
                <div className="grid-detalle-vacunas">
                  <div className="seccion-detalle-vacunas">
                    <div className="encabezado-seccion-vacunas">
                      <FileText size={20} className="icono-seccion-vacunas" />
                      <h4 className="titulo-seccion-vacunas">Descripción General</h4>
                    </div>
                    <p className="texto-seccion-vacunas">{vacunaDetalle.descripcion}</p>
                  </div>

                  <div className="seccion-detalle-vacunas">
                    <div className="encabezado-seccion-vacunas">
                      <Target size={20} className="icono-seccion-vacunas" />
                      <h4 className="titulo-seccion-vacunas">Descripción Técnica</h4>
                    </div>
                    <p className="texto-seccion-vacunas">{vacunaDetalle.descripcionTecnica}</p>
                  </div>

                  <div className="seccion-detalle-vacunas">
                    <div className="encabezado-seccion-vacunas">
                      <AlertTriangle size={20} className="icono-seccion-vacunas" />
                      <h4 className="titulo-seccion-vacunas">Efectos Secundarios</h4>
                    </div>
                    <p className="texto-seccion-vacunas">{vacunaDetalle.efectosSecundarios}</p>
                  </div>

                  <div className="seccion-detalle-vacunas">
                    <div className="encabezado-seccion-vacunas">
                      <Clock size={20} className="icono-seccion-vacunas" />
                      <h4 className="titulo-seccion-vacunas">Información Adicional</h4>
                    </div>
                    <div className="info-adicional-vacunas">
                      <div className="item-info-adicional">
                        <span className="etiqueta-info-adicional">Lote:</span>
                        <span className="valor-info-adicional">{vacunaDetalle.lote}</span>
                      </div>
                      <div className="item-info-adicional">
                        <span className="etiqueta-info-adicional">Vencimiento:</span>
                        <span className="valor-info-adicional">
                          {new Date(vacunaDetalle.fechaVencimiento).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="item-info-adicional">
                        <span className="etiqueta-info-adicional">Tipo de Animal:</span>
                        <span className="valor-info-adicional">
                          {vacunaDetalle.tipoAnimal === "perro"
                            ? "Perros"
                            : vacunaDetalle.tipoAnimal === "gato"
                              ? "Gatos"
                              : "Perros y gatos"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dosis recomendadas */}
                <div className="dosis-recomendadas-vacunas">
                  <h4 className="titulo-dosis-vacunas">Dosis Recomendadas</h4>
                  <div className="contenedor-dosis-vacunas">
                    <div className="dosis-item-vacunas">
                      <div className="encabezado-dosis-vacunas">
                        <span className="etiqueta-dosis-vacunas">Cachorros</span>
                      </div>
                      <p className="texto-dosis-vacunas">{vacunaDetalle.dosis?.cachorro}</p>
                    </div>
                    <div className="dosis-item-vacunas">
                      <div className="encabezado-dosis-vacunas">
                        <span className="etiqueta-dosis-vacunas">Adultos</span>
                      </div>
                      <p className="texto-dosis-vacunas">{vacunaDetalle.dosis?.adulto}</p>
                    </div>
                    <div className="dosis-item-vacunas">
                      <div className="encabezado-dosis-vacunas">
                        <span className="etiqueta-dosis-vacunas">Senior</span>
                      </div>
                      <p className="texto-dosis-vacunas">{vacunaDetalle.dosis?.senior}</p>
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
