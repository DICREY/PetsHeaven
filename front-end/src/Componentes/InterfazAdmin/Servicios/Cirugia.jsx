// Librarys
import { useState, useRef, useEffect} from "react"
import { Trash2, PenSquare, Plus, Filter, AlertCircle, FileText,Activity } from "lucide-react"

// Imports
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import HeaderUser from '../../BarrasNavegacion/HeaderUser'
import { errorStatusHandler } from '../../Varios/Util'
import { Notification } from '../../Global/Notifys'
import Footer from '../../Varios/Footer2'
import { GetData } from "../../Varios/Requests"


// Style
import "../../../styles/InterfazAdmin/Servicios/Cirugia.css"

export const CirugiasVeterinaria = ({ roles = ['Usuario'] }) => {

  // Vars 
  const URL = "http://localhost:3000"
  const didFetch = useRef(false)
  const mainUrl = `${URL}/service`
  const [notify, setNotify] = useState(null)

  
  const [cirugias, setCirugias] = useState([
    // {
    //   id: "CIR001",
    //   nombre: "Esterilización",
    //   descripcion: "Procedimiento quirúrgico para prevenir la reproducción en mascotas.",
    //   complicaciones: "Sangrado, infección, reacción a anestesia",
    //   recomendaciones: "Ayuno de 12 horas previo. Reposo post-operatorio de 7-10 días.",
    //   precio: 150000,
    //   disponible: true,
    // },
    // { 
    //   id: "CIR002",
    //   nombre: "Extracción Dental",
    //   descripcion: "Remoción de piezas dentales dañadas o infectadas.",
    //   complicaciones: "Sangrado, dolor post-operatorio, infección",
    //   recomendaciones: "Dieta blanda por 3-5 días. Antibióticos según prescripción.",
    //   precio: 80000,
    //   disponible: true,
    // },
    // {
    //   id: "CIR003",
    //   nombre: "Cirugía de Cataratas",
    //   descripcion: "Procedimiento para restaurar la visión en casos de cataratas.",
    //   complicaciones: "Infección ocular, rechazo del implante, ceguera",
    //   recomendaciones: "Collar isabelino por 2 semanas. Gotas oftálmicas diarias.",
    //   precio: 450000,
    //   disponible: false,
    // },
    // {
    //   id: "CIR004",
    //   nombre: "Reparación de Fractura",
    //   descripcion: "Cirugía ortopédica para reparar huesos fracturados.",
    //   complicaciones: "Infección ósea, rechazo de implantes, cojera permanente",
    //   recomendaciones: "Reposo absoluto 4-6 semanas. Fisioterapia posterior.",
    //   precio: 320000,
    //   disponible: true,
    // },
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


  // Functions    
  useEffect(() => {
      if (didFetch.current) return
      didFetch.current = true
      fetchCirugias()
  }, [])
  
  const fetchCirugias = async () => {
    setNotify({
        title: 'Cargando',
        message: 'Cargando cirugias, por favor espere...',
        load: 1
    })
    try {
      const byValue = "Cirugía"
      let data = await GetData(`${mainUrl}/all/${encodeURIComponent(byValue)}`,)
      setNotify(null)
      // Normaliza la respuesta a array
      if (data && !Array.isArray(data)) {
          data = [data]
      }
      if (data) {
          setCirugias(data);
          console.log(cirugias)
      }
    } catch (err) {
      setNotify(null)
      if (err.status) {
          const message = errorStatusHandler(err.status)
          setNotify({
              title: 'Error',
              message: `${message}`,
              close: setNotify
          })
      } 
      else console.error(err)
      // Manejo de error
    }
  }

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
    <main className="maincontenedor-cirugia">
    <NavBarAdmin roles={roles} />
      <div className="principaladminhome">
      <HeaderUser/>
        <div className="contenedor-cirugia">
        
          <div className="contenedorprincipal-cirugia">
            <header className="encabezado-cirugia">
              <div className="tituloadminhome">
                <Activity className="iconoadminhome" aria-hidden='true'/>
                <h1 className="textoadminhome">Servicios de Cirugía</h1>
              </div>
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
                {cirugias.map((cirugia, idx) => (
                  <li key={cirugia.id_ser || cirugia.nom_ser || idx}>
                    <article className="tarjeta-cirugia">
                      <header className="header-tarjeta-cirugia">
                        <div className="info-cirugia">
                          <h3 className="nombre-cirugia">{cirugia.nom_ser}</h3>
                          <span
                            className={`estado-cirugia ${cirugia.sta_ser === "DISPONIBLE" ? "disponible-cirugia" : "no-disponible-cirugia"}`}
                          >
                            {cirugia.sta_ser === "DISPONIBLE" ? "Disponible" : "No disponible"}
                          </span>
                        </div>
                        <div className="acciones-cirugia">
                          <button
                            className="boton-eliminar-cirugia"
                            onClick={() => eliminarCirugia(cirugia.id_ser || cirugia.nom_ser)}
                            aria-label={`Eliminar cirugía ${cirugia.nom_ser}`}
                          >
                            <Trash2 size={18} aria-hidden="true" />
                          </button>
                          <button
                            className="boton-editar-cirugia"
                            onClick={() => editarCirugia(cirugia)}
                            aria-label={`Editar cirugía ${cirugia.nom_ser}`}
                          >
                            <PenSquare size={18} aria-hidden="true" />
                          </button>
                        </div>
                      </header>

                      <p className="descripcion-tarjeta-cirugia">{cirugia.des_ser}</p>

                      <section className="detalles-cirugia">
                        <div className="detalle-cirugia">
                          <strong>
                            <AlertCircle size={14} className="icono-detalle-cirugia" aria-hidden="true" /> Complicaciones:
                          </strong>
                          <p>{cirugia.com_ser || "No especificadas"}</p>
                        </div>
                        <div className="detalle-cirugia">
                          <strong>
                            <FileText size={14} className="icono-detalle-cirugia" aria-hidden="true" /> Recomendaciones:
                          </strong>
                          <p>{cirugia.tec_des_ser}</p>
                        </div>
                      </section>

                      <footer className="footer-tarjeta-cirugia">
                        <span className="precio-cirugia">Precio: ${Number(cirugia.pre_ser).toLocaleString()}</span>
                        <span className="id-cirugia">{cirugia.id_ser || cirugia.nom_ser}</span>
                      </footer>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

