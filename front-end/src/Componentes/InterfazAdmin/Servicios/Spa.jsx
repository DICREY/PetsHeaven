// Librarys 
import { useContext, useEffect, useRef, useState } from "react"
import { Bath, X, Heart, Sparkles, Target, FileText } from "lucide-react"

// Imports 
import { HeaderAdmin } from '../../BarrasNavegacion/HeaderAdmin'
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import { AuthContext } from "../../../Contexts/Contexts"
import { ServicesContainer } from "../../Global/Services"
import { Notification } from "../../Global/Notifys"
import { ServicesDetails } from "./Forms/Forms"
import { formatPrice } from "../../../Utils/Utils"
import { GetData, ModifyData } from "../../Varios/Requests"
import { errorStatusHandler } from "../../Varios/Util"

// Import styles 
import "../../../styles/InterfazAdmin/Servicios/Spa.css"

// Component
export const SpaMascotas = ({ URL = '' }) => {
  // Dynamic vars 
  const [ mostrarFormulario, setMostrarFormulario ] = useState(false)
  const [ mostrarDetalle, setMostrarDetalle ] = useState(false)
  const [ notify, setNotify ] = useState()
  const [ servicioDetalle, setServicioDetalle ] = useState(null)
  const [ servicioEditando, setServicioEditando ] = useState(null)
  const [ modoEdicion, setModoEdicion ] = useState(false)
  const [ services, setServices ] = useState()
  const [ nuevoServicio, setNuevoServicio ] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    beneficios: "",
    duracion: "",
    recomendaciones: "",
    precio: "",
    disponible: true,
    categoria: "Higiene",
    tipoAnimal: "ambos",
    productos: "",
    frecuencia: "",
  })

  // Vars 
  const categorias = ["Higiene", "Estética", "Salud", "Terapéutico", "Relajación", "Especial"]
  const { admin } = useContext(AuthContext)
  const didFetch = useRef(false)
  const mainUrl = `${URL}/service`

  const abrirModalAgregar = () => {
    setNuevoServicio({
      id: "",
      nombre: "",
      descripcion: "",
      beneficios: "",
      duracion: "",
      recomendaciones: "",
      precio: "",
      disponible: true,
      categoria: "Higiene",
      tipoAnimal: "ambos",
      productos: "",
      frecuencia: "",
    })
    setModoEdicion(false)
    setMostrarFormulario(true)
  }

  const abrirModalEditar = (servicio) => {
    setNuevoServicio({ ...servicio, precio: servicio.precio.toString() })
    setServicioEditando(servicio.id)
    setModoEdicion(true)
    setMostrarFormulario(true)
  }

  const abrirModalDetalle = (servicio) => {
    setServicioDetalle({
      ...servicio,
      nombre: servicio.nom_ser,
      descripcion: servicio.des_ser,
      descripcionPro: servicio.des_pro_ser,
      precio: servicio.pre_act_ser,
      disponible: servicio.sta_ser === "DISPONIBLE",
      duracion:  `${servicio.dur_min_tip_ser || 0} horas`,
      categoria: servicio.nom_cat,
      preparacion: servicio.des_tip_ser,
      recomendaciones: servicio.tec_des_ser,
      complicaciones: servicio.req,
      equipo: servicio.req_equ_esp?'Si aplica':'No aplica',
      procedimientos: servicio.proc_ser,
      min: `${formatPrice(servicio.pre_ser) || 0.0}`,
    })
    setMostrarDetalle(true)
  }

  const guardarServicio = () => {
    if (nuevoServicio.nombre && nuevoServicio.precio > 0) {
      if (modoEdicion) {
        setServices(
          services.map((s) =>
            s.id === servicioEditando ? { ...nuevoServicio, precio: Number(nuevoServicio.precio) } : s,
          ),
        )
      } else {
        setServices([...services, { ...nuevoServicio, precio: Number(nuevoServicio.precio) }])
      }
      setMostrarFormulario(false)
    }
  }

  const ChangeState = (data) => {
    setNotify({
      title: 'Atencion',
      message: `¿Deseas ${data.sta_ser? "desactivar" : "activar"} este servicio estetico?`,
      firstOption: () => {setNotify(null); return},
      secondOption: () => {setNotify(null); DeleteService(data.id_ser)},
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
        const deleted = await ModifyData(`${mainUrl}/AblOrDis`, { id: id_ser, nom_cat: 'Estetica' })
        setNotify(null)
        if (deleted.success) {
          didFetch.current = false // Reset fetch state to allow refetch
          GetEsthetic() 
          setNotify({
              title: `${data.sta_ser === "DISPONIBLE" ? 'Desactivación' : 'Activación'} exitosa`,
              message: `El servicio estetico ha sido ${data.sta_ser === "DISPONIBLE" ? 'desactivado' : 'activado'} exitosamente`,
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

  const GetEsthetic = async () => {
    if (didFetch.current) return
    didFetch.current = true

    setNotify({
      title: 'Cargando',
      message: 'Cargando servicios esteticos, por favor espere...',
      load: 1
    })

    try {
      let data = await GetData(`${mainUrl}/esthetic`)
      setNotify(null)
      if (data) setServices(data)
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
    GetEsthetic()
  }, [])

  return (
    <main className="contenedoradminhome">
      <NavBarAdmin/>
      <section className="tablero-admin">
        <HeaderAdmin URL={URL} />
        <ServicesContainer 
          TitleIcon={Bath}
          title="Servicios de Spa y Cuidado"
          titleDes='Tratamientos de belleza y bienestar para tu mascota'
          subTitle="Tratamientos Disponibles"
          Name="Tratamiento"
          datas={services}
          filters={categorias}
          headers={{
            nom: 'nom_ser',
            des: 'des_ser',
            cat: 'nom_cat',
            sta: 'sta_ser',
            pri: 'pre_ser',
            cod: 'id_ser',
            time: 'dur_min_tip_ser',
            alert: 'des_tip_ser'
          }}
          SearchHeaders={['nom_cat']}
          OpenCreate={abrirModalAgregar}
          OpenDetails={abrirModalDetalle}
          OpenEdit={abrirModalEditar}
          Delete={ChangeState}
          ChangeState={ChangeState}
        />

        {/* Modal Agregar/Editar */}
        {mostrarFormulario && (
          <aside className="modal-fondo-spa">
            <section className="modal-spa">
              <div className="modal-encabezado-spa">
                <h3 className="titulo-modal-spa">{modoEdicion ? "Editar Servicio" : "Agregar Nuevo Servicio"}</h3>
                <button onClick={() => setMostrarFormulario(false)} className="cerrar-modal-spa">
                  <X className="icon" />
                </button>
              </div>
              <div className="formulario-spa">
                <div className="seccion-formulario-spa">
                  <h4 className="titulo-seccion-formulario">Información General</h4>
                  <div className="campos-formulario-spa">
                    <div className="campos-dobles-spa">
                      <div className="campo-spa">
                        <label className="etiqueta-campo-spa">ID Servicio</label>
                        <input
                          type="text"
                          value={nuevoServicio.id}
                          onChange={(e) => setNuevoServicio({ ...nuevoServicio, id: e.target.value })}
                          className="input-spa"
                          disabled={modoEdicion}
                          placeholder="Ej: SPA001"
                        />
                      </div>
                      <div className="campo-spa">
                        <label className="etiqueta-campo-spa">Nombre del Servicio</label>
                        <input
                          type="text"
                          value={nuevoServicio.nombre}
                          onChange={(e) => setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })}
                          className="input-spa"
                          placeholder="Ej: Baño Completo"
                        />
                      </div>
                    </div>
                    <div className="campo-spa">
                      <label className="etiqueta-campo-spa">Descripción</label>
                      <textarea
                        value={nuevoServicio.descripcion}
                        onChange={(e) => setNuevoServicio({ ...nuevoServicio, descripcion: e.target.value })}
                        className="textarea-spa"
                        rows={2}
                        placeholder="Descripción del servicio de spa"
                      />
                    </div>
                  </div>
                </div>

                <div className="seccion-formulario-spa">
                  <h4 className="titulo-seccion-formulario">Detalles y Clasificación</h4>
                  <div className="campos-formulario-spa">
                    <div className="campos-dobles-spa">
                      <div className="campo-spa">
                        <label className="etiqueta-campo-spa">Precio (COP)</label>
                        <input
                          type="number"
                          value={nuevoServicio.precio}
                          onChange={(e) => setNuevoServicio({ ...nuevoServicio, precio: e.target.value })}
                          className="input-spa"
                          placeholder="Ej: 45000"
                        />
                      </div>
                      <div className="campo-spa">
                        <label className="etiqueta-campo-spa">Duración</label>
                        <input
                          type="text"
                          value={nuevoServicio.duracion}
                          onChange={(e) => setNuevoServicio({ ...nuevoServicio, duracion: e.target.value })}
                          className="input-spa"
                          placeholder="Ej: 45-60 minutos"
                        />
                      </div>
                    </div>
                    <div className="campos-dobles-spa">
                      <div className="campo-spa">
                        <label className="etiqueta-campo-spa">Tipo de Animal</label>
                        <select
                          value={nuevoServicio.tipoAnimal}
                          onChange={(e) => setNuevoServicio({ ...nuevoServicio, tipoAnimal: e.target.value })}
                          className="select-spa"
                        >
                          <option value="perro">Perro</option>
                          <option value="gato">Gato</option>
                          <option value="ambos">Ambos</option>
                        </select>
                      </div>
                      <div className="campo-spa">
                        <label className="etiqueta-campo-spa">Categoría</label>
                        <select
                          value={nuevoServicio.categoria}
                          onChange={(e) => setNuevoServicio({ ...nuevoServicio, categoria: e.target.value })}
                          className="select-spa"
                        >
                          {categorias.map((categoria) => (
                            <option key={categoria} value={categoria}>
                              {categoria}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="campos-dobles-spa">
                      <div className="campo-spa">
                        <label className="etiqueta-campo-spa">Frecuencia Recomendada</label>
                        <input
                          type="text"
                          value={nuevoServicio.frecuencia}
                          onChange={(e) => setNuevoServicio({ ...nuevoServicio, frecuencia: e.target.value })}
                          className="input-spa"
                          placeholder="Ej: Cada 3-4 semanas"
                        />
                      </div>
                      <div className="campo-spa">
                        <label className="etiqueta-campo-spa">Productos Utilizados</label>
                        <input
                          type="text"
                          value={nuevoServicio.productos}
                          onChange={(e) => setNuevoServicio({ ...nuevoServicio, productos: e.target.value })}
                          className="input-spa"
                          placeholder="Ej: Champú hipoalergénico"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="seccion-formulario-spa">
                  <h4 className="titulo-seccion-formulario">Información de Bienestar</h4>
                  <div className="campos-formulario-spa">
                    <div className="campo-spa">
                      <label className="etiqueta-campo-spa">Beneficios</label>
                      <textarea
                        value={nuevoServicio.beneficios}
                        onChange={(e) => setNuevoServicio({ ...nuevoServicio, beneficios: e.target.value })}
                        className="textarea-spa"
                        rows={2}
                        placeholder="Beneficios del tratamiento"
                      />
                    </div>
                    <div className="campo-spa">
                      <label className="etiqueta-campo-spa">Recomendaciones</label>
                      <textarea
                        value={nuevoServicio.recomendaciones}
                        onChange={(e) => setNuevoServicio({ ...nuevoServicio, recomendaciones: e.target.value })}
                        className="textarea-spa"
                        rows={2}
                        placeholder="Recomendaciones para el cuidado"
                      />
                    </div>
                    <div className="campo-checkbox-spa">
                      <input
                        type="checkbox"
                        checked={nuevoServicio.disponible}
                        onChange={(e) => setNuevoServicio({ ...nuevoServicio, disponible: e.target.checked })}
                        className="checkbox-spa"
                      />
                      <label className="etiqueta-checkbox-spa">Disponible</label>
                    </div>
                  </div>
                </div>

                <div className="botones-formulario-spa">
                  <button onClick={guardarServicio} className="boton-guardar-spa">
                    {modoEdicion ? "Actualizar" : "Agregar"}
                  </button>
                  <button onClick={() => setMostrarFormulario(false)} className="boton-cancelar-spa">
                    Cancelar
                  </button>
                </div>
              </div>
            </section>
          </aside>
        )}

        {/* Modal Detalle */}
        {mostrarDetalle && servicioDetalle && (
          <ServicesDetails
            mostrarDetalle={mostrarDetalle}
            setMostrarDetalle={() => setMostrarDetalle(null)}
            infoDetails={servicioDetalle}
          />
        )}
        {/* {mostrarDetalle && servicioDetalle && (
          <aside className="modal-fondo-spa">
            <section className="modal-detalle-spa">
              <header className="modal-encabezado-spa">
                <h3 className="titulo-modal-spa">{servicioDetalle.nombre}</h3>
                <button onClick={() => setMostrarDetalle(false)} className="cerrar-modal-spa">
                  <X className="icon" />
                </button>
              </header>
              <section className="contenido-detalle-spa">
                <div className="metricas-principales-spa">
                  <div className="metrica-spa">
                    <div className="valor-metrica-spa">{formatPrice(servicioDetalle.precio)}</div>
                    <div className="etiqueta-metrica-spa">Precio</div>
                  </div>
                  <div className="metrica-spa">
                    <div className="valor-metrica-spa">{servicioDetalle.duracion}</div>
                    <div className="etiqueta-metrica-spa">Duración</div>
                  </div>
                  <div className="metrica-spa">
                    <div className="valor-metrica-spa">{servicioDetalle.categoria}</div>
                    <div className="etiqueta-metrica-spa">Categoría</div>
                  </div>
                  <div className="metrica-spa">
                    <div
                      className={`valor-metrica-spa ${
                        servicioDetalle.disponible ? "texto-verde-spa" : "texto-rojo-spa"
                      }`}
                    >
                      {servicioDetalle.disponible ? "SÍ" : "NO"}
                    </div>
                    <div className="etiqueta-metrica-spa">Disponible</div>
                  </div>
                </div>

                <div className="grid-detalle-spa">
                  <div className="seccion-detalle-spa">
                    <div className="encabezado-seccion-spa">
                      <FileText className="icono-seccion-spa icon" />
                      <h4 className="titulo-seccion-spa">Descripción</h4>
                    </div>
                    <p className="texto-seccion-spa">{servicioDetalle.descripcion}</p>
                  </div>

                  <div className="seccion-detalle-spa">
                    <div className="encabezado-seccion-spa">
                      <Heart className="icono-seccion-spa icon" />
                      <h4 className="titulo-seccion-spa">Beneficios</h4>
                    </div>
                    <p className="texto-seccion-spa">{servicioDetalle.beneficios}</p>
                  </div>

                  <div className="seccion-detalle-spa">
                    <div className="encabezado-seccion-spa">
                      <Sparkles className="icono-seccion-spa icon" />
                      <h4 className="titulo-seccion-spa">Productos</h4>
                    </div>
                    <p className="texto-seccion-spa">{servicioDetalle.productos}</p>
                  </div>

                  <div className="seccion-detalle-spa">
                    <div className="encabezado-seccion-spa">
                      <Target className="icono-seccion-spa icon" />
                      <h4 className="titulo-seccion-spa">Recomendaciones</h4>
                    </div>
                    <p className="texto-seccion-spa">{servicioDetalle.recomendaciones}</p>
                  </div>
                </div>

                <div className="info-adicional-spa">
                  <h4 className="titulo-info-adicional-spa">Información Adicional</h4>
                  <div className="contenedor-info-adicional-spa">
                    <div className="item-info-adicional-spa">
                      <span className="etiqueta-info-adicional-spa">Frecuencia:</span>
                      <span className="valor-info-adicional-spa">{servicioDetalle.frecuencia}</span>
                    </div>
                    <div className="item-info-adicional-spa">
                      <span className="etiqueta-info-adicional-spa">Tipo de Animal:</span>
                      <span className="valor-info-adicional-spa">
                        {servicioDetalle.tipoAnimal === "perro"
                          ? "Perros"
                          : servicioDetalle.tipoAnimal === "gato"
                            ? "Gatos"
                            : "Perros y gatos"}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </aside>
        )} */}
      </section>
      {notify && <Notification {...notify} />}
    </main>
  )
}