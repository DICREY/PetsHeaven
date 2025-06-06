import React from "react"
import { useState } from "react"
import { FlaskConical, Plus, Trash2, Edit, X, Clock, AlertTriangle, FileText, Target } from "lucide-react"
import "../../../styles/laboratorio.css"

export function ExamenesLaboratorio() {
  const [examenes, setExamenes] = useState([
    {
      id: "LAB001",
      nombre: "Hemograma Completo",
      descripcion: "Análisis completo de células sanguíneas para detectar anemia, infecciones y otros trastornos.",
      tipoExamen: "Hematología",
      tiempoResultados: "2-4 horas",
      preparacionRequerida: "Ayuno de 8-12 horas recomendado",
      metodologia: "Citometría de flujo automatizada",
      valoresReferencia: "Glóbulos rojos: 5.5-8.5 M/μL, Glóbulos blancos: 6.0-17.0 K/μL, Plaquetas: 200-500 K/μL",
      indicaciones: "Chequeo general, anemia, infecciones, sangrado anormal",
      precio: 65000,
      disponible: true,
      categoria: "Hematología",
      tipoAnimal: "ambos",
      equipoRequerido: "Analizador hematológico automatizado",
      muestra: "Sangre con anticoagulante EDTA",
    },
    {
      id: "LAB002",
      nombre: "Perfil Bioquímico",
      descripcion: "Evaluación de función hepática, renal y metabólica a través de enzimas y metabolitos.",
      tipoExamen: "Bioquímica",
      tiempoResultados: "4-6 horas",
      preparacionRequerida: "Ayuno de 12 horas obligatorio",
      metodologia: "Espectrofotometría automatizada",
      valoresReferencia: "ALT: 10-100 U/L, Creatinina: 0.5-1.8 mg/dL, Glucosa: 70-143 mg/dL",
      indicaciones: "Evaluación hepática, renal, diabetes, chequeo geriátrico",
      precio: 85000,
      disponible: true,
      categoria: "Bioquímica",
      tipoAnimal: "ambos",
      equipoRequerido: "Analizador bioquímico automatizado",
      muestra: "Suero sanguíneo",
    },
    {
      id: "LAB003",
      nombre: "Análisis de Orina",
      descripcion: "Examen microscópico y químico de orina para detectar infecciones y enfermedades renales.",
      tipoExamen: "Urología",
      tiempoResultados: "1-2 horas",
      preparacionRequerida: "Muestra de primera orina de la mañana preferible",
      metodologia: "Microscopía óptica y tiras reactivas",
      valoresReferencia: "Densidad: 1.015-1.045, pH: 6.0-7.5, Proteínas: Negativo",
      indicaciones: "Infecciones urinarias, enfermedad renal, diabetes",
      precio: 45000,
      disponible: true,
      categoria: "Urología",
      tipoAnimal: "ambos",
      equipoRequerido: "Microscopio óptico, analizador de orina",
      muestra: "Orina fresca estéril",
    },
    {
      id: "LAB004",
      nombre: "Perfil Tiroideo",
      descripcion: "Medición de hormonas tiroideas T3, T4 y TSH para evaluar función tiroidea.",
      tipoExamen: "Endocrinología",
      tiempoResultados: "24-48 horas",
      preparacionRequerida: "No requiere ayuno, evitar estrés antes de la muestra",
      metodologia: "Inmunoensayo quimioluminiscente",
      valoresReferencia: "T4: 1.0-4.0 μg/dL, TSH: 0.05-0.5 ng/mL",
      indicaciones: "Problemas de peso, letargo, cambios de comportamiento",
      precio: 120000,
      disponible: false,
      categoria: "Endocrinología",
      tipoAnimal: "ambos",
      equipoRequerido: "Analizador de inmunoensayos",
      muestra: "Suero sanguíneo",
    },
    {
      id: "LAB005",
      nombre: "Coprológico",
      descripcion: "Análisis de heces para detectar parásitos, sangre oculta y trastornos digestivos.",
      tipoExamen: "Parasitología",
      tiempoResultados: "2-3 horas",
      preparacionRequerida: "Muestra fresca de menos de 2 horas",
      metodologia: "Microscopía directa y técnicas de concentración",
      valoresReferencia: "Ausencia de parásitos, sangre oculta negativa",
      indicaciones: "Diarrea, vómito, pérdida de peso, desparasitación",
      precio: 35000,
      disponible: true,
      categoria: "Parasitología",
      tipoAnimal: "ambos",
      equipoRequerido: "Microscopio óptico, centrífuga",
      muestra: "Heces frescas",
    },
    {
      id: "LAB006",
      nombre: "Cultivo Bacteriano",
      descripcion: "Identificación de bacterias patógenas y prueba de sensibilidad a antibióticos.",
      tipoExamen: "Microbiología",
      tiempoResultados: "48-72 horas",
      preparacionRequerida: "Muestra estéril antes de iniciar antibióticos",
      metodologia: "Cultivo en medios selectivos y antibiograma",
      valoresReferencia: "Identificación de patógenos y sensibilidad antibiótica",
      indicaciones: "Infecciones persistentes, selección de antibiótico",
      precio: 95000,
      disponible: true,
      categoria: "Microbiología",
      tipoAnimal: "ambos",
      equipoRequerido: "Incubadora, medios de cultivo, autoclave",
      muestra: "Según sitio de infección (orina, sangre, herida)",
    },
  ])

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mostrarDetalle, setMostrarDetalle] = useState(false)
  const [examenDetalle, setExamenDetalle] = useState(null)
  const [examenEditando, setExamenEditando] = useState(null)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [nuevoExamen, setNuevoExamen] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    tipoExamen: "Hematología",
    tiempoResultados: "",
    preparacionRequerida: "",
    metodologia: "",
    valoresReferencia: "",
    indicaciones: "",
    precio: "",
    disponible: true,
    categoria: "Hematología",
    tipoAnimal: "ambos",
    equipoRequerido: "",
    muestra: "",
  })

  const categorias = [
    "Hematología",
    "Bioquímica",
    "Urología",
    "Endocrinología",
    "Parasitología",
    "Microbiología",
    "Inmunología",
  ]

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(precio)
  }

  const examenesFiltrados = examenes.filter((examen) => {
    if (filtroTipo === "todos") return true
    if (filtroTipo === "disponibles") return examen.disponible
    if (filtroTipo === "no-disponibles") return !examen.disponible
    return examen.categoria === filtroTipo
  })

  const abrirModalAgregar = () => {
    setNuevoExamen({
      id: "",
      nombre: "",
      descripcion: "",
      tipoExamen: "Hematología",
      tiempoResultados: "",
      preparacionRequerida: "",
      metodologia: "",
      valoresReferencia: "",
      indicaciones: "",
      precio: "",
      disponible: true,
      categoria: "Hematología",
      tipoAnimal: "ambos",
      equipoRequerido: "",
      muestra: "",
    })
    setModoEdicion(false)
    setMostrarFormulario(true)
  }

  const abrirModalEditar = (examen) => {
    setNuevoExamen({ ...examen, precio: examen.precio.toString() })
    setExamenEditando(examen.id)
    setModoEdicion(true)
    setMostrarFormulario(true)
  }

  const abrirModalDetalle = (examen) => {
    setExamenDetalle(examen)
    setMostrarDetalle(true)
  }

  const guardarExamen = () => {
    if (nuevoExamen.nombre && nuevoExamen.precio > 0) {
      if (modoEdicion) {
        setExamenes(
          examenes.map((e) => (e.id === examenEditando ? { ...nuevoExamen, precio: Number(nuevoExamen.precio) } : e)),
        )
      } else {
        setExamenes([...examenes, { ...nuevoExamen, precio: Number(nuevoExamen.precio) }])
      }
      setMostrarFormulario(false)
    }
  }

  const eliminarExamen = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este examen?")) {
      setExamenes(examenes.filter((e) => e.id !== id))
    }
  }

  const cambiarEstado = (id, e) => {
    e.stopPropagation()
    setExamenes(examenes.map((examen) => (examen.id === id ? { ...examen, disponible: !examen.disponible } : examen)))
  }

  return (
    <main className="contenedor-laboratorio">
      <div className="contenedor-principal-laboratorio">
        {/* Encabezado */}
        <header className="encabezado-laboratorio">
          <div className="titulo-con-icono-laboratorio">
            <FlaskConical className="icono-titulo-laboratorio" aria-hidden="true" />
            <h1 className="titulo-laboratorio">Servicios de Laboratorio</h1>
          </div>
          <p className="descripcion-laboratorio">Análisis clínicos y diagnósticos especializados para tu mascota</p>
        </header>

        {/* Controles */}
        <section className="controles-laboratorio" aria-label="Controles de filtrado y acciones">
          <h2 className="subtitulo-laboratorio">Exámenes Disponibles</h2>
          <div className="acciones-control-laboratorio">
            <label htmlFor="filtro-examenes" className="sr-only">
              Filtrar exámenes por tipo
            </label>
            <select
              id="filtro-examenes"
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="filtro-laboratorio"
              aria-label="Filtro de exámenes"
            >
              <option value="todos">Todos los exámenes</option>
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
            <button onClick={abrirModalAgregar} className="boton-agregar-laboratorio" aria-label="Agregar nuevo examen">
              <Plus size={16} aria-hidden="true" />
              Agregar Examen
            </button>
          </div>
        </section>

        {/* Grid de exámenes */}
        <section className="grid-laboratorio" aria-label="Lista de exámenes de laboratorio">
          {examenesFiltrados.map((examen) => (
            <article
              key={examen.id}
              className={`tarjeta-laboratorio ${!examen.disponible ? "no-disponible-laboratorio" : ""}`}
              onClick={() => abrirModalDetalle(examen)}
              role="button"
              tabIndex={0}
              aria-label={`Ver detalles del examen ${examen.nombre}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  abrirModalDetalle(examen)
                }
              }}
            >
              <header className="encabezado-tarjeta-laboratorio">
                <div className="info-principal-laboratorio">
                  <h3 className="nombre-laboratorio">{examen.nombre}</h3>
                  <div className="etiquetas-laboratorio">
                    <span className="categoria-laboratorio" data-categoria={examen.categoria}>
                      {examen.categoria}
                    </span>
                    <button
                      className={`estado-laboratorio ${
                        examen.disponible ? "disponible-laboratorio" : "no-disponible-badge-laboratorio"
                      }`}
                      onClick={(e) => cambiarEstado(examen.id, e)}
                      aria-label={`Cambiar estado del examen ${examen.nombre}. Actualmente: ${
                        examen.disponible ? "disponible" : "no disponible"
                      }`}
                    >
                      {examen.disponible ? "Disponible" : "No disponible"}
                    </button>
                  </div>
                </div>
                <div className="acciones-laboratorio">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      eliminarExamen(examen.id)
                    }}
                    className="boton-eliminar-laboratorio"
                    aria-label={`Eliminar examen ${examen.nombre}`}
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      abrirModalEditar(examen)
                    }}
                    className="boton-editar-laboratorio"
                    aria-label={`Editar examen ${examen.nombre}`}
                  >
                    <Edit size={16} aria-hidden="true" />
                  </button>
                </div>
              </header>

              <p className="descripcion-tarjeta-laboratorio">{examen.descripcion}</p>

              <dl className="detalles-rapidos-laboratorio">
                <div className="detalle-rapido-laboratorio">
                  <dt>
                    <Clock size={14} className="icono-detalle-laboratorio" aria-hidden="true" />
                    <span className="sr-only">Tiempo de resultados:</span>
                  </dt>
                  <dd className="texto-detalle-laboratorio">{examen.tiempoResultados}</dd>
                </div>
                <div className="detalle-rapido-laboratorio">
                  <dt>
                    <AlertTriangle size={14} className="icono-detalle-laboratorio" aria-hidden="true" />
                    <span className="sr-only">Preparación:</span>
                  </dt>
                  <dd className="texto-detalle-laboratorio">
                    {examen.preparacionRequerida.length > 30
                      ? `${examen.preparacionRequerida.substring(0, 30)}...`
                      : examen.preparacionRequerida}
                  </dd>
                </div>
              </dl>

              <footer className="footer-tarjeta-laboratorio">
                <span className="precio-laboratorio" aria-label={`Precio: ${formatearPrecio(examen.precio)}`}>
                  {formatearPrecio(examen.precio)}
                </span>
                <span className="id-laboratorio" aria-label={`Código: ${examen.id}`}>
                  {examen.id}
                </span>
              </footer>
            </article>
          ))}
        </section>

        {/* Modal Agregar/Editar */}
        {mostrarFormulario && (
          <div className="modal-fondo-laboratorio" role="dialog" aria-modal="true" aria-labelledby="titulo-modal">
            <div className="modal-laboratorio">
              <header className="modal-encabezado-laboratorio">
                <h2 id="titulo-modal" className="titulo-modal-laboratorio">
                  {modoEdicion ? "Editar Examen" : "Agregar Nuevo Examen"}
                </h2>
                <button
                  onClick={() => setMostrarFormulario(false)}
                  className="cerrar-modal-laboratorio"
                  aria-label="Cerrar modal"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </header>
              <form
                className="formulario-laboratorio"
                onSubmit={(e) => {
                  e.preventDefault()
                  guardarExamen()
                }}
              >
                <fieldset className="seccion-formulario-laboratorio">
                  <legend className="titulo-seccion-formulario">Información General</legend>
                  <div className="campos-formulario-laboratorio">
                    <div className="campos-dobles-laboratorio">
                      <div className="campo-laboratorio">
                        <label htmlFor="id-examen" className="etiqueta-campo-laboratorio">
                          ID Examen
                        </label>
                        <input
                          id="id-examen"
                          type="text"
                          value={nuevoExamen.id}
                          onChange={(e) => setNuevoExamen({ ...nuevoExamen, id: e.target.value })}
                          className="input-laboratorio"
                          disabled={modoEdicion}
                          placeholder="Ej: LAB001"
                          required
                        />
                      </div>
                      <div className="campo-laboratorio">
                        <label htmlFor="nombre-examen" className="etiqueta-campo-laboratorio">
                          Nombre del Examen
                        </label>
                        <input
                          id="nombre-examen"
                          type="text"
                          value={nuevoExamen.nombre}
                          onChange={(e) => setNuevoExamen({ ...nuevoExamen, nombre: e.target.value })}
                          className="input-laboratorio"
                          placeholder="Ej: Hemograma Completo"
                          required
                        />
                      </div>
                    </div>
                    <div className="campo-laboratorio">
                      <label htmlFor="descripcion-examen" className="etiqueta-campo-laboratorio">
                        Descripción
                      </label>
                      <textarea
                        id="descripcion-examen"
                        value={nuevoExamen.descripcion}
                        onChange={(e) => setNuevoExamen({ ...nuevoExamen, descripcion: e.target.value })}
                        className="textarea-laboratorio"
                        rows={2}
                        placeholder="Descripción del examen de laboratorio"
                        required
                      />
                    </div>
                  </div>
                </fieldset>

                <fieldset className="seccion-formulario-laboratorio">
                  <legend className="titulo-seccion-formulario">Detalles y Clasificación</legend>
                  <div className="campos-formulario-laboratorio">
                    <div className="campos-dobles-laboratorio">
                      <div className="campo-laboratorio">
                        <label htmlFor="precio-examen" className="etiqueta-campo-laboratorio">
                          Precio (COP)
                        </label>
                        <input
                          id="precio-examen"
                          type="number"
                          min="0"
                          value={nuevoExamen.precio}
                          onChange={(e) => setNuevoExamen({ ...nuevoExamen, precio: e.target.value })}
                          className="input-laboratorio"
                          placeholder="Ej: 65000"
                          required
                        />
                      </div>
                      <div className="campo-laboratorio">
                        <label htmlFor="tiempo-resultados" className="etiqueta-campo-laboratorio">
                          Tiempo de Resultados
                        </label>
                        <input
                          id="tiempo-resultados"
                          type="text"
                          value={nuevoExamen.tiempoResultados}
                          onChange={(e) => setNuevoExamen({ ...nuevoExamen, tiempoResultados: e.target.value })}
                          className="input-laboratorio"
                          placeholder="Ej: 2-4 horas"
                          required
                        />
                      </div>
                    </div>
                    <div className="campos-dobles-laboratorio">
                      <div className="campo-laboratorio">
                        <label htmlFor="tipo-animal" className="etiqueta-campo-laboratorio">
                          Tipo de Animal
                        </label>
                        <select
                          id="tipo-animal"
                          value={nuevoExamen.tipoAnimal}
                          onChange={(e) => setNuevoExamen({ ...nuevoExamen, tipoAnimal: e.target.value })}
                          className="select-laboratorio"
                        >
                          <option value="perro">Perro</option>
                          <option value="gato">Gato</option>
                          <option value="ambos">Ambos</option>
                        </select>
                      </div>
                      <div className="campo-laboratorio">
                        <label htmlFor="categoria-examen" className="etiqueta-campo-laboratorio">
                          Categoría
                        </label>
                        <select
                          id="categoria-examen"
                          value={nuevoExamen.categoria}
                          onChange={(e) => setNuevoExamen({ ...nuevoExamen, categoria: e.target.value })}
                          className="select-laboratorio"
                        >
                          {categorias.map((categoria) => (
                            <option key={categoria} value={categoria}>
                              {categoria}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="campos-dobles-laboratorio">
                      <div className="campo-laboratorio">
                        <label htmlFor="tipo-muestra" className="etiqueta-campo-laboratorio">
                          Tipo de Muestra
                        </label>
                        <input
                          id="tipo-muestra"
                          type="text"
                          value={nuevoExamen.muestra}
                          onChange={(e) => setNuevoExamen({ ...nuevoExamen, muestra: e.target.value })}
                          className="input-laboratorio"
                          placeholder="Ej: Sangre con anticoagulante EDTA"
                        />
                      </div>
                      <div className="campo-laboratorio">
                        <label htmlFor="equipo-requerido" className="etiqueta-campo-laboratorio">
                          Equipo Requerido
                        </label>
                        <input
                          id="equipo-requerido"
                          type="text"
                          value={nuevoExamen.equipoRequerido}
                          onChange={(e) => setNuevoExamen({ ...nuevoExamen, equipoRequerido: e.target.value })}
                          className="input-laboratorio"
                          placeholder="Ej: Analizador hematológico"
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>

                <fieldset className="seccion-formulario-laboratorio">
                  <legend className="titulo-seccion-formulario">Información Técnica</legend>
                  <div className="campos-formulario-laboratorio">
                    <div className="campo-laboratorio">
                      <label htmlFor="preparacion-requerida" className="etiqueta-campo-laboratorio">
                        Preparación Requerida
                      </label>
                      <textarea
                        id="preparacion-requerida"
                        value={nuevoExamen.preparacionRequerida}
                        onChange={(e) => setNuevoExamen({ ...nuevoExamen, preparacionRequerida: e.target.value })}
                        className="textarea-laboratorio"
                        rows={2}
                        placeholder="Preparación necesaria antes del examen"
                      />
                    </div>
                    <div className="campo-laboratorio">
                      <label htmlFor="metodologia" className="etiqueta-campo-laboratorio">
                        Metodología
                      </label>
                      <input
                        id="metodologia"
                        type="text"
                        value={nuevoExamen.metodologia}
                        onChange={(e) => setNuevoExamen({ ...nuevoExamen, metodologia: e.target.value })}
                        className="input-laboratorio"
                        placeholder="Ej: Citometría de flujo automatizada"
                      />
                    </div>
                    <div className="campo-laboratorio">
                      <label htmlFor="valores-referencia" className="etiqueta-campo-laboratorio">
                        Valores de Referencia
                      </label>
                      <textarea
                        id="valores-referencia"
                        value={nuevoExamen.valoresReferencia}
                        onChange={(e) => setNuevoExamen({ ...nuevoExamen, valoresReferencia: e.target.value })}
                        className="textarea-laboratorio"
                        rows={2}
                        placeholder="Valores normales esperados"
                      />
                    </div>
                    <div className="campo-laboratorio">
                      <label htmlFor="indicaciones" className="etiqueta-campo-laboratorio">
                        Indicaciones
                      </label>
                      <textarea
                        id="indicaciones"
                        value={nuevoExamen.indicaciones}
                        onChange={(e) => setNuevoExamen({ ...nuevoExamen, indicaciones: e.target.value })}
                        className="textarea-laboratorio"
                        rows={2}
                        placeholder="Cuándo se recomienda este examen"
                      />
                    </div>
                    <div className="campo-checkbox-laboratorio">
                      <input
                        id="disponible"
                        type="checkbox"
                        checked={nuevoExamen.disponible}
                        onChange={(e) => setNuevoExamen({ ...nuevoExamen, disponible: e.target.checked })}
                        className="checkbox-laboratorio"
                      />
                      <label htmlFor="disponible" className="etiqueta-checkbox-laboratorio">
                        Disponible
                      </label>
                    </div>
                  </div>
                </fieldset>

                <div className="botones-formulario-laboratorio">
                  <button type="submit" className="boton-guardar-laboratorio">
                    {modoEdicion ? "Actualizar" : "Agregar"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMostrarFormulario(false)}
                    className="boton-cancelar-laboratorio"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Detalle */}
        {mostrarDetalle && examenDetalle && (
          <div className="modal-fondo-laboratorio" role="dialog" aria-modal="true" aria-labelledby="titulo-detalle">
            <div className="modal-detalle-laboratorio">
              <header className="modal-encabezado-laboratorio">
                <h2 id="titulo-detalle" className="titulo-modal-laboratorio">
                  {examenDetalle.nombre}
                </h2>
                <button
                  onClick={() => setMostrarDetalle(false)}
                  className="cerrar-modal-laboratorio"
                  aria-label="Cerrar modal de detalles"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </header>
              <div className="contenido-detalle-laboratorio">
                {/* Métricas principales */}
                <section className="metricas-principales-laboratorio" aria-label="Métricas del examen">
                  <div className="metrica-laboratorio">
                    <div className="valor-metrica-laboratorio">{formatearPrecio(examenDetalle.precio)}</div>
                    <div className="etiqueta-metrica-laboratorio">Precio</div>
                  </div>
                  <div className="metrica-laboratorio">
                    <div className="valor-metrica-laboratorio">{examenDetalle.tiempoResultados}</div>
                    <div className="etiqueta-metrica-laboratorio">Tiempo</div>
                  </div>
                  <div className="metrica-laboratorio">
                    <div className="valor-metrica-laboratorio">{examenDetalle.categoria}</div>
                    <div className="etiqueta-metrica-laboratorio">Especialidad</div>
                  </div>
                  <div className="metrica-laboratorio">
                    <div
                      className={`valor-metrica-laboratorio ${
                        examenDetalle.disponible ? "texto-verde-laboratorio" : "texto-rojo-laboratorio"
                      }`}
                    >
                      {examenDetalle.disponible ? "SÍ" : "NO"}
                    </div>
                    <div className="etiqueta-metrica-laboratorio">Disponible</div>
                  </div>
                </section>

                {/* Grid de información */}
                <section className="grid-detalle-laboratorio" aria-label="Información detallada del examen">
                  <article className="seccion-detalle-laboratorio">
                    <header className="encabezado-seccion-laboratorio">
                      <FileText size={20} className="icono-seccion-laboratorio" aria-hidden="true" />
                      <h3 className="titulo-seccion-laboratorio">Descripción</h3>
                    </header>
                    <p className="texto-seccion-laboratorio">{examenDetalle.descripcion}</p>
                  </article>

                  <article className="seccion-detalle-laboratorio">
                    <header className="encabezado-seccion-laboratorio">
                      <AlertTriangle size={20} className="icono-seccion-laboratorio" aria-hidden="true" />
                      <h3 className="titulo-seccion-laboratorio">Preparación</h3>
                    </header>
                    <p className="texto-seccion-laboratorio">{examenDetalle.preparacionRequerida}</p>
                  </article>

                  <article className="seccion-detalle-laboratorio">
                    <header className="encabezado-seccion-laboratorio">
                      <FlaskConical size={20} className="icono-seccion-laboratorio" aria-hidden="true" />
                      <h3 className="titulo-seccion-laboratorio">Metodología</h3>
                    </header>
                    <p className="texto-seccion-laboratorio">{examenDetalle.metodologia}</p>
                  </article>

                  <article className="seccion-detalle-laboratorio">
                    <header className="encabezado-seccion-laboratorio">
                      <Target size={20} className="icono-seccion-laboratorio" aria-hidden="true" />
                      <h3 className="titulo-seccion-laboratorio">Indicaciones</h3>
                    </header>
                    <p className="texto-seccion-laboratorio">{examenDetalle.indicaciones}</p>
                  </article>
                </section>

                {/* Valores de referencia */}
                <section className="valores-referencia-laboratorio" aria-label="Valores de referencia">
                  <h3 className="titulo-valores-laboratorio">Valores de Referencia</h3>
                  <div className="contenido-valores-laboratorio">
                    <p className="texto-valores-laboratorio">{examenDetalle.valoresReferencia}</p>
                  </div>
                </section>

                {/* Información adicional */}
                <section className="info-adicional-laboratorio" aria-label="Información adicional">
                  <h3 className="titulo-info-adicional-laboratorio">Información Adicional</h3>
                  <dl className="contenedor-info-adicional-laboratorio">
                    <div className="item-info-adicional-laboratorio">
                      <dt className="etiqueta-info-adicional-laboratorio">Muestra:</dt>
                      <dd className="valor-info-adicional-laboratorio">{examenDetalle.muestra}</dd>
                    </div>
                    <div className="item-info-adicional-laboratorio">
                      <dt className="etiqueta-info-adicional-laboratorio">Equipo:</dt>
                      <dd className="valor-info-adicional-laboratorio">{examenDetalle.equipoRequerido}</dd>
                    </div>
                    <div className="item-info-adicional-laboratorio">
                      <dt className="etiqueta-info-adicional-laboratorio">Tipo de Animal:</dt>
                      <dd className="valor-info-adicional-laboratorio">
                        {examenDetalle.tipoAnimal === "perro"
                          ? "Perros"
                          : examenDetalle.tipoAnimal === "gato"
                            ? "Gatos"
                            : "Perros y gatos"}
                      </dd>
                    </div>
                  </dl>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
