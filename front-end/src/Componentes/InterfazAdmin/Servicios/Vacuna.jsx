// Librarys 
import { useContext, useState, useEffect, useCallback, useRef } from "react"
import { Syringe, Plus, Trash2, Edit, X, Calendar, Clock, AlertTriangle, FileText, Target, ChevronRight,ChevronLeft } from "lucide-react"

// Imports 
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import { HeaderUser } from '../../BarrasNavegacion/HeaderUser'
import { HeaderAdmin } from '../../BarrasNavegacion/HeaderAdmin'
import { Notification } from '../../Global/Notifys'
import { GetData, PostData, ModifyData } from "../../Varios/Requests"
import { DataFilter, divideList, errorStatusHandler, searchFilter } from '../../Varios/Util'

// Import styles 
import "../../../styles/InterfazAdmin/Servicios/Vacuna.css"

// Component 
export function VisualizadorVacunas({ URL = '' }) {
  const [vacunas, setVacunas] = useState([])
  const [almcVac, setAlmcVac] = useState([])
  const [modalAbierto, setModalAbierto] = useState(false)
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false)
  const [vacunaDetalle, setVacunaDetalle] = useState(null)
  const [filtroAnimal, setFiltroAnimal] = useState("todos")
  const [modoEdicion, setModoEdicion] = useState(false)
  const [vacunaEditando, setVacunaEditando] = useState(null)
  const [notify, setNotify] = useState(null)
  const [page, setPage] = useState(1)
  const didFetch = useRef(false)
  const mainUrl = `${URL}/service`

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

  // Función para obtener las vacunas del backend
  const fetchVacunas = useCallback(async () => {
    if (didFetch.current) return;
    didFetch.current = true;

    setNotify({
      title: 'Cargando',
      message: 'Cargando vacunas, por favor espere...',
      load: 1
    });

    try {
      const response = await GetData(`${mainUrl}/vacs`);
      setNotify(null);

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
        }));

        setVacunas(vacunasMapeadas);
        setAlmcVac(divideList(vacunasMapeadas,6))
      } else {
        setNotify({
          title: 'Error',
          message: 'No se encontraron vacunas',
          close: setNotify
        });
      }
    } catch (err) {
      setNotify(null);
      if (err.status) {
        const message = errorStatusHandler(err.status);
        setNotify({
          title: 'Error',
          message: `${message}`,
          close: setNotify
        });
      } else {
        console.error('Error al cargar vacunas:', err);
        setNotify({
          title: 'Error',
          message: 'Error al cargar las vacunas',
          close: setNotify
        });
      }
    }
  }, [mainUrl]);

  useEffect(() => {
    fetchVacunas();
  }, [fetchVacunas]);

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(precio)
  }

  // const vacunasFiltradas = vacunas.filter((vacuna) => {
  //   if (filtroAnimal === "todos") return true
  //   if (filtroAnimal === "disponibles") return vacuna.disponible
  //   if (filtroAnimal === "no-disponibles") return !vacuna.disponible
  //   return vacuna.tipoAnimal === filtroAnimal || vacuna.tipoAnimal === "ambos"
  // })

  const Filter = (e) => {
    const term = e.target.value
    const found = DataFilter(term,vacunas,['disponible'])
    if (found) setAlmcVac(divideList(found,6))
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
        });

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
        };

        console.log('Datos a enviar:', vacunaData);

        if (modoEdicion) {
          if (!vacunaEditando) {
            throw new Error('ID de vacuna no especificado para edición');
          }
          await ModifyData(`${mainUrl}/modifyVac`, {
            id_vac: vacunaEditando,
            ...vacunaData
          });
        } else {
          await PostData(`${mainUrl}/register/vac`, vacunaData);
        }

        setNotify({
          title: 'Éxito',
          message: `Vacuna ${modoEdicion ? 'actualizada' : 'agregada'} correctamente`,
          close: setNotify
        });

        setModalAbierto(false);
        await fetchVacunas(); 

      } catch (err) {
        setNotify(null);
        console.error('Error al guardar vacuna:', err);

        const message = err.status
          ? errorStatusHandler(err.status)
          : err.message || `No se pudo ${modoEdicion ? 'actualizar' : 'agregar'} la vacuna`;

        setNotify({
          title: 'Error',
          message: message,
          close: setNotify
        });
      }
    } else {
      setNotify({
        title: 'Error',
        message: 'Por favor complete todos los campos requeridos',
        close: setNotify
      });
    }
  }

  const eliminarVacuna = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta vacuna?")) {
      try {
        setNotify({
          title: 'Eliminando',
          message: 'Eliminando vacuna...',
          load: 1
        });

        await ModifyData(`${mainUrl}/deleteVac`, { id_vac: id });

        setNotify({
          title: 'Éxito',
          message: 'Vacuna eliminada correctamente',
          close: setNotify
        });

        fetchVacunas();
      } catch (err) {
        setNotify(null);
        if (err.status) {
          const message = errorStatusHandler(err.status);
          setNotify({
            title: 'Error',
            message: `${message}`,
            close: setNotify
          });
        } else {
          console.error(err);
          setNotify({
            title: 'Error',
            message: 'No se pudo eliminar la vacuna',
            close: setNotify
          });
        }
      }
    }
  }

  const abrirModalDetalle = (vacuna) => {
    setVacunaDetalle(vacuna)
    setModalDetalleAbierto(true)
  }


  const cambiarEstado = useCallback(async (id_ser, estadoActual) => {
    if (!window.confirm(`¿Seguro que deseas cambiar esta vacuna a ${estadoActual === "DISPONIBLE" ? "NO DISPONIBLE" : "DISPONIBLE"}?`)) return;

    try {
      setNotify({
        title: 'Actualizando',
        message: 'Cambiando estado de la vacuna...',
        load: 1
      });

      // Enviamos los datos en el formato que espera el backend
      const data = {
        data: {
          id_ser: id_ser,
          or: estadoActual === "DISPONIBLE" 
        }
      };

      await ModifyData(`${mainUrl}/AblOrDis`, data);

      
      setNotify({
        title: 'Éxito',
        message: `Estado de la vacuna actualizado correctamente`,
        close: setNotify
      });
      await fetchVacunas();
      
    } catch (err) {
      setNotify(null);
      console.error('Error al cambiar estado:', err);

      const message = err.status
        ? errorStatusHandler(err.status)
        : 'No se pudo cambiar el estado de la vacuna';

      setNotify({
        title: 'Error',
        message: message,
        close: setNotify
      });
    }
  }, [mainUrl, fetchVacunas]);

 
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

  const prevPage = () => {
    if (page != 1) setPage(page - 1)
  }

  const nextPage = () => {
    if (page < almcVac.length) setPage(page + 1)
  }

  return (
    <div className="contenedor-vacunas">
      <NavBarAdmin />
      
      <main className="tablero-admin">
        <HeaderAdmin />
        <div className="tarjetagesusuario">
          <div className="contenedor-principal-vacunas">
            <header className="encabezado-vacunas">
              <div className="titulo-con-icono-vacunas">
                <Syringe className="icono-titulo-vacunas" />
                <h1 className="titulo-vacunas">Servicios de Vacunación</h1>
              </div>
            </header>

            {/* Controles */}
            <div className="controles-vacunas">
              <h2 className="subtitulo-vacunas">Vacunas Disponibles</h2>
              <div className="acciones-control-vacunas">
                <select
                  defaultValue={filtroAnimal}
                  onChange={(e) => Filter(e)} 
                  className="filtro-vacunas"
                >
                  <option value="">Todas las vacunas</option>
                  <option value="DISPONIBLE">Disponibles</option>
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
              {almcVac[page -1]?.map((vacuna) => (
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
                          className={`estado-vacunas ${vacuna.disponible === "DISPONIBLE" ? "disponible-vacunas" : "no-disponible-badge-vacunas"
                            }`}
                          onClick={() => cambiarEstado(vacuna.id_ser, vacuna.disponible)}
                        >
                          {vacuna.disponible === "DISPONIBLE" ? "Disponible" : "No disponible"}
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
            <footer className='paginacion-gestion'>
              <div className='info-paginacion'>Mostrando registros del 1 al de un total de registros.</div>
              <div className='btns-container-paginacion'>
                <button
                  type='button'
                  className='BackBtn'
                  onClick={prevPage}
                >
                  <ChevronLeft className='icon' />
                  Anterior
                </button>
                <button
                  type='button'
                  className='btn-paginacion btn-active'>
                  {page}
                </button>
                <button
                  type='button'
                  className='BackBtn'
                  onClick={nextPage}
                >
                  Siguiente
                  <ChevronRight className='icon' />
                </button>
              </div>
            </footer>
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
                </div>
              </div>
            )}
          </div>
        
      </main>
      {notify && <Notification {...notify} />}
    </div>
  )
}