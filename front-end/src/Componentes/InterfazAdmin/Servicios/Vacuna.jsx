import { useState } from "react"
import "../../../styles/InterfazAdmin/Vacuna.css"

export default function VisualizadorVacunas() {

    // Datos ficticios UNU
  const [vacunas, setVacunas] = useState([
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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

  const [nuevaVacuna, setNuevaVacuna] = useState({
    nombre: "",
    descripcion: "",
    descripcionTecnica: "",
    precio: 0,
    frecuencia: "",
    tipoAnimal: "perro",
    dosis: {
      cachorro: "",
      adulto: "",
      senior: "",
    },
    efectosSecundarios: "",
    disponible: true,
    categoria: "Esencial",
    lote: "",
    fechaVencimiento: "",
  })

  const [vacunaEditando, setVacunaEditando] = useState(null)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [filtroAnimal, setFiltroAnimal] = useState("todos")
  const [vacunaDetalle, setVacunaDetalle] = useState(null)
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false)

  const abrirModalAgregar = () => {
    setNuevaVacuna({
      nombre: "",
      descripcion: "",
      descripcionTecnica: "",
      precio: 0,
      frecuencia: "",
      tipoAnimal: "perro",
      dosis: {
        cachorro: "",
        adulto: "",
        senior: "",
      },
      efectosSecundarios: "",
      disponible: true,
      categoria: "Esencial",
      lote: "",
      fechaVencimiento: "",
    })
    setModoEdicion(false)
    setModalAbierto(true)
  }

  const abrirModalEditar = (vacuna) => {
    setNuevaVacuna({ ...vacuna })
    setVacunaEditando(vacuna.id)
    setModoEdicion(true)
    setModalAbierto(true)
  }

  const cerrarModal = () => {
    setModalAbierto(false)
  }

  const guardarVacuna = () => {
    if (nuevaVacuna.nombre && nuevaVacuna.precio > 0) {
      if (modoEdicion) {
        setVacunas(vacunas.map((v) => (v.id === vacunaEditando ? { ...nuevaVacuna, id: v.id } : v)))
      } else {
        setVacunas([
          ...vacunas,
          {
            id: vacunas.length + 1,
            ...nuevaVacuna,
          },
        ])
      }
      setModalAbierto(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setNuevaVacuna({
      ...nuevaVacuna,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    })
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

  const eliminarVacuna = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta vacuna?")) {
      setVacunas(vacunas.filter((v) => v.id !== id))
    }
  }

  const abrirModalDetalle = (vacuna) => {
    setVacunaDetalle(vacuna)
    setModalDetalleAbierto(true)
  }

  const vacunasFiltradas = vacunas.filter((vacuna) => {
    if (filtroAnimal === "todos") return true
    return vacuna.tipoAnimal === filtroAnimal || vacuna.tipoAnimal === "ambos"
  })

  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return "No especificada"
    const fecha = new Date(fechaStr)
    return fecha.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })
  }

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(precio)
  }

  return (
    <main className="contenedorPrincipalVacunas">
      <div className="contenedorVacunas">
        <header className="encabezadoVacunas">
          <h1 className="tituloVacunas">Servicios de Vacunación</h1>
          <p className="descripcionVacunas">Ofrecemos una variedad de vacunas para mantener a tu mascota saludable</p>
        </header>

        <nav className="controlVacunas">
          <h2 className="subtituloVacunas">Vacunas Disponibles</h2>
          <div className="accionesControlVacunas">
            <div className="filtroContenedorVacunas">
              <label htmlFor="filtroAnimal" className="sr-only">
                Filtrar por tipo de animal
              </label>
              <select
                id="filtroAnimal"
                value={filtroAnimal}
                onChange={(e) => setFiltroAnimal(e.target.value)}
                className="selectFiltroVacunas"
              >
                <option value="todos">Todos los animales</option>
                <option value="perro">Solo perros</option>
                <option value="gato">Solo gatos</option>
                <option value="ambos">Ambos</option>
              </select>
            </div>
            <button className="botonAgregarVacunas" onClick={abrirModalAgregar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="iconoVacunas"
                aria-hidden="true"
              >
                <path d="M12 5v14"></path>
                <path d="M5 12h14"></path>
              </svg>
              Agregar Vacuna
            </button>
          </div>
        </nav>

        <section className="listaVacunas" role="grid" aria-label="Lista de vacunas disponibles">
          {vacunasFiltradas.map((vacuna) => (
            <article
              key={vacuna.id}
              className={`tarjetaVacunas ${!vacuna.disponible ? "noDisponibleVacunas" : ""}`}
              onClick={() => abrirModalDetalle(vacuna)}
              role="gridcell"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  abrirModalDetalle(vacuna)
                }
              }}
            >
              <header className="tarjetaEncabezadoVacunas">
                <div className="iconoNombreVacunas">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="iconoJeringaVacunas"
                    aria-hidden="true"
                  >
                    <path d="m14 8-4 4"></path>
                    <path d="m17 5-1 1"></path>
                    <path d="M14 8 9 3 8 4l5 5"></path>
                    <path d="M14 22 7 15 3 19l3 3 8-8 8 8v-4l-8-8"></path>
                  </svg>
                  <h3 className="nombreVacunas">{vacuna.nombre}</h3>
                </div>
                <div className="accionesVacunas">
                  <button
                    className="botonEliminarVacunas"
                    onClick={(e) => {
                      e.stopPropagation()
                      eliminarVacuna(vacuna.id)
                    }}
                    aria-label={`Eliminar vacuna ${vacuna.nombre}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      <line x1="10" x2="10" y1="11" y2="17"></line>
                      <line x1="14" x2="14" y1="11" y2="17"></line>
                    </svg>
                  </button>
                  <button
                    className="botonEditarVacunas"
                    onClick={(e) => {
                      e.stopPropagation()
                      abrirModalEditar(vacuna)
                    }}
                    aria-label={`Editar vacuna ${vacuna.nombre}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <span
                    className={`estadoVacunas ${vacuna.disponible ? "disponibleVacunas" : "noDisponibleBadgeVacunas"}`}
                    role="status"
                    aria-label={vacuna.disponible ? "Vacuna disponible" : "Vacuna no disponible"}
                  >
                    {vacuna.disponible ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                        Disponible
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M18 6 6 18"></path>
                          <path d="m6 6 12 12"></path>
                        </svg>
                        No disponible
                      </>
                    )}
                  </span>
                </div>
              </header>
              <p className="descripcionTarjetaVacunas">{vacuna.descripcion}</p>
              <footer className="detallesVacunas">
                <dl className="detalleVacunas">
                  <dt className="etiquetaVacunas">Precio:</dt>
                  <dd className="valorVacunas">{formatearPrecio(vacuna.precio)}</dd>
                </dl>
                <dl className="detalleVacunas">
                  <dt className="sr-only">Frecuencia:</dt>
                  <dd className="valorVacunas">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="iconoDetalleVacunas"
                      aria-hidden="true"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                      <line x1="16" x2="16" y1="2" y2="6"></line>
                      <line x1="8" x2="8" y1="2" y2="6"></line>
                      <line x1="3" x2="21" y1="10" y2="10"></line>
                    </svg>
                    {vacuna.frecuencia}
                  </dd>
                </dl>
              </footer>
            </article>
          ))}
        </section>
      </div>

      {modalAbierto && (
        <div className="modalFondoVacunas" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modalVacunas modalFormularioVacunas">
            <header className="modalEncabezadoVacunas">
              <h3 id="modal-title">{modoEdicion ? "Editar Vacuna" : "Agregar Nueva Vacuna"}</h3>
              <button className="cerrarModalVacunas" onClick={cerrarModal} aria-label="Cerrar modal">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </header>
            <form
              className="formularioVacunas"
              onSubmit={(e) => {
                e.preventDefault()
                guardarVacuna()
              }}
            >
              <fieldset className="pestanasFormularioVacunas">
                <legend className="sr-only">Información de la vacuna</legend>

                <div className="campoVacunas">
                  <label htmlFor="nombre">Nombre de la Vacuna</label>
                  <input id="nombre" name="nombre" value={nuevaVacuna.nombre} onChange={handleInputChange} required />
                </div>

                <div className="campoVacunas">
                  <label htmlFor="descripcion">Descripción General</label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={nuevaVacuna.descripcion}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="campoVacunas">
                  <label htmlFor="descripcionTecnica">Descripción Técnica</label>
                  <textarea
                    id="descripcionTecnica"
                    name="descripcionTecnica"
                    value={nuevaVacuna.descripcionTecnica}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="campoDobleVacunas">
                  <div className="campoVacunas">
                    <label htmlFor="precio">Precio (COP)</label>
                    <input
                      id="precio"
                      name="precio"
                      type="number"
                      min="0"
                      value={nuevaVacuna.precio || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="campoVacunas">
                    <label htmlFor="frecuencia">Frecuencia</label>
                    <input
                      id="frecuencia"
                      name="frecuencia"
                      value={nuevaVacuna.frecuencia}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="campoDobleVacunas">
                  <div className="campoVacunas">
                    <label htmlFor="tipoAnimal">Tipo de Animal</label>
                    <select
                      id="tipoAnimal"
                      name="tipoAnimal"
                      value={nuevaVacuna.tipoAnimal}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="perro">Perro</option>
                      <option value="gato">Gato</option>
                      <option value="ambos">Ambos</option>
                    </select>
                  </div>
                  <div className="campoVacunas">
                    <label htmlFor="categoria">Categoría</label>
                    <select
                      id="categoria"
                      name="categoria"
                      value={nuevaVacuna.categoria}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Obligatoria">Obligatoria</option>
                      <option value="Esencial">Esencial</option>
                      <option value="Recomendada">Recomendada</option>
                      <option value="Opcional">Opcional</option>
                    </select>
                  </div>
                </div>

                <div className="campoDobleVacunas">
                  <div className="campoVacunas">
                    <label htmlFor="lote">Número de Lote</label>
                    <input id="lote" name="lote" value={nuevaVacuna.lote} onChange={handleInputChange} />
                  </div>
                  <div className="campoVacunas">
                    <label htmlFor="fechaVencimiento">Fecha de Vencimiento</label>
                    <input
                      id="fechaVencimiento"
                      name="fechaVencimiento"
                      type="date"
                      value={nuevaVacuna.fechaVencimiento}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="campoVacunas">
                  <label htmlFor="efectosSecundarios">Efectos Secundarios</label>
                  <textarea
                    id="efectosSecundarios"
                    name="efectosSecundarios"
                    value={nuevaVacuna.efectosSecundarios}
                    onChange={handleInputChange}
                  />
                </div>

                <fieldset className="seccionDosisVacunas">
                  <legend className="labelSeccionVacunas">Dosis Recomendadas</legend>
                  <div className="campoVacunas">
                    <label htmlFor="dosisCachorro">Cachorros</label>
                    <input
                      id="dosisCachorro"
                      value={nuevaVacuna.dosis?.cachorro || ""}
                      onChange={(e) => handleDosisChange("cachorro", e.target.value)}
                    />
                  </div>
                  <div className="campoVacunas">
                    <label htmlFor="dosisAdulto">Adultos</label>
                    <input
                      id="dosisAdulto"
                      value={nuevaVacuna.dosis?.adulto || ""}
                      onChange={(e) => handleDosisChange("adulto", e.target.value)}
                    />
                  </div>
                  <div className="campoVacunas">
                    <label htmlFor="dosisSenior">Senior</label>
                    <input
                      id="dosisSenior"
                      value={nuevaVacuna.dosis?.senior || ""}
                      onChange={(e) => handleDosisChange("senior", e.target.value)}
                    />
                  </div>
                </fieldset>

                <div className="campoVacunas">
                  <label className="checkboxLabelVacunas">
                    <input
                      type="checkbox"
                      name="disponible"
                      checked={nuevaVacuna.disponible}
                      onChange={handleInputChange}
                    />
                    Disponible actualmente
                  </label>
                </div>

                <button type="submit" className="botonGuardarVacunas">
                  {modoEdicion ? "Actualizar Vacuna" : "Guardar Vacuna"}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      )}

      {modalDetalleAbierto && vacunaDetalle && (
        <div className="modalFondoVacunas" role="dialog" aria-modal="true" aria-labelledby="detalle-title">
          <article className="modalVacunas modalDetalleVacunas">
            <header className="modalEncabezadoVacunas">
              <button
                className="cerrarModalVacunas"
                onClick={() => setModalDetalleAbierto(false)}
                aria-label="Cerrar detalle de vacuna"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </header>

            <div className="detalleVacunaContenedor">
              <header className="detalleVacunaCabecera">
                <div className="detalleVacunaID">ID: {vacunaDetalle.id}</div>
                <h2 id="detalle-title" className="detalleVacunaTitulo">
                  {vacunaDetalle.nombre}
                </h2>
                <div className="detalleVacunaFecha">
                  Vence: {formatearFecha(vacunaDetalle.fechaVencimiento)} • Lote: {vacunaDetalle.lote}
                </div>
                <span className={`detalleVacunaCategoria ${vacunaDetalle.categoria.toLowerCase()}Categoria`}>
                  {vacunaDetalle.categoria}
                </span>
              </header>

              <section className="detalleVacunaGrid">
                <article className="detalleVacunaCard">
                  <div className="detalleVacunaCardIcono" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  <div className="detalleVacunaCardContenido">
                    <h3>Descripción General</h3>
                    <p>{vacunaDetalle.descripcion}</p>
                  </div>
                </article>

                <article className="detalleVacunaCard">
                  <div className="detalleVacunaCardIcono" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                  </div>
                  <div className="detalleVacunaCardContenido">
                    <h3>Descripción Técnica</h3>
                    <p>{vacunaDetalle.descripcionTecnica}</p>
                  </div>
                </article>

                <article className="detalleVacunaCard">
                  <div className="detalleVacunaCardIcono" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                  </div>
                  <div className="detalleVacunaCardContenido">
                    <h3>Efectos Secundarios</h3>
                    <p>{vacunaDetalle.efectosSecundarios}</p>
                  </div>
                </article>

                <article className="detalleVacunaCard">
                  <div className="detalleVacunaCardIcono" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M8 2v4"></path>
                      <path d="M16 2v4"></path>
                      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                      <path d="M3 10h18"></path>
                    </svg>
                  </div>
                  <div className="detalleVacunaCardContenido">
                    <h3>Dosis Recomendadas</h3>
                    <dl className="detalleVacunaDosis">
                      <div>
                        <dt className="detalleVacunaDosisEtiqueta">Cachorros:</dt>
                        <dd className="detalleVacunaDosisValor">
                          {vacunaDetalle.dosis?.cachorro || "No especificada"}
                        </dd>
                      </div>
                      <div>
                        <dt className="detalleVacunaDosisEtiqueta">Adultos:</dt>
                        <dd className="detalleVacunaDosisValor">{vacunaDetalle.dosis?.adulto || "No especificada"}</dd>
                      </div>
                      <div>
                        <dt className="detalleVacunaDosisEtiqueta">Senior:</dt>
                        <dd className="detalleVacunaDosisValor">{vacunaDetalle.dosis?.senior || "No especificada"}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              </section>

              <footer className="detalleVacunaMetricas">
                <dl className="detalleVacunaMetrica">
                  <dt className="detalleVacunaMetricaEtiqueta">Precio</dt>
                  <dd className="detalleVacunaMetricaValor">{formatearPrecio(vacunaDetalle.precio)}</dd>
                </dl>
                <dl className="detalleVacunaMetrica">
                  <dt className="detalleVacunaMetricaEtiqueta">Frecuencia</dt>
                  <dd className="detalleVacunaMetricaValor">{vacunaDetalle.frecuencia}</dd>
                </dl>
                <dl className="detalleVacunaMetrica">
                  <dt className="detalleVacunaMetricaEtiqueta">Tipo Animal</dt>
                  <dd className="detalleVacunaMetricaValor">
                    {vacunaDetalle.tipoAnimal === "perro"
                      ? "Perro"
                      : vacunaDetalle.tipoAnimal === "gato"
                        ? "Gato"
                        : "Ambos"}
                  </dd>
                </dl>
                <dl className="detalleVacunaMetrica">
                  <dt className="detalleVacunaMetricaEtiqueta">Estado</dt>
                  <dd
                    className={`detalleVacunaMetricaValor ${vacunaDetalle.disponible ? "disponible" : "noDisponible"}`}
                  >
                    {vacunaDetalle.disponible ? "Disponible" : "No disponible"}
                  </dd>
                </dl>
              </footer>
            </div>
          </article>
        </div>
      )}
    </main>
  )
}
