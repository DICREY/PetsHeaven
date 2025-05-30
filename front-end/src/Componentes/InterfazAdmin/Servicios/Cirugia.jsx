import { useState } from "react"
import { Scissors, Trash2, PenSquare, Plus, Filter, AlertCircle, FileText } from "lucide-react"
import "../../../styles/InterfazAdmin/Servicios/Cirugia.css"

const CirugiasVeterinaria = () => {
  const [cirugias, setCirugias] = useState([
    {
      id: "CIR001",
      nombre: "Esterilización",
      descripcion: "Procedimiento quirúrgico para prevenir la reproducción en mascotas.",
      complicaciones: "Sangrado, infección, reacción a anestesia",
      recomendaciones: "Ayuno de 12 horas previo. Reposo post-operatorio de 7-10 días.",
      precio: 150000,
      disponible: true,
    },
    {
      id: "CIR002",
      nombre: "Extracción Dental",
      descripcion: "Remoción de piezas dentales dañadas o infectadas.",
      complicaciones: "Sangrado, dolor post-operatorio, infección",
      recomendaciones: "Dieta blanda por 3-5 días. Antibióticos según prescripción.",
      precio: 80000,
      disponible: true,
    },
    {
      id: "CIR003",
      nombre: "Cirugía de Cataratas",
      descripcion: "Procedimiento para restaurar la visión en casos de cataratas.",
      complicaciones: "Infección ocular, rechazo del implante, ceguera",
      recomendaciones: "Collar isabelino por 2 semanas. Gotas oftálmicas diarias.",
      precio: 450000,
      disponible: false,
    },
    {
      id: "CIR004",
      nombre: "Reparación de Fractura",
      descripcion: "Cirugía ortopédica para reparar huesos fracturados.",
      complicaciones: "Infección ósea, rechazo de implantes, cojera permanente",
      recomendaciones: "Reposo absoluto 4-6 semanas. Fisioterapia posterior.",
      precio: 320000,
      disponible: true,
    },
  ])

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [cirugiaEditando, setCirugiaEditando] = useState(null)
  const [nuevaCirugia, setNuevaCirugia] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    complicaciones: "",
    recomendaciones: "",
    precio: "",
    disponible: true,
  })

  const manejarCambioFormulario = (e) => {
    const { name, value, type, checked } = e.target
    setNuevaCirugia((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const agregarCirugia = (e) => {
    e.preventDefault()
    if (cirugiaEditando) {
      setCirugias((prev) =>
        prev.map((cirugia) =>
          cirugia.id === cirugiaEditando.id ? { ...nuevaCirugia, precio: Number(nuevaCirugia.precio) } : cirugia,
        ),
      )
      setCirugiaEditando(null)
    } else {
      setCirugias((prev) => [...prev, { ...nuevaCirugia, precio: Number(nuevaCirugia.precio) }])
    }
    setNuevaCirugia({
      id: "",
      nombre: "",
      descripcion: "",
      complicaciones: "",
      recomendaciones: "",
      precio: "",
      disponible: true,
    })
    setMostrarFormulario(false)
  }

  const editarCirugia = (cirugia) => {
    setNuevaCirugia({ ...cirugia, precio: cirugia.precio.toString() })
    setCirugiaEditando(cirugia)
    setMostrarFormulario(true)
  }

  const eliminarCirugia = (id) => {
    setCirugias((prev) => prev.filter((cirugia) => cirugia.id !== id))
  }

  const cancelarFormulario = () => {
    setMostrarFormulario(false)
    setCirugiaEditando(null)
    setNuevaCirugia({
      id: "",
      nombre: "",
      descripcion: "",
      complicaciones: "",
      recomendaciones: "",
      precio: "",
      disponible: true,
    })
  }

  return (
    <main className="contenedor-cirugia">
      <header className="encabezado-cirugia">
        <h1 className="titulo-cirugia">Servicios de Cirugía</h1>
        <p className="descripcion-cirugia">
          Ofrecemos una variedad de procedimientos quirúrgicos especializados para el cuidado de tu mascota
        </p>
      </header>

      <section className="seccion-cirugia">
        <header className="header-cirugia">
          <h2 className="subtitulo-cirugia">Cirugías Disponibles</h2>
          <nav className="controles-cirugia">
            <div className="filtro-contenedor-cirugia">
              <Filter size={16} className="icono-filtro-cirugia" aria-hidden="true" />
              <select className="filtro-cirugia" aria-label="Filtrar cirugías">
                <option>Todas las cirugías</option>
                <option>Disponibles</option>
                <option>No disponibles</option>
              </select>
            </div>
            <button className="boton-agregar-cirugia" onClick={() => setMostrarFormulario(true)}>
              <Plus size={18} aria-hidden="true" /> <span>Agregar Cirugía</span>
            </button>
          </nav>
        </header>

        {mostrarFormulario && (
          <aside className="overlay-cirugia" role="dialog" aria-modal="true" aria-labelledby="form-title">
            <section className="formulario-cirugia">
              <h3 id="form-title" className="titulo-formulario-cirugia">
                {cirugiaEditando ? "Editar Cirugía" : "Agregar Nueva Cirugía"}
              </h3>
              <form onSubmit={agregarCirugia}>
                <fieldset>
                  <legend className="sr-only">Información de la cirugía</legend>
                  <div className="campo-cirugia">
                    <label htmlFor="id-cirugia">ID Cirugía:</label>
                    <input
                      type="text"
                      id="id-cirugia"
                      name="id"
                      value={nuevaCirugia.id}
                      onChange={manejarCambioFormulario}
                      required
                      disabled={cirugiaEditando}
                    />
                  </div>
                  <div className="campo-cirugia">
                    <label htmlFor="nombre-cirugia">Nombre de la Cirugía:</label>
                    <input
                      type="text"
                      id="nombre-cirugia"
                      name="nombre"
                      value={nuevaCirugia.nombre}
                      onChange={manejarCambioFormulario}
                      required
                    />
                  </div>
                  <div className="campo-cirugia">
                    <label htmlFor="descripcion-cirugia">Descripción de la Cirugía:</label>
                    <textarea
                      id="descripcion-cirugia"
                      name="descripcion"
                      value={nuevaCirugia.descripcion}
                      onChange={manejarCambioFormulario}
                      required
                    />
                  </div>
                  <div className="campo-cirugia">
                    <label htmlFor="complicaciones-cirugia">Complicaciones:</label>
                    <textarea
                      id="complicaciones-cirugia"
                      name="complicaciones"
                      value={nuevaCirugia.complicaciones}
                      onChange={manejarCambioFormulario}
                      required
                    />
                  </div>
                  <div className="campo-cirugia">
                    <label htmlFor="recomendaciones-cirugia">Recomendaciones Técnicas:</label>
                    <textarea
                      id="recomendaciones-cirugia"
                      name="recomendaciones"
                      value={nuevaCirugia.recomendaciones}
                      onChange={manejarCambioFormulario}
                      required
                    />
                  </div>
                  <div className="campo-cirugia">
                    <label htmlFor="precio-cirugia">Precio:</label>
                    <input
                      type="number"
                      id="precio-cirugia"
                      name="precio"
                      value={nuevaCirugia.precio}
                      onChange={manejarCambioFormulario}
                      required
                    />
                  </div>
                  <div className="campo-checkbox-cirugia">
                    <label htmlFor="disponible-cirugia">
                      <input
                        type="checkbox"
                        id="disponible-cirugia"
                        name="disponible"
                        checked={nuevaCirugia.disponible}
                        onChange={manejarCambioFormulario}
                      />
                      Disponible
                    </label>
                  </div>
                </fieldset>
                <div className="botones-formulario-cirugia">
                  <button type="submit" className="boton-guardar-cirugia">
                    {cirugiaEditando ? "Actualizar" : "Agregar"}
                  </button>
                  <button type="button" className="boton-cancelar-cirugia" onClick={cancelarFormulario}>
                    Cancelar
                  </button>
                </div>
              </form>
            </section>
          </aside>
        )}

        <ul className="grid-cirugia" aria-label="Lista de cirugías disponibles">
          {cirugias.map((cirugia) => (
            <li key={cirugia.id}>
              <article className="tarjeta-cirugia">
                <header className="header-tarjeta-cirugia">
                  <figure className="icono-cirugia">
                    <Scissors size={24} aria-hidden="true" />
                  </figure>
                  <div className="info-cirugia">
                    <h3 className="nombre-cirugia">{cirugia.nombre}</h3>
                    <span
                      className={`estado-cirugia ${cirugia.disponible ? "disponible-cirugia" : "no-disponible-cirugia"}`}
                    >
                      {cirugia.disponible ? "Disponible" : "No disponible"}
                    </span>
                  </div>
                  <div className="acciones-cirugia">
                    <button
                      className="boton-eliminar-cirugia"
                      onClick={() => eliminarCirugia(cirugia.id)}
                      aria-label={`Eliminar cirugía ${cirugia.nombre}`}
                    >
                      <Trash2 size={18} aria-hidden="true" />
                    </button>
                    <button
                      className="boton-editar-cirugia"
                      onClick={() => editarCirugia(cirugia)}
                      aria-label={`Editar cirugía ${cirugia.nombre}`}
                    >
                      <PenSquare size={18} aria-hidden="true" />
                    </button>
                  </div>
                </header>

                <p className="descripcion-tarjeta-cirugia">{cirugia.descripcion}</p>

                <section className="detalles-cirugia">
                  <div className="detalle-cirugia">
                    <strong>
                      <AlertCircle size={14} className="icono-detalle-cirugia" aria-hidden="true" /> Complicaciones:
                    </strong>
                    <p>{cirugia.complicaciones}</p>
                  </div>
                  <div className="detalle-cirugia">
                    <strong>
                      <FileText size={14} className="icono-detalle-cirugia" aria-hidden="true" /> Recomendaciones:
                    </strong>
                    <p>{cirugia.recomendaciones}</p>
                  </div>
                </section>

                <footer className="footer-tarjeta-cirugia">
                  <span className="precio-cirugia">Precio: ${cirugia.precio.toLocaleString()}</span>
                  <span className="id-cirugia">{cirugia.id}</span>
                </footer>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default CirugiasVeterinaria
