// Librarys 
import React, { useContext, useEffect, useRef } from "react"
import { useState } from "react"
import { FlaskConical, X } from "lucide-react"

// Imports
import { ServicesContainer } from "../../Global/Services"
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import { HeaderAdmin } from '../../BarrasNavegacion/HeaderAdmin'
import { AuthContext } from "../../../Contexts/Contexts"
import { Notification } from "../../Global/Notifys"
import { ServicesDetails } from "./Forms/Forms"

// Import styles
import "../../../styles/InterfazAdmin/Servicios/Laboratorio.css"
import { GetData } from "../../Varios/Requests"
import { errorStatusHandler } from "../../Varios/Util"
import { formatPrice } from "../../../Utils/Utils"

// Component 
export const ExamenesLaboratorio = ({ URL= '' }) => {
  // Dynamic vars 
  const [ mostrarFormulario, setMostrarFormulario ] = useState(false)
  const [ mostrarDetalle, setMostrarDetalle ] = useState(false)
  const [ examenDetalle, setExamenDetalle ] = useState(null)
  const [ examenEditando, setExamenEditando ] = useState(null)
  const [ modoEdicion, setModoEdicion ] = useState(false)
  const [ notify, setNotify ] = useState(false)
  const [ examenes, setExamenes ] = useState()
  const [ nuevoExamen, setNuevoExamen ] = useState({
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
  // const [examenes, setExamenes] = useState([
  //   {
  //     id: "LAB006",
  //     nombre: "Cultivo Bacteriano",
  //     descripcion: "Identificación de bacterias patógenas y prueba de sensibilidad a antibióticos.",
  //     tipoExamen: "Microbiología",
  //     tiempoResultados: "48-72 horas",
  //     preparacionRequerida: "Muestra estéril antes de iniciar antibióticos",
  //     metodologia: "Cultivo en medios selectivos y antibiograma",
  //     valoresReferencia: "Identificación de patógenos y sensibilidad antibiótica",
  //     indicaciones: "Infecciones persistentes, selección de antibiótico",
  //     precio: 95000,
  //     disponible: true,
  //     categoria: "Microbiología",
  //     tipoAnimal: "ambos",
  //     equipoRequerido: "Incubadora, medios de cultivo, autoclave",
  //     muestra: "Según sitio de infección (orina, sangre, herida)",
  //   },
  // ])

  // Vars 
  const { admin } = useContext(AuthContext)
  const didFetch = useRef(false)
  const mainUrl = `${URL}/service`
  const categorias = [
    "Hematología",
    "Bioquímica",
    "Urología",
    "Endocrinología",
    "Parasitología",
    "Microbiología",
    "Inmunología",
  ]

  // Functions 
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
    console.log(examen)
    setExamenDetalle({
      ...examen,
      nombre: examen.nom_tip_pru,
      descripcion: examen.des_tip_pru,
      descripcionPro: examen.des_pro_pru,
      precio: examen.pre_act_ser,
      disponible: examen.sta_pru_lab,
      duracion:  examen.time,
      categoria: examen.cat_tip_pru,
      preparacion: examen.des_tip_pru,
      recomendaciones: examen.tec_des_pru,
      complicaciones: examen.req,
      equipo: examen.req_equ_esp?'Si aplica':'No aplica',
      procedimientos: examen.proc_ser,
      min: `${formatPrice(examen.pre_ser) || 0.0}`,
    })
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

  const ChangeState = (data) => {
    setNotify({
      title: 'Atencion',
      message: '¿Estás seguro de que deseas eliminar esta vacuna?',
      firstOption: () => {setNotify(null); return},
      secondOption: () => {setNotify(null); DeleteService(data.id)},
      firstOptionName: 'Cancelar',
      secondOptionName: 'Continuar',
    })
    const DeleteService = async (id) => {
      setExamenes(examenes.filter((e) => e.id !== id))
    }
  }

  const GetLaboratory = async () => {
    if (didFetch.current) return
    didFetch.current = true

    setNotify({
      title: 'Cargando',
      message: 'Cargando servicios de laboratorio, por favor espere...',
      load: 1
    })

    try {
      let data = await GetData(`${mainUrl}/laboratory`)
      setNotify(null)
      if (data) {
        const mapData = data.map((examen) => { 
          return {
            ...examen,
            time: `${examen.tie_est_hrs_tip_pru} horas`,
            state: examen.est_tip_pru === 'CANCELADO'? 0 : 1,
          }
        })
        setExamenes(mapData)
      }
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
  }

  useEffect(() => {
    GetLaboratory()
  }, [])

  return (
    <main className="contenedoradminhome">
      <NavBarAdmin />
      <main className="tablero-admin">
        <HeaderAdmin URL={URL} />
        <ServicesContainer 
          Name="Examén"
          TitleIcon={FlaskConical}
          title={'Servicios de Laboratorio'}
          subTitle="Exámenes Disponibles"
          filters={categorias}
          headers={{
            nom: 'nom_tip_pru',
            des: 'des_tip_pru',
            cat: 'cat_tip_pru',
            sta: 'state',
            pri: 'cos_est_tip_pru',
            cod: 'cod_ord_pru_lab',
            time: 'time',
            alert: 'met_est_tip_pru',
          }}
          SearchHeaders={['categoria']}
          OpenDetails={abrirModalDetalle}
          OpenCreate={abrirModalAgregar}
          OpenEdit={abrirModalEditar}
          Delete={ChangeState}
          ChangeState={ChangeState}
          datas={examenes}
        />
        {/* Modal Agregar/Editar */}
        {mostrarFormulario && (
          <aside className="modal-fondo-laboratorio" role="dialog" aria-modal="true" aria-labelledby="titulo-modal">
            <section className="modal-laboratorio">
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
            </section>
          </aside>
        )}

        {/* Modal Detalle */}
        {mostrarDetalle && examenDetalle && (
          <ServicesDetails
            infoDetails={examenDetalle}
            mostrarDetalle={mostrarDetalle}
            setMostrarDetalle={() => setMostrarDetalle(null)}
          />
        )}
      </main>
      {notify && <Notification {...notify} />}
    </main>
  )
}
