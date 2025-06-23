// Librarys 
import { useContext, useState, useEffect, useCallback, useRef } from "react"
import { Syringe, X, Clock, AlertTriangle, FileText, Target } from "lucide-react"

// Imports 
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import { HeaderUser } from '../../BarrasNavegacion/HeaderUser'
import { HeaderAdmin } from '../../BarrasNavegacion/HeaderAdmin'
import { Notification } from '../../Global/Notifys'
import { GetData, PostData, ModifyData } from "../../Varios/Requests"
import { errorStatusHandler } from '../../Varios/Util'
import { ServicesContainer } from "../../Global/Services"
import { AuthContext } from "../../../Contexts/Contexts"

// Import styles 
import "../../../styles/InterfazAdmin/Servicios/Vacuna.css"

// Component 
export function VisualizadorVacunas({ URL = '' }) {
  const [vacunas, setVacunas] = useState([])
  const [modalAbierto, setModalAbierto] = useState(false)
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false)
  const [vacunaDetalle, setVacunaDetalle] = useState(null)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [vacunaEditando, setVacunaEditando] = useState(null)
  const [notify, setNotify] = useState(null)
  const didFetch = useRef(false)
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

  // Vars 
  const { admin } = useContext(AuthContext)
  const mainUrl = `${URL}/service`
  const categorias = ["Obligatoria", "Esencial", "Recomendada", "Opcional"]

  // Función para obtener las vacunas del backend
  const fetchVacunas = useCallback(async () => {
    if (didFetch.current) return
    didFetch.current = true

    setNotify({
      title: 'Cargando',
      message: 'Cargando vacunas, por favor espere...',
      load: 1
    })

    try {
      const response = await GetData(`${mainUrl}/vacs`)
      setNotify(null)

      if (response && Array.isArray(response)) {
        // Mapeamos los datos del backend al formato que espera el frontend
        const vacunasMapeadas = response.map(vacuna => ({
          id: vacuna.id_vac,
          id_ser: vacuna.id_ser,
          nombre: vacuna.nom_vac,
          descripcion: vacuna.des_ser,
          descripcionTecnica: vacuna.tec_des_ser,
          precio: vacuna.pre_ser,
          frecuencia: vacuna.fre_vac,
          tipoAnimal: "perro", // Asumimos perro por defecto (ajustar según tu BD)
          disponible: vacuna.sta_ser,
          categoria: vacuna.cat_vac,
          efectosSecundarios: vacuna.efe_sec_vac,
          lote: vacuna.lot_vac,
          fechaVencimiento: vacuna.fec_ven_vac,
          dosis: {
            cachorro: vacuna.dos_rec_vac,
            adulto: vacuna.dos_rec_vac,
            senior: vacuna.dos_rec_vac
          }
        }))

        setVacunas(vacunasMapeadas)
      } else {
        setNotify({
          title: 'Error',
          message: 'No se encontraron vacunas',
          close: setNotify
        })
      }
    } catch (err) {
      setNotify(null)
      const message = errorStatusHandler(err)
      setNotify({
        title: 'Error',
        message: `${message}`,
        close: setNotify
      })
    }
  }, [mainUrl])

  useEffect(() => {
    fetchVacunas()
  }, [fetchVacunas])

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(precio)
  }

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
    setNuevaVacuna({...vacuna})
    setVacunaEditando(vacuna.id)
    setModoEdicion(true)
    setModalAbierto(true)
  }

  const guardarVacuna = async () => {
    if (nuevaVacuna.nombre && nuevaVacuna.precio > 0) {
      try {
        setNotify({
          title: 'Guardando',
          message: 'Guardando vacuna...',
          load: 1
        })

        const vacunaData = {
          nom_vac: nuevaVacuna.nombre,
          des_gen: nuevaVacuna.descripcion || '', 
          des_tec: nuevaVacuna.descripcionTecnica || '',
          pre_vac: Number(nuevaVacuna.precio), 
          fre_vac: nuevaVacuna.frecuencia || '',
          cat_vac: nuevaVacuna.categoria || 'Esencial',
          num_lot: nuevaVacuna.lote || '',
          fec_ven: nuevaVacuna.fechaVencimiento || new Date().toISOString().split('T')[0],
          efe_sec: nuevaVacuna.efectosSecundarios || '',
          dos_rec: nuevaVacuna.dosis?.cachorro || '',
          sta_ser: nuevaVacuna.disponible ? "DISPONIBLE" : "NO-DISPONIBLE"
        }

        console.log('Datos a enviar:', vacunaData)

        if (modoEdicion) {
          if (!vacunaEditando) {
            throw new Error('ID de vacuna no especificado para edición')
          }
          await ModifyData(`${mainUrl}/modifyVac`, {
            id_vac: vacunaEditando,
            ...vacunaData
          })
        } else {
          await PostData(`${mainUrl}/register/vac`, vacunaData)
        }

        setNotify({
          title: 'Éxito',
          message: `Vacuna ${modoEdicion ? 'actualizada' : 'agregada'} correctamente`,
          close: setNotify
        })

        setModalAbierto(false)
        await fetchVacunas() 

      } catch (err) {
        setNotify(null)
        console.error('Error al guardar vacuna:', err)

        const message = err.status
          ? errorStatusHandler(err.status)
          : err.message || `No se pudo ${modoEdicion ? 'actualizar' : 'agregar'} la vacuna`

        setNotify({
          title: 'Error',
          message: message,
          close: setNotify
        })
      }
    } else {
      const message = errorStatusHandler(err)
      setNotify({
        title: 'Error',
        message: `${message}`,
        close: setNotify
      })
    }
  }

  const eliminarVacuna = (id) => {
    setNotify({
      title: 'Atencion',
      message: '¿Estás seguro de que deseas eliminar esta vacuna?',
      firstOption: () => {setNotify(null); return},
      secondOption: () => {setNotify(null); deleteVac(id)},
      firstOptionName: 'Cancelar',
      secondOptionName: 'Continuar',
    })
    const deleteVac = async (id) => {
      try {
        setNotify({
          title: 'Eliminando',
          message: 'Eliminando vacuna...',
          load: 1
        })

        await ModifyData(`${mainUrl}/delete/vac`, { id_vac: id })

        setNotify({
          title: 'Éxito',
          message: 'Vacuna eliminada correctamente',
          close: setNotify
        })

        fetchVacunas()
      } catch (err) {
        setNotify(null)
        const message = errorStatusHandler(err)
        setNotify({
          title: 'Error',
          message: `${message}`,
          close: setNotify
        })
      }
    }
  }

  const abrirModalDetalle = (vacuna) => {
    setVacunaDetalle(vacuna)
    setModalDetalleAbierto(true)
  }


  const cambiarEstado = (cod,state) => {
    setNotify({
      title: 'Atencion',
      message: `¿Seguro que deseas cambiar esta vacuna de ${state === "DISPONIBLE" ? "Disponible" : "No disponible"} a ${state === "DISPONIBLE" ? "No disponible" : "Disponible"}?`,
      firstOption: () => {setNotify(null); return},
      secondOption: () => {setNotify(null); change(cod,state)},
      firstOptionName: 'Cancelar',
      secondOptionName: 'Continuar',
    })

    const change = async (id_ser, estadoActual) => {
      try {
        setNotify({
          title: 'Actualizando',
          message: 'Cambiando estado de la vacuna...',
          load: 1
        })
        // Enviamos los datos en el formato que espera el backend
        const data = {
          data: {
            id_ser: id_ser,
            or: estadoActual === "DISPONIBLE" 
          }
        }
        await ModifyData(`${mainUrl}/AblOrDis`, data)
        fetchVacunas()
        setNotify({
          title: 'Éxito',
          message: `Estado de la vacuna actualizado correctamente`,
          close: setNotify
        })
        
      } catch (err) {
        setNotify(null)
        const message = errorStatusHandler(err)
        setNotify({
          title: 'Error',
          message: message,
          close: setNotify
        })
      }
    }
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

  return (
    <main className="contenedor-vacunas">
      <NavBarAdmin />
      
      <section className="tablero-admin">
        {admin? (<HeaderAdmin URL={URL} />):(<HeaderUser />)}
        <ServicesContainer 
          Name="Vacuna"
          TitleIcon={Syringe}
          title="Servicios de Vacunación"
          titleDes=""
          subTitle="Vacunas Disponibles"
          headers={{
            nom: 'nombre',
            des: 'descripcion',
            cat: 'categoria',
            sta: 'disponible',
            pri: 'precio',
            cod: 'id_ser',
          }}
          datas={vacunas}
          filters={categorias}
          SearchHeaders={['categoria']}
          OpenCreate={abrirModalAgregar}
          OpenDetails={abrirModalDetalle}
          OpenEdit={abrirModalEditar}
          Delete={eliminarVacuna}
          ChangeState={cambiarEstado}
        />
        <div className="tarjetagesusuario">
            {/* Modal Agregar/Editar */}
            {modalAbierto && (
              <aside className="modal-fondo-vacunas">
                <section className="modal-vacunas">
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
                            required
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
                            required
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
                            required
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
                              required
                              min="0"
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
                              required
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
                              required
                            />
                          </div>
                          <div className="campo-vacunas">
                            <label className="etiqueta-campo-vacunas">Fecha de Vencimiento</label>
                            <input
                              type="date"
                              value={nuevaVacuna.fechaVencimiento}
                              onChange={(e) => setNuevaVacuna({ ...nuevaVacuna, fechaVencimiento: e.target.value })}
                              className="input-vacunas"
                              required
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
                            required
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
                              required
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
                              required
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
                              required
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
                      <button type="button" onClick={guardarVacuna} className="boton-guardar-vacunas">
                        {modoEdicion ? "Actualizar" : "Agregar"}
                      </button>
                      <button type="button" onClick={() => setModalAbierto(false)} className="boton-cancelar-vacunas">
                        Cancelar
                      </button>
                    </div>
                  </div>
                </section>
              </aside>
            )}

            {/* Modal Detalle */}
            {modalDetalleAbierto && vacunaDetalle && (
              <aside className="modal-fondo-vacunas">
                <section className="modal-detalle-vacunas">
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
                          className={`valor-metrica-vacunas ${vacunaDetalle.disponible ? "texto-verde-vacunas" : "texto-rojo-vacunas"
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
                </section>
              </aside>
            )}
          </div>
        
      </section>
      {notify && <Notification {...notify} />}
    </main>
  )
}