// Librarys
import { useState, useRef, useEffect, useContext, useCallback } from "react"
import { Activity, X, Clock, AlertTriangle, FileText, Target } from "lucide-react"

// Imports
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import { HeaderUser } from '../../BarrasNavegacion/HeaderUser'
import { HeaderAdmin } from '../../BarrasNavegacion/HeaderAdmin'
import { errorStatusHandler } from '../../Varios/Util'
import { Notification } from '../../Global/Notifys'
import { GetData, PostData, ModifyData } from "../../Varios/Requests"
import { AuthContext } from "../../../Contexts/Contexts"
import { ServicesContainer } from '../../Global/Services'
// import Footer from '../../Varios/Footer2'

// Style
import "../../../styles/InterfazAdmin/Servicios/Cirugia.css"

// Component 
export const CirugiasVeterinaria = ({ URL = '' }) => {
  // Dynamic Vars 
  const [notify, setNotify] = useState(null)
  const [cirugias, setCirugias] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mostrarDetalle, setMostrarDetalle] = useState(false)
  const [cirugiaDetalle, setCirugiaDetalle] = useState(null)
  const [cirugiaEditando, setCirugiaEditando] = useState(null)
  const [modoEdicion, setModoEdicion] = useState(false)

  // Vars 
  const didFetch = useRef(false)
  const mainUrl = `${URL}/service`
  const { admin } = useContext(AuthContext)
  const formRef = useRef({
    id: "",
    nombre: "",
    descripcion: "",
    complicaciones: "",
    recomendaciones: "",
    precio: "",
    disponible: true,
    fechaCirugia: "",
    descripcionBreve: "",
    resultadoEsperado: "",
    observaciones: ""
  })
  const categorias = [
    "Ortopedia",
    "Oftalmología",
    "Dermatología",
    "Cardiología",
    "Neurología",
    "Oncología",
    "Traumatología",
    "Odontología",
    "General"
  ]

  // Functions 
  const fetchCirugias = useCallback(async () => {
    if (didFetch.current) return
    didFetch.current = true

    setNotify({
      title: 'Cargando',
      message: 'Cargando cirugias, por favor espere...',
      load: 1
    })

    try {
      let data = await GetData(`${mainUrl}/cirs`)
      setNotify(null)
      if (data && !Array.isArray(data)) data = [data]
      if (data) setCirugias(data)
    } catch (err) {
      setNotify(null)
      if (err) {
        const message = errorStatusHandler(err)
        setNotify({
          title: 'Error',
          message: `${message}`,
          close: setNotify
        })
      }
    }
  }, [mainUrl])

  // Functions    
  useEffect(() => {
    fetchCirugias()
  }, [fetchCirugias])

  const manejarCambioFormulario = useCallback((e) => {
    const { name, value, type, checked } = e.target
    formRef.current = {
      ...formRef.current,
      [name]: type === "checkbox" ? checked : value,
    }
  }, [])

  const agregarCirugia = useCallback(async (e) => {
    e.preventDefault()
    try {
      const nueva = {
        cat_ser: 3,
        nom_ser: formRef.current.nombre,
        pre_ser: Number(formRef.current.precio),
        des_ser: formRef.current.descripcion,
        sta_ser: formRef.current.disponible ? "DISPONIBLE" : "NO DISPONIBLE",
        tec_des_ser: formRef.current.recomendaciones,
        fec_cir: formRef.current.fechaCirugia,
        des_cir: formRef.current.descripcionBreve,
        res_cir: formRef.current.resultadoEsperado,
        com_cir: formRef.current.complicaciones,
        obv_cir: formRef.current.observaciones
      }

      await PostData(`${mainUrl}/register`, nueva)
      setMostrarFormulario(false)
      resetForm()
      fetchCirugias()
    } catch (err) {
      const message = errorStatusHandler(err)
      setNotify({
        title: 'Error',
        message: `${message}`,
        close: setNotify
      })
    }
  }, [mainUrl, fetchCirugias])

  const actualizarCirugia = useCallback(async (e) => {
    e.preventDefault()
    try {
      const actualizada = {
        id_ser: cirugiaEditando.id_ser,
        nom_ser: formRef.current.nombre,
        des_ser: formRef.current.descripcion,
        com_cir: formRef.current.complicaciones,
        tec_des_ser: formRef.current.recomendaciones,
        pre_ser: Number(formRef.current.precio),
        sta_ser: formRef.current.disponible ? "DISPONIBLE" : "NO DISPONIBLE",
        tipo_ser: "Cirugía"
      }

      await ModifyData(`${mainUrl}/modify`, actualizada)
      setMostrarFormulario(false)
      setCirugiaEditando(null)
      resetForm()
      fetchCirugias()
    } catch (err) {
      const message = errorStatusHandler(err)
      setNotify({
        title: 'Error',
        message: `${message}`,
        close: setNotify
      })
    }
  }, [mainUrl, cirugiaEditando, fetchCirugias])

  // Resetear formulario
  const resetForm = useCallback(() => {
    formRef.current = {
      id: "",
      nombre: "",
      descripcion: "",
      complicaciones: "",
      recomendaciones: "",
      precio: "",
      disponible: true,
      fechaCirugia: "",
      descripcionBreve: "",
      resultadoEsperado: "",
      observaciones: ""
    }
  }, [])

  // Editar cirugía
  const editarCirugia = useCallback((cirugia) => {
    formRef.current = {
      id: cirugia.id_ser || "",
      nombre: cirugia.nom_ser || "",
      descripcion: cirugia.des_ser || "",
      complicaciones: cirugia.com_cir || "",
      recomendaciones: cirugia.tec_des_ser || "",
      precio: cirugia.pre_ser ? cirugia.pre_ser.toString() : "",
      disponible: cirugia.sta_ser === "DISPONIBLE",
      fechaCirugia: cirugia.fec_cir || "",
      descripcionBreve: cirugia.des_cir || "",
      resultadoEsperado: cirugia.res_cir || "",
      observaciones: cirugia.obv_cir || ""
    }
    setCirugiaEditando(cirugia)
    setModoEdicion(true)
    setMostrarFormulario(true)
  }, [])

  // Eliminar cirugía
  const eliminarCirugia = (id_ser) => {
    setNotify({
      title: 'Atencion',
      message: '¿Estás seguro de que deseas eliminar esta vacuna?',
      firstOption: () => {setNotify(null); return},
      secondOption: () => DeleteService(id_ser),
      firstOptionName: 'Cancelar',
      secondOptionName: 'Continuar',
    })
    const DeleteService = async (id_ser) => {
      try {
        setNotify({
          title: 'Cargando...',
          message: 'Validando credenciales, por favor espere...',
          load: 1
        })
        const data = { data: { id_ser: id_ser, nom_cat: 'Cirugia' } }
        const deleted = await ModifyData(`${mainUrl}/AblOrDis`, data)
        setNotify(null)
        if (deleted) {
          setNotify({
              title: 'Desactivación exitosa',
              message: 'La cirugia ha sido desactivada exitosamente',
              close: setNotify
          })
          fetchCirugias()
        }
      } catch (err) {
        const message = errorStatusHandler(err)
        setNotify({
          title: 'Error',
          message: `${message}`,
          close: setNotify
        })
      }
    }
  }

  const cancelarFormulario = useCallback(() => {
    setMostrarFormulario(false)
    setCirugiaEditando(null)
    setModoEdicion(false)
    resetForm()
  }, [resetForm])

  // Abrir modal para agregar nueva cirugía
  const abrirModalAgregar = useCallback(() => {
    resetForm()
    setModoEdicion(false)
    setMostrarFormulario(true)
  }, [resetForm])

  // Abrir modal para ver detalles
  const abrirModalDetalle = useCallback((cirugia) => {
    setCirugiaDetalle({
      ...cirugia,
      nombre: cirugia.nom_ser,
      descripcion: cirugia.des_ser,
      precio: cirugia.pre_ser,
      disponible: cirugia.sta_ser === "DISPONIBLE",
      duracion: "45-60 minutos", // Valor de ejemplo
      categoria: "General", // Valor de ejemplo
      preparacion: "Ayuno de 12 horas antes del procedimiento", // Valor de ejemplo
      recomendaciones: cirugia.tec_des_ser,
      complicaciones: cirugia.com_cir
    })
    setMostrarDetalle(true)
  }, [])

  // Abrir modal para editar
  const abrirModalEditar = useCallback((cirugia) => {
    editarCirugia(cirugia)
  }, [editarCirugia])

  // Formatear precio
  const formatearPrecio = useCallback((precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(precio || 0)
  }, [])

  // Cambiar estado de disponibilidad
  const cambiarEstado = useCallback(async (id, e) => {
    e.stopPropagation()
    try {
      const cirugia = cirugias.find(c => c.id_ser === id)
      const nuevoEstado = cirugia.sta_ser === "DISPONIBLE" ? "NO DISPONIBLE" : "DISPONIBLE"

      await ModifyData(`${mainUrl}/modify`, {
        id_ser: id,
        sta_ser: nuevoEstado
      })

      fetchCirugias()
    } catch (err) {
      const message = errorStatusHandler(err)
      setNotify({
        title: 'Error',
        message: `${message}`,
        close: setNotify
      })
    }
  }, [mainUrl, cirugias, fetchCirugias])

  return (
    <main className="contenedor-cirugia">
      <NavBarAdmin />
      <section className="tablero-admin">
        {/* Encabezado */}
        {admin ?(<HeaderAdmin URL={URL} />):(<HeaderUser />)}
        <ServicesContainer 
          Name={"Cirugias"}
          TitleIcon={Activity}
          title={'Servicios de Cirugía'}
          subTitle="Gestión completa de procedimientos quirúrgicos veterinarios"
          filters={categorias}
          headers={{
            nom: 'nom_ser',
            des: 'des_ser',
            cat: 'nom_cat',
            sta: 'sta_ser',
            pri: 'pre_ser',
            cod: 'id_ser',
          }}
          SearchHeaders={['nom_cat']}
          datas={cirugias}
          OpenCreate={abrirModalAgregar}
          OpenDetails={abrirModalDetalle}
          OpenEdit={abrirModalEditar}
          Delete={eliminarCirugia}
          ChangeState={cambiarEstado}
        />

        {/* Modal Agregar/Editar */}
        {mostrarFormulario && (
          <aside className="overlay-cirugia">
            <aside className="formulario-cirugia">
              <div className="header-modal-cirugia">
                <h3 className="titulo-formulario-cirugia">
                  {modoEdicion ? "Editar Cirugía" : "Agregar Nueva Cirugía"}
                </h3>
                <button onClick={cancelarFormulario} className="boton-cerrar-cirugia">
                  <X className="icon" />
                </button>
              </div>

              <form onSubmit={modoEdicion ? actualizarCirugia : agregarCirugia}>
                <div className="campo-cirugia">
                  <label>Nombre de la Cirugía</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formRef.current.nombre}
                    onChange={manejarCambioFormulario}
                    placeholder="Ej: Esterilización"
                    required
                  />
                </div>

                <div className="campo-cirugia">
                  <label>Descripción</label>
                  <textarea
                    name="descripcion"
                    value={formRef.current.descripcion}
                    onChange={manejarCambioFormulario}
                    placeholder="Descripción del procedimiento quirúrgico"
                    required
                  />
                </div>

                <div className="campo-cirugia">
                  <label>Precio (COP)</label>
                  <input
                    type="number"
                    name="precio"
                    value={formRef.current.precio}
                    onChange={manejarCambioFormulario}
                    placeholder="Ej: 150000"
                    required
                  />
                </div>

                <div className="campo-cirugia">
                  <label>Fecha de Cirugía</label>
                  <input
                    type="date"
                    name="fechaCirugia"
                    value={formRef.current.fechaCirugia}
                    onChange={manejarCambioFormulario}
                  />
                </div>

                <div className="campo-cirugia">
                  <label>Descripción Breve</label>
                  <textarea
                    name="descripcionBreve"
                    value={formRef.current.descripcionBreve}
                    onChange={manejarCambioFormulario}
                    placeholder="Descripción breve del procedimiento"
                  />
                </div>

                <div className="campo-cirugia">
                  <label>Resultado Esperado</label>
                  <textarea
                    name="resultadoEsperado"
                    value={formRef.current.resultadoEsperado}
                    onChange={manejarCambioFormulario}
                    placeholder="Resultado esperado de la cirugía"
                  />
                </div>

                <div className="campo-cirugia">
                  <label>Complicaciones Posibles</label>
                  <textarea
                    name="complicaciones"
                    value={formRef.current.complicaciones}
                    onChange={manejarCambioFormulario}
                    placeholder="Posibles complicaciones del procedimiento"
                  />
                </div>

                <div className="campo-cirugia">
                  <label>Recomendaciones Post-operatorias</label>
                  <textarea
                    name="recomendaciones"
                    value={formRef.current.recomendaciones}
                    onChange={manejarCambioFormulario}
                    placeholder="Cuidados después de la cirugía"
                  />
                </div>

                <div className="campo-cirugia">
                  <label>Observaciones</label>
                  <textarea
                    name="observaciones"
                    value={formRef.current.observaciones}
                    onChange={manejarCambioFormulario}
                    placeholder="Observaciones adicionales"
                  />
                </div>

                <div className="campo-checkbox-cirugia">
                  <label>
                    <input
                      type="checkbox"
                      name="disponible"
                      checked={formRef.current.disponible}
                      onChange={manejarCambioFormulario}
                    />
                    Disponible
                  </label>
                </div>

                <div className="botones-formulario-cirugia">
                  <button type="submit" className="boton-guardar-cirugia">
                    {modoEdicion ? "Actualizar" : "Agregar"}
                  </button>
                  <button type="button" onClick={cancelarFormulario} className="boton-cancelar-cirugia">
                    Cancelar
                  </button>
                </div>
              </form>
            </aside>
          </aside>
        )}

        {/* Modal Detalle */}
        {mostrarDetalle && cirugiaDetalle && (
          <aside className="modal-fondo-cirugia">
            <aside className="modal-detalle-cirugia">
              <div className="modal-encabezado-cirugia">
                <h3 className="titulo-modal-cirugia">{cirugiaDetalle.nombre}</h3>
                <button onClick={() => setMostrarDetalle(false)} className="cerrar-modal-cirugia">
                  <X className="icon" />
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
                      className={`valor-metrica-cirugia ${cirugiaDetalle.disponible ? "texto-verde-cirugia" : "texto-rojo-cirugia"
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
                      <FileText className="icono-seccion-cirugia icon" />
                      <h4 className="titulo-seccion-cirugia">Descripción</h4>
                    </div>
                    <p className="texto-seccion-cirugia">{cirugiaDetalle.descripcion}</p>
                  </div>

                  <div className="seccion-detalle-cirugia">
                    <div className="encabezado-seccion-cirugia">
                      <Target className="icono-seccion-cirugia icon" />
                      <h4 className="titulo-seccion-cirugia">Preparación</h4>
                    </div>
                    <p className="texto-seccion-cirugia">{cirugiaDetalle.preparacion}</p>
                  </div>

                  <div className="seccion-detalle-cirugia">
                    <div className="encabezado-seccion-cirugia">
                      <AlertTriangle className="icono-seccion-cirugia icon" />
                      <h4 className="titulo-seccion-cirugia">Complicaciones</h4>
                    </div>
                    <p className="texto-seccion-cirugia">{cirugiaDetalle.complicaciones}</p>
                  </div>

                  <div className="seccion-detalle-cirugia">
                    <div className="encabezado-seccion-cirugia">
                      <Clock className="icono-seccion-cirugia icon" />
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
            </aside>
          </aside>
        )}
      </section>
      {notify && (
        <Notification
          {...notify}
        />
      )}
    </main>
  )
}