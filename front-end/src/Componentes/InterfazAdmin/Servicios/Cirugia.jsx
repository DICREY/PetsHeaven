// Librarys
import { useState, useRef, useEffect, useContext, useCallback } from "react"
import { Activity, X } from "lucide-react"

// Imports
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import { HeaderAdmin } from '../../BarrasNavegacion/HeaderAdmin'
import { errorStatusHandler } from '../../Varios/Util'
import { Notification } from '../../Global/Notifys'
import { GetData, PostData, ModifyData } from "../../Varios/Requests"
import { AuthContext } from "../../../Contexts/Contexts"
import { ServicesContainer } from '../../Global/Services'
import { FormularioServicio, ServicesDetails } from "./Forms/Forms"
import { formatPrice } from "../../../Utils/Utils"

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

  const agregarCirugia = useCallback(async (data) => {
    // e.preventDefault()
    try {
      setNotify({
        title: 'Guardando',
        message: 'Guardando cirugía...',
        load: 1
      })

      if (modoEdicion) {
        await ModifyData(`${mainUrl}/modify`, data)
      } else {
        await PostData(`${mainUrl}/register`, data)
      }
      
      didFetch.current = false // Reset fetch state to allow refetch
      GetEsthetic()
      setNotify({
        title: 'Éxito',
        message: `servicio ${modoEdicion ? 'actualizado' : 'agregado'} correctamente`,
        close: setNotify
      })

      setModalAbierto(false)

    } catch (err) {
      setNotify(null)
      const message = errorStatusHandler(err)
      setNotify({
        title: 'Error',
        message: message,
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

  // Cambiar estado de disponibilidad
  const DeactivateCir = (data) => {
    setNotify({
      title: 'Atencion',
      message: `¿Deseas ${data.sta_ser === "DISPONIBLE" ? "desactivar" : "activar"} esta cirugía?`,
      firstOption: () => {setNotify(null); return},
      secondOption: () => DeleteService(data.id_ser),
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
        const deleted = await ModifyData(`${mainUrl}/AblOrDis`, { id: id_ser, nom_cat: 'Cirugia' })
        setNotify(null)
        if (deleted.success) {
          didFetch.current = false // Reset fetch state to allow refetch
          fetchCirugias()
          setNotify({
              title: `${data.sta_ser === "DISPONIBLE" ? 'Desactivación' : 'Activación'} exitosa`,
              message: `La cirugía ha sido ${data.sta_ser === "DISPONIBLE" ? 'desactivada' : 'activada'} exitosamente`,
              close: setNotify
          })
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
      descripcionPro: cirugia.des_pro_ser,
      precio: cirugia.pre_act_ser,
      disponible: cirugia.sta_ser === "DISPONIBLE",
      duracion:  `${cirugia.dur_min_tip_ser || 0} horas`,
      categoria: cirugia.nom_cat,
      preparacion: cirugia.des_tip_ser,
      recomendaciones: cirugia.tec_des_ser,
      complicaciones: cirugia.req,
      equipo: cirugia.req_equ_esp?'Si aplica':'No aplica',
      procedimientos: cirugia.proc_ser || [],
      min: `${formatPrice(cirugia.pre_ser) || 0.0}`,
    })
    setMostrarDetalle(true)
  }, [])

  // Abrir modal para editar
  const abrirModalEditar = useCallback((cirugia) => {
    editarCirugia(cirugia)
  }, [editarCirugia])

  return (
    <main className="contenedoradminhome">
      <NavBarAdmin />
      <section className="tablero-admin">
        {/* Encabezado */}
        <HeaderAdmin URL={URL} />
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
            time: 'dur_min_tip_ser',
            alert: 'des_tip_ser',
          }}
          SearchHeaders={['nom_cat']}
          datas={cirugias}
          OpenCreate={abrirModalAgregar}
          OpenDetails={abrirModalDetalle}
          OpenEdit={abrirModalEditar}
          Delete={DeactivateCir}
          ChangeState={DeactivateCir}
        />

        {/* Modal Agregar/Editar */}
        {mostrarFormulario && (
          <FormularioServicio
            onGuardar={modoEdicion ? actualizarCirugia : agregarCirugia}
            onCancelar={cancelarFormulario}
            initialData={modoEdicion ? cirugiaEditando : {}}
            modoEdicion={modoEdicion}
            URL={URL}
            mainName="cirugía"
          />
        )}
        {/* {mostrarFormulario && (
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
        )} */}

        {/* Modal Detalle */}
        {mostrarDetalle && cirugiaDetalle && (
          <ServicesDetails
            mostrarDetalle={mostrarDetalle}
            setMostrarDetalle={() => setMostrarDetalle(null)}
            infoDetails={cirugiaDetalle}
            labels={{
              precio: "Precio Actual",
              frecuencia: "Duración",
              categoria: "Categoría",
              disponible: "Disponible",
              descripcion: "Descripción General",
              descripcionPro: "Descripción Técnica",
              efectosSecundarios: "Preparación",
              infoAdicional: "Información Adicional",
              lote: "Equipo requerido",
              vencimiento: "Precio anterior",
            }}
          />
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